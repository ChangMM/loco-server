import { Controller, Get } from '@tiejs/controller'

@Controller()
export class HomeController {
  @Get(['/', '/login', '/register', '/dashboard', '/dashboard/(.*)', '/t/(.*)', '/account/(.*)'])
  // @Render('index')
  index() {
    return {
      hello: 'hello world!',
    }
  }
}
