import { IStatus } from "../dtos/data.dto";
import { IOrderListResponse, IOrderResponse } from "../dtos/order.dto";
import { IRoomResponse } from "../dtos/room.dto";
import { IUserListResponse, IUserResponse } from "../dtos/user.dto";
import { CStatus } from "./data.classes";
import { CRoomResponse } from "./room.classes";
import { CUserResponse } from "./user.classes";


export class COrderResponse implements IOrderResponse {

  idOrder: number;
  dtBegin: Date;
  dtEnd: Date;
  sComment: string;
  iSeatingPlaces: number;
  bHasProjector: number;
  bHasInternet: number;
  user: IUserResponse;
  room: IRoomResponse;
  status: IStatus;
  userAgreement: IUserResponse;
  dtIns: Date;
  dtUpd: Date;
  dtDel: Date;

  constructor(order: IOrderResponse) {
    this.idOrder = order?.idOrder;
    this.dtBegin = order?.dtBegin;
    this.dtEnd = order?.dtEnd;
    this.sComment = order?.sComment;
    this.iSeatingPlaces = order?.iSeatingPlaces;
    this.bHasProjector = order?.bHasProjector;
    this.bHasInternet = order?.bHasInternet;
    this.user = new CUserResponse(order?.user);
    this.room = new CRoomResponse(order?.room);
    this.status = new CStatus(order?.status);
    this.userAgreement = new CUserResponse(order?.userAgreement);
    this.dtIns = order?.dtIns;
    this.dtUpd = order?.dtUpd;
    this.dtDel = order?.dtDel;
  }
}

export function getOrderListResponse(list: Array<IOrderResponse>) {
  let res: IOrderListResponse = [];
  list.forEach(item => {res.push(new COrderResponse(item))});
  return res;
}
