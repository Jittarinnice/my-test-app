import {BootMixin} from '@loopback/boot'
import {ApplicationConfig} from '@loopback/core'
import {RepositoryMixin} from '@loopback/repository'
import {RestApplication} from '@loopback/rest'
import {ServiceMixin} from '@loopback/service-proxy'

export class BaseApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options)
  }
}
