import style from './not-found.module.css'
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';

export const NotFoundPage = () => {
  return (
    <div className={style.box}>
      <h1 className={style.title + " text text_type_main-large"}>Ошибка 404 - страница не найдена</h1>
    </div>
  )
}