import style from './ingredient-on-order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const IngredientOnOrder = ({ card }) => {
  return (
    <div className={style.container}>
      <div className={style.ingredient}>
        <img className={style.ingredient_image} src={card.image_mobile} />
        <p className="text text_type_main-small">{card.name}</p>
      </div>
      <div className={style.price + " text text_type_digits-default"}>
        <p className={style.numbers}>1&nbsp;x&nbsp;{card.price}&nbsp;</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}