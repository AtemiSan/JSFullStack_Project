import classes from '../styles/menu.module.scss';
import common from '../styles/common.module.scss';
import { useNavigate } from 'react-router-dom';
import { IRole, UserRoles } from '../model/data';
import { getButtonsMenu } from '../functions/screenFunc';

export interface IMenuProps {

}

// для списка кнопок
/*
export interface ButtonMenu {
  id: string
  navigate: string
  text: string
}
const createData = (
  id: string,
  navigate: string,
  text: string): ButtonMenu => ({ id, navigate, text })

const ButtonsMenu = [
  createData('profile', 'profile', 'Профиль'),
  createData('lk', '/lk', 'Мои заявки'),
  createData('create_order', 'create_order','Подать заявку'),
  createData('registration', 'registration', 'Регистрация'),
  createData('agreement', 'agreement', 'Согласование'),
  createData('references','references', 'Справочники')
]
*/

    const ButtonsMenu = getButtonsMenu();
    
export function Menu({}: IMenuProps) {
  let role: IRole;

  const navigate = useNavigate();
  
  return (
    <>
      <div className={common.title}>
        Меню
      </div>
      <div className={classes.main}>
      {ButtonsMenu.map(item =>
        <div
          className={( ( role.idRole == UserRoles.USER && ( item.id == 'registration' || item.id == 'agreement' )) ||
                       ( role.idRole == UserRoles.MANAGER && ( item.id == 'lk' || item.id == 'create_order' || item.id == 'registration') ) ||
                       ( role.idRole == UserRoles.ADMIN && ( item.id == 'lk' || item.id == 'create_order' || item.id == 'agreement' ))) ? classes.nodisplay : classes.btn} 
          onClick={() => {navigate(item.navigate)}}>{item.text}</div>
          )}       
      </div>
    </>
  )
}

/*
      <div className={classes.btn} onClick={() => {navigate('profile')}}>Профиль</div>
      <div className={classes.btn} onClick={() => {navigate('/lk')}}>Мои заявки</div>
      <div className={classes.btn} onClick={() => {navigate('create_order')}}>Подать заявку</div>
      <div className={classes.btn} onClick={() => {navigate('registration')}}>Регистрация</div>
      <div className={classes.btn} onClick={() => {navigate('agreement')}}>Согласование</div>
      */