import React from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import style from "./registration.module.css";
import { createNewUser } from "../../utils/api";

export const RegistrationPage = () => {
  const [name, setName] = React.useState("");

  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createNewUser(email, password, name);
  };

  return (
    <section className={style.section}>
      <form onSubmit={handleSubmit} className={style.form}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setName(e.target.value)}
          name={"name"}
          value={name}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={(e) => setEmail(e.target.value)}
          name={"email"}
          value={email}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={(e) => setPassword(e.target.value)}
          icon={"ShowIcon"}
          name={"password"}
          value={password}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
        <div className={style.enter + " text text_type_main-small"}>
          <span className="text_color_inactive">Уже зарегистрированы? </span>
          <Link to="/login" className={style.link}>
            {" "}
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
};
