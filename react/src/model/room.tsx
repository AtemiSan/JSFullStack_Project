import { IPageRequest, IRoom } from "./data"


export interface IRegisterRoomRequest {
  sAddress: string
  sCabinet: string
  iSeatingPlaces: number
  bHasProjector: number
  bHasInternet: number
  idStatus: number
  dtInEnable: Date | null
}

// RegisterRoomResponse - успех если получен код ответа 200

export interface IRoomRequest {
  idRoom: number
}

export interface IRoomResponse extends IRoom {

}

export interface IRoomUpdateRequest extends IRegisterRoomRequest {
  idRoom: number
  bDel: boolean
}

// RoomUpdateResponse - успех если получен код ответа 200

export interface IRoomDeleteRequest {
  idRoom: number
}

// RoomDeleteResponse - успех если получен код ответа 200

export interface IRoomFilters {
  dtBegin: Date | null        // дата начала аренды (null - если фильтрация не нужна), для получения списка доступных переговорных
  dtEnd: Date | null     	    // дата окончания аренды (null - если фильтрация не нужна), для получения списка доступных переговорных
  adminNotDeleted: boolean    // true - вернуть только не удалённые
  adminDeletedOnly: boolean		// true - вернуть только удалённые
  adminDeletedAdd: boolean    // true - вернуть все (удалённые и не удалённые)
}

export interface IRoomListRequest extends IPageRequest {
  filters: IRoomFilters
}

export interface IRoomListResponse extends Array<IRoomResponse> {

}

export interface IRoomFreeListRequest {
  dtBegin: Date
  dtEnd: Date
  iSeatingPlaces: number
  bHasProjector: number
  bHasInternet: number
}