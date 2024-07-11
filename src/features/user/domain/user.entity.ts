/* Dependencies */
import { Entity, Column, RelationId, ManyToOne, JoinColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";

/* Features */
import { UuidEntity } from "@features/shared/domain/uuid.entity";
import { Company } from "@features/company/domain/company.entity";

@Entity()
export class User extends UuidEntity {
  @AutoMap()
  @Column()
  firstName: string;

  @AutoMap()
  @Column()
  lastName: string;

  @AutoMap()
  @RelationId((user: User) => user.company)
  @Column({ type: "uuid", nullable: true })
  companyId: string;

  @AutoMap()
  @ManyToOne(() => Company, (company) => company.id, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "companyId" })
  company: Company;
}
