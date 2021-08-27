import { Event, On } from '@tiejs/event'

@Event()
export class AuthEvent {
  @On('RegisterSuccess', { description: 'Github注册成功' })
  // async register(user: User) {
  async register() {}

  @On('LoginSuccess', { description: 'Github登录成功' })
  // async login(user: User) {
  async login() {}
}
