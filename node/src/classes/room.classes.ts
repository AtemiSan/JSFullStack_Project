import { IStatus } from "../dtos/data.dto";
import { IRoomListResponse, IRoomResponse } from "../dtos/room.dto";
import { CStatus } from "./data.classes";


export class CRoomResponse implements IRoomResponse {

  idRoom: number;
  sAddress: string;
  sCabinet: string;
  iSeatingPlaces: number;
  bHasProjector: number;
  bHasInternet: number;
  status: IStatus;
  dtInEnable: Date;
  dtIns: Date;
  dtUpd: Date;
  dtDel: Date;

  constructor(room: IRoomResponse) {
    this.idRoom = room?.idRoom;
    this.sAddress = room?.sAddress;
    this.sCabinet = room?.sCabinet;
    this.iSeatingPlaces = room?.iSeatingPlaces;
    this.bHasProjector = room?.bHasProjector;
    this.bHasInternet = room?.bHasInternet;
    this.status = new CStatus(room?.status);
    this.dtInEnable = room?.dtInEnable;
    this.dtIns = room?.dtIns;
    this.dtUpd = room?.dtUpd;
    this.dtDel = room?.dtDel;
  }
}

export function getRoomListResponse(list: Array<IRoomResponse>) {
  let res: IRoomListResponse = [];
  list.forEach(item => {res.push(new CRoomResponse(item))});
  return res;
}
