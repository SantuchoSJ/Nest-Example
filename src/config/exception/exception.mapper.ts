/* Dependencies */
import { HttpException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { HttpStatusCode } from "axios";

/* Exceptions */
import { ExtendedError } from "@config/exception/exception.type";
import {
  DatabaseException,
  ServiceException,
} from "@config/exception/exception";
import { mapDatabaseException } from "@config/exception/database.exception";
import { mapServiceErrors } from "@config/exception/service.exception";

/* Utils */
import { AnyObject } from "@utils/constants/object.utils";

export const getExtendedError = (
  error: Error,
  domain: string
): ExtendedError => {
  if (error instanceof HttpException) {
    const response = error.getResponse() as string | { message: AnyObject };
    return plainToInstance(ExtendedError, {
      domain: domain,
      errorCode: error.getStatus(),
      typeError: "http",
      message: typeof response === "string" ? response : response.message,
    });
  }
  if (error instanceof DatabaseException) {
    return mapDatabaseException(error, domain);
  }
  if (error instanceof ServiceException) {
    return mapServiceErrors(error, domain);
  }
  return plainToInstance(ExtendedError, {
    domain,
    errorCode: HttpStatusCode.InternalServerError,
    typeError: "http",
    message: error.message,
  });
};
