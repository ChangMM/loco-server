import { Controller, Get } from '@tiejs/controller'

@Controller()
export class UserController {
  constructor() {}
  @Get('/')
  index() {
    return 'foo'
  }

}
