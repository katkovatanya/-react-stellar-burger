import React, { useEffect } from 'react';
import { Input, ShowIcon, Button, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import style from './forgot-password-2.module.css'
import AppHeader from '../../components/app-header/app-header';
import { sentNewPassword } from '../../utils/api';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { CHECK_TOKEN, GET_USER} from '../../services/actions';
import { fetchWithRefresh
 } from '../../utils/api';

export const ResetPasswordPage = () => {

  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  const [password, setPassword] = React.useState('')
  const passwordRef = React.useRef(null)

  const [key, setKey] = React.useState('')
  const keyRef = React.useRef(null)

  const navigate = useNavigate()
  const location = localStorage.getItem('path')

  
  // useEffect(() => {
  //   dispatch({ type: CHECK_TOKEN });
  //   if (user.isAuthenticated && localStorage.getItem("accessToken")) {
  //     fetchWithRefresh('GET')
  //       .then(res => {
  //         console.log(res);
  //         dispatch({ type: GET_USER, payload: res.user })
  //       })
  //   }
  // }, [user]);


  useEffect(() => {
    if (user.isAuthenticated) navigate(-1)
    if (location) {
      localStorage.removeItem('path')
    } else {
      navigate('/')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    sentNewPassword(password, key)
      .then(res => navigate('/login'))
  }


  return (
    <section className={style.section}>
      <form onSubmit={handleSubmit} className={style.form}>
        <h1 className="text text_type_main-medium">
          Восстановление пароля
        </h1>
        <Input
          type={'text'}
          placeholder={'Введите новый пароль'}
          onChange={e => setPassword(e.target.value)}
          icon={'ShowIcon'}
          name={'password'}
          value={password}
          error={false}
          ref={passwordRef}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={e => setKey(e.target.value)}
          name={'key'}
          value={key}
          error={false}
          ref={keyRef}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
        <div className={style.enter + " text text_type_main-small"}>
          <span className="text_color_inactive">Вспомнили пароль? </span>
          <Link to='/login' className={style.link}> Войти</Link>
        </div>
      </form>
    </section>
  )
}