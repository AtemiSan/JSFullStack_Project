

export interface IDolgnost {
  idDolg: number
  sDolg: string
}

export interface IDepartment {
  idDep: number
  sDDep: string
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
  bHasProjector: boolean
  bHasInternet: boolean
  status: IStatus
  dtInEnable: Date            
  bDel: boolean
}

export interface IUser {
  sFam: string
  sName: string
  sOtch: string
  sPhone: string
  sEmail: string
  dolg: IDolgnost
  dep: IDepartment
  role: IRole
  bDel: boolean
}

export interface IOrder {
  idOrder: number
  dtBegin: Date            
  dtEnd: Date
  sComment: string
  iSeatingPlaces: number
  bHasProjector: boolean
  bHasInternet: boolean
  room: IRoom
  status: IStatus
  userAgreement: IUser
  bDel: boolean
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
