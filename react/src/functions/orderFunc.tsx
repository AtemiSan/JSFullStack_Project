import { IOrder } from "../model/Order"
import { IDepartment, IDolgnost, IRole, IRoom, IStatus, IUser } from "../model/reference";

// функции для работы с заявками
/*const createData = (
    id: number,
    dtTime_from: Date,
    dtTime_to: Date,
    sAdress: string,
    sCabinet: string,
    seatingPlaces: number,
    sState: string): IOrderData => ({ id, dtTime_from, dtTime_to, sAdress, sCabinet, seatingPlaces, sState })*/

const createData = (
    idOrder: number,
    dtBegin: Date,
    dtEnd: Date,
    sComment: string,
    iSeatingPlaces: number,
    bHasProjector: boolean,
    bHasInternet: boolean,
    room: IRoom,
    status: IStatus,
    /* userAgreement: IUser,*/
    bDel: boolean): IOrder => ({ idOrder, dtBegin, dtEnd, sComment, iSeatingPlaces, bHasProjector, bHasInternet, room, status, bDel }) //userAgreement,

const crRoom = (
    idRoom: number,
    sAddress: string,
    sCabinet: string,
    iSeatingPlaces: number,
    bHasProjector: boolean,
    bHasInternet: boolean,
    status: IStatus,
    dtInEnable: Date,
    bDel: boolean): IRoom => ({ idRoom, sAddress, sCabinet, iSeatingPlaces, bHasProjector, bHasInternet, status, dtInEnable, bDel })

const crStatus = (
    idStatus: number,
    sStatus: string,
    sComment: string
): IStatus => ({ idStatus, sStatus, sComment })

/*   const crUser =(
       sFam: string,
       sName: string,
       sOtch: string,
       sPhone: string,
       sEmail: string,
       dolg: IDolgnost,
       dep: IDepartment,
       role: IRole,
       bDel: boolean      
   ): IUser => ({sFam, sName, sOtch, sPhone, sEmail, dolg, dep, role, bDel})*/

const Orders = [
    createData(123, new Date(), new Date(), 'ком 1', 1, true, false, crRoom(1, 'Здание1', '#100', 10, true, true, crStatus(1, 'статус', ''), new Date(), true), crStatus(1, 'статус', ''), true),
    createData(555, new Date(), new Date(), 'ком 3', 1, true, false, crRoom(1, 'Здание3', '#300', 30, true, true, crStatus(1, 'статус', ''), new Date(), true), crStatus(1, 'статус', ''), true),
    /*createData(125, new Date(), new Date(), 'Здание 2', '№100', 2, 'Согласовано'),
    createData(222, new Date(), new Date(), 'Здание 3', '№405', 3, 'Отклонено'),
    createData(333, new Date(), new Date(), 'Здание 4', '№541', 5, 'Согласовано'),*/
]

export function getOrders() {

    return (
        Orders
    )
}

let order: IOrder;

export function getOrder(id: number) {
    //let order: IOrderData;
    //const findorder = Orders.find(function (item, index, array) { ( item.id = id ) ? true : false })
    const findorder = Orders.find(item => item.idOrder == id)

    if (typeof findorder !== 'undefined') {
        order = findorder
    }
    return (
        order
    )
}  