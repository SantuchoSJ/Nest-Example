/* Dependencies */
import { findError } from "@config/exception/lib-errors";
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  LoggerService,
} from "@nestjs/common";
import { Request, Response } from "express";

/* Config */
import { getExtendedError } from "@config/exception/exception.mapper";
import { ConfigurationService } from "@config/configuration/configuration.service";

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly configService: ConfigurationService,
    private readonly logger: LoggerService
  ) {}

  /**
   * Handles exceptions and returns a formatted error response.
   *
   * If the exception is an instance of `ExtendedError`, it finds the corresponding error from the error list.
   * If the exception is not an instance of `ExtendedError`, it returns a generic internal server error.
   *
   * @param {Error} exception - The exception to handle.
   * @param {ArgumentsHost} host - The arguments host.
   */
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { domain, typeError, errorCode, message } = getExtendedError(
      exception,
      this.configService.get("domain")
    );

    const error = findError(domain, errorCode, typeError, {
      message,
      requestId: request.id,
    });

    this.logger.error(error);

    response.status(error.httpCode).json({
      ...error,
      statusCode: error.httpCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
