import { Arg, Mutation, Resolver } from 'type-graphql'
import { Member } from '@generated/entities'
import { MemberService } from './member.service'
import {
  AddMemberInput,
  ExitTeamInput,
  ModifyMemberRoleTypeInput,
  RemoveMemberInput,
} from './member.input'
import { Transactional } from '@shared/als'
import { Injectable } from '@tiejs/common'

@Injectable()
@Resolver(() => Member)
export class MemberResolver {
  constructor(private memberService: MemberService) {}

  @Mutation(() => Member, { description: '添加成员' })
  @Transactional()
  async addMember(@Arg('input') input: AddMemberInput): Promise<Member> {
    return await this.memberService.addMember(input)
  }

  @Mutation(() => Boolean, { description: '修改角色类型' })
  async modifyMemberRoleType(@Arg('input') input: ModifyMemberRoleTypeInput): Promise<boolean> {
    return await this.memberService.modifyMemberRoleType(input)
  }

  @Mutation(() => Boolean, { description: '删除成员，只有管理员以上才能操作' })
  async removeMember(@Arg('input') input: RemoveMemberInput): Promise<boolean> {
    return await this.memberService.removeMember(input)
  }

  @Mutation(() => Boolean, { description: '退出团队' })
  async exitTeam(@Arg('input') input: ExitTeamInput): Promise<boolean> {
    return await this.memberService.exitTeam(input)
  }
}
