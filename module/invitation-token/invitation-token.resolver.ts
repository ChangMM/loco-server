import { Resolver, Mutation, Arg } from 'type-graphql'
import { InvitationTokenService } from './invitation-token.service'
import { InvitationToken } from '@generated/entities'
import { Injectable } from '@tiejs/common'

@Injectable()
@Resolver(() => InvitationToken)
export class InvitationTokenResolver {
  constructor(private invitationTokenService: InvitationTokenService) {}

  @Mutation(() => Boolean, { description: '手动初始化 invitation token，不在实际业务中使用' })
  async genInvitationToken(@Arg('teamId') teamId: string): Promise<boolean> {
    return await this.invitationTokenService.genInvitationToken(teamId)
  }
}
