import { IRoom, IPageRequest } from "./common.dto";


export interface IRegisterRoomRequest {
  sAddress: string
  sCabinet: string
  iSeatingPlaces: number
  bHasProjector: boolean
  bHasInternet: boolean
  idStatus: number
  dtInEnable: Date
}

// RegisterRoomResponse - успех если получен код ответа 200

export interface IRoomRequest {
  idRoom: number
}

export interface IRoomResponse extends IRoom {

}

export interface IRoomDeleteRequest {
  idRoom: number
}

// RoomDeleteResponse - успех если получен код ответа 200

export interface IRoomFilters {
  dtBegin: Date | null    // дата начала аренды (null - если фильтрация не нужна), для получения списка доступных переговорных
  dtEnd: Date | null     	// дата окончания аренды (null - если фильтрация не нужна), для получения списка доступных переговорных
  deletedOnly: boolean		// true - вернуть только удалённые (заменить условие по умолчанию bDel == false на bDel == true)
  deletedAdd: boolean     // true - вернуть все (удалённые и не удалённые), отменяет условие по умолчанию bDel == false 
}

export interface IRoomListRequest extends IPageRequest {
  filters: IRoomFilters
}

export interface IRoomListResponse extends Array<IRoom> {

}
