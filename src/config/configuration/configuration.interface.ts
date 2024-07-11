export interface IConfiguration {
  port: string;
  domain: string;
  jwtSecret: string;
  database: {
    nosql: {
      host: string;
    };
    sql: {
      host: string;
      port: number;
      username: string;
      password: string;
      database: string;
    };
  };
  notifications: {
    host: string;
    path: string;
  };
}

export type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never
        ? ""
        : `.${Leaves<T[K]>}`}`;
    }[keyof T]
  : never;

export type LeafTypes<T, S extends string> = S extends `${infer T1}.${infer T2}`
  ? T1 extends keyof T
    ? LeafTypes<T[T1], T2>
    : never
  : S extends keyof T
    ? T[S]
    : never;
