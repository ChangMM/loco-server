export interface Alarm {
  // 接口最大耗时，错过会报警
  maxResponeTime: number
  phones: string[]
}
