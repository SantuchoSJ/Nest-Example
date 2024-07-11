/* Dependencies */
import { Test } from "@nestjs/testing";

/* Config */
import { getDatabaseConfiguration } from "@config/database/nosql/database.config";
import { ConfigurationService } from "@config/configuration/configuration.service";
import { ConfigurationModule } from "@config/configuration/configuration.module";

describe("getDatabaseConfiguration", () => {
  let configService: ConfigurationService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigurationModule],
    }).compile();

    configService = moduleRef.get(ConfigurationService);
  });

  it("should return the correct database URI", () => {
    const dbConfig = getDatabaseConfiguration(configService);
    expect(dbConfig.uri).toEqual(process.env.NOSQL_DATABASE_HOST);
  });

  it("should handle missing configuration gracefully", () => {
    const spy = jest
      .spyOn(configService, "get")
      .mockImplementation(() => undefined);

    const dbConfig = getDatabaseConfiguration(configService);
    expect(dbConfig.uri).toBeUndefined();
    spy.mockRestore();
  });
});
