import { IOrder, IPageRequest } from "./common.dto";


export interface IRegisterOrderRequest {
  dtBegin: Date           
  dtEnd: Date
  sComment: string
  iSeatingPlaces: number
  bHasProjector: boolean
  bHasInternet: boolean
  idRoom: number
}
  
// RegisterOrderResponse - успех если получен код ответа 200

export interface IOrderRequest {
    idOrder: number
}
  
export interface IOrderResponse extends IOrder {

}
  
export interface IOrderDeleteRequest {
  idOrder: number
}
  
// OrderDeleteResponse - успех если получен код ответа 200

export interface IOrderFilters {
  active: boolean           // true - вернуть активные (добавить в запрос status = на согласовании и согласованные + время окончания аренды ещё не истекло)
  rejected: boolean         // true - вернуть отклонённые (добавить в запрос status = отклонённые)
  deletedOnly: boolean		// true - вернуть только удалённые (заменить условие по умолчанию bDel == false на bDel == true)
  deletedAdd: boolean		// true - вернуть все (удалённые и не удалённые), отменяет условие по умолчанию bDel == false 
}

export interface IOrderListRequest extends IPageRequest {
  filters: IOrderFilters
}

export interface IOrderListResponse extends Array<IOrder> {

}

export interface IOrderChangeStatusRequest {
  idOrder: number
  idStatus: number
}

// OrderChangeStatusResponse - успех если получен код ответа 200
    