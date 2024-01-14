import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mongodb: {collection: "files"}
  }
})
export class Files extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  fileName?: string

  @property({
    type: 'string',
  })
  file?: string

  constructor(data?: Partial<Files>) {
    super(data);
  }
}

export interface FilesRelations {
  // describe navigational properties here
}