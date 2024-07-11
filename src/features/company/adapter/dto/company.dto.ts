/* Dependencies */
import { AutoMap } from "@automapper/classes";

export class CompanyDto {
  @AutoMap()
  readonly id: string;

  @AutoMap()
  readonly name: string;
}
