/* Dependencies */
import { Module } from "@nestjs/common";

/* Config */
import SqlDatabaseModule from "@config/database/sql/database.module";
import { ConfigurationModule } from "@config/configuration/configuration.module";
import { MapperModule } from "@config/automapper/automapper.module";
import NoSqlDatabaseModule from "@config/database/nosql/database.module";
import { LoggerModule } from "@config/logger/logger.module";
import { AuthModule } from "@config/guard/auth.module";

@Module({
  imports: [
    NoSqlDatabaseModule,
    SqlDatabaseModule,
    MapperModule,
    ConfigurationModule,
    LoggerModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class ConfigModule {}
