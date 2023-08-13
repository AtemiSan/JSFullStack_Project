import { useState } from 'react';
import common from '../styles/common.module.scss';
import classes from '../styles/profile.module.scss';
import { getDepartments, getDolgnosts, getRoles } from '../functions/referenceFunc';
import { addAuthHeader } from '../functions/headers.func';
import { API_ADMIN_USER } from '../settings';
import { IRegisterUserRequest } from '../model/user';
import { IDepListResponse, IDolgListResponse, IRoleListResponse } from '../model/data';

export interface IRegistrationPageProps {

}

// забираем настоящие должности
let DolgListResponse: IDolgListResponse;
const userStorage = localStorage.getItem('dolgnost');
if (userStorage != null) {
  DolgListResponse = JSON.parse(userStorage);
}

// забираем настоящие подразделения
let DepListResponse: IDepListResponse;
const userStorageDep = localStorage.getItem('depart');
if (userStorageDep != null) {
  DepListResponse = JSON.parse(userStorageDep);
}

// забираем настоящие роли
let RoleListResponse: IRoleListResponse;
const userStorageRole = localStorage.getItem('role');
if (userStorageRole != null) {
  RoleListResponse = JSON.parse(userStorageRole);
}

export function RegistrationPage({ }: IRegistrationPageProps) {

  let idDolg: number;
  let idDep: number;
  let idRole: number;

  const [userFam, setUserFam] = useState('');
  const [userName, setUserName] = useState('');
  const [userOtch, setUserOtch] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [passw, setPassw] = useState('');
  const [dolg, setSelectedDolg] = useState('');
  const [dep, setSelectedDep] = useState('');
  const [role, setSelectedRole] = useState('');

  const handleChangeUserFam = (e: React.FormEvent<HTMLInputElement>) => {
    setUserFam(e.currentTarget.value);
  }

  const handleChangeUserName = (e: React.FormEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  }

  const handleChangeUserOtch = (e: React.FormEvent<HTMLInputElement>) => {
    setUserOtch(e.currentTarget.value);
  }

  const handleChangePhone = (e: React.FormEvent<HTMLInputElement>) => {
    setPhone(e.currentTarget.value);
    if (e.currentTarget.value.length > 12) {
      alert('Номер телефона должно быть 12 символьное!');
    }
  }

  const handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }

  const handleChangePassw = (e: React.FormEvent<HTMLInputElement>) => {
    setPassw(e.currentTarget.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // найдем ID должности
    idDolg = 0;
    if (dolg != '') {
      {
        DolgListResponse.forEach(element => {
          if (element.idDolg.toString() === dolg) {
            idDolg = element.idDolg;
          }
        });
      }
    }

    // найдем ID подразделения
    idDep = 0;
    if (dep != '') {
      {
        DepListResponse.forEach(element => {
          if (element.idDep.toString() === dep) {
            idDep = element.idDep;
          }
        });
      }
    }

    // найдем ID роли
    idRole = 0;
    if (role != '') {
      {
        RoleListResponse.forEach(element => {
          if (element.idRole.toString() === role) {
            idRole = element.idRole;
          }
        });
      }
    }

    // IRegisterUserRequest / Response 201
    let RegisterUserRequest: IRegisterUserRequest = {
      sFam: userFam,
      sName: userName,
      sOtch: userOtch,
      sPhone: phone,
      sEmail: email,
      sPassw: passw,
      idDolg: idDolg,
      idDep: idDep,
      idRole: idRole
    };

    let headersSet = new Headers();
    headersSet.append('Content-Type', 'application/json; charset=utf-8');
    addAuthHeader(headersSet);
    let responseRegisterUser = await fetch(API_ADMIN_USER + '/exec', {
      method: 'POST',
      headers: headersSet,
      body: JSON.stringify(RegisterUserRequest)
    });
    console.log(RegisterUserRequest)
    if (responseRegisterUser.status == 201) {
      alert('Пользователь зарегистрирован');
    } else {
      alert('Пользователь не зарегистрирован. Оишбка при отправке');
    }
  }

  //const roles = getRoles();
  //const dolgnosts = getDolgnosts();
  //const departments = getDepartments();

  return (
    <div className={classes.main}>
      <div className={classes.card}>
        <div className={common.title}>Регистрация пользователя</div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <label>
            Фамилия
            <input className={classes.input} type='text' placeholder='Фамилия' value={userFam} onChange={handleChangeUserFam} required />
          </label>
          <label>
            Имя
            <input className={classes.input} type='text' placeholder='Имя' value={userName} onChange={handleChangeUserName} required />
          </label>
          <label>
            Отчество
            <input className={classes.input} type='text' placeholder='Отчество' value={userOtch} onChange={handleChangeUserOtch} required />
          </label>
          <label>
            Телефон
            <input className={classes.input} type='tel' placeholder='Телефон' pattern='+?\d{11}' value={phone} onChange={handleChangePhone} required />
          </label>
          <label>
            Email
            <input className={classes.input} type='email' placeholder='Email' value={email} onChange={handleChangeEmail} required />
          </label>
          <label>
            Пароль
            <input className={classes.input} type='password' placeholder='Пароль' value={passw} onChange={handleChangePassw} required />
          </label>
          <label>
            Должность
            <select className={classes.input} required onChange={(e) => setSelectedDolg(e.target.value)}>
              <option selected disabled></option>
              {DolgListResponse.map(item => <option value={item.idDolg}> {item.sDolg} </option>)}
            </select>
          </label>
          <label>
            Подразделение
            <select className={classes.input} required onChange={(e) => setSelectedDep(e.target.value)}>
              <option selected disabled></option>
              {DepListResponse.map(item => <option value={item.idDep}> {item.sDep} </option>)}
            </select>
          </label>
          <label>
            Роль
            <select className={classes.input} required onChange={(e) => setSelectedRole(e.target.value)}>
              <option selected disabled></option>
              {RoleListResponse.map(item => <option value={item.idRole}> {item.sRole} </option>)}
            </select>
          </label>

          <input className={classes.btn} type='submit' name='submit' value='Зарегистрировать' />
        </form>
      </div>
    </div>
  )
}