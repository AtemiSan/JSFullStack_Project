import { useState } from 'react';
import common from '../styles/common.module.scss';
import classes from '../styles/profile.module.scss';

export interface ICreateOrderPageProps {

}

export function CreateOrderPage({}: ICreateOrderPageProps) {

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
    alert('Заявка отправлена');
  }

  return (
    <div className={classes.main}>
      <div className={classes.card}>
        <div className={common.title}>Подать заявку</div>
        <form className={classes.form} onSubmit={handleSubmit}>
        <label>
            Дата и время
            <input className={classes.input} type='datetime-local' value={dtTime} onChange={handleChangeDtTime} required />
          </label>
          <label>
            Количество человек
            <input className={classes.input} type='number' placeholder='Количество человек' value={seatingPlaces} onChange={handleChangeSeatingPlaces} />
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
              <option selected disabled>Здание</option>
              <option value="1">Здание 1</option>
              <option value="2">Здание 2</option>
              <option value="3">Здание 3</option>
            </select>
          </label>    
          <label>
            Кабинет
            <select className={classes.input} required>
              <option selected disabled>Кабинет</option>
              <option value="1">№215</option>
              <option value="2">№135</option>
              <option value="3">№114</option>
            </select>
          </label>    

          <input className={classes.btn} type='submit' name='submit' value='Отправить' />
        </form>
      </div>
    </div>
  )
}