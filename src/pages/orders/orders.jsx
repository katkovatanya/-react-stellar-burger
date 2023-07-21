import { OrderReadiness } from "../../components/order-readiness/order-readiness";
import style from './orders.module.css';

export const OrderPage = () => {
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

