import { IDepartment, IDolgnost, IRole } from "../dtos/data.dto";
import { IUserListResponse, IUserResponse } from "../dtos/user.dto";
import { CDepartment, CDolgnost, CRole } from "./data.classes";


export class CUserResponse implements IUserResponse {

  idUser: number
  sFam: string
  sName: string
  sOtch: string
  sPhone: string
  sEmail: string
  dolg: IDolgnost
  dep: IDepartment
  role: IRole
  dtIns: Date
  dtUpd: Date
  dtDel: Date

  constructor(user: IUserResponse) {
    this.idUser = user?.idUser;
    this.sFam = user?.sFam;
    this.sName = user?.sName;
    this.sOtch = user?.sOtch;
    this.sPhone = user?.sPhone;
    this.sEmail = user?.sEmail;
    this.dolg = new CDolgnost(user?.dolg);
    this.dep = new CDepartment(user?.dep);
    this.role = new CRole(user?.role);
    this.dtIns = user?.dtIns;
    this.dtUpd = user?.dtUpd;
    this.dtDel = user?.dtDel;
  }
}

export function getUserListResponse(list: Array<IUserResponse>) {
  let res: IUserListResponse = [];
  list.forEach(item => {res.push(new CUserResponse(item))});
  return res;
}
