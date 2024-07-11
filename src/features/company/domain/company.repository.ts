/* Dependencies */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

/* Features */
import { CompanyInterfaceRepository } from "@features/company/domain/company.interface.repository";
import { Company } from "@features/company/domain/company.entity";

/* Repository */
import { GenericRepository } from "@repository/generic.repository";

@Injectable()
export class CompanyRepository
  extends GenericRepository<Company>
  implements CompanyInterfaceRepository
{
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<Company>
  ) {
    super(repository);
  }
}
