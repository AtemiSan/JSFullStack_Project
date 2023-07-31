import { IOrder, IOrderData } from "../model/Order"
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
   /* const createData = (
        idOrder: number,
        dtBegin: Date,
        dtEnd: Date,
        sComment: string,
        iSeatingPlaces: number,
        bHasProjector: boolean,
        bHasInternet: boolean,
        sAdress: string,
        sCabinet: string,
        status: string): IOrderData => ({ idOrder, dtBegin, dtEnd, sComment, iSeatingPlaces, bHasProjector, bHasInternet,  sAdress, sCabinet, status}) //userAgreement,
*/    
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

   const crUser =(
       sFam: string,
       sName: string,
       sOtch: string,
       sPhone: string,
       sEmail: string,
       dolg: IDolgnost,
       dep: IDepartment,
       role: IRole,
       bDel: boolean      
   ): IUser => ({sFam, sName, sOtch, sPhone, sEmail, dolg, dep, role, bDel})

// это будет запрос возвращать
const Orders = [
    createData(123, new Date(), new Date(), 'ком 1', 1, true, false, crRoom(1, 'Здание1', '#100', 10, true, true, crStatus(1, 'статус', ''), new Date(), true), crStatus(1, 'статус', ''), true),
    createData(555, new Date(), new Date(), 'ком 3', 1, true, true, crRoom(1, 'Здание3', '#300', 30, true, true, crStatus(1, 'статус', ''), new Date(), true), crStatus(1, 'статус', ''), true),
    /*createData(123, new Date(), new Date(), 'Здание 2', '№100', 2, 'Согласовано'),
    createData(222, new Date(), new Date(), 'Здание 3', '№405', 3, 'Отклонено'),
    createData(333, new Date(), new Date(), 'Здание 4', '№541', 5, 'Согласовано'),*/
   /* createData(123, new Date(), new Date(), 'комent 1', 1, true, false, 'Здание 2', '№100', 'Согласовано'),
    createData(222, new Date(), new Date(), 'ком 2', 3, false, false, 'Здание 3', '№405', 'Отклонено'),
    createData(333, new Date(), new Date(), 'ком 3', 2, true, true, 'Здание 4', '№541', 'Согласовано'),    */
]

export function getOrders() {

    return (
        Orders
    )
}

// поиск заказа по id
let order: IOrderData;
export function getOrder(id: number) {
    //let order: IOrderData;
    //const findorder = Orders.find(function (item, index, array) { ( item.id = id ) ? true : false })
    const findorder = Orders.find(item => item.idOrder == id)

    if (typeof findorder !== 'undefined') {
        order.idOrder = findorder.idOrder
        order.dtBegin = findorder.dtBegin
        order.dtEnd = findorder.dtEnd
        order.sComment = findorder.sComment
        order.iSeatingPlaces = findorder.iSeatingPlaces
        order.bHasProjector = findorder.bHasProjector
        order.bHasInternet = findorder.bHasInternet
        order.sAdress = findorder.room.sAddress
        order.sCabinet = findorder.room.sCabinet
        order.status = findorder.status.sStatus
    }
    return (
        order
    )
}  