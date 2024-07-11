export interface IUser {
  userId: string;
  enabledMfes: {
    name: string;
    groups: {
      name: string;
      actions: string[];
    }[];
  }[];
  iat: number;
  exp: number;
}
