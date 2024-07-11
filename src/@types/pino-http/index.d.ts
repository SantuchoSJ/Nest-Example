/* Config */
import { IUser } from "@config/user/user.interface";

declare module "http" {
  export interface IncomingMessage {
    user?: IUser;
  }
}
