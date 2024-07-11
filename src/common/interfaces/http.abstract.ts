/* Dependencies */
import { Observable } from "rxjs";
import { AxiosRequestConfig, AxiosResponse } from "axios";

/* Utils */
import { AnyObject } from "@utils/constants/object.utils";

export abstract class HttpAbstract {
  abstract get<T>(
    config?: AxiosRequestConfig
  ): Promise<Observable<AxiosResponse<T>>>;
  abstract post<T>(
    body: AnyObject,
    config?: AxiosRequestConfig
  ): Promise<Observable<AxiosResponse<T>>>;
}
