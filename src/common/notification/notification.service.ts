/* Dependencies */
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { catchError, firstValueFrom, Observable } from "rxjs";
import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { Logger } from "nestjs-pino";
/* Config */
import { ConfigurationService } from "@config/configuration/configuration.service";

/* Utils */
import { AnyObject } from "@utils/constants/object.utils";

/* Common */
import { HttpAbstract } from "@common/interfaces/http.abstract";
import { NotificationException } from "@common/notification/notification.exception";

@Injectable()
export class NotificationService implements Pick<HttpAbstract, "post"> {
  protected http: AxiosInstance;

  constructor(
    private readonly httpService: HttpService,
    private readonly configurationService: ConfigurationService,
    private readonly logger: Logger,
    @Inject(REQUEST)
    private readonly request: Request
  ) {
    // This is an important step if we are communicating with a Fenix service.
    const host = this.configurationService.get("notifications.host");
    const path = this.configurationService.get("notifications.path");
    this.httpService.axiosRef.defaults.baseURL = `${host}${path}`;
    this.httpService.axiosRef.defaults.headers.common.Authorization =
      this.request.headers.authorization;
  }

  /**
   * Get the episode information by id
   *
   * @returns
   */
  async sendMessage(body: AnyObject, config: AnyObject) {
    // config can be customized
    this.logger.log("Sending notification", { body, config });
    const { data } = await firstValueFrom(
      (await this.post(body, config)).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(
            error.response?.data || "Error sending notification"
          );
          throw new NotificationException();
        })
      )
    );
    return data;
  }

  /*  async get<T>(
      config?: AxiosRequestConfig
    ): Promise<Observable<AxiosResponse<T>>> {
      return this.httpService.get("", config);
    }*/

  async post<T>(
    body: AnyObject,
    config?: AxiosRequestConfig
  ): Promise<Observable<AxiosResponse<T>>> {
    return this.httpService.post("", body, config);
  }
}
