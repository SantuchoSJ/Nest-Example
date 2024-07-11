/* Dependencies */
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";

/* Config */
import { AuthGuard } from "@config/guard/auth.guard";
import { ConfigurationModule } from "@config/configuration/configuration.module";

@Module({
  imports: [JwtModule, ConfigurationModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
