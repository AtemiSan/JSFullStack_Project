import { Op } from "sequelize";
import { IUserToken } from "../dtos/data.dto";
import { IRegisterRoomRequest, IRoomFreeListRequest, IRoomListRequest, IRoomListResponse, IRoomRequest, IRoomResponse, IRoomUpdateRequest } from "../dtos/room.dto";
import Meeting_Room from "../models/room.model";
import roomModel from "../models/room.model";
import statusModel, { Statuses } from "../models/status.model";
import { UserRoles } from "../models/user.model";
import { sequelize } from "../sequelize";
import { CRoomResponse, getRoomListResponse } from "../classes/room.classes";
import { IsNull } from "sequelize-typescript";


class CRoomService {
  //================================================================================================================================================================================
  async getRoom(reqDTO: IRoomRequest) {
    const room = await roomModel.findAll({
      where: {
        idRoom: reqDTO.idRoom
      },
      include: statusModel,
      paranoid: false
    });

    if (room && room.length == 1) {
      return new CRoomResponse(room[0]);
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
      return new CRoomResponse(room[0]);
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
  async getFreeList(reqDTO: IRoomFreeListRequest) {
    let rooms: Meeting_Room[];
    //===========================================================
    // Только свободные переговорные на указанный интервал
    console.log(reqDTO);
    if (reqDTO.dtBegin && reqDTO.dtEnd) {
      let addonCond = '';
      if (reqDTO.bHasInternet)
        addonCond += 'AND B_HAS_INTERNET = 1 ';
      if (reqDTO.bHasProjector) 
        addonCond += 'AND B_HAS_PROJECTOR = 1 ';
      rooms = await sequelize.query(`SELECT A.ID_ROOM as "idRoom", A.S_ADDRESS as "sAddress", A.S_CABINET as "sCabinet", A.I_SEATING_PLACES as "iSeatingPlaces", ` +
          `A.B_HAS_PROJECTOR as "bHasProjector", A.B_HAS_INTERNET as "bHasInternet", A.ID_STATUS as "idStatus", A.DT_IN_ENABLE as "dtInEnable", A.DT_INS as "dtInst", ` +
          `A.DT_UPD as "dtUpd", A.DT_DEL as "dtDel" ` +
        `FROM MEETING_ROOM A ` +
        `WHERE ID_STATUS = ${Statuses.ENABLED} AND I_SEATING_PLACES >= ${reqDTO.iSeatingPlaces} ${addonCond} ` +
          `AND NOT EXISTS(SELECT ID_ORDER FROM ORDER_MEETING_ROOM B WHERE A.ID_ROOM = B.ID_ROOM AND B.ID_STATUS = ${Statuses.AGREED} ` +
            `AND ('${reqDTO.dtBegin}' BETWEEN B.DT_BEGIN AND B.DT_END ` +
              `OR '${reqDTO.dtEnd}' BETWEEN B.DT_BEGIN AND B.DT_END ` +
              `OR B.DT_BEGIN BETWEEN '${reqDTO.dtBegin}' AND '${reqDTO.dtEnd}'))`, 
        {
          model: roomModel,
          mapToModel: true 
      });
    } else {
      return null;
    }
    console.log(rooms)
    return getRoomListResponse(rooms);
  }

  //================================================================================================================================================================================
  async getList(reqUser: IUserToken, reqDTO: IRoomListRequest) {
    let rooms: Meeting_Room[];
    //===========================================================
    // Только свободные переговорные на указанный интервал
    console.log(reqDTO);
    if (reqDTO.filters.dtBegin && reqDTO.filters.dtEnd) {
      rooms = await sequelize.query(`SELECT A.ID_ROOM as "idRoom", A.S_ADDRESS as "sAddress", A.S_CABINET as "sCabinet", A.I_SEATING_PLACES as "iSeatingPlaces", ` +
          `A.B_HAS_PROJECTOR as "bHasProjector", A.B_HAS_INTERNET as "bHasInternet", A.ID_STATUS as "idStatus", A.DT_IN_ENABLE as "dtInEnable", A.DT_INS as "dtInst", ` +
          `A.DT_UPD as "dtUpd", A.DT_DEL as "dtDel" ` +
        `FROM MEETING_ROOM A ` +
        `WHERE ID_STATUS = ${Statuses.ENABLED} ` +
          `AND NOT EXISTS(SELECT ID_ORDER FROM ORDER_MEETING_ROOM B WHERE A.ID_ROOM = B.ID_ROOM AND B.ID_STATUS = ${Statuses.AGREED} ` +
            `AND ('${reqDTO.filters.dtBegin}' BETWEEN B.DT_BEGIN AND B.DT_END ` +
              `OR '${reqDTO.filters.dtEnd}' BETWEEN B.DT_BEGIN AND B.DT_END ` +
              `OR B.DT_BEGIN BETWEEN '${reqDTO.filters.dtBegin}' AND '${reqDTO.filters.dtEnd}'))`, 
        {
          model: roomModel,
          mapToModel: true 
      });
    //===========================================================
    // Все переговорные, кроме удалённых (для администратора)
    } else if (reqDTO.filters.adminNotDeleted && reqUser.role.idRole == UserRoles.ADMIN) {
      rooms = await roomModel.findAll({ include: statusModel });
    //===========================================================
    // Все удалённые заявки (для администратора)
    } else if (reqDTO.filters.adminDeletedOnly && reqUser.role.idRole == UserRoles.ADMIN) {
      rooms = await roomModel.findAll({
        where: {
          dtDel: {
            [Op.not]: null
          }
        },
        include: statusModel
      });
    //===========================================================
    // Все заявки (для администратора)
    } else if (reqDTO.filters.adminDeletedAdd && reqUser.role.idRole == UserRoles.ADMIN) {
      rooms = await roomModel.findAll({
        include: statusModel,
        paranoid: false
      });
    } else {
      return null;
    }
    console.log(rooms)
    return getRoomListResponse(rooms);
  }
}

export default new CRoomService();