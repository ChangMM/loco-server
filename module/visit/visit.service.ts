import { useRepositories } from '@shared/als'
import { Injectable } from '@tiejs/common'
import { ModifyVisitInput } from './visit.input'

@Injectable()
export class VisitService {
  constructor() {}

  async modifyVisit(input: ModifyVisitInput): Promise<boolean> {
    const repos = useRepositories()
    if (input.viewId) {
      const view = await repos.visitRepository.findOneOrFail(input.id)
      await repos.visitRepository.update(input.id, { ...input, viewType: view.viewType })
    }
    await repos.visitRepository.update(input.id, input)

    return true
  }
}
