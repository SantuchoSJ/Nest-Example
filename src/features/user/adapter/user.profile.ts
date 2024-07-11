/* Dependencies */
import { Injectable } from "@nestjs/common";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import {
  createMap,
  forMember,
  ignore,
  mapFrom,
  Mapper,
  MappingProfile,
} from "@automapper/core";

/* Features */
import { User } from "@features/user/domain/user.entity";
import { CreateUserDto } from "@features/user/adapter/dto/request/create.user.dto";
import { UserDto } from "@features/user/adapter/dto/user.dto";
import { CompanyMapping } from "@features/company/adapter/company.mapping";

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(
    @InjectMapper() readonly mapper: Mapper,
    private readonly companyMapping: CompanyMapping
  ) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper: Mapper): void => {
      createMap(
        mapper,
        CreateUserDto,
        User,
        forMember((d) => d.id, ignore())
      );
      createMap(
        mapper,
        User,
        UserDto,
        forMember(
          (d) => d.company,
          mapFrom((source) => this.companyMapping.getCompanyDto(source.company))
        )
      );
    };
  }
}
