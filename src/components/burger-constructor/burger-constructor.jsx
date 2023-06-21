import constructorStyle from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, OPEN_MODAL_ORDER, OPEN_MODAL, CLOSE_MODAL_ORDER, CANCEL_ORDER } from '../../services/actions';

function Ingredient(props) {
  return (
    <div className={constructorStyle.ingredient} key={props._id}>
      <DragIcon type="primary" />
      <ConstructorElement text={props.name}
        price={props.price}
        thumbnail={props.image}
      />
    </div>
  )
}



function BurgerConstructor(props) {

  const dispatch = useDispatch();

  const data = useSelector(state => state.allIngredients);
  const { items, bun } = useSelector(state => state.burgerConstructor.constructorIngrediens);
  const order = useSelector(state => state.order.order)
  const modalOrder = useSelector(state => state.modalOrder.modalOrder)
  const [orderModal, setOrderModal] = React.useState(false);


  const totalPrice = React.useMemo(() => {
    const itemPrice = items ? items.reduce((sum, item) => {
      return sum + item.price;
    }, 0)
      : 0;
    const bunPrice = bun ? bun.price * 2 : 0;
    return itemPrice + bunPrice;
  }, [items, bun]);

  const handleClickOrder = () => {
    let burger = items.map(item => item._id);
    burger.push(bun._id);
    dispatch(getOrder(burger));
    setTimeout(() => {
      dispatch({ type: OPEN_MODAL_ORDER });
      setOrderModal(true);
    }, 0);
  }

  const closeModal = () => {
    setOrderModal(false);
    dispatch({ type: CLOSE_MODAL_ORDER });
    dispatch({type: CANCEL_ORDER})
  }

  return (
    <>
      <section className={constructorStyle.section}>
        <div className={constructorStyle.box + ' custom-scroll'}>
          <div className={constructorStyle.ingredient}>
            {bun.name && <ConstructorElement type="top" isLocked={true}
              text={bun.name + "(верх)"}
              price={bun.price}
              thumbnail={bun.image}
            />}
          </div>
          {items.map((item, index) => <Ingredient key={index} {...item} />)
          }
          <div className={constructorStyle.ingredient}>
            {bun.name && <ConstructorElement type="bottom" isLocked={true}
              text={bun.name + "(низ)"}
              price={bun.price}
              thumbnail={bun.image}
            />}
          </div>
        </div>
        <div className={constructorStyle.ordering}>
          <div className={constructorStyle.sum}>
            <p className="text text_type_main-large">{totalPrice ? totalPrice : '0'}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={() => handleClickOrder()}>
            Оформить заказ
          </Button>
        </div>
      </section >
      {orderModal && modalOrder && <Modal closeModal={closeModal}><OrderDetails /></Modal>}
    </>
  )
}


export default BurgerConstructor;