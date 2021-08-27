import { Team } from '@module/team/team.entity'
import {
  Member,
  User,
  Table,
  View,
  Column,
  ViewColumn,
  Row,
  Cell,
  Option,
  Role,
  InvitationToken,
  Version,
  VersionedColumn,
  VersionedRow,
  VersionedCell,
  VersionedOption,
  Visit,
} from '@generated/entities'
import { Context, Container } from '@tiejs/common'
import { AsyncLocalStorage } from 'async_hooks'
import { createMethodDecorator } from 'type-graphql'
import { getConnection, QueryRunner } from 'typeorm'
import { ReqUtil } from './util/req.util'

interface HeaderParams {
  teamId: string
  tableId: string
  viewId: string
}

export const als = new AsyncLocalStorage()

export function useUserId() {
  const ctx = useContext()
  const reqUtil = Container.get(ReqUtil)
  const token = reqUtil.getToken(ctx)
  const { uid } = reqUtil.verify(token)
  return uid
}

export function useHeaderParams(): HeaderParams {
  const ctx = useContext()
  const teamId = ctx.get('x-team-id')
  const tableId = ctx.get('x-table-id')
  const viewId = ctx.get('x-view-id')
  return { teamId, tableId, viewId }
}

export function useContext(): Context {
  const store: Map<string, any> = als.getStore() as any
  return store.get('ctx')
}

export function useHeaders<T = any>(): T {
  const ctx = useContext()
  return ctx.headers as any
}

export function useBody<T = any>(): T {
  const ctx = useContext()
  return ctx.request.body
}

export function useQuery<T = any>(): T {
  const ctx = useContext()
  return ctx.request.query as any
}

export function useQueryRunner(): QueryRunner {
  const store = als.getStore() as any
  return store.get('queryRunner')
}

export function useRepositories() {
  const qr = useQueryRunner()

  return {
    teamRepository: qr.manager.getRepository(Team),
    invitationTokenRepository: qr.manager.getRepository(InvitationToken),
    memberRepository: qr.manager.getRepository(Member),
    roleRepository: qr.manager.getRepository(Role),
    userRepository: qr.manager.getRepository(User),
    visitRepository: qr.manager.getRepository(Visit),
    tableRepository: qr.manager.getRepository(Table),
    viewRepository: qr.manager.getRepository(View),
    viewColumnRepository: qr.manager.getRepository(ViewColumn),
    columnRepository: qr.manager.getRepository(Column),
    rowRepository: qr.manager.getRepository(Row),
    cellRepository: qr.manager.getRepository(Cell),
    optionRepository: qr.manager.getRepository(Option),
    versionRepository: qr.manager.getRepository(Version),
    versionedColumnRepository: qr.manager.getRepository(VersionedColumn),
    versionedRowRepository: qr.manager.getRepository(VersionedRow),
    versionedCellRepository: qr.manager.getRepository(VersionedCell),
    versionedOptionRepository: qr.manager.getRepository(VersionedOption),
  }
}

export function Transactional() {
  return createMethodDecorator(async ({}, next) => {
    const store = als.getStore() as any

    const connection = getConnection()
    const queryRunner = connection.createQueryRunner()
    await queryRunner.connect()

    store.set('queryRunner', queryRunner)

    try {
      await queryRunner.startTransaction()
      await next()

      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  })
}

export async function withTransaction<T>(fn: () => Promise<T>): Promise<T> {
  const store = als.getStore() as any

  const connection = getConnection()
  const queryRunner = connection.createQueryRunner()
  await queryRunner.connect()

  store.set('queryRunner', queryRunner)

  try {
    queryRunner.startTransaction()
    const result = await fn()

    queryRunner.commitTransaction()
    return result
  } catch (error) {
    queryRunner.rollbackTransaction()
    throw error
  } finally {
    queryRunner.release()
  }
}
