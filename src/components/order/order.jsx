import style from './order.module.css';
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderIngredient } from '../order-ingredient/order-ingredient';

export const Order = ({order}) => {

  const ingredients = order.ingredients;


  let visible;
  let hiden;

  if (ingredients.length > 6) {
    visible = ingredients.slice(0, 5);
    hiden = ingredients.length - 6;
  }



  return (
    <div className={style.order}>
      <div className={style.order_number}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-small text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
      </div>
      <h3 className={style.order_name +" text text_type_main-medium"}>{order.name}</h3>
      <div className={style.box_ingredients}>
        <div className={style.ingredients}>
          {!visible && (ingredients.map(item => <OrderIngredient card={item} />))}
         {visible && (visible.map(item => <OrderIngredient card={item} />))}
         {visible && (<div className={style.hidden_elements}><OrderIngredient card={ingredients[5]} /><p className={style.layer + " text text_type_main-default"}>+{hiden}</p></div>)}
        </div>
        <div className={style.total_price}>
          <p className="text text_type_digits-default">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}