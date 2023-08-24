import React, { useEffect } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import style from "./forgot-password-2.module.css";
import { sentNewPassword } from "../../utils/api";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export const ResetPasswordPage = () => {
  const user = useTypedSelector((store) => store.user);

  const [password, setPassword] = React.useState("");

  const [key, setKey] = React.useState("");

  const navigate = useNavigate();
  const location = localStorage.getItem("path");

  useEffect(() => {
    if (user.isAuthenticated) navigate(-1);
    if (location) {
      localStorage.removeItem("path");
    } else {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sentNewPassword(password, key).then((res) => navigate("/login"));
  };

  return (
    <section className={style.section}>
      <form onSubmit={handleSubmit} className={style.form}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input
          type={"password"}
          placeholder={"Введите новый пароль"}
          onChange={(e) => setPassword(e.target.value)}
          icon={"ShowIcon"}
          name={"password"}
          value={password}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(e) => setKey(e.target.value)}
          name={"key"}
          value={key}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
        <div className={style.enter + " text text_type_main-small"}>
          <span className="text_color_inactive">Вспомнили пароль? </span>
          <Link to="/login" className={style.link}>
            {" "}
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
};
