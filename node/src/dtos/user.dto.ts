import { IUser, IPageRequest } from "./common.dto";


export interface IRegisterUserRequest {
  sFam: string
  sName: string
  sOtch: string
  sPhone: string
  sEmail: string
  sPassw: string
  idDolg: number
  idDep: number
  idRole: number  	
}
  
// RegisterUserResponse - успех если получен код ответа 200

export interface IUserRequest {
  idUser: number
}

export interface IUserResponse extends IUser {
	
}

export interface IUserUpdateRequest extends IRegisterUserRequest {
  idUser: number
  bDel: boolean
}

// UserUpdateResponse - успех если получен код ответа 200

export interface IUserDeleteRequest {
  idUser: number
}

// UserDeleteResponse - успех если получен код ответа 200

export interface IUserFilters {
  deletedOnly: boolean		// true - вернуть только удалённые (заменить условие по умолчанию bDel == false на bDel == true)
  deletedAdd: boolean		// true - вернуть все (удалённые и не удалённые), отменяет условие по умолчанию bDel == false 
}

export interface IUserListRequest extends IPageRequest {
  filters: IUserFilters
}

export interface IUserListResponse extends Array<IUser> {

}

export interface IChangePasswRequest {
  sOldPassw: string
  sNewPassw: string
}

// ChangePasswResponse - успех если получен код ответа 200

// ProfileRequest - no params

export interface IProfileResponse extends IUser {

}
