/* Dependencies */
import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @AutoMap()
  @ApiProperty({ required: true })
  @IsString()
  @Length(2, 100)
  @IsNotEmpty()
  readonly firstName: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsString()
  @Length(2, 100)
  @IsNotEmpty()
  readonly lastName: string;
}
