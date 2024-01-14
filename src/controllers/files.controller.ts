import {inject} from '@loopback/core'
import { model, property, repository } from '@loopback/repository'
import {get, getModelSchemaRef, param, post, put, requestBody} from '@loopback/rest'
import {Files} from '../models'
import { FilesRepository } from '../repositories'

@model()
export class bodyCreateFiles {
  @property.array(Files)
  files: Files[]
}

export class FilesController {
  constructor(
    @repository(FilesRepository)
    private filesRepository: FilesRepository,
  ) {
  }

  

  @get('/files')
  async getFilesAll(
    @param.query.string('name') name?: string,
  ): Promise<any> {
    try {
      // return await this.FilesService.getFilesAll(name)
      // const filter = (name) ? {'name': name} : {}
      return await this.filesRepository.find({})
    } catch (error) {
      throw error
    }
  }

  @post('/files')
  async postFilesAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(bodyCreateFiles),
        },
      },
    })
    reqBody: bodyCreateFiles,
  ): Promise<string> {
    try {
      // return await this.filesRepository.postFilesAll(reqBody)
      await this.filesRepository.createAll(reqBody.files)
      return 'created success'
    } catch (error) {
      throw error
    }
  }

  // @put('/files')
  // async putFilesAll(): Promise<string> {
  //   try {
  //     return await this.FilesService.updateFilesAll()
  //   } catch (error) {
  //     throw error
  //   }
  // }

  // @get('/files/aggregate')
  // async getAggregateFiles(
  //   @param.query.string('name') name?: string,
  // ): Promise<Files[]> {
  //   try {
  //     return await this.FilesService.getAggregateFiles(name)
  //   } catch (error) {
  //     throw error
  //   }
  // }


}
