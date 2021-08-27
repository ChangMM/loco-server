import { Injectable } from '@tiejs/common'
import { Team, User } from '@generated/entities'
import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability'
import { Action } from '@shared/enum/action.enum'

type Subjects = typeof Team | typeof User | Team | User | 'all'

type ActionType = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Action, Subjects]>

@Injectable()
export class AbilityService {
  constructor() {}

  async createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[ActionType, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    )

    if (user.bio === 'admin') {
      can(Action.Manage, 'all') // read-write access to everything
    } else {
      can(Action.Read, 'all') // read-only access to everything
    }

    return build()
  }
}
