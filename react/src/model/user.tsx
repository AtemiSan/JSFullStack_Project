import { IUser, IPageRequest } from "./reference";


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
  
// RegisterUserResponse - успех если получен код ответа 201

export interface IUserRequest {
  idUser: number
}

export interface IUserResponse extends IUser {
	
}

export interface IUserUpdateRequest extends IRegisterUserRequest {
  idUser: number
  bDel: boolean
}

// UserUpdateResponse - IUserResponse

// UserDeleteRequest - IUserRequest
// UserDeleteResponse - успех если получен код ответа 200

export interface IUserFilters {
  deletedOnly: boolean		// true - вернуть только удалённые
  deletedAdd: boolean		// true - вернуть все (удалённые и не удалённые)
}

export interface IUserListRequest extends IPageRequest {
  filters: IUserFilters
}

export interface IUserListResponse extends Array<IUserResponse> {

}

export interface IChangePasswRequest {
  sOldPassw: string
  sNewPassw: string
}

// ChangePasswResponse - успех если получен код ответа 200

// ProfileRequest - no params
// ProfileResponse - IUserResponse
