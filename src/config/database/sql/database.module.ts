/* Dependencies */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

/* Config */
import { getDatabaseConfiguration } from "@config/database/sql/database.config";
import { ConfigurationModule } from "@config/configuration/configuration.module";
import { ConfigurationService } from "@config/configuration/configuration.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: getDatabaseConfiguration,
      inject: [ConfigurationService],
    }),
  ],
})
export default class SqlDatabaseModule {}
