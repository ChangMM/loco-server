import { CollaboratorRepository } from '@generated/collaborator/collaborator.repository'
import { Collaborator } from '@generated/entities'
import { Injectable } from '@tiejs/common'

@Injectable()
export class CollaboratorService {
  constructor(private collaboratorRepository: CollaboratorRepository) {}

  async getCollaboratorByUserId(userId: number): Promise<Collaborator> {
    return await this.collaboratorRepository.findOneOrFail({ userId })
  }
}
