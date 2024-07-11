/* Dependencies */
import { Module } from "@nestjs/common";

/* Features */
import { HealthModule } from "@features/health/health.module";
import { UserModule } from "@features/user/user.module";
import { CompanyModule } from "@features/company/company.module";

@Module({
  imports: [HealthModule, UserModule, CompanyModule],
})
export class FeaturesModule {}
