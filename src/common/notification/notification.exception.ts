import { ServiceException } from "@config/exception/exception";

export class NotificationException extends ServiceException {
  constructor() {
    super(`There was an error sending notification`);
  }
}
