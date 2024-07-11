import { IError } from "../interfaces/error.interface";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ErrorTypes } from "../errors/constants.errors";

//Defines HTTP error codes and their corresponding messages and types.
// @type {IError} - Interface specifying the structure for error objects.
// @property {Object}
//  - code: The HTTP status code for the error, using StatusCodes for clarity and maintainability.
//  - message: A brief, human-readable message describing the error.
//  - typeError: The category of the error, in this case, "HTTP" to indicate it's related to HTTP operations.

export const httpErrors: IError = {
  404: {
    httpCode: StatusCodes.NOT_FOUND,
    message: ReasonPhrases.NOT_FOUND,
    typeError: ErrorTypes.HTTP,
  },
  400: {
    httpCode: StatusCodes.BAD_REQUEST,
    message: ReasonPhrases.BAD_REQUEST,
    typeError: ErrorTypes.HTTP,
  },
  401: {
    httpCode: StatusCodes.UNAUTHORIZED,
    message: ReasonPhrases.UNAUTHORIZED,
    typeError: ErrorTypes.HTTP,
  },
  500: {
    httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    typeError: ErrorTypes.HTTP,
  },
  501: {
    httpCode: StatusCodes.NOT_IMPLEMENTED,
    message: ReasonPhrases.NOT_IMPLEMENTED,
    typeError: ErrorTypes.HTTP,
  },
  504: {
    httpCode: StatusCodes.GATEWAY_TIMEOUT,
    message: ReasonPhrases.GATEWAY_TIMEOUT,
    typeError: ErrorTypes.HTTP,
  },
};
