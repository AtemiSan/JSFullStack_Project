import { IOrderFilters, IOrderListRequest, IOrderListResponse, IOrderResponse } from "../model/order";
import { IDepartment, IDolgnost, IRole, IRoom, IStatus, IUser } from "../model/data";
import { API_USER_ORDER } from "../settings";
import { addAuthHeader } from "./headers.func";

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
    bHasProjector: number,
    bHasInternet: number,
    room: IRoom,
    status: IStatus,
    userAgreement: IUser,
    dtIns: Date,
    dtUpd: Date,
    dtDel: Date): IOrderResponse => ({ idOrder, dtBegin, dtEnd, sComment, iSeatingPlaces, bHasProjector, bHasInternet, room, status, userAgreement, dtIns, dtUpd, dtDel })

const crRoom = (
    idRoom: number,
    sAddress: string,
    sCabinet: string,
    iSeatingPlaces: number,
    bHasProjector: number,
    bHasInternet: number,
    status: IStatus,
    dtInEnable: Date,
    dtIns: Date,
    dtUpd: Date,
    dtDel: Date): IRoom => ({ idRoom, sAddress, sCabinet, iSeatingPlaces, bHasProjector, bHasInternet, status, dtInEnable, dtIns, dtUpd, dtDel })

const crStatus = (
    idStatus: number,
    sStatus: string,
    sComment: string
): IStatus => ({ idStatus, sStatus, sComment })

const crUser = (
    idUser: number,
    sFam: string,
    sName: string,
    sOtch: string,
    sPhone: string,
    sEmail: string,
    dolg: IDolgnost,
    dep: IDepartment,
    role: IRole,
    dtIns: Date,
    dtUpd: Date,
    dtDel: Date
): IUser => ({ idUser, sFam, sName, sOtch, sPhone, sEmail, dolg, dep, role, dtIns, dtUpd, dtDel })

let OrderListResponse: Array<IOrderListResponse>;

// это будет запрос возвращать
let Orders: IOrderListResponse = [
    createData(123, new Date(), new Date(), 'ком 1', 1, 1, 0,
        crRoom(1, 'Здание1', '#100', 10, 1, 1, crStatus(1, 'статус', ''), new Date(), new Date(), new Date(), new Date()),
        crStatus(1, 'статус', ''),
        {
            idUser: 1, sFam: '', sName: '', sOtch: '', sPhone: '', sEmail: '',
            dolg: { idDolg: 1, sDolg: '' }, dep: { idDep: 1, sDep: '' }, role: { idRole: 1, sRole: '' },
            dtIns: new Date(), dtUpd: new Date(), dtDel: new Date()
        },
        new Date(), new Date(), new Date()
    ),
    createData(555, new Date(), new Date(), 'ком 3', 1, 1, 1,
        crRoom(1, 'Здание3', '#300', 30, 1, 1, crStatus(1, 'статус', ''), new Date(), new Date(), new Date(), new Date()),
        crStatus(1, 'статус', ''),
        {
            idUser: 2, sFam: '', sName: '', sOtch: '', sPhone: '', sEmail: '',
            dolg: { idDolg: 1, sDolg: '' }, dep: { idDep: 1, sDep: '' }, role: { idRole: 1, sRole: '' },
            dtIns: new Date(), dtUpd: new Date(), dtDel: new Date()
        },
        new Date(), new Date(), new Date()
    ),
    /*createData(123, new Date(), new Date(), 'Здание 2', '№100', 2, 'Согласовано'),
    createData(222, new Date(), new Date(), 'Здание 3', '№405', 3, 'Отклонено'),
    createData(333, new Date(), new Date(), 'Здание 4', '№541', 5, 'Согласовано'),*/
    /* createData(123, new Date(), new Date(), 'комent 1', 1, true, false, 'Здание 2', '№100', 'Согласовано'),
     createData(222, new Date(), new Date(), 'ком 2', 3, false, false, 'Здание 3', '№405', 'Отклонено'),
     createData(333, new Date(), new Date(), 'ком 3', 2, true, true, 'Здание 4', '№541', 'Согласовано'),    */
]

let Orderss: IOrderListResponse;
export function getOrders(filters: IOrderFilters) {
    //const Orderss = getOrderList(filters);
    getOrderList(filters).then(function(result) {
        console.log('результат запроса заявок');
        console.log(result);
        Orderss = result; 
    })
    
    return Orderss
}


// это запрос из бэка
async function getOrderList(filters: IOrderFilters) {
    let headersSet = new Headers();
    headersSet.append('Content-Type', 'application/json; charset=utf-8');
    addAuthHeader(headersSet);
    
    let OrderListRequest: IOrderListRequest;
    OrderListRequest = { iPage: 0, iCountOnPage: 0, filters: filters };

    let responseOrders = await fetch(API_USER_ORDER + '/getList', {
        method: 'POST',
        headers: headersSet,
        body: JSON.stringify(OrderListRequest)
    });

    console.log(responseOrders);

    if (responseOrders.status == 200) {
        console.log('Orders_OK');      
        let resultOrders = await responseOrders.json() as IOrderListResponse;
        Orders = resultOrders
    } else {
        console.log('Not_resp');
    }
    return (
        //OrderListResponse
        Orders
    )
}

// поиск заказа по id
export function getOrder(id: number): IOrderResponse | null {
    const order = Orders.find(item => item.idOrder == id);
    if (order)
        return order;
    else
        return null;
}  