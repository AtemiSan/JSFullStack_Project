import { randomInt } from 'crypto';
import { Order } from '../components/Order';
import common from '../styles/common.module.scss';
import { getOrderList, getOrders } from '../functions/orderFunc';
import { IOrderFilters } from '../model/order';
import { IRole } from '../model/data';

export interface IMyOrdersPageProps {

}

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
let rows = getOrders();   // заглушка
//let rows2 = getOrderList(filters); // из бэка

export function MyOrdersPage({ }: IMyOrdersPageProps) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Заявка отправлена');
  }

  if (rows) {
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
    return null;
}
