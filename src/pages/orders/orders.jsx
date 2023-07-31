import { OrderReadiness } from "../../components/order-readiness/order-readiness";
import style from './orders.module.css';
import { useDispatch, useSelector } from "react-redux";
import { connectWS, disconnectWS } from "../../services/actions/order-feed";
import { useEffect } from "react";
import { urlUserOrders } from "../../utils/constants";

export const OrderPage = () => {
  const token = localStorage.getItem("accessToken").split(' ')[1];
  const dispatch = useDispatch();
  const { orders } = useSelector(store => store.orderFeed.orders);
  const connect = () => dispatch(connectWS(`${urlUserOrders}?token=${token}`));
  const disconnect = () => dispatch(disconnectWS())

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    }
  }, [])

  return (<>
    <section className={style.section + " custom-scroll"}>
      {
        orders && orders.map(order => <OrderReadiness order={order} key={order.number} />)
      }
    </section>
  </>
  )
}

