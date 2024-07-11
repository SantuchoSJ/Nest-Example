/* Dependencies */
import { Mapper } from "@automapper/types";
import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";

/* Features */
import { User } from "@features/user/domain/user.entity";
import { UserDto } from "@features/user/adapter/dto/user.dto";

@Injectable()
export class UserMapping {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  getUserDto(dto: User): UserDto {
    return this.mapper.map(dto, User, UserDto);
  }

  getManyUsersDto(dto: User[]): UserDto[] {
    return dto.map((d) => this.getUserDto(d));
  }
}
