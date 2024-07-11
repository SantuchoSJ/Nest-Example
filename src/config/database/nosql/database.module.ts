/* Dependencies */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

/* Config */
import { getDatabaseConfiguration } from "@config/database/nosql/database.config";
import { ConfigurationService } from "@config/configuration/configuration.service";
import { ConfigurationModule } from "@config/configuration/configuration.module";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      connectionName: "myConnection",
      useFactory: getDatabaseConfiguration,
      inject: [ConfigurationService],
    }),
  ],
})
export default class NoSqlDatabaseModule {}
