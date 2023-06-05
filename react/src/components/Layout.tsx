import classes from '../styles/layout.module.scss';
import { Outlet } from "react-router-dom";
import { AppBar } from "./AppBar";
import { Menu } from './Menu';

export interface ILayoutProps {

}

export function Layout({}: ILayoutProps) {

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