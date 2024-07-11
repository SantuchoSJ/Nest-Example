import { IErrorApp } from "../interfaces/error.interface";
import { normativeErrors } from "../errors/normative.errors";
import { genericErrors } from "../errors/generic.errors";
import { appErrors } from "../errors/app.errors";
import { httpErrors } from "../errors/http.errors";

//An object centralizing all errors used across the application.
// @type {IError}
// @property {Object} HTTP - Errors related to HTTP operations.
// @property {Object} NORMATIVE - Normative errors specific to application regulations.
// @property {Object} APPLICATION - Errors specific to application logic.
// @property {Object} GENERIC - Generic system errors.

export const errors: IErrorApp = {
  normative: normativeErrors,
  application: appErrors,
  http: httpErrors,
  generic: genericErrors,
};
