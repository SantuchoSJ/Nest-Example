import { ServiceException } from "@config/exception/exception";
import { ExtendedError } from "@config/exception/exception.type";
import { AnyObject } from "@utils/constants/object.utils";
import { HttpStatus } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { NotificationException } from "@common/notification/notification.exception";

export const mapServiceErrors = (
  error: ServiceException,
  domain: string
): ExtendedError => {
  const object: AnyObject = {};
  if (error instanceof NotificationException) {
    object.domain = domain;
    object.errorCode = HttpStatus.SERVICE_UNAVAILABLE;
    object.typeError = "http";
    object.message = error.message;
  }
  return plainToInstance(ExtendedError, object);
};
