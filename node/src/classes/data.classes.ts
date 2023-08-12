import { IDepListResponse, IDepartment, IDolgListResponse, IDolgnost, IPageRequest, IRole, IRoleListResponse, IStatus } from "../dtos/data.dto";


export class CDolgnost implements IDolgnost {
  
  idDolg: number;
  sDolg: string;

  constructor(dolg: IDolgnost) {
    this.idDolg = dolg?.idDolg;
    this.sDolg = dolg?.sDolg;
  }
}

export class CDepartment implements IDepartment {
  
  idDep: number;
  sDep: string;

  constructor(dep: IDepartment) {
    this.idDep = dep?.idDep;
    this.sDep = dep?.sDep;
  }
}

export class CRole implements IRole {
  
  idRole: number;
  sRole: string;

  constructor(role: IRole) {
    this.idRole = role?.idRole;
    this.sRole = role?.sRole;
  }
}

export class CStatus implements IStatus {
  
  idStatus: number;
  sStatus: string;
  sComment: string;

  constructor(status: IStatus) {
    this.idStatus = status?.idStatus;
    this.sStatus = status?.sStatus;
    this.sComment = status?.sComment;
  }
}

export class CPageRequest implements IPageRequest {
  
  iPage: number;
  iCountOnPage: number;

  constructor(iPage: number, iCountOnPage: number) {
    this.iPage = iPage;
    this.iCountOnPage = iCountOnPage;
  }
}

export function getDolgListResponse(list: Array<IDolgnost>) {
  let res: IDolgListResponse = [];
  list.forEach(item => {res.push(new CDolgnost(item))});
  return res;
}

export function getDepListResponse(list: Array<IDepartment>) {
  let res: IDepListResponse = [];
  list.forEach(item => {res.push(new CDepartment(item))});
  return res;
}

export function getRoleListResponse(list: Array<IRole>) {
  let res: IRoleListResponse = [];
  list.forEach(item => {res.push(new CRole(item))});
  return res;
}
