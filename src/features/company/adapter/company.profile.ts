/* Dependencies */
import { Injectable } from "@nestjs/common";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, Mapper, MappingProfile } from "@automapper/core";

/* Features */
import { Company } from "@features/company/domain/company.entity";
import { CompanyDto } from "@features/company/adapter/dto/company.dto";

@Injectable()
export class CompanyProfile extends AutomapperProfile {
  constructor(@InjectMapper() readonly mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper: Mapper): void => {
      createMap(mapper, Company, CompanyDto);
    };
  }
}
