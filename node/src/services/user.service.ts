import usersModel from "../models/user.model";
import dolgModel from "../models/dolgnost.model";
import depModel from "../models/department.model";
import roleModel from "../models/role.model";
import { IRegisterUserRequest, IUserRequest, IUserResponse, IUserUpdateRequest, IUserListRequest, IUserListResponse } from "../dtos/user.dto";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { CUserResponse, getUserListResponse } from "../classes/user.classes";


class CUserService {

  //================================================================================================================================================================================
  async getUser(reqDTO: IUserRequest) {
    const user = await usersModel.findAll({
      where: {
        idUser: reqDTO.idUser
      },
      include: [dolgModel, depModel, roleModel],
      paranoid: false
    });

    if (user && user.length == 1) {
      return new CUserResponse(user[0]);
    } else {
      if (!user) {
        console.log('CUserService.getUser: Попытка получить несуществующего пользователя. idUser = ' + reqDTO.idUser);
      } else {
        console.log('CUserService.getUser: Колизия в БД, найдено больше одного пользователя. idUser = ' + reqDTO.idUser);
      }
    }
  }

  //================================================================================================================================================================================
  async registerUser(reqDTO: IRegisterUserRequest) {
    const passwHash = await bcrypt.hash(reqDTO.sPassw, 10);
    const user = await usersModel.create(
      {
        sFam: reqDTO.sFam,
        sName: reqDTO.sName,
        sOtch: reqDTO.sOtch,
        sPhone: reqDTO.sPhone,
        sEmail: reqDTO.sEmail,
        sPassw: passwHash,
        idDolg: reqDTO.idDolg,
        idDep: reqDTO.idDep,
        idRole: reqDTO.idRole
      }
    )
    return true;
  }

  //================================================================================================================================================================================
  async updateUser(reqDTO: IUserUpdateRequest) {
    const user = await usersModel.findAll({
      where: {
        idUser: reqDTO.idUser
      },
      paranoid: false
    })

    if (user && user.length == 1) {
      user[0].update({
        sFam: reqDTO.sFam,
        sName: reqDTO.sName,
        sOtch: reqDTO.sOtch,
        sPhone: reqDTO.sPhone,
        sEmail: reqDTO.sEmail,
        idDolg: reqDTO.idDolg,
        idDep: reqDTO.idDep,
        idRole: reqDTO.idRole
      });
      if (reqDTO.sPassw.length > 0) {
        const passwHash = await bcrypt.hash(reqDTO.sPassw, 10);
        user[0].update({
          sPassw: passwHash
        });
      }
      if (reqDTO.bDel) {
        user[0].destroy();
      }
////      user[0].save();
      return new CUserResponse(user[0]);
    } else {
      if (!user) {
        console.log('CUserService.updateUser: Попытка обновить несуществующего пользователя. idUser = ' + reqDTO.idUser);
      } else {
        console.log('CUserService.updateUser: Колизия в БД, найдено больше одного пользователя. idUser = ' + reqDTO.idUser);
      }
    }
  }

  //================================================================================================================================================================================
  async deleteUser(reqDTO: IUserRequest) {
    const user = await usersModel.findAll({
      where: {
        idUser: reqDTO.idUser
      }
    })

    if (user && user.length == 1) {
      user[0].destroy();
////      user[0].save();
      return true;
    } else {
      if (!user) {
        console.log('CUserService.deleteUser: Попытка удалить несуществующего пользователя. idUser = ' + reqDTO.idUser);
      } else {
        console.log('CUserService.deleteUser: Колизия в БД, найдено больше одного пользователя. idUser = ' + reqDTO.idUser);
      }
    }
  }

  //================================================================================================================================================================================
  async getList(reqDTO: IUserListRequest) {
    let users: usersModel[];
    if (reqDTO.filters.deletedOnly) {
      users = await usersModel.findAll({
        where: {
          dtDel: {
            [Op.not]: null
          }
        },
        include: [dolgModel, depModel, roleModel],
        paranoid: false
      });
    } else if (reqDTO.filters.deletedAdd) {
      users = await usersModel.findAll({
        paranoid: false
      });
    } else {
      users = await usersModel.findAll();
    }

    return getUserListResponse(users);
  }
}

export default new CUserService();