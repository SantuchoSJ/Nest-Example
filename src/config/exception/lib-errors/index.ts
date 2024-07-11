import { AnyObject } from "@app/utils/constants";
import { errors } from "./errors";
import { IErrorDetail } from "./interfaces/error.interface";

const DEFAULT_ERROR = "generic";

/* @param {string} domain - The name of the application or context from which the error originates.*/
/* @param {string} errorCode - The unique identifier for the desired error.*/
/* @param {string} typeError - The first filter for the error: http, normative, etc...*/
/* @param {IAnyObject<any>} [data] - Optional parameter that allows passing additional information*/
/* that will be merged into the error details.*/
/* @returns {IErrorDetail} - Returns an error detail object that includes the error code, message*/
/* and optionally any additional data provided.*/

export function findError(
  domain: string,
  errorCode: string,
  typeError: string,
  data?: AnyObject
): IErrorDetail {
  const domainCode = `${domain}_${errorCode}`;
  if (errors[typeError] && errors[typeError][errorCode]) {
    return {
      ...errors[typeError][errorCode],
      ...data,
      domainCode,
      domain,
      typeError,
    };
  }

  return {
    ...errors.generic[DEFAULT_ERROR],
    ...data,
    domain,
    domainCode,
    typeError,
  };
}
