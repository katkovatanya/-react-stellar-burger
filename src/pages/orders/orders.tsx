import { OrderReadiness } from "../../components/order-readiness/order-readiness";
import style from "./orders.module.css";
import { useDispatch } from "react-redux";
import {
  connectUserWS,
  disconnectUserWS,
} from "../../services/actions/order-feed";
import { useEffect } from "react";
import { urlUserOrders } from "../../utils/constants";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IOrderInterface } from "../../utils/ingredient-type";

export const OrderPage = () => {
  const token: string | undefined = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")?.split(" ")[1]
    : "";
  const dispatch = useDispatch();
  const orders = useTypedSelector((store) => store.userOrderFeed.orders);
  const connect = () =>
    dispatch(connectUserWS(`${urlUserOrders}?token=${token}`));
  const disconnect = () => dispatch(disconnectUserWS());

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  return (
    <>
      <section className={style.section + " custom-scroll"}>
        {orders &&
          orders.map((order: IOrderInterface) => (
            <OrderReadiness order={order} key={order.number} />
          ))}
      </section>
    </>
  );
};
