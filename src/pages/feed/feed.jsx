import style from './feed.module.css';

import { Order } from '../../components/order/order';


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