import { IPageRequest } from "./common.dto";


export interface IOrderAgreementFilters {
  active: boolean           // true - вернуть активные (добавить в запрос status = на согласовании)
  rejected: boolean         // true - вернуть отклонённые (добавить в запрос status = отклонённые)
  agreemented: boolean		// true - вернуть все согласованные (добавить в запрос status = согласованные)
  agreementedByMe: boolean	// true - вернуть все согласованные этим согласующим (добавить в запрос status = согласованные + проверка согласующего)
}

export interface IOrderAgreementListRequest extends IPageRequest {
  filters: IOrderAgreementFilters
}

export interface IOrderAgreementRequest {
  idOrder: number
  idStatus: number
}

// OrderAgreementResponse - успех если получен код ответа 200
