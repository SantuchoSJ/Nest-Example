/* Config */
import { ConfigurationException } from "@config/configuration/configuration.exception";

describe("Testing exception", () => {
  it("should create the error", () => {
    const error = new ConfigurationException("key", "value");

    expect(error.message).toBe(
      "key not found or it is not valid. Value: value"
    );
  });
});
