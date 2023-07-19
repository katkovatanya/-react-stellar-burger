import style from './feed.module.css';
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderIngredient = ({ card }) => {
  return (
    <img className={style.ingredient_image} src={card.image_mobile} />
  )
}

// export const OrderHiddenIngredients = ({ card }) => {
//   return (
//     <img className={style.ingredient_image_hidden} src={card.image_mobile} />
//   )
// }

export const Order = () => {
  const data = useSelector(state => state.allItems.allIngredients);


  const sample = data.slice(1, 10);
  let visible;
  let hiden;

  if (sample.length > 6) {
    visible = sample.slice(0, 5);
    hiden = sample.length - 6;
  }



  return (
    <div className={style.order}>
      <div className={style.order_number}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-small text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
      </div>
      <h3 className="text text_type_main-medium">Death Star Starship Main бургер</h3>
      <div className={style.box_ingredients}>
        <div className={style.ingredients}>
          {!visible && (sample.map(item => <OrderIngredient card={item} />))}
         {visible && (visible.map(item => <OrderIngredient card={item} />))}
         {visible && (<div className={style.hidden_elements}><OrderIngredient card={sample[5]} /><p className={style.layer + " text text_type_main-default"}>+{hiden}</p></div>)}
        </div>
        <div className={style.total_price}>
          <p className="text text_type_digits-default">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}



export const FeedPage = () => {
  return (
    <main className={style.main}>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <div className={style.box}>
        <section className={style.order_list + " custom-scroll"}>
          <Order />
          <Order />
          <Order />
          <Order />
        </section>
        <section className={style.orders}>
          <div className={style.order_numbers}>
            <div>
              <h2 className="text text_type_main-medium">Готовы:</h2>
              <div className={style.done_orders}>
                <p className={style.done_order + " text text_type_digits-default"}>034533</p>
                <p className={style.done_order + " text text_type_digits-default"}>034533</p>
                <p className={style.done_order + " text text_type_digits-default"}>034533</p>
                <p className={style.done_order + " text text_type_digits-default"}>034533</p>
                <p className={style.done_order + " text text_type_digits-default"}>034533</p>
              </div>
            </div>
            <div>
              <h2 className="text text_type_main-medium">В работе:</h2>
              <div className={style.done_orders}>
                <p className=" text text_type_digits-default">034533</p>
                <p className=" text text_type_digits-default">034533</p>
                <p className=" text text_type_digits-default">034533</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className={style.shadow + " text text_type_digits-large"}>28 752</p>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={style.shadow + " text text_type_digits-large"}>138</p>
          </div>
        </section>
      </div>
    </main>
  )
}