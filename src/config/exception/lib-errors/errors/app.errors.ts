import { IError } from "../interfaces/error.interface";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ErrorTypes } from "../errors/constants.errors";

//Contains error codes and messages related to application-specific scenarios.
//@type {Object} IError An error code representing a specific application
//@property {string} code - The code associated with the error.
//@property {string} message - A user-friendly message describing the error.
//@property {string} typeError - Specifies the category of the error

export const appErrors: IError = {
  ERRA1: {
    message: ReasonPhrases.CONFLICT,
    typeError: ErrorTypes.APP,
    httpCode: StatusCodes.CONFLICT,
  },
};
