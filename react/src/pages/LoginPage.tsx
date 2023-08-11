import classes from '../styles/login.module.scss'
import common from '../styles/common.module.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_PUBLIC_AUTH, API_USER_AUTH } from '../settings';
import { ILoginRequest } from '../model/auth';
import { IUserResponse } from '../model/user';
import { addAuthHeader } from '../functions/headers.func';

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

  async function loginRequest(url: string, data: object) {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    });

    let result = await response.json();
    return result;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    let data: ILoginRequest = {
      sEmail: email,
      sPassw: passw
    };

    // Запрос токена
    let responseToken = await fetch(API_PUBLIC_AUTH + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    });

    // Токен получен
    if (responseToken.status == 200) {
      // Сохраним токен в хранилище
      let resultToken = await responseToken.json();
      localStorage.setItem('accessToken', resultToken.accessToken);

      // Отправим запрос профиля
      let headersSet = new Headers();
      headersSet.append('Content-Type', 'application/json; charset=utf-8');
      addAuthHeader(headersSet);
      let responseProfile = await fetch(API_USER_AUTH + '/getProfile', {
        method: 'POST',
        headers: headersSet
      });
      if (responseProfile.status == 200) {
        let resultProfile = await responseProfile.json() as IUserResponse;
        localStorage.setItem('user', JSON.stringify(resultProfile));
        navigate('/lk');
      } else {
        console.log('Unauthorized');
      }
    } else {
      console.log('Unauthorized');
    }
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