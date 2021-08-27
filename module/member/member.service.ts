import { MemberRepository } from '@generated/member/member.repository'
import { Member } from '@generated/entities'
import { Injectable } from '@tiejs/common'
import {
  AddMemberInput,
  ExitTeamInput,
  ModifyMemberRoleTypeInput,
  RemoveMemberInput,
} from './member.input'
import { useRepositories } from '@shared/als'
import { errors } from '@shared/errors'
import { nanoid } from 'nanoid'
import { RoleRepository } from '@generated/role/role.repository'

@Injectable()
export class MemberService {
  constructor(private memberRepository: MemberRepository, private roleRepository: RoleRepository) {}

  async getMemberByUserId(userId: number): Promise<Member> {
    return await this.memberRepository.findOneOrFail({ userId })
  }

  // 需要做校验
  async addMember(params: AddMemberInput): Promise<Member> {
    const repos = useRepositories()
    const { teamId, userId, roleType } = params

    const existMember = await repos.memberRepository.findOne({ teamId, userId })

    if (existMember) throw errors.MemberAlreadyExist

    const role = await repos.roleRepository.findOneOrFail({ name: roleType })

    const member = await repos.memberRepository.save({
      id: nanoid(),
      teamId,
      userId,
      roleId: role.id,
    } as Member)

    return member
  }

  async modifyMemberRoleType(input: ModifyMemberRoleTypeInput): Promise<boolean> {
    const role = await this.roleRepository.findOneOrFail({ name: input.roleType })
    await this.memberRepository.update(input.id, { roleId: role.id })
    return true
  }

  // TODO: 需要校验
  async removeMember({ id }: RemoveMemberInput): Promise<boolean> {
    await this.memberRepository.softDelete({ id })
    return true
  }

  // TODO: 需要校验
  async exitTeam({ id }: ExitTeamInput): Promise<boolean> {
    await this.memberRepository.softDelete({ id })
    return true
  }
}
