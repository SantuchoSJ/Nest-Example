/* Dependencies */
import { ApiResponse } from "@nestjs/swagger";
import { Controller, Get } from "@nestjs/common";

/* Features */
import { CompanyService } from "@features/company/application/company.service";
import { CompanyMapping } from "@features/company/adapter/company.mapping";
import { CompanyDto } from "@features/company/adapter/dto/company.dto";
import { UserDto } from "@features/user/adapter/dto/user.dto";

@Controller({ version: "1", path: "companies" })
export class CompanyExtController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly companyMapping: CompanyMapping
  ) {}

  @ApiResponse({
    status: 200,
    description: "Returns an object containing an array of data sources",
    type: [UserDto],
  })
  @Get()
  async getAll(): Promise<{ data: CompanyDto[] }> {
    const companies = await this.companyService.getAll();
    return { data: this.companyMapping.getManyCompaniesDto(companies) };
  }
}
