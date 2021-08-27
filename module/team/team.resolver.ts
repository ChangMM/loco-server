import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { TeamService } from './team.service'
import { Team } from '@generated/entities'
import { TokenUserId } from '@shared/decorators/TokenUserId'
import { AddTeamInput } from './team.input'
import { Transactional } from '@shared/als'
import { Injectable } from '@tiejs/common'

@Injectable()
@Resolver(() => Team)
export class TeamResolver {
  constructor(private teamService: TeamService) {}

  @Query(() => [Team], { description: '获取自己拥有的团队' })
  @Transactional()
  async ownedTeams(@TokenUserId() userId: number): Promise<Team[]> {
    console.log('userId:', userId)
    return await this.teamService.getOwnedTeams(userId)
  }

  @Mutation(() => Team, { description: '新增团队' })
  @Transactional()
  async addTeam(@Arg('input') input: AddTeamInput, @TokenUserId() userId: number): Promise<Team> {
    return await this.teamService.addTeam(input, userId)
  }
}
