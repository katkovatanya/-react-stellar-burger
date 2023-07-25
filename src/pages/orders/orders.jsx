import { OrderReadiness } from "../../components/order-readiness/order-readiness";
import style from './orders.module.css';
import { useDispatch, useSelector } from "react-redux";
import { connectWS, disconnectWS } from '../../services/actions/order-feed';
import { useEffect } from "react";
import { urlUserOrders } from "../../utils/constants";

export const OrderPage = () => {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector(store => store.orderFeed.orders);
  const connect = () => dispatch(connectWS(urlUserOrders));
  const disconnect = () => dispatch(disconnectWS())

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    }
  }, [])


  return (<>
    <section className={style.section + " custom-scroll"}>
      <OrderReadiness />
      <OrderReadiness />
      <OrderReadiness />
      <OrderReadiness />
      <OrderReadiness />
    </section>
  </>
  )
}

