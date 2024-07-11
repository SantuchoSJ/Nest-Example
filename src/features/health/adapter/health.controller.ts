/* Dependencies */
import { Controller, Get } from "@nestjs/common";
import { Logger } from "nestjs-pino";

/* Features */
import { HealthService } from "@features/health/application/health.service";

/* Config */
import { Public } from "@config/guard/is-public.decorator";

@Controller("health")
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
    private readonly logger: Logger
  ) {}

  @Public()
  @Get()
  healthCheck() {
    const result = this.healthService.healthCheck();
    this.logger.log("This is an example");
    return result;
  }
}
