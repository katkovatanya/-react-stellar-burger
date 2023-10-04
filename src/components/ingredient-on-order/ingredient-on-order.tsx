import { IIngredientInterface } from '../../utils/ingredient-type';
import style from './ingredient-on-order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';

interface IIngredientOnOrderProps {
  card: IIngredientInterface;
}

export const IngredientOnOrder: FC<IIngredientOnOrderProps> = ({ card }) => {
  return (
    <div className={style.container}>
      <div className={style.ingredient}>
        {card && <img className={style.ingredient_image} src={card.image} />}
        {card && <p className="text text_type_main-small">{card.name}</p>}
      </div>
      <div className={style.price + " text text_type_digits-default"}>
        {card && <p className={style.numbers}>{card.counter}&nbsp;x&nbsp;{card.price}&nbsp;</p>}
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}