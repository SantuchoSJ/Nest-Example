/* Dependencies */
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

/* Config */
import { ConfigurationService } from "@config/configuration/configuration.service";
import { configLoader } from "@config/configuration/configuration.loader";
import { configurationSchema } from "@config/configuration/configuration.schema";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configLoader],
      validationSchema: configurationSchema,
    }),
  ],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
