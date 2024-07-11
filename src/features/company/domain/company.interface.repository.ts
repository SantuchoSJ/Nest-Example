/* Repository */
import { GenericAbstractRepository } from "@repository/generic.abstract.repository";

/* Features */
import { Company } from "@features/company/domain/company.entity";

export abstract class CompanyInterfaceRepository extends GenericAbstractRepository<Company> {}
