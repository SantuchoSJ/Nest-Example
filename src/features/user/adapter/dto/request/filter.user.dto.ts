import { AutoMap } from "@automapper/classes";
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FilterUserDto {
  @AutoMap()
  @ApiProperty({ required: false })
  @IsString()
  readonly firstName: string;
}
