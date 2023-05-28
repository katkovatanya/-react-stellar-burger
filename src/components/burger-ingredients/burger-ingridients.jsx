import ingridientsStyle from './burger-ingredients.module.css';
import { Counter, Tab, CurrencyIcon, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";
import { useState } from "react";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one');
  const [modal, setModal] = useState(false);
  const [cardModal, setCardModal] = useState({})

  const createIngredient = (card) => {
    const openModal = (item) => {
      setCardModal(item);
      setModal(true);
    }

    return (
      <div className={ingridientsStyle.ingridient} key={card._id} onClick={() => openModal(card)}>
        <Counter count={1} size="default" extraClass="m-1" key={card._id} />
        <img className={ingridientsStyle.ingridient__img} src={card.image} alt={card.name} />
        <div>
          <span className="text text_type_digits-default">{card.price + " "}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{card.name}</p>
      </div>
    )
  }


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
            {bun.map(item => createIngredient(item))}
          </div>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={ingridientsStyle.container}>
            {sauce.map(item => createIngredient(item))}
          </div>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div className={ingridientsStyle.container}>
            {main.map(item => createIngredient(item))}
          </div>
        </div>
        {modal && <Modal setIsOpen={setModal}><IngredientDetails {...cardModal} /></Modal>}
      </section>
    )
  }
}


BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}

export default BurgerIngredients;