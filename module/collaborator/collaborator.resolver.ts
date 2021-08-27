import { Resolver } from 'type-graphql'
import { Collaborator } from '@generated/entities'
import { Injectable } from '@tiejs/common'

@Injectable()
@Resolver(() => Collaborator)
export class CollaboratorResolver {}
