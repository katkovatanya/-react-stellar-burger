import orderDetailsStyle from './order-details.module.css';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


const OrderDetails = () => {
  return (
    <>
      <p className={orderDetailsStyle.title + " text text_type_digits-large"}>034536</p>
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