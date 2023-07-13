import { useState } from 'react';
import { Input, Button, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './profile.module.css'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { CHANGE_USER_INFO } from '../../services/actions';
import { fetchWithRefresh } from '../../utils/api';
import { PATH } from '../../utils/constants';

export const ProfilePage = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);
  const password = useSelector(state => state.user.password);

  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState(password);
  const [change, setChange] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWithRefresh('PATCH', `${PATH}/auth/user`, { name: newName, email: newEmail, password: newPassword })
      .then(res => {
        dispatch({ type: CHANGE_USER_INFO, payload: res, password: newPassword })
      })
  }
  const onCancel = () => {
    setNewName(user.name);
    setNewEmail(user.email);
    setNewPassword(user.password);
    setChange(false);
  }


  return (
    <section className={style.section}>
      <form onSubmit={handleSubmit} className={style.form}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => { setChange(true); setNewName(e.target.value) }}
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
          onChange={e => { setChange(true); setNewEmail(e.target.value) }}
          icon={'EditIcon'}
          name={'email'}
          value={newEmail}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={e => { setChange(true); setNewPassword(e.target.value) }}
          icon={'EditIcon'}
          name={'password'}
          value={newPassword}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        {change && <div className={style.buttons}>
          <Button className={"text text_type_main-default " + style.cancel} onClick={onCancel} htmlType="reset" type="primary" size="medium">
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>}
      </form>
    </section>
  )
}