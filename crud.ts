import path from 'path'
import { generateCrud, generateEntityClass } from './shared/tie-graphql-crud'
import fs from 'fs-extra'

const dir = path.resolve(process.cwd(), 'generated')

if (fs.existsSync(dir)) fs.removeSync(dir)

async function init() {
  await generateCrud({
    Cell: {},

    Member: {
      relations: [
        {
          methodName: 'user',
          targetEntity: 'user',
          type: 'OneToOne',
          selfKey: 'userId',
          targetKey: 'id',
        },
        {
          methodName: 'role',
          targetEntity: 'role',
          type: 'OneToOne',
          selfKey: 'roleId',
          targetKey: 'id',
        },
      ],
    },
    Collaborator: {
      relations: [
        {
          methodName: 'user',
          targetEntity: 'user',
          type: 'OneToOne',
          selfKey: 'userId',
          targetKey: 'id',
        },
      ],
    },
    Column: {
      relations: [
        {
          methodName: 'options',
          targetEntity: 'option',
          type: 'OneToMany',
          selfKey: 'id',
          targetKey: 'columnId',
        },
      ],
    },
    Comment: {},
    Feedback: {},
    Option: {
      sorts: [{ field: 'sortBaseColumn', baseOn: 'column' }],
    },
    Permission: {},
    Role: {
      relations: [
        {
          methodName: 'rolePermissions',
          targetEntity: 'role-permission',
          type: 'OneToMany',
          selfKey: 'id',
          targetKey: 'roleId',
        },
      ],
    },
    RolePermission: {
      relations: [
        {
          methodName: 'permission',
          targetEntity: 'permission',
          type: 'OneToOne',
          selfKey: 'permissionId',
          targetKey: 'id',
        },
      ],
    },
    Row: {
      sorts: [{ field: 'sortBaseTable', baseOn: 'table' }],
      relations: [
        {
          methodName: 'cells',
          targetEntity: 'cell',
          type: 'OneToMany',
          selfKey: 'id',
          targetKey: 'rowId',
        },
      ],
    },
    Team: {
      relations: [
        {
          methodName: 'members',
          targetEntity: 'member',
          type: 'OneToMany',
          selfKey: 'id',
          targetKey: 'teamId',
        },
        {
          methodName: 'tables',
          targetEntity: 'table',
          type: 'OneToMany',
          selfKey: 'id',
          targetKey: 'teamId',
        },
        {
          methodName: 'invitationTokens',
          targetEntity: 'invitation-token',
          type: 'OneToMany',
          selfKey: 'id',
          targetKey: 'teamId',
        },
      ],
    },
    InvitationToken: {},
    Table: {
      sorts: [{ field: 'sortBaseTeam', baseOn: 'team' }],
      relations: [
        {
          methodName: 'team',
          targetEntity: 'team',
          type: 'OneToOne',
          selfKey: 'teamId',
          targetKey: 'id',
        },
        {
          methodName: 'views',
          targetEntity: 'view',
          type: 'OneToMany',
          selfKey: 'id',
          targetKey: 'tableId',
          joinFindOption: {
            order: { sortBaseTable: 'ASC' },
          },
        },

        {
          methodName: 'viewColumns',
          targetEntity: 'view-column',
          type: 'OneToMany',
          selfKey: 'id',
          targetKey: 'tableId',
          joinFindOption: {
            order: { sortBaseView: 'ASC' },
          },
        },
        {
          methodName: 'rows',
          targetEntity: 'row',
          type: 'OneToMany',
          selfKey: 'id',
          targetKey: 'tableId',
          joinFindOption: {
            order: { sortBaseTable: 'ASC' },
          },
        },
        {
          methodName: 'versionedRows',
          targetEntity: 'versioned-row',
          type: 'OneToMany',
          selfKey: 'id',
          targetKey: 'tableId',
          joinFindOption: {
            order: { sortBaseTable: 'ASC' },
          },
        },
        {
          methodName: 'columns',
          targetEntity: 'column',
          type: 'OneToMany',
          selfKey: 'id',
          targetKey: 'tableId',
        },
        {
          methodName: 'versionedColumns',
          targetEntity: 'versioned-column',
          type: 'OneToMany',
          selfKey: 'id',
          targetKey: 'tableId',
        },
      ],
    },
    User: {},
    Visit: {},
    Org: {},
    OrgUser: {},
    View: {
      sorts: [{ field: 'sortBaseTable', baseOn: 'table' }],
      relations: [
        {
          methodName: 'viewColumns',
          targetEntity: 'view-column',
          type: 'OneToMany',
          selfKey: 'id',
          targetKey: 'viewId',
          joinFindOption: {
            order: { sortBaseView: 'ASC' },
          },
        },
        {
          methodName: 'sorts',
          targetEntity: 'sort',
          type: 'OneToMany',
          selfKey: 'id',
          targetKey: 'viewId',
          joinFindOption: {
            order: { sortBaseView: 'ASC' },
          },
        },
        {
          methodName: 'groups',
          targetEntity: 'group',
          type: 'OneToMany',
          selfKey: 'id',
          targetKey: 'viewId',
          joinFindOption: {
            order: { sortBaseView: 'ASC' },
          },
        },
        {
          methodName: 'filters',
          targetEntity: 'filter',
          type: 'OneToMany',
          selfKey: 'id',
          targetKey: 'viewId',
          joinFindOption: {
            order: { sortBaseView: 'ASC' },
          },
        },
      ],
    },
    Sort: {
      sorts: [{ field: 'sortBaseView', baseOn: 'view' }],
    },
    Group: {
      sorts: [{ field: 'sortBaseView', baseOn: 'view' }],
    },
    Filter: {
      sorts: [{ field: 'sortBaseView', baseOn: 'view' }],
    },
    ViewColumn: {
      sorts: [{ field: 'sortBaseView', baseOn: 'view' }],
      relations: [
        {
          methodName: 'column',
          targetEntity: 'column',
          type: 'OneToOne',
          selfKey: 'columnId',
          targetKey: 'id',
        },
      ],
    },

    Version: {
      sorts: [{ field: 'sortBaseTable', baseOn: 'table' }],
    },
    VersionedCell: {},
    VersionedRow: {
      sorts: [{ field: 'sortBaseTable', baseOn: 'table' }],
      relations: [
        {
          methodName: 'cells',
          targetEntity: 'versioned-cell',
          type: 'OneToMany',
          selfKey: 'id',
          targetKey: 'rowId',
          joinFindOption: {
            where: {
              versionId: '__self.versionId',
            },
          },
        },
      ],
    },
    VersionedColumn: {},
    VersionedOption: {},
  })
  generateEntityClass()
}

init()
