import { useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";
import { useDispatch } from "react-redux";
import { UserActionTypes } from "../../services/actions";
import { editUser } from "../../utils/api";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export const ProfilePage = () => {
  const dispatch = useDispatch();

  const user = useTypedSelector((state) => state.user.user);
  const password = useTypedSelector((state) => state.user.password);

  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState(password);
  const [change, setChange] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    editUser(newName, newEmail, newPassword)
      .then((res) => {
        dispatch({
          type: UserActionTypes.CHANGE_USER_INFO,
          payload: res,
          password: newPassword,
        });
      })
      .catch((err) => console.log(err));
  };
  const onCancel = () => {
    setNewName(user.name);
    setNewEmail(user.email);
    setNewPassword(user.password);
    setChange(false);
  };

  return (
    <section className={style.section}>
      <form onSubmit={handleSubmit} className={style.form}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => {
            setChange(true);
            setNewName(e.target.value);
          }}
          icon={"EditIcon"}
          name={"name"}
          value={newName}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={(e) => {
            setChange(true);
            setNewEmail(e.target.value);
          }}
          icon={"EditIcon"}
          name={"email"}
          value={newEmail}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={(e) => {
            setChange(true);
            setNewPassword(e.target.value);
          }}
          icon={"EditIcon"}
          name={"password"}
          value={newPassword}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        {change && (
          <div className={style.buttons}>
            <Button
              className={"text text_type_main-default " + style.cancel}
              onClick={onCancel}
              htmlType="reset"
              type="primary"
              size="medium"
            >
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </section>
  );
};
