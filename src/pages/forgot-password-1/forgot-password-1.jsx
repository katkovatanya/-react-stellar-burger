import React from 'react';
import { Input, Button, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import style from './forgot-password-1.module.css'
import { resetPassword } from '../../utils/api';

export const ForgotPasswordFirstPage = () => {

  const [email, setEmail] = React.useState('');

  const navigate = useNavigate();
  const location = useLocation();

  localStorage.setItem('path', location.pathname)

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(email)
      .then(res => {
        navigate("/reset-password")
      })
  }


  return (
    <section className={style.section}>
      <form onSubmit={handleSubmit} className={style.form}>
        <h1 className="text text_type_main-medium">
          Восстановление пароля
        </h1>
        <Input
          type={'text'}
          placeholder={'Укажите e-mail'}
          onChange={e => setEmail(e.target.value)}
          name={'email'}
          value={email}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
        <div className={style.enter + " text text_type_main-small"}>
          <span className="text_color_inactive">Вспомнили пароль? </span>
          <Link to='/login' className={style.link}> Войти</Link>
        </div>
      </form>
    </section>
  )
}