/* Dependencies */
import * as process from "process";

/* Config */
import { IConfiguration } from "@config/configuration/configuration.interface";

export const configLoader = (): IConfiguration => {
  return {
    port: process.env.PORT,
    domain: process.env.DOMAIN,
    jwtSecret: process.env.JWT_SECRET,
    database: {
      nosql: {
        host: process.env.NOSQL_DATABASE_HOST,
      },
      sql: {
        host: process.env.SQL_DATABASE_HOST,
        port: Number(process.env.SQL_DATABASE_PORT),
        username: process.env.SQL_DATABASE_USERNAME,
        password: process.env.SQL_DATABASE_PASSWORD,
        database: process.env.SQL_DATABASE_NAME,
      },
    },
    notifications: {
      host: process.env.NOTIFICATIONS_HOST,
      path: process.env.NOTIFICATIONS_PATH,
    },
  };
};
