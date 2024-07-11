/* Dependencies */
import { IncomingMessage } from "http";
import { Response } from "express";

/* Utils */
import { AnyObject } from "@utils/constants/object.utils";

const DATA_TO_HIDE_ON_HEADERS = ["authorization"];
const DATA_TO_HIDE_ON_BODY = ["password", "repeatedPassword"];
const DATA_TO_HIDE = [...DATA_TO_HIDE_ON_BODY, ...DATA_TO_HIDE_ON_HEADERS];

export const hideData = (data: AnyObject, keysToHide = DATA_TO_HIDE) => {
  const result: AnyObject = {};
  const keys = Object.keys(data);

  for (const key of keys) {
    const value = data[key];
    result[key] = keysToHide
      .map((kth) => kth.toLowerCase())
      .includes(key?.toLowerCase())
      ? "<hidden>"
      : value;
  }
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const customProps = (req: IncomingMessage, _: Response) => {
  return {
    user: req.user,
  };
};

export const customReceivedMessage = (_: IncomingMessage, res: Response) => {
  return `Request received | ${res.req.method} | URL: ${res.req.url}`;
};
