import { IDepartment, IDolgnost, IRole } from "../dtos/data.dto";
import dolgModel from "../models/dolgnost.model";
import depModel from "../models/department.model";
import roleModel from "../models/role.model";


export class CDolgnost implements IDolgnost {
  
  idDolg: number;
  sDolg: string;

  constructor(dolg: dolgModel) {
    this.idDolg = dolg?.idDolg;
    this.sDolg = dolg?.sDolg;
  }
}

export class CDepartment implements IDepartment {
  
  idDep: number;
  sDep: string;

  constructor(dep: depModel) {
    this.idDep = dep?.idDep;
    this.sDep = dep?.sDep;
  }
}

export class CRole implements IRole {
  
  idRole: number;
  sRole: string;

  constructor(role: roleModel) {
    this.idRole = role?.idRole;
    this.sRole = role?.sRole;
  }
}
