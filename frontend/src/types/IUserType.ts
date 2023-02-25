import { ICheckType } from "./ChecksType"

export interface IUserType {
  id: number
  name: string
  email: string
  password: string
  code: string
  checks: ICheckType[]
}