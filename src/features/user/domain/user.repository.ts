/* Dependencies */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

/* Features */
import { UserInterfaceRepository } from "@features/user/domain/user.interface.repository";
import { User } from "@features/user/domain/user.entity";

/* Repository */
import { GenericRepository } from "@repository/generic.repository";

@Injectable()
export class UserRepository
  extends GenericRepository<User>
  implements UserInterfaceRepository
{
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {
    super(repository);
  }
}
