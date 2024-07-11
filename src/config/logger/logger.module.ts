/* Dependencies */
import { Module, RequestMethod } from "@nestjs/common";
import { randomUUID } from "crypto";
import { LoggerModule as LoggerModuleNest } from "nestjs-pino";

/* Config */
import {
  customProps,
  customReceivedMessage,
  hideData,
} from "@config/logger/logger.utils";
import { IUser } from "@config/user/user.interface";

@Module({
  imports: [
    LoggerModuleNest.forRoot({
      pinoHttp: {
        autoLogging: true,
        useLevel: "info",
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "yyyy-mm-dd HH:MM:ss.l",
            singleLine: true,
          },
        },
        quietReqLogger: true,
        level: "info",
        genReqId: (req) => {
          if (req.headers?.FENIX_REQUEST_ID) {
            return req.headers.FENIX_REQUEST_ID;
          }
          return randomUUID();
        },
        customProps: customProps,
        customReceivedMessage: customReceivedMessage,
        customErrorMessage: (req, res) => {
          return `An error occurred | User: ${res.req.user.userId || "no-user"} | ${res.req.method} | URL: ${res.req.url}`;
        },
        customAttributeKeys: {
          reqId: "requestId",
          req: "serviceInfo",
          res: "success",
        },
        serializers: {
          user(user: IUser) {
            return user.userId || "no-user";
          },
          req(req) {
            const { method, url, params, query, headers } = req;
            return {
              method,
              url,
              params,
              query,
              headers: hideData(headers),
              body: hideData(req.raw.body),
            };
          },
          res(res) {
            return res.statusCode < 400;
          },
          err(error) {
            return { ...error };
          },
        },
      },
      exclude: [{ method: RequestMethod.GET, path: "/health" }],
    }),
  ],
})
export class LoggerModule {}
