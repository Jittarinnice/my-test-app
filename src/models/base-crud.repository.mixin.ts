import {
  DataObject,
  DefaultCrudRepository,
  Entity,
  EntityNotFoundError,
  FilterExcludingWhere,
  juggler,
  Options,
} from '@loopback/repository'
import {CustomError} from '.'

export class BaseCrudRepository<
  T extends Entity,
  ID,
  Relations extends Object,
> extends DefaultCrudRepository<T, ID, Relations> {
  constructor(
    public entityClass: typeof Entity & {prototype: T},
    public dataSource: juggler.DataSource,
  ) {
    super(entityClass, dataSource)
  }

  public async findById(
    id: ID,
    filter?: FilterExcludingWhere<T>,
    options?: Options,
  ): Promise<T & Relations> {
    try {
      return await super.findById(id, filter, options)
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw this.notFoundError(id)
      }
      throw error
    }
  }

  public async updateById(
    id: ID,
    data: DataObject<T>,
    options?: Options,
  ): Promise<void> {
    try {
      return await super.updateById(id, data, options)
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw this.notFoundError(id)
      }
      throw error
    }
  }
  public async replaceById(
    id: ID,
    data: DataObject<T>,
    options?: Options,
  ): Promise<void> {
    try {
      return await super.replaceById(id, data, options)
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw this.notFoundError(id)
      }
      throw error
    }
  }
  public async deleteById(id: ID, options?: Options): Promise<void> {
    try {
      return await super.deleteById(id, options)
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw this.notFoundError(id)
      }
      throw error
    }
  }

  private notFoundError(id: ID): CustomError {
    return new CustomError(
      `${this.entityClass.modelName} with id ${id} does not exist`,
      `${this.entityClass.name}NotFound`,
    )
  }
}
