/* Dependencies */
import { Module } from "@nestjs/common";

/* Features */
import { HealthService } from "@features/health/application/health.service";
import { HealthController } from "@features/health/adapter/health.controller";
import { CommonModule } from "@common/common.module";

@Module({
  imports: [CommonModule],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [],
})
export class HealthModule {}
