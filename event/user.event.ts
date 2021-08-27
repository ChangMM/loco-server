import { Event, On } from '@tiejs/event'
// import { UserRelationService } from '@module/user-relation/user-relation.service'

@Event()
export class UserEvent {
  // constructor(private userRelationService: UserRelationService) {}

  @On('RegisterByEmailSuccess', { description: '邮箱注册成功' })
  // async register(userId: number) {
  async register() {
    // this.userRelationService.initUserRelations(userId)
  }

  @On('LoginByEmailSuccess', { description: '邮箱登录成功' })
  async login(userId: number) {
    console.log('userId:', userId)
  }
}
