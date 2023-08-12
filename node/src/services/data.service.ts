import dolgModel from "../models/dolgnost.model";
import depModel from "../models/department.model";
import roleModel from "../models/role.model";
import { getDepListResponse, getDolgListResponse, getRoleListResponse } from "../classes/data.classes";

class CDataService {

  //================================================================================================================================================================================
  async getDolgList() {
    const list = await dolgModel.findAll();
    return getDolgListResponse(list);
  }

  //================================================================================================================================================================================
  async getDepartList() {
    const list = await depModel.findAll();
    return getDepListResponse(list);
  }

  //================================================================================================================================================================================
  async getRoleList() {
    const list = await roleModel.findAll();
    return getRoleListResponse(list);
  }
}

export default new CDataService();