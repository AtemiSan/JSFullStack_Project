import { randomInt } from 'crypto';
import { Order } from '../components/Order';
import common from '../styles/common.module.scss';
import { getOrders } from '../functions/orderFunc';

export interface IAgreementPageProps {

}

// получем списов заявок
const rows = getOrders()

export function AgreementPage({ }: IAgreementPageProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Заявка отправлена');
  }

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
        room={item.room} 
        iSeatingPlaces={item.iSeatingPlaces}
        status={item.status}
        sComment={item.sComment}
        bHasProjector={item.bHasProjector}
        bHasInternet={item.bHasInternet}
        bDel={item.bDel}           
        />)}     
    </>
  )
}

/*
          id={item.id}
          dtTime_from={item.dtTime_from}
          dtTime_to={item.dtTime_to}
          sAdress={item.sAdress}
          sCabinet={item.sCabinet}
          seatingPlaces={item.seatingPlaces}
          sState={item.sState}*/