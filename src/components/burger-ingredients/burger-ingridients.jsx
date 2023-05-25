import ingridientsStyle from './burger-ingredients.module.css';
import { Counter, Tab, CurrencyIcon, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";
import { useState } from "react";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

function BurgerIngredient(props) {

  const openModal = (item) => {
    props.setCardModal(item);
    props.setModal(true);
  }



  return (
    <div className={ingridientsStyle.ingridient} key={props._id} onClick={() => openModal(props)}>
      <Counter count={1} size="default" extraClass="m-1" key={props._id} />
      <img className={ingridientsStyle.ingridient__img} src={props.image} alt={props.name} />
      <div>
        <span className="text text_type_digits-default">{props.price + " "}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{props.name}</p>
    </div>
  )
}

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one');
  const [modal, setModal] = useState(false);
  const [cardModal, setCardModal] = useState({})

  const handleClickTab = (e) => {
    setCurrent(e)
  }
  {
    const bun = props.data.filter(item => item.type === 'bun');
    const main = props.data.filter(item => item.type === 'main');
    const sauce = props.data.filter(item => item.type === 'sauce');
    return (
      <section className={ingridientsStyle.section}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <div style={{ display: 'flex' }}>
          <Tab value="one" active={current === 'one'} onClick={handleClickTab}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={handleClickTab}>
            Соусы
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={handleClickTab}>
            Начинки
          </Tab>
        </div>
        <div className={ingridientsStyle.ingridients + " custom-scroll"}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <div className={ingridientsStyle.container}>
            {bun.map(item => <BurgerIngredient key={item._id} {...item} modal={modal} setModal={setModal} cardModal={cardModal} setCardModal={setCardModal} />)}
          </div>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={ingridientsStyle.container}>
            {sauce.map(item => <BurgerIngredient key={item._id} {...item} modal={modal} setModal={setModal} cardModal={cardModal} setCardModal={setCardModal} />)}
          </div>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div className={ingridientsStyle.container}>
            {main.map(item => <BurgerIngredient key={item._id} {...item} modal={modal} setModal={setModal} cardModal={cardModal} setCardModal={setCardModal} />)}
          </div>
        </div>
        <Modal isOpen={modal} setIsOpen={setModal} children={<IngredientDetails {...cardModal} />} />
      </section>
    )
  }
}

BurgerIngredient.propTypes = {
  item: ingredientPropType
}
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType)
}

export default BurgerIngredients;