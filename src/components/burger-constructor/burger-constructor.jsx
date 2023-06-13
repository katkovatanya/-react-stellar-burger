import constructorStyle from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
// import { ingredientPropType } from "../../utils/prop-types";
// import PropTypes from 'prop-types';
import React from 'react';
import { typeBun, urlOrder } from '../../utils/constants';
import { ConstructorContext, IngredientsContext, BunContext } from '../../utils/context';
import { checkResponse } from '../../utils/api';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

// function reducer(state, action) {
//   switch (action.type) {
//     case "add":
//       return {
//         totalPrice: state.totalPrice + action.payload
//       };
//     case "delete":
//       return { totalPrice: state.totalPrice - action.payload };
//     default:
//       throw new Error(`Wrong type of action: ${action.type}`);
//   }
// }

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

  const { data } = React.useContext(IngredientsContext);
  const { constructorBurger, setConstructorBurger } = React.useContext(ConstructorContext);
  const { bunConstructor, setBunConstructor } = React.useContext(BunContext);
  const [order, setOrder] = React.useState();
  const [orderModal, setOrderModal] = React.useState(false);


  const totalPrice = React.useMemo(() => {
    const burger = constructorBurger ? constructorBurger.reduce((sum, item) => {
      return sum + item.price;
    }, 0)
      : 0;
    const bun = bunConstructor ? bunConstructor.price * 2 : 0;
    return burger + bun;
  }, [bunConstructor, constructorBurger]);

  const handleClickOrder = () => {
    let burger = constructorBurger.map(item => item._id);
    burger.push(bunConstructor._id);
    return fetch(urlOrder, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: burger
      })
    })
      .then(res => checkResponse(res))
      .then(res => {
        setOrder(res.order);
        setOrderModal(true)
      })
  }

  return (
    <IngredientsContext.Provider value={data}>
      <section className={constructorStyle.section}>
        <div className={constructorStyle.box + ' custom-scroll'}>
          <div className={constructorStyle.ingredient}>
            {bunConstructor && <ConstructorElement type="top" isLocked={true}
              text={bunConstructor.name + "(верх)"}
              price={bunConstructor.price}
              thumbnail={bunConstructor.image}
            />}
          </div>
          {constructorBurger.map((item, index) => <Ingredient key={index} {...item} />)
          }
          <div className={constructorStyle.ingredient}>
            {bunConstructor && <ConstructorElement type="bottom" isLocked={true}
              text={bunConstructor.name + "(низ)"}
              price={bunConstructor.price}
              thumbnail={bunConstructor.image}
            />}
          </div>
        </div>
        <div className={constructorStyle.ordering}>
          <div className={constructorStyle.sum}>
            <p className="text text_type_main-large">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={() => handleClickOrder()}>
            Оформить заказ
          </Button>
        </div>
      </section >
      {orderModal && <Modal setIsOpen={setOrderModal}><OrderDetails order={order} /></Modal>}
    </IngredientsContext.Provider>
  )
}

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
// }

export default BurgerConstructor;