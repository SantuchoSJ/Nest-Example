/* Dependencies */
import { Test } from "@nestjs/testing";

/* Features */
import { LoggerModule } from "@config/logger/logger.module";
import { ConfigurationModule } from "@config/configuration/configuration.module";
import { HttpModule } from "@nestjs/axios";
import { NotificationService } from "@common/notification/notification.service";
import { CommonModule } from "@common/common.module";

describe("CommonModule", () => {
  let commonModule: CommonModule;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigurationModule, HttpModule, LoggerModule, CommonModule],
      providers: [NotificationService],
      exports: [NotificationService],
    }).compile();

    commonModule = moduleRef.get<CommonModule>(CommonModule);
  });

  it("should be defined", async () => {
    expect(commonModule).toBeDefined();
  });
});
