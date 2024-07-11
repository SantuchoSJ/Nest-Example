/* Dependencies */
import { Test } from "@nestjs/testing";

/* Features */
import { LoggerModule } from "@config/logger/logger.module";
import { ConfigurationModule } from "@config/configuration/configuration.module";
import { HttpModule } from "@nestjs/axios";
import { NotificationService } from "@common/notification/notification.service";

describe("Notification Service", () => {
  let notificationService: NotificationService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigurationModule, HttpModule, LoggerModule],
      providers: [NotificationService],
      exports: [NotificationService],
    }).compile();

    notificationService =
      moduleRef.get<NotificationService>(NotificationService);
  });

  it("should be defined", async () => {
    expect(notificationService).toBeDefined();
  });
});
