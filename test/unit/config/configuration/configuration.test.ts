/* Dependencies */
import * as process from "process";
import { configLoader } from "@config/configuration/configuration.loader";

/* Config */

describe("Testing configuration", () => {
  it("It should return the correct config", () => {
    const config = configLoader();
    expect(config.port).toBe(process.env.PORT);
    expect(config.jwtSecret).toBe(process.env.JWT_SECRET);
    expect(config.database.nosql.host).toBe(process.env.NOSQL_DATABASE_HOST);
  });
});
