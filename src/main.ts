/* Dependencies */
import "@aliases";
import { NestFactory } from "@nestjs/core";
import { Logger } from "nestjs-pino";

/* App */
import { AppModule } from "@app/app.module";
import { setupApplication } from "@app/main.config";

/* Config */
import { ConfigurationService } from "@config/configuration/configuration.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigurationService);
  const logger = app.get(Logger);

  setupApplication(app, { configService, logger });

  const PORT = configService.get("port");
  await app.listen(PORT, () => {
    logger.log(`Server started at port ${PORT}`);
  });
}
bootstrap();
