/* Dependencies */
import { Module } from "@nestjs/common";

/* Features */
import { FeaturesModule } from "@features/features.module";
import { ConfigModule } from "@config/config.module";
import { CommonModule } from "@common/common.module";

@Module({
  imports: [ConfigModule, FeaturesModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}