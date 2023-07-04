import orderDetailsStyle from './order-details.module.css';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';


const OrderDetails = () => {

  const order = useSelector(state => state.order.order);

  return (
    <>
      <p className={orderDetailsStyle.title + " text text_type_digits-large"}>{order.number}</p>
      <p className={orderDetailsStyle.modal__subtitle + " text text_type_main-medium"}>
        Идентификатор заказа
      </p>
      <div className={orderDetailsStyle.modal__done} />
      <p className={"text text_type_main-default " + orderDetailsStyle.modal__paragraph}>
        Ваш заказ начали готовить
      </p>
      <p className={"text text_type_main-default text_color_inactive " + orderDetailsStyle.modal__paragraph_inactive}>
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  )
}

export default OrderDetails;