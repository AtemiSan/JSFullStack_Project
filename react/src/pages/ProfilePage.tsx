import classes from '../styles/profile.module.scss';
import common from '../styles/common.module.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface IProfilePageProps {

}

export function ProfilePage({}: IProfilePageProps) {

  const navigate = useNavigate();

  const [userFam, setUserFam] = useState('');
  const [userName, setUserName] = useState('');
  const [userOtch, setUserOtch] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(false);

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
    setUserFam(localStorage.getItem('userFam') ? String(localStorage.getItem('userFam')) : '');
    setUserName(localStorage.getItem('userName') ? String(localStorage.getItem('userName')) : '');
    setUserOtch(localStorage.getItem('userOtch') ? String(localStorage.getItem('userOtch')) : '');
    setPhone(localStorage.getItem('phone') ? String(localStorage.getItem('phone')) : '');
    setEmail(localStorage.getItem('email') ? String(localStorage.getItem('email')) : '');
  }, [])

  let save_btn;
  if (role) {
    save_btn = <input className={classes.btn} type='submit' name='submit' value='Сохранить' />;
  } else
    save_btn = <></>

  return (
    <div className={classes.main}>
      <div className={classes.card}>
        <div className={common.title}>Профиль</div>
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
            <input className={classes.input} type='text' placeholder='Телефон' pattern='/++\d{11}' value={phone} onChange={handleChangePhone} required />
          </label>
          <label>
            Email
            <input className={classes.input} type='email' placeholder='Email' value={email} onChange={handleChangeEmail} required />
          </label>
          <label>
            Должность
            <select className={classes.input} required>
              <option selected disabled>Должность</option>
              <option value="1">Инженер</option>
              <option value="2">Мастер</option>
              <option value="3">Начальник</option>
            </select>
          </label>    
          <label>
            Подразделение
            <select className={classes.input} required>
              <option selected disabled>Подразделение</option>
              <option value="1">Отдел сопровождения ИС</option>
              <option value="2">Отдел разработки ИС</option>
              <option value="3">Отдел внедрения ИС</option>
            </select>
          </label>    

          <button className={classes.btn} type='button' onClick={() => { navigate('/lk/changePassw') }}>Изменить пароль</button>
          {save_btn}
        </form>
      </div>
    </div>
  )
}