import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import { BaseCrudRepository } from '../models';
import { Files, FilesRelations } from '../models/files.model';
export class FilesRepository extends BaseCrudRepository<
  Files,
  typeof Files.prototype.id,
  FilesRelations
> {
  constructor(
    @inject('datasources.mongoconnect')
    dataSource: juggler.DataSource,
  ) {
    super(Files, dataSource);
  }
}
