import DbInitPlugin from '@plugin/db-init.plugin'
import { PluginConfig } from '@tiejs/common'

export const plugins: PluginConfig = [
  {
    name: 'typeorm',
    package: '@tiejs/typeorm',
    enable: true,
  },
  {
    name: 'db-init',
    main: DbInitPlugin,
    enable: true,
  },
]
