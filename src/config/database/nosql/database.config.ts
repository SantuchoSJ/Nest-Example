/* Config */
import { ConfigurationService } from "@config/configuration/configuration.service";

export const getDatabaseConfiguration = (
  configService: ConfigurationService
) => {
  return {
    uri: configService.get("database.nosql.host"),
  };
};
