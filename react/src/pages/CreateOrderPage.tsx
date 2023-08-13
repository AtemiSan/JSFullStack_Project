import { useState } from 'react';
import common from '../styles/common.module.scss';
import classes from '../styles/profile.module.scss';
import { UserRoles } from '../model/data';
import { IRoomFreeListRequest, IRoomListResponse } from '../model/room';
import { API_USER_ORDER } from '../settings';
import { addAuthHeader } from '../functions/headers.func';
import { IRegisterOrderRequest } from '../model/order';
import { useNavigate } from 'react-router-dom';
import { IUserResponse } from '../model/user';
import { getOrderList } from '../functions/orderFunc';
import { getFreeRoomsQuery } from '../functions/room.func';

export interface ICreateOrderPageProps {

}

// забираем настоящую роль
let UserResponse: IUserResponse;
const userStorage = localStorage.getItem('user');
if (userStorage !== null) {
  UserResponse = JSON.parse(userStorage);
}

export function CreateOrderPage({ }: ICreateOrderPageProps) {

  const roomsSelect = document.querySelector('#rooms');

  const navigate = useNavigate();

  const [fDtBegin, setDtBegin] = useState('');
  const [fDtEnd, setDtEnd] = useState('');
  const [fSeatingPlaces, setSeatingPlaces] = useState(0);
  const [fHasProjector, setHasProjector] = useState(false);
  const [fHasInternet, setHasInternet] = useState(false);
  const [fComment, setComment] = useState('');
  const [fSelectedRoom, setSelectedRoom] = useState('');

  const clearSelectRooms = () => {
    if (roomsSelect !== null)
      roomsSelect.innerHTML = '<option selected disabled>';
    setSelectedRoom('');
  }

  const loadSelectRooms = (roomsList: IRoomListResponse) => {
    if (roomsSelect !== null)
      roomsSelect.innerHTML = `<option selected disabled></option>${roomsList.map(item => '<option value=' + item.idRoom + '>' + item.sAddress + ', ' + item.sCabinet + '</option>')}`;
    setSelectedRoom('');
  }

  const handleChangeDtBegin = async (e: React.FormEvent<HTMLInputElement>) => {
    setDtBegin(e.currentTarget.value);
    clearSelectRooms();
  }

  const handleChangefDtEnd = async (e: React.FormEvent<HTMLInputElement>) => {
    setDtEnd(e.currentTarget.value);
    clearSelectRooms();
  }

  const handleChangeSeatingPlaces = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== '' && e.currentTarget.valueAsNumber <= 0) {
      alert('Введите положительное число человек!')
    } else {
      setSeatingPlaces(e.currentTarget.valueAsNumber)
      clearSelectRooms();
    };
  }

  const handleChangeHasProjector = (e: React.FormEvent<HTMLInputElement>) => {
    setHasProjector(!fHasProjector);
    clearSelectRooms();
  }

  const handleChangeHasInternet = (e: React.FormEvent<HTMLInputElement>) => {
    setHasInternet(!fHasInternet);
    clearSelectRooms();
  }

  const handleChangeComment = (e: React.FormEvent<HTMLInputElement>) => {
    setComment(e.currentTarget.value);
  }

  const handleChangeRoom = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedRoom(e.currentTarget.value);
  }

  const checkFiedsGetRooms = () => {
    if (fDtBegin === '') {
      alert('Необходимо указать Время начала.');
      return false;
    } else if (fDtEnd === '') {
      alert('Необходимо указать Время окончания.');
      return false;
    } else if (fDtBegin === fDtEnd) {
      alert('Время начала и окончания должны отличаться.')
      return false;
    } else if (new Date(fDtEnd) < new Date(fDtBegin)) {
      alert('Время начала не может быть меньше времени окончания.')
      return false;
    } else if (fSeatingPlaces <= 0) {
      alert('Введите положительное число человек!');
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  // Загрузка списка свободных переговорных
  async function getFreeRooms() {
    if (checkFiedsGetRooms()) {
      const roomFreeListRequest: IRoomFreeListRequest = { 
        dtBegin: new Date(fDtBegin), 
        dtEnd: new Date(fDtEnd), 
        iSeatingPlaces: fSeatingPlaces,
        bHasProjector: fHasProjector ? 1 : 0,
        bHasInternet: fHasInternet ? 1 : 0
      };
      const freeRooms: IRoomListResponse = await getFreeRoomsQuery(roomFreeListRequest);
      loadSelectRooms(freeRooms);
    }
  }

  // сохранить/отправить Заявку
  async function sendOrder() {
    if (!checkFiedsGetRooms() || fSelectedRoom == '') 
      return;
    let req: IRegisterOrderRequest = {
      dtBegin: new Date(fDtBegin),
      dtEnd: new Date(fDtEnd),
      sComment: fComment,
      iSeatingPlaces: fSeatingPlaces,
      bHasProjector: fHasProjector ? 1 : 0,
      bHasInternet: fHasInternet ? 1 : 0,
      idRoom: +fSelectedRoom
    };

    // добавление заявки IRegisterOrderRequest / Response 200
    let headersSet = new Headers();
    headersSet.append('Content-Type', 'application/json; charset=utf-8');
    addAuthHeader(headersSet);
    let responsePostOrder = await fetch(API_USER_ORDER + '/exec', {
      method: 'POST',
      headers: headersSet,
      body: JSON.stringify(req)
    });
    if (responsePostOrder.status == 201) {
      alert('Заявка отправлена');
      // переход на список Заявок
      getOrdersMenu('')
      navigate('/lk');
    } else {
      alert('Заявка не отправлена. Оишбка при отправке');
    }
  }

  const filters = {   // Для запросов от пользователя
    userActive: (UserResponse.role.idRole == UserRoles.USER) ? true : false,       // true - вернуть активные (status = на согласовании и согласованные + время окончания аренды ещё не истекло)
    userRejected: false,     // true - вернуть отклонённые (status = отклонённые, отменённые + просроченные)
    userNotDeleted: false,   // true - вернуть все, кроме удалённых
    userDeletedOnly: false,  // true - вернуть все удалённые
    userDeletedAdd: false,		// true - вернуть все (удалённые и не удалённые)
    // Для запросов от согласующего
    agreeActive: (UserResponse.role.idRole == UserRoles.MANAGER) ? true : false,           // true - вернуть активные для согласования (status = на согласовании и не просроченные)
    agreeRejected: false,         // true - вернуть отклонённые (status = отклонённые этим согласующим)
    agreeAgreemented: false,		   // true - вернуть все согласованные (status = согласованные этим согласующим)
    agreeNotDeleted: false,
    agreeDeletedOnly: false,
    agreeDeletedAdd: false,
    // Для запросов от администратора
    adminActive: (UserResponse.role.idRole == UserRoles.MANAGER) ? true : false,          // true - вернуть активные для согласования (status = на согласовании и не просроченные)
    adminRejected: false,        // true - вернуть отклонённые (status = отклонённые)
    adminAgreemented: false,     // true - вернуть все согласованные (status = согласованные)
    adminNotDeleted: false,
    adminDeletedOnly: false,
    adminDeletedAdd: false
  };

  async function getOrdersMenu(navig: string) {
    const orders = await getOrderList(filters);
    //navigate(navig)
  }

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

          <input className={classes.btn} type='submit' name='Rooms' value='Получить свободные кабинеты' onClick={ () => { getFreeRooms() } } />

          <label>
            Переговорная
            <select id="rooms" className={classes.input} onChange={handleChangeRoom}>
              <option selected disabled></option>
            </select>
          </label>
          <label>
            Комментарий
            <input className={classes.input} type='string' placeholder='Комментарий' value={fComment} onChange={handleChangeComment} />
          </label>
          <input className={classes.btn} type='submit' name='submit' value='Отправить' onClick={() => { sendOrder() }} />
        </form>
      </div>
    </div>
  )
}
