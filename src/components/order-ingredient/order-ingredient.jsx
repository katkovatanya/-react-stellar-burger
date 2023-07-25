import style from './order-ingredient.module.css';
import { v4 as uuidv4 } from 'uuid';

export const OrderIngredient = ({ card }) => {
  const key = uuidv4();
  return (<>
    {card && <img key={key} className={style.ingredient_image} src={card.image} />}
  </>
  )
}
