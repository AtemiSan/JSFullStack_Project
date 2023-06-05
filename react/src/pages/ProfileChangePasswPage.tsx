import classes from '../styles/profile.module.scss';
import common from '../styles/common.module.scss';
import { useState } from 'react';

export interface IProfileChangePasswPageProps {

}

export function ProfileChangePasswPage({}: IProfileChangePasswPageProps) {

  const [oldPassw, setOldPassw] = useState('');
  const [newPassw, setNewPassw] = useState('');
  const [repeatPassw, setRepeatPassw] = useState('');
  const [errorPassw, setErrorPassw] = useState(false);

  const handleChangeOldPassw = (e: React.FormEvent<HTMLInputElement>) => {
    setOldPassw(e.currentTarget.value);
  }

  const handleChangeNewPassw = (e: React.FormEvent<HTMLInputElement>) => {
    setNewPassw(e.currentTarget.value);
  }

  const handleChangeRepeatPassw = (e: React.FormEvent<HTMLInputElement>) => {
    setRepeatPassw(e.currentTarget.value);
  }

  let error_passw = <></>;
  if (errorPassw) {
    error_passw = <div className={common.error}>Пароли не совпадают</div>
  } else
    error_passw = <></>

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassw !== repeatPassw) {
      setErrorPassw(true);
    } else {
      setErrorPassw(false);
    }
  }

  return (
    <div className={classes.main}>
      <div className={classes.card}>
        <div className={common.title}>Смена пароля</div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <label>
            Старый пароль
            <input className={classes.input} type='password' placeholder='Старый пароль' value={oldPassw} onChange={handleChangeOldPassw} required />
          </label>
          <label>
            Новый пароль
            <input className={classes.input} type='password' placeholder='Новый пароль' value={newPassw} onChange={handleChangeNewPassw} required />
          </label>
          {error_passw}
          <label>
            Повторите пароль
            <input className={classes.input} type='password' placeholder='Повторите пароль' value={repeatPassw} onChange={handleChangeRepeatPassw} required />
          </label>

          <input className={classes.btn} type='submit' name='submit' value='Сохранить' />
        </form>
      </div>
    </div>
  )
}