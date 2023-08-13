import { randomInt } from 'crypto';
import { Order } from '../components/Order';
import common from '../styles/common.module.scss';
import { getOrders } from '../functions/orderFunc';
import { IOrderFilters, IOrderListResponse } from '../model/order';
import { useEffect } from 'react';

export interface IAgreementPageProps {

}

let filters: IOrderFilters;
filters = {   // Для запросов от пользователя
  userActive: false,       // true - вернуть активные (status = на согласовании и согласованные + время окончания аренды ещё не истекло)
  userRejected: false,     // true - вернуть отклонённые (status = отклонённые, отменённые + просроченные)
  userNotDeleted: false,   // true - вернуть все, кроме удалённых
  userDeletedOnly: false,  // true - вернуть все удалённые
  userDeletedAdd: false,		// true - вернуть все (удалённые и не удалённые)
  // Для запросов от согласующего
  agreeActive: true,           // true - вернуть активные для согласования (status = на согласовании и не просроченные)
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
let rows: IOrderListResponse;

// получем списов заявок
//let rows = getOrders(filters);   // заглушка
//let rows2 = getOrderList(filters); // из бэка

export function AgreementPage({ }: IAgreementPageProps) {

  const userStorage = localStorage.getItem('orders');
  console.log('userStorage')
  console.log(userStorage)
  if (userStorage != null) {
    rows = JSON.parse(userStorage);
  }

  useEffect(() => {
    // Обновляем
    const userStorage = localStorage.getItem('orders');
    console.log('userStorage')
    console.log(userStorage)
    if (userStorage != null) {
      rows = JSON.parse(userStorage);
    }
  });

  if (rows != null) {
    return (
      <>
        <div className={common.title}>
          Согласование заявки
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


/*
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
        */

/*
          id={item.id}
          dtTime_from={item.dtTime_from}
          dtTime_to={item.dtTime_to}
          sAdress={item.sAdress}
          sCabinet={item.sCabinet}
          seatingPlaces={item.seatingPlaces}
          sState={item.sState}*/