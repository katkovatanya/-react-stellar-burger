import style from './order-ingredient.module.css';
import { useSelector } from 'react-redux';

export const OrderIngredient = ({ card }) => {
  const data = useSelector(state => state.allItems.allIngredients);
  const info = data.find(item => item._id === card);
  console.log(info);
  return (
    <img className={style.ingredient_image} src={info.image_mobile} />
  )
}
