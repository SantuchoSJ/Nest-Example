/* Config */
import { IUser } from "@config/user/user.interface";

declare global {
  namespace Express {
    export interface Request {
      reqId: string;
      user: IUser;
    }
  }
}
