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
export type IRole = 'user' | 'admin' | 'manager' 


export interface IDolgnost {
  idDolg: number
  sDolg: string
}

export interface IDepartment {
  idDep: number
  sDDep: string
}

/*export interface IRole {
  idRole: number
  sRole: string
}*/

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
  dtInEnable: Date //number            // timestamp
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