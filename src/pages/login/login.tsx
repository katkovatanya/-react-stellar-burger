import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import style from './login.module.css'
import { useDispatch } from "react-redux";
import { UserActionTypes } from '../../services/actions';
import { logIn } from '../../utils/api';

export const LoginPage = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('')

  const [password, setPassword] = React.useState('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    logIn(email, password)
      .then(res => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({ type: UserActionTypes.LOGIN, payload: res, password: password })
      })
  }


  return (
    <section onSubmit={handleSubmit} className={style.section}>
      <form className={style.form}>
        <h1 className="text text_type_main-medium">
          Вход
        </h1>
        <Input
          type={'text'}
          placeholder={'E-mail'}
          onChange={e => setEmail(e.target.value)}
          name={'email'}
          value={email}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={e => setPassword(e.target.value)}
          icon={'ShowIcon'}
          name={'password'}
          value={password}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
        <div className={style.user + " text text_type_main-small"}>
          <span className="text_color_inactive">Вы - новый пользователь? </span>
          <Link to='/register' className={style.link}> Зарегистрироваться</Link>
        </div>
        <div className={style.password + " text text_type_main-small"}>
          <span className="text_color_inactive">Забыли пароль? </span>
          <Link to='/forgot-password' className={style.link}> Восстановить пароль</Link>
        </div>
      </form>
    </section>
  )
}