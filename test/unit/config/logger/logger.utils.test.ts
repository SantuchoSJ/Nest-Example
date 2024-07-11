/* Dependencies */
import { IncomingMessage } from "http";
import { Response } from "express";

/* Config */
import {
  customProps,
  customReceivedMessage,
  hideData,
} from "@config/logger/logger.utils";

describe("Testing logger utils", () => {
  describe("Testing hide data", () => {
    it("Should hide data", () => {
      const object = hideData({
        noHide: "abc",
        authorization: "test",
        password: "password",
        repeatedPassword: "repeatedPassword",
      });
      expect(object).toStrictEqual({
        noHide: "abc",
        authorization: "<hidden>",
        password: "<hidden>",
        repeatedPassword: "<hidden>",
      });
    });
  });

  describe("Testing Receive custom message", () => {
    it("Should return a string", () => {
      const message = customReceivedMessage(
        {} as IncomingMessage,
        { req: { method: "GET", url: "url" } } as Response
      );
      expect(message).toBe("Request received | GET | URL: url");
    });
  });

  describe("Testing Custom Props", () => {
    it("Should return success false status code 400", () => {
      const message = customProps(
        { user: { id: 1234 } } as unknown as IncomingMessage,
        {} as Response
      );
      expect(message).toStrictEqual({ user: { id: 1234 } });
    });

    it("Should return success false status code 500", () => {
      const message = customProps(
        { user: { id: 1234 } } as unknown as IncomingMessage,
        {} as Response
      );
      expect(message).toStrictEqual({ user: { id: 1234 } });
    });

    it("Should return success true status code 300", () => {
      const message = customProps(
        { user: { id: 1234 } } as unknown as IncomingMessage,
        {} as Response
      );
      expect(message).toStrictEqual({ user: { id: 1234 } });
    });
  });
});
