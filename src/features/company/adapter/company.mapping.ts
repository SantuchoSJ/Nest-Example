/* Dependencies */
import type { Mapper } from "@automapper/types";
import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";

/* Features */
import { Company } from "@features/company/domain/company.entity";
import { CompanyDto } from "@features/company/adapter/dto/company.dto";

@Injectable()
export class CompanyMapping {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  getCompanyDto(dto: Company): CompanyDto {
    return this.mapper.map(dto, Company, CompanyDto);
  }

  getManyCompaniesDto(dto: Company[]): CompanyDto[] {
    return dto.map((d) => this.getCompanyDto(d));
  }
}
