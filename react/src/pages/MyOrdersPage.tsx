import { randomInt } from 'crypto';
import { Order } from '../components/Order';
import common from '../styles/common.module.scss';
import { getOrderList, getOrders } from '../functions/orderFunc';
import { IOrderFilters, IOrderListRequest, IOrderListResponse, IOrderResponse } from '../model/order';
import { IRole, IRoom, IStatus, IUser } from '../model/data';
import React, { useEffect } from 'react';
import { addAuthHeader } from '../functions/headers.func';
import { API_USER_ORDER } from '../settings';

export interface IMyOrdersPageProps {

}

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


let filters: IOrderFilters;
filters = {   // Для запросов от пользователя
  userActive: true,       // true - вернуть активные (status = на согласовании и согласованные + время окончания аренды ещё не истекло)
  userRejected: false,     // true - вернуть отклонённые (status = отклонённые, отменённые + просроченные)
  userNotDeleted: false,   // true - вернуть все, кроме удалённых
  userDeletedOnly: false,  // true - вернуть все удалённые
  userDeletedAdd: false,		// true - вернуть все (удалённые и не удалённые)
  // Для запросов от согласующего
  agreeActive: false,           // true - вернуть активные для согласования (status = на согласовании и не просроченные)
  agreeRejected: false,         // true - вернуть отклонённые (status = отклонённые этим согласующим)
  agreeAgreemented: false,		   // true - вернуть все согласованные (status = согласованные этим согласующим)
  agreeNotDeleted: false,
  agreeDeletedOnly: false,
  agreeDeletedAdd: false,
  // Для запросов от администратора
  adminActive: false,          // true - вернуть активные для согласования (status = на согласовании и не просроченные)
  adminRejected: false,        // true - вернуть отклонённые (status = отклонённые)
  adminAgreemented: false,     // true - вернуть все согласованные (status = согласованные)
  adminNotDeleted: false,
  adminDeletedOnly: false,
  adminDeletedAdd: false
};
// получем списов заявок
//let rows: IOrderListResponse = [];
//let rows = getOrders(filters);   // заглушка
//const oderList = getOrderList(filters); // из бэка
//let rows: Array<IOrderListResponse>;
//rows = oderList.map(item => createDataB(1, item.sAddress))

// забираем настоящие pfzdrb
let rows: IOrderListResponse;

export function MyOrdersPage({ }: IMyOrdersPageProps) {

  //rows = (await oderList).map(item => createData(item.idOrder))

  /*const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Заявка отправлена');
  }*/

  /*useEffect(() => {
     //rows = getOrderList(filters); 
     rows = getOrders(filters);
   }, [])*/

  const userStorage = localStorage.getItem('orders');
  console.log('userStorage')
  console.log(userStorage)
  if (userStorage != null) {
    rows = JSON.parse(userStorage);
    
  }

  if (rows != null) {
    return (
      <>
        <div className={common.title}>
          Мои заявки
        </div>
        {rows.map(item =>
          <Order
            idOrder={item.idOrder}
            dtBegin={item.dtBegin}
            dtEnd={item.dtEnd}
            sComment={item.sComment}
            iSeatingPlaces={item.iSeatingPlaces}
            bHasProjector={item.bHasProjector}
            bHasInternet={item.bHasInternet}
            room={item.room}
            status={item.status}
          />
        )}
      </>
    )
  } else
    return (
      <div className={common.title}>
        Заявок нет
      </div>);
}
