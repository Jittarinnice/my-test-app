import {model, property, repository} from '@loopback/repository';
import {get, HttpErrors, param, post, requestBody} from '@loopback/rest';
import {Files} from '../models';
import {FilesRepository} from '../repositories';

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.forwardemail.net',
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM',
    pass: 'REPLACE-WITH-YOUR-GENERATED-PASSWORD',
  },
});
@model()
class BodyCreateFiles {
  @property.array(Files)
  files: Files[];
  @property()
  email: string;
}

export class FilesController {
  constructor(
    @repository(FilesRepository)
    private filesRepository: FilesRepository,
  ) {}

  @get('/files')
  async getFilesAll(
    @param.query.string('name') name?: string,
  ): Promise<Files[]> {
    // try {
    console.log('name ', name);
    // const filter = (name) ? {'name': name} : {}
    return this.filesRepository.find({});
    // } catch (error) {
    //   throw error
    // }
  }

  @post('/files')
  async postFilesAll(
    @requestBody({
      content: {
        'application/json': {},
      },
    })
    reqBody: BodyCreateFiles,
  ): Promise<string> {
    // try {
    if (reqBody.email === undefined) {
      // throw ThrowMessage("email not found")
      throw new HttpErrors.InternalServerError('email not found');
    }

    // insert in mongodb
    await this.filesRepository.createAll(reqBody.files);
    console.log('created in mongodb');

    // fix current from email
    const fixEmail = 'Email@YOURDOMAIN.COM';
    await transporter.sendMail({
      from: fixEmail, // sender address
      to: reqBody.email, // list of receivers
      subject: 'test email notification', // Subject line
      text: 'email notification. Following concerns', // plain text body
      html: '<b>email notification. Following concerns</b>', // html body
    });
    console.log('send email');

    return 'created success';
    // } catch (error) {
    //   throw error
    // }
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
