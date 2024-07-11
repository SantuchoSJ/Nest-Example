/* Repository */
import { GenericAbstractRepository } from "@repository/generic.abstract.repository";

/* Features */
import { User } from "@features/user/domain/user.entity";

export abstract class UserInterfaceRepository extends GenericAbstractRepository<User> {}
