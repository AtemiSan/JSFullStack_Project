import orderModel from "../models/order.model";
import { IOrderChangeStatusRequest, IOrderListRequest, IOrderRequest, IRegisterOrderRequest } from "../dtos/order.dto";
import { IUserToken } from "../dtos/data.dto";
import { Statuses } from "../models/status.model";
import userModel, { UserRoles } from "../models/user.model";
import roomModel from "../models/room.model";
import statusModel from "../models/status.model";
import Order_Meeting_Room from "../models/order.model";
import { Op } from "sequelize";
import { sequelize } from "../sequelize";
import { COrderResponse, getOrderListResponse } from "../classes/order.classes";


class COrderService {

  //================================================================================================================================================================================
  async getOrder(reqUser: IUserToken, reqDTO: IOrderRequest) {
    const order = await orderModel.findAll({
      where: {
        idOrder: reqDTO.idOrder
      },
      include: [roomModel, statusModel, userModel],
      paranoid: false
    });

    if (order && order.length == 1) {
      if (order[0].user.idUser == reqUser.idUser || reqUser.role.idRole == UserRoles.MANAGER || reqUser.role.idRole == UserRoles.ADMIN) {
        return new COrderResponse(order[0]);
      }
    } else {
      if (!order) {
        console.log('COrderService.getOrder: Попытка получить несуществующую запись. idOrder = ' + reqDTO.idOrder);
      } else {
        console.log('COrderService.getOrder: Колизия в БД, найдено более одной записи. idOrder = ' + reqDTO.idOrder);
      }
    }
  }

  //================================================================================================================================================================================
  async registerOrder(reqUser: IUserToken, reqDTO: IRegisterOrderRequest) {
    const order = await orderModel.create(
      {
        dtBegin: reqDTO.dtBegin,
        dtEnd: reqDTO.dtEnd,
        sComment: reqDTO.sComment,
        iSeatingPlaces: reqDTO.iSeatingPlaces,
        bHasProjector: reqDTO.bHasProjector,
        bHasInternet: reqDTO.bHasInternet,
        idRoom: reqDTO.idRoom,
        idUser: reqUser.idUser,
        idStatus: Statuses.NEW
      }
    )
    return true;
  }

  //================================================================================================================================================================================
  async deleteOrder(reqUser: IUserToken, reqDTO: IOrderRequest) {
    const order = await orderModel.findAll({
      where: {
        idOrder: reqDTO.idOrder
      }
    })

    if (order && order.length == 1) {
      if (order[0].user.idUser == reqUser.idUser || reqUser.role.idRole == UserRoles.ADMIN) {
        order[0].destroy();
////      order[0].save();
        return true;
      }
    } else {
      if (!order) {
        console.log('Попытка удалить несуществующую запись. idOrder = ' + reqDTO.idOrder);
      } else {
        console.log('COrderService.deleteOrder: Колизия в БД, найдено более одной записи. idOrder = ' + reqDTO.idOrder);
      }
    }
  }

  //================================================================================================================================================================================
  async getList(reqUser: IUserToken, reqDTO: IOrderListRequest) {
    let orders: Order_Meeting_Room[];
    //===========================================================
    // Только активные заявки (по пользователю)
    if (reqDTO.filters.userActive) {
      orders = await orderModel.findAll({
        where: {
          idUser: reqUser.idUser,
          $or: [
            {
              idStatus: Statuses.NEW,
              dtBegin: {
                [Op.gt]: sequelize.literal('CURRENT_TIMESTAMP')
              }
            },
            {
              idStatus: Statuses.AGREED,
              dtEnd: {
                [Op.gt]: sequelize.literal('CURRENT_TIMESTAMP')
              }    
            }
          ]
        },
        include: [roomModel, statusModel, userModel]
      });
    //===========================================================
    // Только отклонённые / отменённые заявки + просроченные (по пользователю)
    } else if (reqDTO.filters.userRejected) {
      orders = await orderModel.findAll({
        where: {
          idUser: reqUser.idUser,
          $or: [
            {
              idStatus: {
                [Op.in]: [Statuses.REJECTED, Statuses.CANCELED_BY_USER, Statuses.CANCELED_BY_SYSTEM]
              }
            },
            {
              idStatus: Statuses.NEW,
              dtBegin: {
                [Op.lt]: sequelize.literal('CURRENT_TIMESTAMP')
              }
            }
          ]
        },
        include: [roomModel, statusModel, userModel]
      });
    //===========================================================
    // Все заявки, кроме удалённых (по пользователю)
    } else if (reqDTO.filters.userNotDeleted) {
      orders = await orderModel.findAll({
        where: {
          idUser: reqUser.idUser
        },
        include: [roomModel, statusModel, userModel]
      });
    //===========================================================
    // Все удалённые заявки (по пользователю)
    } else if (reqDTO.filters.userDeletedOnly) {
      orders = await orderModel.findAll({
        where: {
          dtDel: {
            [Op.not]: null
          },
          idUser: reqUser.idUser
        },
        include: [roomModel, statusModel, userModel]
      });
    //===========================================================
    // Все заявки (по пользователю)
    } else if (reqDTO.filters.userDeletedAdd) {
      orders = await orderModel.findAll({
        where: {
          idUser: reqUser.idUser
        },
        include: [roomModel, statusModel, userModel],
        paranoid: false
      });
    //********************************************************************************
    //********************************************************************************
    //===========================================================
    // Только активные заявки для согласования (по согласующему)
    } else if (reqDTO.filters.agreeActive && reqUser.role.idRole == UserRoles.MANAGER) {
      orders = await orderModel.findAll({
        where: {
          idStatus: Statuses.NEW,
          dtBegin: {
            [Op.gt]: sequelize.literal('CURRENT_TIMESTAMP')
          }
        },
        include: [roomModel, statusModel, userModel]
      });
    //===========================================================
    // Только отклонённые заявки (по согласующему)
    } else if (reqDTO.filters.agreeRejected && reqUser.role.idRole == UserRoles.MANAGER) {
      orders = await orderModel.findAll({
        where: {
          idStatus: Statuses.REJECTED,
          idUserAgreement: reqUser.idUser
        },
        include: [roomModel, statusModel, userModel]
      });
    //===========================================================
    // Только согласованные заявки (по согласующему)
    } else if (reqDTO.filters.agreeRejected && reqUser.role.idRole == UserRoles.MANAGER) {
      orders = await orderModel.findAll({
        where: {
          idStatus: Statuses.AGREED,
          idUserAgreement: reqUser.idUser
        },
        include: [roomModel, statusModel, userModel]
      });
    //===========================================================
    // Все заявки, кроме удалённых (по согласующему)
    } else if (reqDTO.filters.agreeNotDeleted && reqUser.role.idRole == UserRoles.MANAGER) {
      orders = await orderModel.findAll({
        where: {
          idUserAgreement: reqUser.idUser
        },
        include: [roomModel, statusModel, userModel]
      });
    //===========================================================
    // Все удалённые заявки (по согласующему)
    } else if (reqDTO.filters.agreeDeletedOnly && reqUser.role.idRole == UserRoles.MANAGER) {
      orders = await orderModel.findAll({
        where: {
          dtDel: {
            [Op.not]: null
          },
          idUserAgreement: reqUser.idUser
        },
        include: [roomModel, statusModel, userModel]
      });
    //===========================================================
    // Все заявки (по согласующему)
    } else if (reqDTO.filters.agreeDeletedAdd && reqUser.role.idRole == UserRoles.MANAGER) {
      orders = await orderModel.findAll({
        where: {
          idUserAgreement: reqUser.idUser
        },
        include: [roomModel, statusModel, userModel],
        paranoid: false
      });
    //********************************************************************************
    //********************************************************************************
    //===========================================================
    // Только активные заявки для согласования (для администратора)
    } else if (reqDTO.filters.adminActive && reqUser.role.idRole == UserRoles.ADMIN) {
      orders = await orderModel.findAll({
        where: {
          idStatus: Statuses.NEW,
          dtBegin: {
            [Op.gt]: sequelize.literal('CURRENT_TIMESTAMP')
          }
        },
        include: [roomModel, statusModel, userModel]
      });
    //===========================================================
    // Только отклонённые заявки (для администратора)
    } else if (reqDTO.filters.adminRejected && reqUser.role.idRole == UserRoles.ADMIN) {
      orders = await orderModel.findAll({
        where: {
          idStatus: Statuses.REJECTED
        },
        include: [roomModel, statusModel, userModel]
      });
    //===========================================================
    // Только согласованные заявки (для администратора)
    } else if (reqDTO.filters.adminAgreemented && reqUser.role.idRole == UserRoles.ADMIN) {
      orders = await orderModel.findAll({
        where: {
          idStatus: Statuses.AGREED
        },
        include: [roomModel, statusModel, userModel]
      });
    //===========================================================
    // Все заявки, кроме удалённых (для администратора)
    } else if (reqDTO.filters.adminNotDeleted && reqUser.role.idRole == UserRoles.ADMIN) {
      orders = await orderModel.findAll();
    //===========================================================
    // Все удалённые заявки (для администратора)
    } else if (reqDTO.filters.adminDeletedOnly && reqUser.role.idRole == UserRoles.ADMIN) {
      orders = await orderModel.findAll({
        where: {
          dtDel: {
            [Op.not]: null
          }
        },
        include: [roomModel, statusModel, userModel]
      });
    //===========================================================
    // Все заявки (для администратора)
    } else if (reqDTO.filters.adminDeletedAdd && reqUser.role.idRole == UserRoles.ADMIN) {
      orders = await orderModel.findAll({
        include: [roomModel, statusModel, userModel],
        paranoid: false
      });
    } else 
      return null;
    return getOrderListResponse(orders);
  }

  //================================================================================================================================================================================
  async changeStatus(reqUser: IUserToken, reqDTO: IOrderChangeStatusRequest) {
    const order = await orderModel.findAll({
      where: {
        idOrder: reqDTO.idOrder
      }
    })

    if (order && order.length == 1) {
      if ((reqUser.idUser == order[0].idUser && reqDTO.idStatus == Statuses.CANCELED_BY_USER)
        || ((reqUser.role.idRole == UserRoles.MANAGER || reqUser.role.idRole == UserRoles.ADMIN) && (reqDTO.idStatus == Statuses.AGREED || reqDTO.idStatus == Statuses.REJECTED))) 
      {
        order[0].update({
          idStatus: reqDTO.idStatus
        });
////      order[0].save();
        return new COrderResponse(order[0]);
      }
    } else {
      if (!order) {
        console.log('CUserService.changeStatus: Попытка изменить статус у несуществующей записи. idOrder = ' + reqDTO.idOrder);
      } else {
        console.log('CUserService.changeStatus: Колизия в БД, найдено больше одного пользователя. idOrder = ' + reqDTO.idOrder);
      }
    }
  }
}

export default new COrderService();