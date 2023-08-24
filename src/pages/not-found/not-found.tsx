import style from "./not-found.module.css";

export const NotFoundPage = () => {
  return (
    <div className={style.box}>
      <h1 className={style.title + " text text_type_main-large"}>
        Ошибка 404 - страница не найдена
      </h1>
    </div>
  );
};
