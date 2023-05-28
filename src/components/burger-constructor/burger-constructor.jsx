import constructorStyle from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from 'prop-types';
import React from 'react';

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

  const bun = React.useMemo(() => {
    return props.data.find(item => item.type === 'bun')
  }, [props]);
  const sauce = React.useMemo(() => {
    return props.data.find(item => item.type === 'sauce')
  }, [props]);
  const main = React.useMemo(() => {
    return props.data.filter(item => item.type === 'main').slice(1, 5)
  }, [props]);



  return (
    <section className={constructorStyle.section}>
      <div className={constructorStyle.box + ' custom-scroll'}>
        <div className={constructorStyle.ingredient}>
          {bun && <ConstructorElement type="top" isLocked={true}
            text={bun.name + "(верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />}
        </div>
        <div className={constructorStyle.ingredient}>
          <DragIcon type="primary" />
          {bun && <ConstructorElement text={sauce.name}
            price={sauce.price}
            thumbnail={sauce.image}
          />}
        </div>
        {main.map(item => <Ingredient key={item._id} {...item} />)}
        <div className={constructorStyle.ingredient}>
          {bun && <ConstructorElement type="bottom" isLocked={true}
            text={bun.name + "(низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />}
        </div>
      </div>
      <div className={constructorStyle.ordering}>
        <div className={constructorStyle.sum}>
          <p className="text text_type_main-large">5535</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => props.setIsOpen(true)}>
          Оформить заказ
        </Button>
      </div>
    </section >
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}

export default BurgerConstructor;