/* Dependencies */
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from "typeorm";

/* Features */
import { UuidEntity } from "@features/shared/domain/uuid.entity";

/* Repository */
import { GenericAbstractRepository } from "@repository/generic.abstract.repository";

export class GenericRepository<T extends UuidEntity>
  implements GenericAbstractRepository<T>
{
  readonly entity: Repository<T>;

  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  create(data: DeepPartial<T>): T {
    return this.entity.create(data);
  }

  async findOneById(id: string): Promise<T | null> {
    return this.entity.findOneBy({ id } as unknown as FindOptionsWhere<T>);
  }

  async findAll(): Promise<T[]> {
    return this.entity.find();
  }

  async find(options: FindManyOptions<T>): Promise<T[]> {
    return this.entity.find(options);
  }

  // async findOneOrFail(options: FindOneOptions<T>): Promise<T> {
  //   const entity = await this.entity.findOne(options);
  //   if (entity) return entity;
  //   throw new EntityNotFoundException(this.entity.metadata.tableName);
  // }

  async delete(id: string): Promise<void> {
    await this.entity.delete(id);
  }

  // async update(id: string, dto: DeepPartial<T>): Promise<T> {
  //   const entity = await this.findOneOrFail({
  //     where: { id: id },
  //   } as FindOneOptions<T>);
  //   return this.entity.save({ ...entity, ...dto });
  // }
}

// NoSQL
// import {
//   FilterQuery,
//   Model,
//   Document as MongooseDocument,
//   UpdateQuery,
//   UpdateWriteOpResult,
// } from "mongoose";
// import { GenericAbstractRepository } from "./generic.abstract.repository";
//
// export abstract class GenericRepository<T extends MongooseDocument>
//   implements GenericAbstractRepository<T>
// {
//   readonly entity: Model<T>;
//
//   protected constructor(entity: Model<T>) {
//     this.entity = entity;
//   }
//
//   async findAll(): Promise<T[]> {
//     return this.entity.find();
//   }
//
//   async find(filter: FilterQuery<T>): Promise<T[]> {
//     return this.entity.find(filter);
//   }
//
//   async findOne(id: string): Promise<T | null> {
//     return this.entity.findOne({ _id: id } as FilterQuery<T>);
//   }
//
//   async create(entity: T): Promise<T> {
//     const newEntity = new this.entity(entity);
//     return newEntity.save();
//   }
//
//   async delete(id: string, active: boolean): Promise<T | null> {
//     return this.entity.findByIdAndUpdate(id, { active: active }, { new: true });
//   }
//
//   async deleteMany(id: string, active: boolean): Promise<T | null> {
//     return this.entity.findByIdAndUpdate(id, { active: active }, { new: true });
//   }
//
//   async update(id: string, dto: Partial<T>): Promise<T | null> {
//     const updateQuery: UpdateQuery<T> = { $set: dto };
//     return this.entity.findByIdAndUpdate(id, updateQuery, { new: true });
//   }
// }
