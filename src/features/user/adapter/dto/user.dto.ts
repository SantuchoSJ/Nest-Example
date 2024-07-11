/* Dependencies */
import { AutoMap } from "@automapper/classes";

/* Features */
import { CompanyDto } from "@features/company/adapter/dto/company.dto";

export class UserDto {
  @AutoMap()
  readonly id: string;

  @AutoMap()
  readonly firstName: string;

  @AutoMap()
  readonly lastName: string;

  @AutoMap()
  readonly companyId: string;

  @AutoMap()
  readonly company: CompanyDto;
}
