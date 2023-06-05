import classes from '../styles/order.module.scss';

export interface IOrderProps {
  dtTime: Date;
  sAdress: string;
  sCabinet: string;
  sState: string;
}

export function Order(props: IOrderProps) {

  const getFormatedDate = (dt: Date) => {
    let day: string = (dt.getDate() > 9 ? dt.getDate().toString() : '0' + dt.getDate().toString());
    let month: string = (dt.getMonth() > 9 ? dt.getMonth().toString() : '0' + dt.getMonth().toString());
  
    return day + '.' + month + '.' + dt.getFullYear() + '  ' + dt.getHours() + ':' + dt.getMinutes();
  }

  return (
    <div className={classes.card}>
      <div className={classes.item}>{getFormatedDate(props.dtTime)}</div>
      <div className={classes.item}>{props.sAdress}</div>
      <div className={classes.item}>{props.sCabinet}</div>
      <div className={classes.item}>{props.sState}</div>
    </div>
  )
}