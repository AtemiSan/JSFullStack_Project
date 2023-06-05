import classes from '../styles/menu.module.scss';
import common from '../styles/common.module.scss';
import { useNavigate } from 'react-router-dom';

export interface IMenuProps {

}

export function Menu({}: IMenuProps) {

  const navigate = useNavigate();

  return (
    <>
      <div className={common.title}>
        Меню
      </div>
      <div className={classes.main}>
      <div className={classes.btn} onClick={() => {navigate('profile')}}>Профиль</div>
      <div className={classes.btn} onClick={() => {navigate('/lk')}}>Мои заявки</div>
      <div className={classes.btn} onClick={() => {navigate('create_order')}}>Подать заявку</div>
      <div className={classes.btn} onClick={() => {navigate('registration')}}>Регистрация</div>
      <div className={classes.btn} onClick={() => {navigate('agreement')}}>Согласование</div>
      </div>
    </>
  )
}