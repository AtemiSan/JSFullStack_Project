import { IRoom, IStatus, IUser } from "./reference";

/*export interface IOrderData {
  id: number;  // string
  dtTime_from: Date;
  dtTime_to: Date;
  sAdress: string;
  sCabinet: string;
  seatingPlaces: number;
  sState: string;
}*/


export interface IOrder {
  idOrder: number
  dtBegin: Date    // number       // timestamp
  dtEnd: Date     // number
  sComment: string
  iSeatingPlaces: number
  bHasProjector: boolean
  bHasInternet: boolean
  room: IRoom
  status: IStatus
 // userAgreement: IUser
  bDel: boolean
}