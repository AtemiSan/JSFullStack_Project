import classes from '../styles/login.module.scss'
import common from '../styles/common.module.scss'
import { useState } from 'react';
import { ILoginData } from '../model/login';
import { useNavigate } from 'react-router-dom';

export interface ILoginPageProps {

}

export function LoginPage({}: ILoginPageProps) {

  const [email, setEmail] = useState('');
  const [passw, setPassw] = useState('');

  const handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }

  const handleChangePassw = (e: React.FormEvent<HTMLInputElement>) => {
    setPassw(e.currentTarget.value);
  }

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    navigate('/lk');
  }

  return (
    <div className={classes.main}>
      <div className={classes.card}>
        <div className={common.title}>Вход</div>
        <form onSubmit={handleSubmit}>
          <input className={classes.input} type='email' name='email' placeholder='Email' value={email} onChange={handleChangeEmail} required />
          <input className={classes.input} type='password' name='passw' placeholder='Пароль' value={passw} onChange={handleChangePassw} required />
          <input className={classes.btn} type='submit' name='submit' value='Войти' />
        </form>
      </div>
    </div>
  )
}