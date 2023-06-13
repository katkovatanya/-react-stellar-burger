import constructorStyle from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
// import { ingredientPropType } from "../../utils/prop-types";
// import PropTypes from 'prop-types';
import React from 'react';
import { typeBun, typeSauce, typeMain } from '../../utils/constants';
import { ConstructorContext, IngredientsContext, BunContext, TotalPriceContext, OrderContext } from '../../utils/context';
import { checkResponse } from '../../utils/api';

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
  const { totalPrice, totalPriceDispatcher } = React.useContext(TotalPriceContext);
  const { order, setOrder } = React.useContext(OrderContext);

  // let totalPrice = bunConstructor.price*2 + constructorBurger.reduce((sum, item) => { 
  //   return sum + item.price;
  // }, 0)

  const handleClickOrder = () => {
    let burger = constructorBurger.map(item => item._id);
    burger.push(bunConstructor._id);
    return fetch('https://norma.nomoreparties.space/api/orders', {
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
        props.setIsOpen(true)
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
            <p className="text text_type_main-large">{totalPrice.totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={() => handleClickOrder()}>
            Оформить заказ
          </Button>
        </div>
      </section >
    </IngredientsContext.Provider>
  )
}

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
// }

export default BurgerConstructor;