import classes from '../styles/menu.module.scss';
import common from '../styles/common.module.scss';
import { useNavigate } from 'react-router-dom';
import { IRole, UserRoles } from '../model/data';
import { getButtonsMenu } from '../functions/screenFunc';
import { IUserResponse } from '../model/user';
import { getDepartments1, getDolgnosts1, getRoles1 } from '../functions/referenceFunc';
import { IOrderFilters } from '../model/order';
import { getOrderList } from '../functions/orderFunc';

export interface IMenuProps {

}

// для списка кнопок
const ButtonsMenu = getButtonsMenu();

// забираем настоящую роль
let UserResponse: IUserResponse;
const userStorage = localStorage.getItem('user');
if (userStorage != null) {
  UserResponse = JSON.parse(userStorage);
}

let filters: IOrderFilters;

export function Menu({ }: IMenuProps) {
  //let role: IRole;

  const navigate = useNavigate();


  // тут при переходе на след страницу будете готовые списки в памяти
  const dolg = getDolgnosts1();
  const dep = getDepartments1();
  const roles = getRoles1();

  filters = {   // Для запросов от пользователя
    userActive: (UserResponse.role.idRole == UserRoles.USER) ? true : false,       // true - вернуть активные (status = на согласовании и согласованные + время окончания аренды ещё не истекло)
    userRejected: false,     // true - вернуть отклонённые (status = отклонённые, отменённые + просроченные)
    userNotDeleted: false,   // true - вернуть все, кроме удалённых
    userDeletedOnly: false,  // true - вернуть все удалённые
    userDeletedAdd: false,		// true - вернуть все (удалённые и не удалённые)
    // Для запросов от согласующего
    agreeActive: (UserResponse.role.idRole == UserRoles.MANAGER) ? true : false,           // true - вернуть активные для согласования (status = на согласовании и не просроченные)
    agreeRejected: false,         // true - вернуть отклонённые (status = отклонённые этим согласующим)
    agreeAgreemented: false,		   // true - вернуть все согласованные (status = согласованные этим согласующим)
    agreeNotDeleted: false,
    agreeDeletedOnly: false,
    agreeDeletedAdd: false,
    // Для запросов от администратора
    adminActive: (UserResponse.role.idRole == UserRoles.MANAGER) ? true : false,          // true - вернуть активные для согласования (status = на согласовании и не просроченные)
    adminRejected: false,        // true - вернуть отклонённые (status = отклонённые)
    adminAgreemented: false,     // true - вернуть все согласованные (status = согласованные)
    adminNotDeleted: false,
    adminDeletedOnly: false,
    adminDeletedAdd: false
  };
  async function getOrdersMenu(navig: string) {
    const orders = await getOrderList(filters);
    console.log(orders);
    navigate(navig)
  }

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
            onClick={() => { (item.id == 'lk' || item.id == 'agreement') ? getOrdersMenu(item.navigate) : navigate(item.navigate) }}>{item.text}</div>
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