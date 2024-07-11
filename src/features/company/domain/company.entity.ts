/* Dependencies */
import { Entity, Column, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

/* Features */
import { UuidEntity } from "@features/shared/domain/uuid.entity";
import { User } from "@features/user/domain/user.entity";

@Entity()
export class Company extends UuidEntity {
  @AutoMap()
  @Column({ type: "varchar", nullable: false })
  name: string;

  @AutoMap()
  @OneToMany(() => User, (user) => user.company)
  users: User[];
}
