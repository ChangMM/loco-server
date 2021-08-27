import { PermissionRepository } from '@generated/permission/permission.repository'
import { RolePermissionRepository } from '@generated/role-permission/role-permission.repository'
import { Injectable } from '@tiejs/common'
import DataLoader from 'dataloader'
import { In } from 'typeorm'
import { uniq } from 'lodash'

@Injectable()
export class RoleService {
  constructor(
    private rolePermissionRepository: RolePermissionRepository,
    private permissionRepository: PermissionRepository,
  ) {}

  /**
   * 获取角色权限
   */
  permissionsLoader = new DataLoader<number, any>((keys) => {
    this.permissionsLoader.clearAll()
    return new Promise((resolve, reject) => {
      this.rolePermissionRepository
        .find({ roleId: In(uniq(keys)) })
        .then((rolePermissions) => {
          const permissionIds = rolePermissions.map((i) => i.permissionId)

          this.permissionRepository
            .find({ id: In(uniq(permissionIds)) })
            .then((permissions) => {
              const data = keys
                .map((key) => {
                  //  permissionId 分组
                  return rolePermissions.filter((i) => i.roleId === key).map((i) => i.permissionId)
                })
                .map((permissionIds) => {
                  // permission 分组
                  return permissions.filter((i) => permissionIds.includes(i.id))
                })
              resolve(data)
            })

            .catch((e) => {
              reject(e)
            })
        })
        .catch((e) => {
          reject(e)
        })
    })
  })
}
