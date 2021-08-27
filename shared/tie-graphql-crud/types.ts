export const RelationType = {
  OneToMany: 'OneToMany',
  ManyToOne: 'ManyToOne',
  ManyToMany: 'ManyToMany',
  OneToOne: 'OneToOne',
}

export interface Relation {
  methodName: string
  type: keyof typeof RelationType
  selfKey: string //自身表的列名

  targetEntity: string // 关联的目标表
  targetKey: string //目标表的列名
  joinFindOption?: any //关联数据表的参数
}

export type CrudConfig = {
  [key: string]: Option
}

export interface Option {
  moduleDir?: string
  baseDirPath?: string
  // 对象关联关系
  relations?: Relation[]
  // 忽略某些端点
  excludes?: string[]
  sorts?: Array<{
    // 排序字段
    field: string

    // 排序基准
    baseOn?: string
  }>
}
