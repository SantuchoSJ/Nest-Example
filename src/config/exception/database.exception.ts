/* Dependencies */
import { plainToInstance } from "class-transformer";
import { HttpStatus } from "@nestjs/common";

/* Config */
import { DatabaseException } from "@config/exception/exception";
import { ExtendedError } from "@config/exception/exception.type";

/* Repository */
import { EntityNotFoundException } from "@repository/repository.exception";

/* Utils */
import { AnyObject } from "@utils/constants/object.utils";

export const mapDatabaseException = (
  error: DatabaseException,
  domain: string
): ExtendedError => {
  const object: AnyObject = {};
  if (error instanceof EntityNotFoundException) {
    object.domain = domain;
    object.errorCode = HttpStatus.NOT_FOUND;
    object.typeError = "http";
    object.message = error.message;
  }
  return plainToInstance(ExtendedError, object);
};
