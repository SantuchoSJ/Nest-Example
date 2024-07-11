/* Dependencies */
import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

/* Common */
import { NotificationService } from "@common/notification/notification.service";

/* Config */
import { ConfigurationModule } from "@config/configuration/configuration.module";

@Module({
  imports: [ConfigurationModule, HttpModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class CommonModule {}
