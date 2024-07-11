/* Dependencies */
import { Injectable } from "@nestjs/common";

/* Features */
import { Company } from "@features/company/domain/company.entity";
import { CompanyInterfaceRepository } from "@features/company/domain/company.interface.repository";

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyInterfaceRepository) {}

  async getAll(): Promise<Company[]> {
    return this.companyRepository.findAll();
  }
}
