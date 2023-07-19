import style from './order-ingredient.module.css';

export const OrderIngredient = ({ card }) => {
  return (
    <img className={style.ingredient_image} src={card.image_mobile} />
  )
}
