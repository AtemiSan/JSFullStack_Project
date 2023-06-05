import React, { useEffect, useState } from 'react';
import classes from '../styles/app_bar.module.scss';
import common from '../styles/common.module.scss';
import no_avatar from '../img/no_avatar_30.png';
import menu from '../img/menu.png';
import { useNavigate } from 'react-router-dom';

export interface IAppBarProps {

}

export function AppBar({}: IAppBarProps) {

  const [userName, setUserName] = useState('');

  useEffect(() => {
    let user: string = localStorage.getItem('userName') ? String(localStorage.getItem('userName')) : 'Вы не авторизованы';
    setUserName(user);
  }, []);

  const navigate = useNavigate();

  return (
    <div className={classes.main}>
      <div className={classes.left_side}>
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
/*
        <div className={classes.mainMenu} onClick = {() => {}}>
          <img src={menu}></img>
        </div>
/* */
}