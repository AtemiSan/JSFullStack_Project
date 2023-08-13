import classes from '../styles/layout.module.scss';
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar } from "./AppBar";
import { Menu } from './Menu';
import { useEffect } from 'react';
import { checkUserLoggedIn } from '../functions/user.func';

export interface ILayoutProps {

}

export function Layout({}: ILayoutProps) {

  const navigate = useNavigate();

  useEffect(() => {
    if (!checkUserLoggedIn())
      navigate('/');
  }, []);

  return (
    <div className={classes.main}>
      <AppBar />
      <div className={classes.body}>
        <div className={classes.left_side}>
          <Menu />
        </div>
        <div className={classes.right_side}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}