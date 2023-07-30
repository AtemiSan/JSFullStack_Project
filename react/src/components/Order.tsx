import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import classes from '../styles/order.module.scss';
import { IOrder } from '../model/Order';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IRole } from '../model/reference';

/*export interface IOrderProps {
  dtTime_from: Date;
  dtTime_to: Date;
  sAdress: string;
  sCabinet: string;
  sState: string;
}*/

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
export function Order(props: IOrder, role: IRole) { //IOrderProps) {

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

  //role = 'user'
  role = 'manager'
  
  return (
    <div className={classes.card}>
      <div className={classes.item}>Время аренды: {getFormatedDate(props.dtBegin)} - {getFormatedDate(props.dtEnd)}</div>
      <div className={classes.item}>Здание :             {props.room.sAddress}</div>  
      <div className={classes.item}>Помещение :           {props.room.sCabinet}</div>
      <div className={classes.item}>Статус согласования : {props.status.sStatus}</div>
      <div className={classes.buttons}> 
        {ButtonsOrder.map(item =>
        <button
          id={item.id}
          className={( ( role == 'user' && ( item.id == 'approve' || item.id == 'reject' || props.status.sStatus == 'Согласовано') ) ||
                       ( role == 'manager' && ( item.id == 'cancel' || item.id == 'change' || props.status.sStatus == 'Согласовано' || props.status.sStatus == 'Отклонено') ))? classes.button_nodisplay : classes.button} 
          onClick={evt => handleClick(evt, props.idOrder, item.id)}>{item.text}</button>
          )}          
      </div>
    </div>
  )
}

/*
      <div className={classes.item}>Здание :             {props.sAdress}</div>  ????
      <div className={classes.item}>Помещение :           {props.sCabinet}</div>*/
