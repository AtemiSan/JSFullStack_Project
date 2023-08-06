import { Op } from "sequelize";
import { IUserToken } from "../dtos/data.dto";
import { IRegisterRoomRequest, IRoomListRequest, IRoomListResponse, IRoomRequest, IRoomResponse, IRoomUpdateRequest } from "../dtos/room.dto";
import Meeting_Room from "../models/room.model";
import roomModel from "../models/room.model";
import { Statuses } from "../models/status.model";
import { UserRoles } from "../models/user.model";
import { sequelize } from "../sequelize";


class CRoomService {
  //================================================================================================================================================================================
  async getRoom(reqDTO: IRoomRequest) {
    const room = await roomModel.findAll({
      where: {
        idRoom: reqDTO.idRoom
      },
      paranoid: false
    });

    if (room && room.length == 1) {
      return room[0] as IRoomResponse;
    } else {
      if (!room) {
        console.log('CRoomService.getRoom: Попытка получить несуществующую запись. idRoom = ' + reqDTO.idRoom);
      } else {
        console.log('CRoomService.getRoom: Колизия в БД, найдено более одной записи. idRoom = ' + reqDTO.idRoom);
      }
    }
  }

  //================================================================================================================================================================================
  async registerRoom(reqDTO: IRegisterRoomRequest) {
    const room = await roomModel.create(
      {
        sAddress: reqDTO.sAddress,
        sCabinet: reqDTO.sCabinet,
        iSeatingPlaces: reqDTO.iSeatingPlaces,
        bHasProjector: reqDTO.bHasProjector,
        bHasInternet: reqDTO.bHasInternet,
        idStatus: Statuses.DISABLED,
        dtInEnable: null
      }
    )
    return true;
  }

  //================================================================================================================================================================================
  async updateRoom(reqDTO: IRoomUpdateRequest) {
    const room = await roomModel.findAll({
      where: {
        idRoom: reqDTO.idRoom
      },
      paranoid: false
    })

    if (room && room.length == 1) {
      room[0].update({
        sAddress: reqDTO.sAddress,
        sCabinet: reqDTO.sCabinet,
        iSeatingPlaces: reqDTO.iSeatingPlaces,
        bHasProjector: reqDTO.bHasProjector,
        bHasInternet: reqDTO.bHasInternet,
        idStatus: reqDTO.idStatus,
        dtInEnable: reqDTO.dtInEnable
      });
////      room[0].save();
      return room[0] as IRoomResponse;
    } else {
      if (!room) {
        console.log('CRoomService.updateRoom: Попытка обновить несуществующую запись. idRoom = ' + reqDTO.idRoom);
      } else {
        console.log('CRoomService.updateRoom: Колизия в БД, найдено более одной записи. idRoom = ' + reqDTO.idRoom);
      }
    }
  }

  //================================================================================================================================================================================
  async deleteRoom(reqDTO: IRoomRequest) {
    const room = await roomModel.findAll({
      where: {
        idRoom: reqDTO.idRoom
      }
    })

    if (room && room.length == 1) {
      room[0].destroy();
////      room[0].save();
      return true;
    } else {
      if (!room) {
        console.log('Попытка удалить несуществующую запись. idRoom = ' + reqDTO.idRoom);
      } else {
        console.log('CRoomService.deleteRoom: Колизия в БД, найдено более одной записи. idRoom = ' + reqDTO.idRoom);
      }
    }
  }

  //================================================================================================================================================================================
  async getList(reqUser: IUserToken, reqDTO: IRoomListRequest) {
    let rooms: Meeting_Room[];
    //===========================================================
    // Только свободные переговорные на указанный интервал
    if (reqDTO.filters.dtBegin && reqDTO.filters.dtEnd) {
      rooms = await sequelize.query(`SELECT A.* FROM MEETING_ROOM A WHERE ID_STATUS = ${Statuses.ENABLED} ` +
          `AND NOT EXISTS(SELECT ID_ORDER FROM ORDER_MEETING_ROOM B WHERE A.ID_ROOM = B.ID_ROOM AND B.ID_STATUS = ${Statuses.AGREED} ` +
            `AND (${reqDTO.filters.dtBegin} BETWEEN B.DT_BEGIN AND B.DT_END ` +
              `OR ${reqDTO.filters.dtEnd} BETWEEN B.DT_BEGIN AND B.DT_END ` +
              `OR B.DT_BEGIN BETWEEN ${reqDTO.filters.dtBegin} AND ${reqDTO.filters.dtEnd}))`, 
        {
          model: roomModel,
          mapToModel: true 
      });
     rooms = await roomModel.findAll({
        where: {
          idStatus: Statuses.ENABLED,
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
        }
      });
    //===========================================================
    // Все переговорные, кроме удалённых (для администратора)
    } else if (reqDTO.filters.adminNotDeleted && reqUser.role.idRole == UserRoles.ADMIN) {
      rooms = await roomModel.findAll();
    //===========================================================
    // Все удалённые заявки (для администратора)
    } else if (reqDTO.filters.adminDeletedOnly && reqUser.role.idRole == UserRoles.ADMIN) {
      rooms = await roomModel.findAll({
        where: {
          dtDel: {
            [Op.not]: null
          }
        }
      });
    //===========================================================
    // Все заявки (для администратора)
    } else if (reqDTO.filters.adminDeletedAdd && reqUser.role.idRole == UserRoles.ADMIN) {
      rooms = await roomModel.findAll({
        paranoid: false
      });
    } else 
      return null;
    return rooms as IRoomListResponse;
  }
}

export default new CRoomService();