import { Controller, Get, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

/* Features */
import { UserService } from "@features/user/application/user.service";
import { UserMapping } from "@features/user/adapter/user.mapping";
import { UserDto } from "@features/user/adapter/dto/user.dto";
import { FilterUserDto } from "@features/user/adapter/dto/request/filter.user.dto";
@ApiTags("ext/users")
@Controller({ version: "1", path: "users" })
export class UserExtController {
  constructor(
    private readonly userService: UserService,
    private readonly userMapping: UserMapping
  ) {}

  /**
   * Retrieves a list of users based on the provided filter criteria.
   * @function
   * @async
   * @param {FilterUserDto} query - The filter criteria for querying users.
   * @returns {Promise<{ data: UserDto[] }>} A promise that resolves to an object containing an array of UserDto objects.
   */
  @ApiResponse({
    status: 200,
    description: "Returns an object containing an array of data sources",
    type: [UserDto],
  })
  @Get()
  async getAll(@Query() query: FilterUserDto): Promise<{ data: UserDto[] }> {
    const users = await this.userService.getAll(query);
    return { data: this.userMapping.getManyUsersDto(users) };
  }
}
