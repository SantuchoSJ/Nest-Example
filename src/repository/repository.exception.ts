/* Config */
import { DatabaseException } from "@config/exception/exception";

export class EntityNotFoundException extends DatabaseException {
  constructor(entity: string) {
    super(`${entity} not found`);
  }
}