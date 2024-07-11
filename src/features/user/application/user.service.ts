/* Dependencies */
import { Injectable } from "@nestjs/common";
import { FindOptionsWhere } from "typeorm";

/* Features */
import { User } from "@features/user/domain/user.entity";
import { UserInterfaceRepository } from "@features/user/domain/user.interface.repository";
import { FilterUserDto } from "@features/user/adapter/dto/request/filter.user.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserInterfaceRepository) {}

  /**
   * Retrieves a list of users based on the provided filter criteria.
   * @param {FilterUserDto} query - The filter criteria for querying users.
   * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
   */
  async getAll(query: FilterUserDto): Promise<User[]> {
    const where: FindOptionsWhere<User> = Object.keys(query).length
      ? { ...query }
      : {};
    return this.userRepository.find({
      relations: { company: true },
      where,
    });
  }
}
