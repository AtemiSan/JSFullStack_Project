import { useState } from 'react';
import common from '../styles/common.module.scss';
import classes from '../styles/profile.module.scss';
import { OrderMain } from '../components/OrderMain';
import { useParams } from 'react-router-dom';
import { equal } from 'assert';
import { getOrder } from '../functions/orderFunc';
import { IOrder } from '../model/reference';
import { type } from '@testing-library/user-event/dist/type';

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
const row: IOrder = getOrder(id);

  return (
    <div className={classes.main}>
      <div className={classes.card}>
        <div className={common.title}>{headText} №{row.idOrder} </div>
        <form className={classes.form} onSubmit={handleSubmit}>

          <input className={classes.btn} type='submit' name='submit' value='Отправить' />
        </form>
      </div>
    </div>
  )
}

/*
         <OrderMain 
            idOrder={row.idOrder}
            dtBegin={row.dtBegin} 
            dtEnd={row.dtEnd} 
            {room.sAddress}={row.room.sAddress} 
            sCabinet={row.room.sCabinet}
            iSeatingPlaces={row.iSeatingPlaces}
            status={row.status} 
            sComment={row.sComment}
            bHasProjector={row.bHasProjector}
            bHasInternet={row.bHasInternet}
            />
*/


/*
            sAdress={row.sAdress} 
            sCabinet={row.sCabinet} */

            // userAgreement={row.userAgreement}

            //room={row.room}