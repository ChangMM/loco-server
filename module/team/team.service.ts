import { Team, Member, InvitationToken, User } from '@generated/entities'
import { Injectable } from '@tiejs/common'
import { In } from 'typeorm'
import { nanoid } from 'nanoid'
import { AddTeamInput } from './team.input'
import { useRepositories } from '@shared/als'

@Injectable()
export class TeamService {
  constructor() {}
  async initTeamDataForNewUser(user: User): Promise<Team> {
    const repos = useRepositories()
    const { id: userId } = user
    const team = await repos.teamRepository.save({
      id: nanoid(),
      creatorId: userId,
      ownerId: userId,
      slug: nanoid(),
      isPersonal: true,
      name: `${user.nickname}的团队`,
    } as Team)

    await repos.memberRepository.save({
      id: nanoid(),
      teamId: team.id,
      userId,
      roleId: 1,
    } as Member)
    return team
  }

  async getOwnedTeams(userId: number): Promise<Team[]> {
    const repos = useRepositories()
    const members = await repos.memberRepository.find({ userId })
    const teamIds = members.map((i) => i.teamId)
    const teams = await repos.teamRepository.find({ id: In(teamIds) })
    return teams
  }

  async addTeam(params: AddTeamInput, userId: number): Promise<Team> {
    const repos = useRepositories()

    const [team, roles] = await Promise.all([
      repos.teamRepository.save({
        id: nanoid(),
        slug: nanoid(),
        creatorId: userId,
        ownerId: userId,
        ...params,
      } as Team),
      repos.roleRepository.find(),
    ])

    const invitationTokens = roles.map(
      (role) =>
        ({
          teamId: team.id,
          roleType: role.name,
          token: nanoid(),
        } as InvitationToken),
    )

    await Promise.all([
      repos.memberRepository.save({
        id: nanoid(),
        roleId: 1,
        teamId: team.id,
        userId,
      } as Member),
      repos.invitationTokenRepository.save(invitationTokens),
    ])

    return team
  }
}
