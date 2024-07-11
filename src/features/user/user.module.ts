/* Dependencies */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

/* Features */
import { User } from "@features/user/domain/user.entity";
import { UserMapping } from "@features/user/adapter/user.mapping";
import { UserProfile } from "@features/user/adapter/user.profile";
import { UserInterfaceRepository } from "@features/user/domain/user.interface.repository";
import { UserRepository } from "@features/user/domain/user.repository";
import { UserExtController } from "@features/user/adapter/user.controller";
import { UserService } from "@features/user/application/user.service";
import { CompanyModule } from "@features/company/company.module";

/* Config */
import { MapperModule } from "@config/automapper/automapper.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), MapperModule, CompanyModule],
  controllers: [UserExtController],
  providers: [
    UserMapping,
    UserProfile,
    UserService,
    {
      provide: UserInterfaceRepository,
      useClass: UserRepository,
    },
  ],
  exports: [TypeOrmModule, UserMapping, UserService],
})
export class UserModule {}
