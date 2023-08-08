import classes from '../styles/order.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IOrder, IRole, UserRoles } from '../model/reference';

// для списка кнопок
export interface ButtonOrder {
  id: string
  text: string
}
const createData = (
  id: string,
  text: string): ButtonOrder => ({ id, text })

const ButtonsOrder = [
  createData('change', 'Изменить'),
  createData('cancel', 'Отменить'),
  createData('approve', 'Согласовать'),
  createData('reject', 'Отклонить'),
]
export function Order(props: IOrder, role: IRole) {

  const navigate = useNavigate();
  const edit = () => navigate('order')
  const [showForm, setShowForm] = useState(false)
  const openForm = () => setShowForm(true)

  const handleClick = (event: React.MouseEvent<unknown>, id: IOrder["idOrder"], btn_id: string ) => {
    if ( btn_id == 'approve' ) alert('Заявка согласована!');
    else if ( btn_id == 'reject' ) alert('Заявка отклонена!');
    else if ( btn_id == 'cancel' ) alert('Заявка отменена!');
    else navigate(`order`) ; // как передать параметры ??
}

  const getFormatedDate = (dt: Date) => {
    let day: string = (dt.getDate() > 9 ? dt.getDate().toString() : '0' + dt.getDate().toString());
    let month: string = (dt.getMonth() > 9 ? dt.getMonth().toString() : '0' + dt.getMonth().toString());

    return day + '.' + month + '.' + dt.getFullYear() + '  ' + dt.getHours() + ':' + dt.getMinutes();
  }

  role.idRole = UserRoles.MANAGER;
  
  return (
    <div className={classes.card}>
      <div className={classes.item}>Время аренды: {getFormatedDate(props.dtBegin)} - {getFormatedDate(props.dtEnd)}</div>
      <div className={classes.item}>Здание : {props.room.sAddress}</div>  
      <div className={classes.item}>Помещение :           {props.room.sCabinet}</div>
      <div className={classes.item}>
        <a>Количество человек: <a> </a>{props.iSeatingPlaces}</a><a> </a>
        <a>Наличие проектора <input className={classes.checkbox} type='checkbox' checked={props.bHasProjector ? true : false}/></a><a> </a>
        <a>Наличие интернета <input className={classes.checkbox} type='checkbox' checked={props.bHasInternet ? true : false}/></a>
        </div>
        <div className={classes.item}>Комментарий: <a> </a> {props.sComment}</div>  
      <div className={classes.item}>Статус согласования : {props.status.sStatus}</div>
      <div className={classes.buttons}> 
        {ButtonsOrder.map(item =>
        <button
          id={item.id}
          className={( ( role.idRole == UserRoles.USER && ( item.id == 'approve' || item.id == 'reject' || props.status.sStatus == 'Согласовано') ) ||
                       ( role.idRole == UserRoles.MANAGER && ( item.id == 'cancel' || item.id == 'change' || props.status.sStatus == 'Согласовано' || props.status.sStatus == 'Отклонено') ))? classes.button_nodisplay : classes.button} 
          onClick={evt => handleClick(evt, props.idOrder, item.id)}>{item.text}</button>
          )}          
      </div>
    </div>
  )
}

/*
      <div className={classes.item}>Здание :             {props.sAdress}</div>  ????
      <div className={classes.item}>Помещение :           {props.sCabinet}</div>*/
