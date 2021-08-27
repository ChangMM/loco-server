import { Arg, Mutation, Resolver } from 'type-graphql'
import { View } from '@module/view/view.entity'
import { AddViewInput, RemoveViewInput } from './view.input'
import { ViewService } from './view.service'
import { Transactional, withTransaction } from '@shared/als'
import { Injectable } from '@tiejs/common'

@Injectable()
@Resolver(() => View)
export class ViewResolver {
  constructor(private viewService: ViewService) {}

  @Mutation(() => View, { description: '新增视图' })
  @Transactional()
  async addView(@Arg('input') input: AddViewInput): Promise<View> {
    return await withTransaction(async () => {
      return await this.viewService.addView(input)
    })
  }

  @Mutation(() => Boolean, { description: '删除视图' })
  @Transactional()
  async removeView(@Arg('input') input: RemoveViewInput): Promise<boolean> {
    return await this.viewService.removeView(input)
  }
}
