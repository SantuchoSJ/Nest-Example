import { StatusCodes } from "http-status-codes";

//* An object centralizing all errors used across the application.
//* @interface {IErrorDetail}
//* @property {string} httpCode - Errors code related to the app.
//* @property {string} message - Normative errors specific to application regulations.
//* @property {string} typeError - Errors specific to application logic.
//* @property {string} domain - The application where the error is happening.
//* @property {string} domainCode - The custom code from the app domain_code.

export interface IErrorDetail {
  message: string;
  typeError: string;
  httpCode: StatusCodes;
  domain?: string;
  domainCode?: string;
}

export interface IError {
  [code: string]: IErrorDetail;
}

export interface IErrorApp {
  [typeError: string]: IError;
}
