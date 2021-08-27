import { InvitationToken } from '@generated/entities'
import { InvitationTokenRepository } from '@generated/invitation-token/invitation-token.repository'
import { RoleRepository } from '@generated/role/role.repository'
import { Injectable } from '@tiejs/common'
import { nanoid } from 'nanoid'

@Injectable()
export class InvitationTokenService {
  constructor(
    private invitationTokenRepository: InvitationTokenRepository,
    private roleRepository: RoleRepository,
  ) {}
  async genInvitationToken(teamId: string) {
    if (!teamId) return false
    const roles = await this.roleRepository.find()
    const existTokens = await this.invitationTokenRepository.findOne({ teamId })

    // 不需要生成
    if (existTokens) return false

    const invitationTokens = roles.map<Partial<InvitationToken>>((role) => ({
      teamId,
      roleType: role.name,
      token: nanoid(),
    }))
    await this.invitationTokenRepository.save(invitationTokens)
    return true
  }
}
