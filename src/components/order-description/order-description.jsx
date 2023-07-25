import { useSelector } from "react-redux";
import style from './order-description.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientOnOrder } from "../ingredient-on-order/ingredient-on-order";
import { useParams } from "react-router-dom";
import React from "react";

export const OrderDescription = () => {

  const { orders } = useSelector(store => store.orderFeed.orders);
  const { id } = useParams();
  const data = useSelector(state => state.allItems.allIngredients);
  const order = orders.find(item => item._id === id);;

  const ingredientsInfo = order && order.ingredients.map(item => data.find(ing => item == ing._id));

  const totalPrice = React.useMemo(() => {
    return (
      ingredientsInfo && ingredientsInfo.reduce((sum, item) => {
        return (item ? (sum + item.price) : sum)
      }, 0)
    )
  }, [])


  const arrayWithCounters = ingredientsInfo.map((a) => {
    const counter = ingredientsInfo.filter(item => item._id === a._id).length;
    return { ...a, counter: counter }
  })

  const set = new Set(order.ingredients);
  const uniqueId = [...set];
  const uniqueIngredients = uniqueId.map(item => arrayWithCounters.find(ing => item == ing._id));



  return (
    <div className={style.order}>
      {order && <p className={style.order_number + " text text_type_digits-default"}>{order.number}</p>}
      {order && <h3 className={style.name + " text text_type_main-medium"}>{order.name}</h3>}
      {order && order.status === 'done' ? <p className={style.status + " text text_type_main-default"}>Выполнен</p> : <p className={"text text_type_main-default"}>Готовится</p>}
      <p className={style.composition + " text text_type_main-medium"}>Состав:</p>
      <div className={style.ingredients + " custom-scroll"}>
        {
          order && uniqueIngredients.map((item, index) => <IngredientOnOrder key={index} card={item} />)
        }
      </div>
      <div className={style.total}>
        {order && <p className="text text_type_main-small text_color_inactive">{<FormattedDate date={new Date(order.updatedAt)} />}</p>}
        <div className={style.total_price}>
          {totalPrice && <p className="text text_type_digits-default">{totalPrice}</p>}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}