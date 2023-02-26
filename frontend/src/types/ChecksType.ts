export interface ICheckType {
  id: number
  entryTime: Date
  departureTime: string
  workedHours: string
  isWorking: boolean
  userCode: string
}

export interface ICheckInType {
  entryTime: Date
  userCode: string
}