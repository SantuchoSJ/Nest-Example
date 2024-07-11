/* Dependencies */
import { Generated, PrimaryColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";

export abstract class UuidEntity {
  @AutoMap()
  @PrimaryColumn({ type: "uuid" })
  @Generated("uuid")
  id: string;
}
