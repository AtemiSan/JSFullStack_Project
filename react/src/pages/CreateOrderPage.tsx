import { useState } from 'react';
import common from '../styles/common.module.scss';
import classes from '../styles/profile.module.scss';
import { getFreeBuiding, getFreeCabinets } from '../functions/avialable';

export interface ICreateOrderPageProps {

}

export function CreateOrderPage({ }: ICreateOrderPageProps) {

  const [dtTimeF, setDtTimeF] = useState('');
  const [dtTimeT, setDtTimeT] = useState('');  
  const [seatingPlaces, setSeatingPlaces] = useState('');
  const [hasProjector, setHasProjector] = useState(false);
  const [hasInternet, setHasInternet] = useState(false);

  const handleChangeDtTimeF = (e: React.FormEvent<HTMLInputElement>) => {
    setDtTimeF(e.currentTarget.value);
  }
  const handleChangeDtTimeT = (e: React.FormEvent<HTMLInputElement>) => {
    setDtTimeT(e.currentTarget.value);
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
    alert('Заявка отправлена');
  }

  // списов свободных зданий
  const places = getFreeBuiding();
  // список свободных кабинетов
  const cabinets = getFreeCabinets();

  return (
    <div className={classes.main}>
      <div className={classes.card}>
        <div className={common.title}>Подать заявку</div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <label >
            Дата и время начала 
            <input className={classes.input} type='datetime-local' value={dtTimeF} onChange={handleChangeDtTimeF} required />
          </label>
          <label>
            Дата и время окончания
            <input className={classes.input} type='datetime-local' value={dtTimeT} onChange={handleChangeDtTimeT} required />
          </label>            
          <label>
            Количество человек
            <input className={classes.input} type='number' placeholder='Количество человек' value={seatingPlaces} onChange={handleChangeSeatingPlaces} required/>
          </label>
          <label className={classes.block}>
            <input className={classes.checkbox} type='checkbox' checked={hasProjector} onChange={handleChangeHasProjector} />
            Наличие проектора
          </label>
          <label className={classes.block}>
            <input className={classes.checkbox} type='checkbox' checked={hasInternet} onChange={handleChangeHasInternet} />
            Наличие интернета
          </label>
          <label>
            Здание
            <select className={classes.input} required>
            <option selected disabled></option>
              {places.map(item => <option value={item.id}> {item.Building} </option>)}
            </select>
          </label>
          <label>
            Кабинет
            <select className={classes.input} required>
              <option selected disabled></option>
              {cabinets.map(item => <option value={item.id}> {item.Cabinet} </option>)}
            </select>
          </label>
          <label>
            Комментарий
            <input className={classes.input} type='string' placeholder='Комментарий' value={seatingPlaces} onChange={handleChangeSeatingPlaces} />
          </label>          
          <input className={classes.btn} type='submit' name='submit' value='Отправить' />
        </form>
      </div>
    </div>
  )
}