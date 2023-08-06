import { IDolgListResponse, IDepListResponse, IRoleListResponse } from "../dtos/data.dto";
import dolgModel from "../models/dolgnost.model";
import depModel from "../models/department.model";
import roleModel from "../models/role.model";

class CDataService {

  //================================================================================================================================================================================
  async getDolgList() {
    const list = await dolgModel.findAll();
    return list as IDolgListResponse;
  }

  //================================================================================================================================================================================
  async getDepartList() {
    const list = await depModel.findAll();
    return list as IDepListResponse;
  }

  //================================================================================================================================================================================
  async getRoleList() {
    const list = await roleModel.findAll();
    return list as IRoleListResponse;
  }
}

export default new CDataService();