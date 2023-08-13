import classes from '../styles/order.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IRole, IRoom, IStatus, Statuses, UserRoles } from '../model/data';
import { IOrderChangeStatusRequest, IOrderDeleteRequest, IOrderListRequest, IOrderResponse } from '../model/order';
import { API_USER_ORDER } from '../settings';
import { addAuthHeader } from '../functions/headers.func';
import { IUserResponse } from '../model/user';
import { getOrderList } from '../functions/orderFunc';
import { IOrderFilters } from '../model/order';
import { AgreementPage } from '../pages/AgreementPage';

// для списка кнопок
export interface ButtonOrder {
  id: string
  text: string
}
const createData = (
  id: string,
  text: string): ButtonOrder => ({ id, text })

const ButtonsOrder = [
  //createData('change', 'Изменить'),
  createData('cancel', 'Отменить'),
  createData('approve', 'Согласовать'),
  createData('reject', 'Отклонить'),
]

export interface IOrderProps {
  idOrder: number
  dtBegin: Date
  dtEnd: Date
  sComment: string
  iSeatingPlaces: number
  bHasProjector: number
  bHasInternet: number
  room: IRoom
  status: IStatus
}

// забираем настоящую роль
let UserResponse: IUserResponse;
const userStorage = localStorage.getItem('user');
if (userStorage !== null) {
  UserResponse = JSON.parse(userStorage);
}

let filters: IOrderFilters;

export function Order(props: IOrderProps) {
  let status: string;

  const navigate = useNavigate();

  const edit = () => navigate('order')
  const [showForm, setShowForm] = useState(false)
  const openForm = () => setShowForm(true)

  if (!UserResponse) 
    navigate('/');

  filters = {   // Для запросов от пользователя
    userActive: (UserResponse?.role.idRole == UserRoles.USER) ? true : false,       // true - вернуть активные (status = на согласовании и согласованные + время окончания аренды ещё не истекло)
    userRejected: false,     // true - вернуть отклонённые (status = отклонённые, отменённые + просроченные)
    userNotDeleted: false,   // true - вернуть все, кроме удалённых
    userDeletedOnly: false,  // true - вернуть все удалённые
    userDeletedAdd: false,		// true - вернуть все (удалённые и не удалённые)
    // Для запросов от согласующего
    agreeActive: (UserResponse?.role.idRole == UserRoles.MANAGER) ? true : false,           // true - вернуть активные для согласования (status = на согласовании и не просроченные)
    agreeRejected: false,         // true - вернуть отклонённые (status = отклонённые этим согласующим)
    agreeAgreemented: false,		   // true - вернуть все согласованные (status = согласованные этим согласующим)
    agreeNotDeleted: false,
    agreeDeletedOnly: false,
    agreeDeletedAdd: false,
    // Для запросов от администратора
    adminActive: (UserResponse?.role.idRole == UserRoles.MANAGER) ? true : false,          // true - вернуть активные для согласования (status = на согласовании и не просроченные)
    adminRejected: false,        // true - вернуть отклонённые (status = отклонённые)
    adminAgreemented: false,     // true - вернуть все согласованные (status = согласованные)
    adminNotDeleted: false,
    adminDeletedOnly: false,
    adminDeletedAdd: false
  };

  async function getOrdersAgr(navig: string) {
    const orders = await getOrderList(filters);
    console.log(orders);
    navigate(navig)
  }

  let headersSet = new Headers();
  headersSet.append('Content-Type', 'application/json; charset=utf-8');
  addAuthHeader(headersSet);

  const handleClick = async (event: React.MouseEvent<unknown>, id: IOrderResponse["idOrder"], btn_id: string) => {
    // согласовать
    if (btn_id == 'approve') {
      let OrderChangeStatusRequest: IOrderChangeStatusRequest;
      OrderChangeStatusRequest = { idOrder: props.idOrder, idStatus: 11 };
      let responseChangeStatusRequest = await fetch(API_USER_ORDER + '/changeStatus', {
        method: 'POST',
        headers: headersSet,
        body: JSON.stringify(OrderChangeStatusRequest)
      });
      if (responseChangeStatusRequest.status == 200) {
        alert('Заявка согласована!');
        // чтобы кнопки пропали 
        status = 'approve';      
      } else {
        console.log('Согласование не удалось! ошибка отправки запроса');
      }
    }

    //отклонить
    else if (btn_id == 'reject') {
      let OrderChangeStatusRequest: IOrderChangeStatusRequest;
      OrderChangeStatusRequest = { idOrder: props.idOrder, idStatus: 12 };
      let responseChangeStatusRequest = await fetch(API_USER_ORDER + '/changeStatus', {
        method: 'POST',
        headers: headersSet,
        body: JSON.stringify(OrderChangeStatusRequest)
      });
      if (responseChangeStatusRequest.status == 200) {
        alert('Заявка отклонена!');
        // чтобы кнопки пропали 
        props.status.idStatus = Statuses.REJECTED;  
        status = 'reject'  
      } else {
        console.log('Bad_resp');
      }
    }

    //Удалить
    else if (btn_id == 'cancel') {
      let OrderDeleteRequest: IOrderDeleteRequest;
      OrderDeleteRequest = { idOrder: props.idOrder };
      let responseDeleteOrder = await fetch(API_USER_ORDER + '/exec', {
        method: 'DELETE',
        headers: headersSet,
        body: JSON.stringify(OrderDeleteRequest)
      });
      console.log('удаление заявки')
      console.log(responseDeleteOrder)
      console.log(OrderDeleteRequest)
      if (responseDeleteOrder.status == 200) {
        // Удалилось
        alert('Заявка отменена!');
        status = 'cancel';     
      } else {
        alert('Удалени Заявка не получилось!');
      }
    }
    else navigate(`order`); // как передать параметры ??
  }

  const getFormatedDate = (dt: Date) => {
    let sss = new Date(dt)
    //let day: string = (dt.getDate() > 9 ? dt.getDate().toString() : '0' + dt.getDate().toString());
    //let month: string = (dt.getMonth() > 9 ? dt.getMonth().toString() : '0' + dt.getMonth().toString());  
    return sss.toLocaleDateString('ru-Ru') + '  ' + sss.toLocaleTimeString('ru-Ru');
    //return day + '.' + month + '.' + dt.getFullYear() + '  ' + dt.getHours() + ':' + dt.getMinutes();
  }

  useEffect(() => {
    // Обновляем
    if (status == 'approve') {
      props.status.idStatus = Statuses.AGREED;
      props.status.sStatus = 'Согласовано';
    }
    else if (status == 'reject') {
      props.status.idStatus = Statuses.REJECTED;
      props.status.sStatus = 'Отклонено';
    }
    else if (status == 'cancel') {
      props.status.idStatus = Statuses.CANCELED_BY_USER;
      props.status.sStatus = 'Отменено';}
      else { }
  });

  return (
    <div className={classes.card}>
      <div className={classes.item}>Время аренды: {getFormatedDate(props.dtBegin)} - {getFormatedDate(props.dtEnd)}</div>
      <div className={classes.item}>Здание : {props.room.sAddress}</div>
      <div className={classes.item}>Помещение : {props.room.sCabinet}</div>
      <div className={classes.item}>
        <a>Количество человек: <a> </a>{props.iSeatingPlaces}</a><a> </a>
        <a>Наличие проектора <input className={classes.checkbox} type='checkbox' checked={props.bHasProjector ? true : false} /></a><a> </a>
        <a>Наличие интернета <input className={classes.checkbox} type='checkbox' checked={props.bHasInternet ? true : false} /></a>
      </div>
      <div className={classes.item}>Комментарий: <a> </a> {props.sComment}</div>
      <div className={classes.item}>Статус согласования : {props.status.sStatus}</div>
      <div className={classes.buttons}>
        {ButtonsOrder.map(item =>
          <button
            id={item.id}
            className={((UserResponse?.role.idRole == UserRoles.USER && (item.id == 'approve' || item.id == 'reject' || props.status.sStatus == 'Согласовано' || props.status.sStatus == 'Отменено')) ||
              (UserResponse?.role.idRole == UserRoles.MANAGER && (item.id == 'cancel' || item.id == 'change' || props.status.sStatus == 'Согласовано' || props.status.sStatus == 'Отклонено'))) ? classes.button_nodisplay : classes.button}
            onClick={evt => handleClick(evt, props.idOrder, item.id)}>{item.text}</button>
        )}
      </div>
    </div>
  )
}


function getOrdersMenu(arg0: string) {
  throw new Error('Function not implemented.');
}
//      <div className={classes.item}>Время аренды: {getFormatedDate(props.dtBegin)} - {getFormatedDate(props.dtEnd)}</div>
/*
      <div className={classes.item}>Здание :             {props.sAdress}</div>  ????
      <div className={classes.item}>Помещение :           {props.sCabinet}</div>*/
