import { useState } from 'react';
import common from '../styles/common.module.scss';
import classes from '../styles/profile.module.scss';
import { getFreeBuiding, getFreeBuiding1, getFreeCabinets } from '../functions/avialable';
import { Building } from '../model/data';
import { IRoomFilters, IRoomListResponse } from '../model/room';
import { API_USER_ORDER } from '../settings';
import { addAuthHeader } from '../functions/headers.func';
import { IRegisterOrderRequest } from '../model/order';
import { useNavigate } from 'react-router-dom';

export interface ICreateOrderPageProps {

}

export function CreateOrderPage({ }: ICreateOrderPageProps) {
  // список свободных зданий
  //let buildings: IRoomListResponse;
  let roomFilters: IRoomFilters
  //let places: Array<Building>;

  const navigate = useNavigate();

  const [fDtBegin, setDtBegin] = useState('');
  const [fDtEnd, setDtEnd] = useState('');
  const [fSeatingPlaces, setSeatingPlaces] = useState(0);
  const [fHasProjector, setHasProjector] = useState(false);
  const [fHasInternet, setHasInternet] = useState(false);
  const [fComment, setComment] = useState('');

  const handleChangeDtBegin = async (e: React.FormEvent<HTMLInputElement>) => {
    setDtBegin(e.currentTarget.value);
    // заполняем фильтр
    let roomFilters: IRoomFilters;
    if (fDtBegin !== '' && fDtEnd !== '') {
      roomFilters = { dtBegin: new Date(fDtBegin), dtEnd: new Date(fDtEnd), adminNotDeleted: false, adminDeletedOnly: false, adminDeletedAdd: false };
      // кидаем запрос
      places = await getFreeBuiding(roomFilters);
    }
  }

  const handleChangefDtEnd = async (e: React.FormEvent<HTMLInputElement>) => {
    setDtEnd(e.currentTarget.value);
    // заполняем фильтр
    let roomFilters: IRoomFilters;
    if (fDtBegin !== '' && fDtEnd !== '') {
      roomFilters = { dtBegin: new Date(fDtBegin), dtEnd: new Date(fDtEnd), adminNotDeleted: false, adminDeletedOnly: false, adminDeletedAdd: false };
      // кидаем запрос
      places = await getFreeBuiding(roomFilters);
    }
  }

  const handleChangeSeatingPlaces = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== '' && e.currentTarget.valueAsNumber <= 0) {
      alert('Введите положительное число человек!')
    } else {
      setSeatingPlaces(e.currentTarget.valueAsNumber)
    };
  }

  const handleChangeHasProjector = (e: React.FormEvent<HTMLInputElement>) => {
    setHasProjector(!fHasProjector);
  }

  const handleChangeHasInternet = (e: React.FormEvent<HTMLInputElement>) => {
    setHasInternet(!fHasInternet);
  }

  const handleChangeComment = (e: React.FormEvent<HTMLInputElement>) => {
    setComment(e.currentTarget.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fDtBegin === '') {
      alert('Необходимо указать Время начала.');
    } else if (fDtEnd === '') {
      alert('Необходимо указать Время окончания.');
    } else if (fDtBegin === fDtEnd) {
      alert('Время начала и окончания должны отличаться.')
    } else if (new Date(fDtEnd) < new Date(fDtBegin)) {
      alert('Время начала не может быть меньше времени окончания.')
    } else {
      let RegisterOrderRequest: IRegisterOrderRequest = {
        dtBegin: new Date(fDtBegin),
        dtEnd: new Date(fDtEnd),
        sComment: fComment,
        iSeatingPlaces: fSeatingPlaces,
        bHasProjector: fHasProjector,
        bHasInternet: fHasInternet,
        idRoom: 0
      };   // номер комнаты передать ??

      // добавление заявки IRegisterOrderRequest / Response 200
      let headersSet = new Headers();
      headersSet.append('Content-Type', 'application/json; charset=utf-8');
      addAuthHeader(headersSet);
      let responsePostOrder = await fetch(API_USER_ORDER + '/exec', {
        method: 'POST',
        headers: headersSet,
        body: JSON.stringify(RegisterOrderRequest)
      });
      if (responsePostOrder.status == 200) {
        alert('Заявка отправлена');
        // переход на список Заявок
        navigate('/lk');
      } else {
        alert('Заявка не отправлена. Оишбка при отправке');
      }
    }
  }

  // список свободных зданий
  let places = getFreeBuiding1();

  // список свободных кабинетов
  const cabinets = getFreeCabinets();

  return (
    <div className={classes.main}>
      <div className={classes.card}>
        <div className={common.title}>Подать заявку</div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <label >
            Дата и время начала
            <input className={classes.input} type='datetime-local' value={fDtBegin} onChange={handleChangeDtBegin} required />
          </label>
          <label>
            Дата и время окончания
            <input className={classes.input} type='datetime-local' value={fDtEnd} onChange={handleChangefDtEnd} required />
          </label>
          <label>
            Количество человек
            <input className={classes.input} type='number' placeholder='Количество человек' value={fSeatingPlaces} onChange={handleChangeSeatingPlaces} required />
          </label>
          <label className={classes.block}>
            <input className={classes.checkbox} type='checkbox' checked={fHasProjector} onChange={handleChangeHasProjector} />
            Наличие проектора
          </label>
          <label className={classes.block}>
            <input className={classes.checkbox} type='checkbox' checked={fHasInternet} onChange={handleChangeHasInternet} />
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
            <input className={classes.input} type='string' placeholder='Комментарий' value={fComment} onChange={handleChangeComment} />
          </label>
          <input className={classes.btn} type='submit' name='submit' value='Отправить' />
        </form>
      </div>
    </div>
  )
}