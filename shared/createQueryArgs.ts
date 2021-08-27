import { Field, ArgsType, Int } from 'type-graphql'
import { IsNumber, IsString } from 'class-validator'

/**
 * 创建列表筛选条件
 * @param WhereInput 数据库 where
 * @param orderBys 排序，eg: id_DESC、gender_ASC
 */
export function createQueryArgs(WhereInput: any) {
  @ArgsType()
  abstract class QueryArgs {
    @Field(() => Int, { defaultValue: 0, description: '跳过元素个数', nullable: true })
    @IsNumber()
    skip?: number

    @Field(() => Int, { defaultValue: 30, description: '正向查找条数', nullable: true })
    @IsNumber()
    first?: number

    @Field(() => Int, { defaultValue: 10, description: '逆向查找条数(暂未支持)', nullable: true })
    @IsNumber()
    last?: number

    @Field({ description: '游标(暂未支持)', nullable: true })
    @IsString()
    before?: string

    @Field({ description: '游标(暂未支持)', nullable: true })
    @IsString()
    after?: string

    @Field(() => WhereInput, { description: '筛选条件', nullable: true })
    where: any

    @Field({ description: '排序类型, 例如：id_ASC、id_DESC', nullable: true })
    orderBy?: string
  }

  return QueryArgs
}
