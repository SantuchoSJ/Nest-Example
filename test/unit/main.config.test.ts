/* Dependencies */
import { INestApplication, VersioningType } from "@nestjs/common";
import { Logger } from "nestjs-pino";
import { SwaggerModule } from "@nestjs/swagger";

/* App */
import { setupApplication } from "@app/main.config";

/* Config */
import { ConfigurationService } from "@config/configuration/configuration.service";

describe("Testing main config", () => {
  const app = {
    use: jest.fn(),
    enableCors: jest.fn(),
    useLogger: jest.fn(),
    useGlobalFilters: jest.fn(),
    enableVersioning: jest.fn(),
    select: jest.fn(),
    useGlobalPipes: jest.fn(),
  } as unknown as INestApplication;
  const logger = jest.fn() as unknown as Logger;
  const configService = jest.fn() as unknown as ConfigurationService;

  it("should setup application", () => {
    const createDocumentSpy = jest
      .spyOn(SwaggerModule, "createDocument")
      .mockImplementation(() => null);
    const setupSpy = jest
      .spyOn(SwaggerModule, "setup")
      .mockImplementation(() => null);
    const enableVersioningSpy = jest.spyOn(app, "enableVersioning");
    setupApplication(app, { logger, configService });
    expect(enableVersioningSpy).toHaveBeenCalledWith({
      type: VersioningType.URI,
      prefix: "api/v",
    });
    createDocumentSpy.mockRestore();
    setupSpy.mockRestore();
  });
});
