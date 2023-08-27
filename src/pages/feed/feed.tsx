import style from "./feed.module.css";
import { Order } from "../../components/order/order";
import { useDispatch } from "react-redux";
import { connectWS, disconnectWS } from "../../services/actions/order-feed";
import { urlOrderFeed } from "../../utils/constants";
import { useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IOrderInterface } from "../../utils/ingredient-type";

export const FeedPage = () => {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useTypedSelector(
    (store) => store.orderFeed
  );
  const connect = () => dispatch(connectWS(urlOrderFeed));
  const disconnect = () => dispatch(disconnectWS());

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  const done: number[] = [];
  orders &&
    orders.forEach((item) => {
      if (item.status === "done") {
        done.push(item.number);
      }
    });

  const pending =
    orders &&
    orders
      .map((item: IOrderInterface) => {
        if (item.status === "pending") {
          return item.number;
        }
      })
      .slice(0, 20);

  return (
    <main className={style.main}>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <div className={style.box}>
        <section className={style.order_list + " custom-scroll"}>
          {orders &&
            orders.map((order: IOrderInterface) => (
              <Order order={order} key={order._id} />
            ))}
        </section>
        <section className={style.orders}>
          <div className={style.order_numbers}>
            <div>
              <h2 className="text text_type_main-medium">Готовы:</h2>
              <div className={style.done_orders}>
                {done &&
                  done.slice(0, 20).map((order, i: number) => (
                    <p
                      key={i}
                      className={
                        style.done_order + " text text_type_digits-default"
                      }
                    >
                      {order}
                    </p>
                  ))}
              </div>
            </div>
            <div>
              <h2 className="text text_type_main-medium">В работе:</h2>
              <div className={style.done_orders}>
                {pending &&
                  pending.map((order, i: number) => (
                    <p key={i} className=" text text_type_digits-default">
                      {order}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium">
              Выполнено за все время:
            </p>
            {total && (
              <p className={style.shadow + " text text_type_digits-large"}>
                {total}
              </p>
            )}
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            {totalToday && (
              <p className={style.shadow + " text text_type_digits-large"}>
                {totalToday}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};
