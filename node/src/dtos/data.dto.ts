import { IRoomResponse } from "./room.dto"
import { IUserResponse } from "./user.dto"


export interface IDolgnost {
  idDolg: number
  sDolg: string
}

export interface IDepartment {
  idDep: number
  sDep: string
}

export interface IRole {
  idRole: number
  sRole: string
}

export interface IStatus {
  idStatus: number
  sStatus: string
  sComment: string
}

export interface IRoom {
  idRoom: number
  sAddress: string
  sCabinet: string
  iSeatingPlaces: number
  bHasProjector: number
  bHasInternet: number
  status: IStatus
  dtInEnable: Date            
  dtIns: Date
  dtUpd: Date
  dtDel: Date
}

export interface IUser {
  idUser: number
  sFam: string
  sName: string
  sOtch: string
  sPhone: string
  sEmail: string
  dolg: IDolgnost
  dep: IDepartment
  role: IRole
  dtIns: Date
  dtUpd: Date
  dtDel: Date
}

export interface IOrder {
  idOrder: number
  dtBegin: Date            
  dtEnd: Date
  sComment: string
  iSeatingPlaces: number
  bHasProjector: number
  bHasInternet: number
  user: IUserResponse
  room: IRoomResponse
  status: IStatus
  userAgreement: IUserResponse
  dtIns: Date
  dtUpd: Date
  dtDel: Date
}

export interface IPageRequest {
  iPage: number
  iCountOnPage: number
}

export interface IDolgListResponse extends Array<IDolgnost> {

}

export interface IDepListResponse extends Array<IDepartment> {

}

export interface IRoleListResponse extends Array<IRole> {

}

export interface IUserToken {
  idUser: number
  role: IRole
}
