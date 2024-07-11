/* Dependencies */
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

/* Features */
import { User } from "@features/user/domain/user.entity";
import { Company } from "@features/company/domain/company.entity";

/* Config */
import { ConfigurationService } from "@config/configuration/configuration.service";

export const getDatabaseConfiguration = (
  configService: ConfigurationService
): TypeOrmModuleOptions => {
  return {
    type: "postgres",
    host: configService.get("database.sql.host"),
    port: configService.get("database.sql.port"),
    username: configService.get("database.sql.username"),
    password: configService.get("database.sql.password"),
    database: configService.get("database.sql.database"),
    synchronize: false,
    entities: [Company, User],
    logging: false,
    dropSchema: false,
  };
};
