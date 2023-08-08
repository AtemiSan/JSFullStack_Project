import { useState } from 'react';
import common from '../styles/common.module.scss';
import classes from '../styles/profile.module.scss';
import { getDepartments, getDolgnosts, getRoles } from '../functions/referenceFunc';

export interface IRegistrationPageProps {

}

export function RegistrationPage({}: IRegistrationPageProps) {

  const [userFam, setUserFam] = useState('');
  const [userName, setUserName] = useState('');
  const [userOtch, setUserOtch] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [passw, setPassw] = useState('');

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

  const handleChangePassw = (e: React.FormEvent<HTMLInputElement>) => {
    setPassw(e.currentTarget.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Пользователь зарегистрирован');
  }

  const roles = getRoles();
  const dolgnosts = getDolgnosts();
  const departments = getDepartments();

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
          </label>   
          <label>
            Роль
            <select className={classes.input} required>
            <option selected disabled></option>
              {roles.map(item => <option value={item.idRole}> {item.sRole} </option>)}
            </select>
          </label>             

          <input className={classes.btn} type='submit' name='submit' value='Зарегистрировать' />
        </form>
      </div>
    </div>
  )
}