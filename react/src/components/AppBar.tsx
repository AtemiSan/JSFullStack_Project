import React, { useEffect, useState } from 'react';
import classes from '../styles/app_bar.module.scss';
import common from '../styles/common.module.scss';
import no_avatar from '../img/no_avatar_30.png';
import menu from '../img/menu.png';
import { useNavigate } from 'react-router-dom';
import { getButtonsMenu } from '../functions/screenFunc';
import { IRole, UserRoles } from '../model/data';
import { IUserResponse } from '../model/user';

export interface IAppBarProps {

}

// список кнопок меню
const ButtonsMenu = getButtonsMenu();

  // забираем настоящую роль
  let UserResponse: IUserResponse;
  const userStorage = localStorage.getItem('user');
  if (userStorage != null) {
    UserResponse = JSON.parse(userStorage);
  }
  
export function AppBar({ }: IAppBarProps) {

  const [userName, setUserName] = useState('');

  useEffect(() => {
    let user: string = localStorage.getItem('userName') ? String(localStorage.getItem('userName')) : 'Вы не авторизованы';
    setUserName(user);
  }, []);

  const navigate = useNavigate();
  /*let role: IRole = {
    idRole: 0,
    sRole: 'админ'
  };*/

  /*
    return (
      <div className={classes.main}>
        <div className={classes.left_side}>
          <div className={classes.mainMenu} onClick = {() => {}}>
            <img src={menu}></img>         
          </div>
  
          <div className={common.title}>Аренда переговорных</div>
        </div>
        <div className={classes.right_side}>
          <div className={classes.user_name}>{userName}</div>
          <div className={common.round_btn} onClick = {() => {navigate('/')}}>
            <img src={no_avatar}></img>
          </div>
        </div>
      </div>
    )
  */
  return (
    <div className={classes.main}>
      <div className={classes.left_side}>
        <div className={classes.dropdown}>
          <button className={classes.dropbtn}><img src={menu}></img></button>
          <div className={classes.dropdown_content}>
            {ButtonsMenu.map(item =>
              <a><div
                className={((UserResponse.role.idRole == UserRoles.USER && (item.id == 'registration' || item.id == 'agreement')) ||
                            (UserResponse.role.idRole == UserRoles.MANAGER && (item.id == 'lk' || item.id == 'create_order' || item.id == 'registration')) ) ? classes.nodisplay : classes.btn}
                onClick={() => { navigate(item.navigate) }}>{item.text}</div></a>
            )}
          </div>
        </div>
        <div className={common.title}>Аренда переговорных</div>
      </div>
      <div className={classes.right_side}>
        <div className={classes.user_name}>{userName}</div>
        <div className={common.round_btn} onClick={() => { navigate('/') }}>
          <img src={no_avatar}></img>
        </div>
      </div>
    </div>
  )
}

// ||
//(UserResponse.role.idRole == UserRoles.ADMIN && (item.id == 'lk' || item.id == 'create_order' || item.id == 'agreement'))