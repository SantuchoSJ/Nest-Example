/* Dependencies */
import { Test } from "@nestjs/testing";

/* Features */
import { HealthController } from "@features/health/adapter/health.controller";
import { HealthService } from "@features/health/application/health.service";
import { LoggerModule } from "@config/logger/logger.module";

describe("HealthController", () => {
  let healthController: HealthController;
  let healthService: HealthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [LoggerModule],
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    healthService = moduleRef.get<HealthService>(HealthService);
    healthController = moduleRef.get<HealthController>(HealthController);
  });

  it("should be defined", () => {
    expect(healthController).toBeDefined();
  });

  describe("health", () => {
    it('should return "OK!!"', () => {
      const spy = jest.spyOn(healthService, "healthCheck");
      expect(healthController.healthCheck()).toBe("OK!!");
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
