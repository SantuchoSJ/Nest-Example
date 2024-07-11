/* Dependencies */
import { Test } from "@nestjs/testing";

/* Features */
import { HealthService } from "@features/health/application/health.service";
import { LoggerModule } from "@config/logger/logger.module";

describe("Test logger module", () => {
  let loggerModule: LoggerModule;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [LoggerModule],
    }).compile();

    loggerModule = moduleRef.get<HealthService>(LoggerModule);
  });

  it("should be defined", () => {
    expect(loggerModule).toBeDefined();
  });
});
