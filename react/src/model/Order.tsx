import { IRoom, IStatus, IUser } from "./reference";

export interface IOrderData {
  idOrder: number;  // string
  dtBegin: Date;
  dtEnd: Date;
  sComment: string
  iSeatingPlaces: number
  bHasProjector: boolean
  bHasInternet: boolean  
  sAdress: string;
  sCabinet: string;
  status: string;
}


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