import {inject} from '@loopback/core'
import { model, property, repository } from '@loopback/repository'
import {get, getModelSchemaRef, HttpErrors, param, post, put, requestBody} from '@loopback/rest'
import {Files} from '../models'
import { FilesRepository } from '../repositories'

"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
    pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
  },
});
@model()
export class bodyCreateFiles {
  @property.array(Files)
  files: Files[]
  @property.array("string")
  emails: string[]
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
      if ((reqBody.emails === undefined) || (reqBody.emails.length === 0)) {
        // throw ThrowMessage("email not found")
        throw new HttpErrors.InternalServerError("email not found")
      }

      // insert in mongodb
      await this.filesRepository.createAll(reqBody.files)
      console.log('created in mongodb')

      // fix current from email
      const fixEmail = 'Email@YOURDOMAIN.COM'
      for (const currentEmail of reqBody.emails) {
        await transporter.sendMail({
          from: fixEmail, // sender address
          to: currentEmail, // list of receivers
          subject: "test email notification", // Subject line
          text: "email notification. Following concerns", // plain text body
          html: "<b>email notification. Following concerns</b>", // html body
        });
      }
      console.log('send email')

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
