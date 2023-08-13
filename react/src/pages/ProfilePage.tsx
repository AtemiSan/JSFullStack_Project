import classes from '../styles/profile.module.scss';
import common from '../styles/common.module.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDepartments, getDolgnosts, getDolgnosts1 } from '../functions/referenceFunc';
import { IUserResponse, IUserUpdateRequest } from '../model/user';
import { API_ADMIN_USER } from '../settings';
import { addAuthHeader } from '../functions/headers.func';

export interface IProfilePageProps {

}

// заберем настоящие данные юзера 
let UserResponse: IUserResponse;
const userStorage = localStorage.getItem('user');
if (userStorage != null) {
  UserResponse = JSON.parse(userStorage);
}

export function ProfilePage({ }: IProfilePageProps) {

  const navigate = useNavigate();

  const [userFam, setUserFam] = useState(UserResponse.sFam);
  const [userName, setUserName] = useState(UserResponse.sName);
  const [userOtch, setUserOtch] = useState(UserResponse.sOtch);
  const [phone, setPhone] = useState(UserResponse.sPhone);
  const [email, setEmail] = useState(UserResponse.sEmail);
  const [role, setRole] = useState(UserResponse.role);
  const [dolg, setDolg] = useState(UserResponse.dolg.sDolg);
  const [dep, setDep] = useState(UserResponse.dep.sDep);

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
  }

  const handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  }

  useEffect(() => {
    /*setUserFam(localStorage.getItem('userFam') ? String(localStorage.getItem('userFam')) : '');
    setUserName(localStorage.getItem('userName') ? String(localStorage.getItem('userName')) : '');
    setUserOtch(localStorage.getItem('userOtch') ? String(localStorage.getItem('userOtch')) : '');
    setPhone(localStorage.getItem('phone') ? String(localStorage.getItem('phone')) : '');
    setEmail(localStorage.getItem('email') ? String(localStorage.getItem('email')) : '');*/
    setUserFam(UserResponse.sFam);
    setUserName(UserResponse.sName);
    setUserOtch(UserResponse.sOtch);
    setPhone(UserResponse.sPhone);
    setEmail(UserResponse.sEmail);
  }, [])

  let dolgnosts = getDolgnosts();
  const departments = getDepartments();

  // действие по кнопке Сохранить - это может делать только Админ, но пока не до него =))
  /*async function fnSaveBtn() {
    //IUserUpdateRequest / IUserResponse
    let UserUpdateRequest: IUserUpdateRequest;
    UserUpdateRequest = {
      idUser: UserResponse.idUser,
      bDel: false,
      sFam: userFam,
      sName: userName,
      sOtch: userOtch,
      sPhone: phone,
      sEmail: email,
      sPassw: 'admin',                  // взять откуда нибудь - а нужно ли это тут вообще?
      idDolg: UserResponse.dolg.idDolg, // взять в экрана
      idDep: UserResponse.dep.idDep,    // взять с экрана
      idRole: UserResponse.role.idRole
    };

    let headersSet = new Headers();
    headersSet.append('Content-Type', 'application/json; charset=utf-8');
    addAuthHeader(headersSet);
    let UserResponseSave = await fetch(API_ADMIN_USER + '/exec', {
      method: 'PUT',
      headers: headersSet,
      body: JSON.stringify(UserUpdateRequest)
    });
    if (UserResponseSave.status == 200) {
      alert('Данные профиля успешно Сохранены!');
      navigate('/lk')
    } else {
      alert('Данные профиля не Сохранены, ошибка отправки!');
      console.log('Bad_resp save_profile');
      console.log(UserResponseSave);
    }
  };*/

  let save_btn;
  /*if (role) {
    save_btn = <input className={classes.btn} type='submit' name='submit' value='Сохранить' onClick={() => { fnSaveBtn() }} />;
  } else*/
    save_btn = <></>

  return (
    <div className={classes.main}>
      <div className={classes.card}>
        <div className={common.title}>Профиль</div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <label>
            Фамилия
            <input className={classes.input} type='text' placeholder='Фамилия' value={userFam}/>
          </label>
          <label>
            Имя
            <input className={classes.input} type='text' placeholder='Имя' value={userName} />
          </label>
          <label>
            Отчество
            <input className={classes.input} type='text' placeholder='Отчество' value={userOtch}/>
          </label>
          <label>
            Телефон
            <input className={classes.input} type='text' placeholder='Телефон' pattern='/++\d{11}' value={phone}/>
          </label>
          <label>
            Email
            <input className={classes.input} type='email' placeholder='Email' value={email}/>
          </label>
          <label>
            Должность
            <input className={classes.input} type='text' placeholder='Должность' value={dolg}/>
          </label>
          <label>
            Подразделение
            <input className={classes.input} type='text' placeholder='Подразделение' value={dep}/>
          </label>
          <button className={classes.btn} type='button' onClick={() => { navigate('/lk/changePassw') }}>Изменить пароль</button>
          {save_btn}
        </form>
      </div>
    </div>
  )
}

/*  когда админ вернется, будет править
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
            <input className={classes.input} type='text' placeholder='Телефон' pattern='/++\d{11}' value={phone} onChange={handleChangePhone} required />
          </label>
          <label>
            Email
            <input className={classes.input} type='email' placeholder='Email' value={email} onChange={handleChangeEmail} required />
          </label>
          <label>
            Должность
            <select className={classes.input} required>
              <option selected disabled></option>
              {dolgnosts.map(item => <option value={item.idDolg}> {item.sDolg} </option>)}
            </select>
          </label>
          <label>
            Подразделение
            <select className={classes.input} required>
              <option selected disabled></option>
              {departments.map(item => <option value={item.idDep}> {item.sDep} </option>)}
            </select>
          </label>*/