import style from './order.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderIngredient } from '../order-ingredient/order-ingredient';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

export const Order = ({ order }) => {
  const ingredients = order.ingredients;
  const data = useSelector(state => state.allItems.allIngredients);

  const ingredientsInfo = ingredients.map(item => data.find(ing => item == ing._id));

  const totalPrice = React.useMemo(() => {
    return ingredientsInfo.reduce((sum, item) => {
      return (item ? (sum + item.price) : sum)
    }, 0)
  }, [])

  let visible;
  let hiden;

  if (ingredients.length > 6) {
    visible = ingredientsInfo.slice(0, 5);
    hiden = ingredients.length - 6;
  }



  return (
    <Link to={`/feed/${order._id}`} className={style.order} >
      <div className={style.order_number}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-small text_color_inactive">{<FormattedDate date={new Date(order.updatedAt)} />}</p>
      </div>
      <h3 className={style.order_name + " text text_type_main-medium"}>{order.name}</h3>
      <div className={style.box_ingredients}>
        <div className={style.ingredients}>
          {!visible && (ingredientsInfo.map((item, i) => <OrderIngredient key={i} card={item} />))}
          {visible && (visible.map((item, i) => <OrderIngredient key={i} card={item} />))}
          {visible && (<div className={style.hidden_elements}><OrderIngredient key={5} card={ingredientsInfo[5]} /><p className={style.layer + " text text_type_main-default"}>+{hiden}</p></div>)}
        </div>
        <div className={style.total_price}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  )
}