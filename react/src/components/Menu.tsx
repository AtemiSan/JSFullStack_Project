import classes from '../styles/menu.module.scss';
import common from '../styles/common.module.scss';
import { useNavigate } from 'react-router-dom';
import { IRole, UserRoles } from '../model/data';
import { getButtonsMenu } from '../functions/screenFunc';
import { IUserResponse } from '../model/user';

export interface IMenuProps {

}

// для списка кнопок
const ButtonsMenu = getButtonsMenu();

export function Menu({ }: IMenuProps) {
  //let role: IRole;

  const navigate = useNavigate();
  // забираем настоящую роль
  let UserResponse: IUserResponse;
  const userStorage = localStorage.getItem('user');
  if (userStorage != null) {
    UserResponse = JSON.parse(userStorage);
  }


  //role = {idRole: 0, sRole: 'admin'}
  //role = {idRole: 1, sRole: 'manager'}
  //role = { idRole: 2, sRole: 'user' }

  return (
    <>
      <div className={common.title}>
        Меню
      </div>
      <div className={classes.main}>
        {ButtonsMenu.map(item =>
          <div
            className={((UserResponse.role.idRole == UserRoles.USER && (item.id == 'registration' || item.id == 'agreement')) ||
                        (UserResponse.role.idRole == UserRoles.MANAGER && (item.id == 'lk' || item.id == 'create_order' || item.id == 'registration'))
              ) ? classes.nodisplay : classes.btn}
            onClick={() => { navigate(item.navigate) }}>{item.text}</div>
        )}
      </div>
    </>
  )
}

// || (UserResponse.role.idRole == UserRoles.ADMIN && (item.id == 'lk' || item.id == 'create_order' || item.id == 'agreement'))
/*
      <div className={classes.btn} onClick={() => {navigate('profile')}}>Профиль</div>
      <div className={classes.btn} onClick={() => {navigate('/lk')}}>Мои заявки</div>
      <div className={classes.btn} onClick={() => {navigate('create_order')}}>Подать заявку</div>
      <div className={classes.btn} onClick={() => {navigate('registration')}}>Регистрация</div>
      <div className={classes.btn} onClick={() => {navigate('agreement')}}>Согласование</div>
      */