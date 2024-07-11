/* Dependencies */
import { Test } from "@nestjs/testing";
import { FindManyOptions } from "typeorm";

/* Features */
import { UserExtController } from "@features/user/adapter/user.controller";
import { User } from "@features/user/domain/user.entity";
import { UserInterfaceRepository } from "@features/user/domain/user.interface.repository";
import { UserService } from "@features/user/application/user.service";
import { FilterUserDto } from "@features/user/adapter/dto/request/filter.user.dto";
import { UserMapping } from "@features/user/adapter/user.mapping";
import { UserProfile } from "@features/user/adapter/user.profile";
import { CompanyMapping } from "@features/company/adapter/company.mapping";

/* Config */
import { MapperModule } from "@config/automapper/automapper.module";

class MockUserRepository {
  private _options: FindManyOptions<User>;

  find(options: FindManyOptions<User>) {
    this._options = options;
  }
}
describe("UserExtController", () => {
  let userController: UserExtController;
  let userRepository: UserInterfaceRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MapperModule],
      controllers: [UserExtController],
      providers: [
        UserMapping,
        {
          provide: UserInterfaceRepository,
          useClass: MockUserRepository,
        },
        UserProfile,
        UserService,
        CompanyMapping,
      ],
    }).compile();

    userRepository = moduleRef.get(UserInterfaceRepository);
    userController = moduleRef.get(UserExtController);
  });

  it("Should return without filters", async () => {
    const spy = jest.spyOn(userRepository, "find").mockResolvedValue([]);
    const result = await userController.getAll({} as FilterUserDto);
    expect(spy).toHaveBeenCalledWith({
      relations: { company: true },
      where: {},
    });
    expect(result.data).toHaveLength(0);
    spy.mockRestore();
  });

  it("Should return with filters", async () => {
    const spy = jest.spyOn(userRepository, "find").mockResolvedValue([]);
    const result = await userController.getAll({
      firstName: "test",
    } as FilterUserDto);
    expect(spy).toHaveBeenCalledWith({
      relations: { company: true },
      where: { firstName: "test" },
    });
    expect(result.data).toHaveLength(0);
    spy.mockRestore();
  });
});
