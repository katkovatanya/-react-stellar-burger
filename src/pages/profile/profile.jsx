import { useState } from 'react';
import { Input, ShowIcon, Button, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './profile.module.css'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { CHANGE_USER_INFO } from '../../services/actions';
import { fetchWithRefresh } from '../../utils/api';

export const ProfilePage = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);
  const password = useSelector(state => state.user.password);

  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState(password);


  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWithRefresh('PATCH', { name: newName, email: newEmail, password: newPassword })
      .then(res => {
        dispatch({ type: CHANGE_USER_INFO, payload: res, password: newPassword })
      })
  }


  return (
    <section className={style.section}>
      <form onSubmit={handleSubmit} className={style.form}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setNewName(e.target.value)}
          icon={'EditIcon'}
          name={'name'}
          value={newName}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'text'}
          placeholder={'E-mail'}
          onChange={e => setNewEmail(e.target.value)}
          icon={'EditIcon'}
          name={'email'}
          value={newEmail}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'text'}
          placeholder={'Пароль'}
          onChange={e => setNewPassword(e.target.value)}
          icon={'EditIcon'}
          name={'password'}
          value={newPassword}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
    </section>
  )
}