import * as entities from '@generated/entities'

const env = process.env.NODE_ENV || 'development'
const typeormConfig: any = {
  development: {
    type: 'mysql',

    // host: 'localhost',
    // port: 3306,
    // username: 'root',
    // password: '123456',
    // database: 'loco',

    // 腾讯云
    host: '1.14.165.196',
    port: 3306,
    username: 'root',
    password: 'Ziyi007',
    database: 'loco',

    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,

    charset: 'utf8mb4',
    synchronize: true,
    logging: false,
    entities: Object.values(entities),
    migrations: ['./migration/**/*.ts'],
    subscribers: ['./subscriber/**/*.ts'],
    cli: {
      entitiesDir: './entity',
      migrationsDir: './migration',
      subscribersDir: './subscriber',
    },
  },
  production: {
    type: 'mysql',

    // 腾讯云
    host: '1.14.165.196',
    port: 3306,
    username: 'root',
    password: 'Ziyi007',
    database: 'loco',

    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    charset: 'utf8mb4',
    synchronize: false,
    logging: true,
    entities: Object.values(entities),
    migrations: ['./migration/**/*.ts'],
    subscribers: ['./subscriber/**/*.ts'],
    cli: {
      entitiesDir: './entity',
      migrationsDir: './migration',
      subscribersDir: './subscriber',
    },
  },
}

export const typeorm = typeormConfig[env]
