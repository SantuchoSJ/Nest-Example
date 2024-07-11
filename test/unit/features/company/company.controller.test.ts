/* Dependencies */
import { Test } from "@nestjs/testing";

/* Features */
import { CompanyMapping } from "@features/company/adapter/company.mapping";
import { CompanyInterfaceRepository } from "@features/company/domain/company.interface.repository";
import { CompanyExtController } from "@features/company/adapter/company.controller";
import { CompanyProfile } from "@features/company/adapter/company.profile";
import { CompanyService } from "@features/company/application/company.service";

/* Config */
import { MapperModule } from "@config/automapper/automapper.module";

class MockCompanyRepository {
  findAll() {}
}
describe("CompanyExtController", () => {
  let companyExtController: CompanyExtController;
  let companyInterfaceRepository: CompanyInterfaceRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MapperModule],
      controllers: [CompanyExtController],
      providers: [
        {
          provide: CompanyInterfaceRepository,
          useClass: MockCompanyRepository,
        },
        CompanyProfile,
        CompanyService,
        CompanyMapping,
      ],
    }).compile();

    companyInterfaceRepository = moduleRef.get(CompanyInterfaceRepository);
    companyExtController = moduleRef.get(CompanyExtController);
  });

  it("Should return without filters", async () => {
    const spy = jest
      .spyOn(companyInterfaceRepository, "findAll")
      .mockResolvedValue([]);
    const result = await companyExtController.getAll();
    expect(spy).toHaveBeenCalledWith();
    expect(result.data).toHaveLength(0);
    spy.mockRestore();
  });
});
