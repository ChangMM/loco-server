import { Role } from '@generated/entities'
import { RoleRepository } from '@generated/role/role.repository'
import { Injectable, IPlugin } from '@tiejs/common'
import { Container } from '@tiejs/common'

@Injectable()
export default class DbInitPlugin implements IPlugin {
  // 服务器启动后
  async serverDidReady() {
    const roleRepository = Container.get(RoleRepository)
    const count = await roleRepository.count()

    if (count > 0) return

    /** 如果没有 role 数据，那就初始化 */
    const roles = [
      {
        name: 'Owner',
        alias: '所有者',
        desc: '拥有所有权限',
      },
      {
        name: 'Admin',
        alias: '管理员',
        desc: '可以管理',
      },
      {
        name: 'Editor',
        alias: '编辑者',
        desc: '可以编辑表格',
      },
      {
        name: 'Commenter',
        alias: '评论者',
        desc: '可以评论',
      },
      {
        name: 'Reader',
        alias: '阅读者',
        desc: '只读',
      },
    ]

    await roleRepository.save(roles.map((i) => i as Role))
  }
}
