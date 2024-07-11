import { IError } from "../interfaces/error.interface";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ErrorTypes } from "../errors/constants.errors";

// An enumeration of normative errors with detailed information.
// @typedef {Object} IError
// @property {string} code - The code associated with the error.
// @property {string} message - A user-friendly message describing the error.
// @property {string} typeError - The type of error, such as "normative" in this case.

export const normativeErrors: IError = {
  ERRN1: {
    message: ReasonPhrases.FORBIDDEN,
    typeError: ErrorTypes.NORMATIVE,
    httpCode: StatusCodes.FORBIDDEN,
  },
};
