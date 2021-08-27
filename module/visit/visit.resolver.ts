import { Arg, Mutation, Resolver } from 'type-graphql'
import { VisitService } from './visit.service'
import { Visit } from '@generated/entities'
import { Transactional } from '@shared/als'
import { Injectable } from '@tiejs/common'
import { ModifyVisitInput } from './visit.input'

@Injectable()
@Resolver(() => Visit)
export class VisitResolver {
  constructor(private visitService: VisitService) {}

  @Mutation(() => Boolean, { description: '修改visit' })
  @Transactional()
  async modifyVisit(@Arg('input') input: ModifyVisitInput): Promise<boolean> {
    return await this.visitService.modifyVisit(input)
  }
}
