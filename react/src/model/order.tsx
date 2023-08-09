import { IOrder, IPageRequest } from "./data";

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
  // Для запросов от пользователя
  userActive: boolean       // true - вернуть активные (status = на согласовании и согласованные + время окончания аренды ещё не истекло)
  userRejected: boolean     // true - вернуть отклонённые (status = отклонённые, отменённые + просроченные)
  userNotDeleted: boolean   // true - вернуть все, кроме удалённых
  userDeletedOnly: boolean  // true - вернуть все удалённые
  userDeletedAdd: boolean		// true - вернуть все (удалённые и не удалённые)
  // Для запросов от согласующего
  agreeActive: boolean           // true - вернуть активные для согласования (status = на согласовании и не просроченные)
  agreeRejected: boolean         // true - вернуть отклонённые (status = отклонённые этим согласующим)
  agreeAgreemented: boolean		   // true - вернуть все согласованные (status = согласованные этим согласующим)
  agreeNotDeleted: boolean   
  agreeDeletedOnly: boolean
  agreeDeletedAdd: boolean
  // Для запросов от администратора
  adminActive: boolean          // true - вернуть активные для согласования (status = на согласовании и не просроченные)
  adminRejected: boolean        // true - вернуть отклонённые (status = отклонённые)
  adminAgreemented: boolean     // true - вернуть все согласованные (status = согласованные)
  adminNotDeleted: boolean   
  adminDeletedOnly: boolean
  adminDeletedAdd: boolean
}

export interface IOrderListRequest extends IPageRequest {
  filters: IOrderFilters
}

export interface IOrderListResponse extends Array<IOrderResponse> {

}

export interface IOrderChangeStatusRequest {
  idOrder: number
  idStatus: number
}

// OrderChangeStatusResponse - IOrderResponse
