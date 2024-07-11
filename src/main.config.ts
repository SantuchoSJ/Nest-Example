/* Dependencies */
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import { useContainer } from "class-validator";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { Logger } from "nestjs-pino";

/* Config */
import { ConfigurationService } from "@config/configuration/configuration.service";
import { ExceptionsFilter } from "@config/exception/exception.filter";

/* Utils */
import { CORS } from "@utils/constants";

/* App */
import { AppModule } from "@app/app.module";

export const setupApplication = (
  app: INestApplication,
  {
    configService,
    logger,
  }: { configService: ConfigurationService; logger: Logger }
) => {
  // Security configuration
  app.use(helmet());
  app.enableCors(CORS);
  app.useLogger(logger);

  // Setup exception filter, logger and pipes

  app.useGlobalFilters(new ExceptionsFilter(configService, logger));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // Swagger configuration

  const config = new DocumentBuilder()
    .setTitle("ms-fenix-arquetipo")
    .setDescription("Software Archetype Microservice for Fenix Application")
    .setVersion("1.0")
    .addTag("Archetype")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  // Versioning configuration

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: "api/v",
  });
};
