/* Dependencies */
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";

/* Features */
import { Company } from "@features/company/domain/company.entity";
import { CompanyMapping } from "@features/company/adapter/company.mapping";
import { CompanyProfile } from "@features/company/adapter/company.profile";
import { CompanyInterfaceRepository } from "@features/company/domain/company.interface.repository";
import { CompanyRepository } from "@features/company/domain/company.repository";
import { CompanyExtController } from "@features/company/adapter/company.controller";
import { CompanyService } from "@features/company/application/company.service";
import { UserModule } from "@features/user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    AutomapperModule,
    forwardRef(() => UserModule),
  ],
  controllers: [CompanyExtController],
  providers: [
    CompanyMapping,
    CompanyProfile,
    CompanyService,
    {
      provide: CompanyInterfaceRepository,
      useClass: CompanyRepository,
    },
  ],
  exports: [TypeOrmModule, CompanyMapping, CompanyService],
})
export class CompanyModule {}
