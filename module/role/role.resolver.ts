import { Resolver, FieldResolver, Root } from 'type-graphql'
import { RoleService } from './role.service'
import { Permission, Role } from '@generated/entities'
import { Injectable } from '@tiejs/common'

@Injectable()
@Resolver(() => Role)
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  @FieldResolver(() => [Permission], { description: '该角色的权限' })
  async permissions(@Root() role: Role): Promise<any> {
    return await this.roleService.permissionsLoader.load(role.id)
  }
}
