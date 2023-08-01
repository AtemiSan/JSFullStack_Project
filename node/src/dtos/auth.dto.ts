import { IDolgnost, IDepartment, IRole } from "./common.dto";


export interface ILoginRequest {
  sEmail: string
  sPassw: string
}
  
export interface ILoginResponse {
  sFam: string
  sName: string
  sOtch: string
  dolg: IDolgnost
  dep: IDepartment
  role: IRole
}
  