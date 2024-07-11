/* Dependencies */
import {
  ArgumentsHost,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Test } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { Logger } from "nestjs-pino";

/* Config */
import { ConfigurationService } from "@config/configuration/configuration.service";
import { LoggerModule } from "@config/logger/logger.module";
import { ExceptionsFilter } from "@config/exception/exception.filter";
import { ConfigurationModule } from "@config/configuration/configuration.module";
import { AuthGuard } from "@config/guard/auth.guard";

/* Common */
import { NotificationException } from "@common/notification/notification.exception";

/* Repository */
import { EntityNotFoundException } from "@repository/repository.exception";

describe("ExceptionsFilter", () => {
  let filter: ExceptionsFilter;
  let host: ArgumentsHost;
  let request: Request;
  let response: Response;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigurationModule, LoggerModule],
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    request = { url: "/test" } as unknown as Request;
    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    host = {
      switchToHttp: () => ({
        getRequest: () => request,
        getResponse: () => response,
      }),
    } as unknown as ArgumentsHost;

    filter = new ExceptionsFilter(
      module.get(ConfigurationService),
      module.get(Logger)
    );
  });

  it("should handle BadRequest correctly", () => {
    const error = new BadRequestException("Error occurred");

    filter.catch(error, host);
    expect(response.status).toHaveBeenCalledWith(error.getStatus());
    expect(response.json).toHaveBeenCalledWith({
      httpCode: 400,
      message: "Error occurred",
      typeError: "http",
      requestId: undefined,
      domainCode: "ms-fenix-arquetipo_400",
      domain: "ms-fenix-arquetipo",
      statusCode: 400,
      timestamp: expect.any(String),
      path: "/test",
    });
  });

  it("should handle NotificationException correctly", () => {
    const notificationException = new NotificationException();

    filter.catch(notificationException, host);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      message: "There was an error sending notification",
      typeError: "http",
      httpCode: 500,
      requestId: undefined,
      domain: "ms-fenix-arquetipo",
      domainCode: "ms-fenix-arquetipo_503",
      statusCode: 500,
      timestamp: expect.any(String),
      path: "/test",
    });
  });

  it("should handle NotFoundException correctly", () => {
    const notFoundException = new NotFoundException("Resource not found");

    filter.catch(notFoundException, host);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({
      httpCode: 404,
      message: "Resource not found",
      typeError: "http",
      requestId: undefined,
      domainCode: "ms-fenix-arquetipo_404",
      domain: "ms-fenix-arquetipo",
      statusCode: 404,
      timestamp: expect.any(String),
      path: "/test",
    });
  });

  it("should handle generic Error correctly", () => {
    const genericError = new Error("An error occurred");

    filter.catch(genericError, host);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      httpCode: 500,
      message: "An error occurred",
      typeError: "http",
      requestId: undefined,
      domainCode: "ms-fenix-arquetipo_500",
      domain: "ms-fenix-arquetipo",
      statusCode: 500,
      timestamp: expect.any(String),
      path: "/test",
    });
  });

  it("should handle EntityNotFoundException correctly", () => {
    const genericError = new EntityNotFoundException("Entity");

    filter.catch(genericError, host);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      httpCode: 404,
      message: "Entity not found",
      typeError: "http",
      requestId: undefined,
      domainCode: "ms-fenix-arquetipo_404",
      domain: "ms-fenix-arquetipo",
      statusCode: 404,
      timestamp: expect.any(String),
      path: "/test",
    });
  });
});
