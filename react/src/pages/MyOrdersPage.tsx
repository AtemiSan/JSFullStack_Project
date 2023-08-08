import { randomInt } from 'crypto';
import { Order } from '../components/Order';
import common from '../styles/common.module.scss';
import { getOrders } from '../functions/orderFunc';

export interface IMyOrdersPageProps {

}
  // получем списов заявок
  const rows = getOrders()

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
