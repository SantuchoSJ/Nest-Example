/* Utils */
import { AnyObject } from "@utils/constants/object.utils";

export class ExtendedError {
  domain: string;

  errorCode: string;

  typeError: string;

  message?: string | AnyObject;
}
