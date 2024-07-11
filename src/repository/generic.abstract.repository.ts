/* Dependencies */
import {
  DeepPartial,
  FindManyOptions,
  ObjectLiteral,
  Repository,
} from "typeorm";

// For SQL
export abstract class GenericAbstractRepository<T extends ObjectLiteral> {
  readonly entity: Repository<T>;

  abstract create(data: DeepPartial<T>): T;

  abstract findOneById(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
  abstract find(options: FindManyOptions<T>): Promise<T[]>;
  // abstract findOneOrFail(options: FindOneOptions<T>): Promise<T>;

  abstract delete(id: string): Promise<void>;
  // abstract update(id: string, dto: DeepPartial<T>): Promise<T | null>;
}

// For NoSQL
// import { FilterQuery, Model, UpdateWriteOpResult } from "mongoose";
//
// export abstract class GenericAbstractRepository<T> {
//   readonly entity: Model<T>;
//
//   abstract findAll(): Promise<T[]>;
//   abstract find(filter: FilterQuery<T>): Promise<T[]>;
//   abstract findOne(id: string): Promise<T | null>;
//   abstract create(entity: T): Promise<T>;
//   abstract delete(id: string, active: boolean): Promise<T | null>;
//   abstract update(id: string, dto: Partial<T>): Promise<T | null>;
//   abstract updateMany(
//     filter: FilterQuery<T>,
//     dto: Partial<T>
//   ): Promise<UpdateWriteOpResult>;
// }
