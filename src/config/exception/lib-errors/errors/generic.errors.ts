import { IError } from "../interfaces/error.interface";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ErrorTypes } from "../errors/constants.errors";

//@type {IError} - Interface specifying the structure for error objects.
// @property {Object} generic - A generic error category with the following attributes:
//  - code: Maps to INTERNAL_SERVER_ERROR prevented the server from fulfilling the request.
//  - message: A description of the error for logging or debugging purposes.
//  - typeError: Specifies the error category as "generic".

export const genericErrors: IError = {
  generic: {
    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    typeError: ErrorTypes.GENERIC,
    httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
  },
};
