// справочники

export interface Building {
  id: number
  Building: string
}

export interface Cabinet {
  id: number
  Cabinet: string
}
// Роли
//export type IRole = 'user' | 'admin' | 'manager' 
export enum UserRoles {
  ADMIN = 0,
  MANAGER = 1,
  USER = 2,
}

export enum Statuses {
  ENABLED = 0,  // активно
  DISABLED = 1,  // не активно
  NEW = 10,  // новый
  AGREED = 11,  // согласовать
  REJECTED = 12,  // отклонить
  CANCELED_BY_USER = 13,  // отмено польз
  CANCELED_BY_SYSTEM = 14  // отменено системой
}

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
  room: IRoom
  status: IStatus
  userAgreement: IUser
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
  idUser: number,
  role: IRole
}
