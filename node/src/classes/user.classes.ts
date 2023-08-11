import { IDepartment, IDolgnost, IRole } from "../dtos/data.dto";
import { IUserResponse } from "../dtos/user.dto";
import userModel from "../models/user.model";
import { CDolgnost } from "./data.classes";


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

  constructor(user: userModel) {
    this.idUser = user?.idUser;
    this.sFam = user?.sFam;
    this.sName = user?.sName;
    this.sOtch = user?.sOtch;
    this.sPhone = user?.sPhone;
    this.sEmail = user?.sEmail;
    this.dolg = { idDolg: 1, sDolg: 'dolg' };
    this.dep = { idDep: 0, sDep: 'dep'};
    this.role = { idRole: 0, sRole: 'role'};
    this.dtIns = user?.dtIns;
    this.dtUpd = user?.dtUpd;
    this.dtDel = user?.dtDel;
  }
}