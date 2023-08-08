import { useState } from 'react';
import common from '../styles/common.module.scss';
import classes from '../styles/profile.module.scss';
import { OrderMain } from '../components/OrderMain';
import { useParams } from 'react-router-dom';
import { getOrder } from '../functions/orderFunc';
import { IOrderResponse } from '../model/order';

export interface IOrderPageProps {

}

export function OrderPage({ }: IOrderPageProps) {

  let State = useParams().sState
 // let Id = useParams().id
  
  //const courseId = Number(useParams().id)

  const headText = ( State = 'На согласовании' ) ? "Изменить заявку" : "Просмотр заявки"

  const [dtTime, setDtTime] = useState('');
  const [seatingPlaces, setSeatingPlaces] = useState('');
  const [hasProjector, setHasProjector] = useState(false);
  const [hasInternet, setHasInternet] = useState(false);

  const handleChangeDtTime = (e: React.FormEvent<HTMLInputElement>) => {
    setDtTime(e.currentTarget.value);
  }

  const handleChangeSeatingPlaces = (e: React.FormEvent<HTMLInputElement>) => {
    //    if (e.currentTarget.value[e.currentTarget.value.length()-1] )
    setSeatingPlaces(e.currentTarget.value);
  }

  const handleChangeHasProjector = (e: React.FormEvent<HTMLInputElement>) => {
    setHasProjector(!hasProjector);
  }

  const handleChangeHasInternet = (e: React.FormEvent<HTMLInputElement>) => {
    setHasInternet(!hasInternet);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Заявка сохранена');
  }

  // надо как то получить id
  let id: number = 123;

  // получем заявку
  const row: IOrderResponse | null = getOrder(id);

  if (row) {
    return (
      <div className={classes.main}>
        <div className={classes.card}>
          <div className={common.title}>{headText} №{row.idOrder} </div>
          <form className={classes.form} onSubmit={handleSubmit}>
            <OrderMain 
              idOrder={row.idOrder}
              dtBegin={row.dtBegin} 
              dtEnd={row.dtEnd} 
              sComment={row.sComment}
              iSeatingPlaces={row.iSeatingPlaces}
              bHasProjector={row.bHasProjector}
              bHasInternet={row.bHasInternet}
              room={row.room} 
              status={row.status}
            />
            <input className={classes.btn} type='submit' name='submit' value='Отправить' />
          </form>
        </div>
      </div>
    )
  } else
    return null;
}
