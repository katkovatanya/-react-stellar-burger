import ingridientsStyle from './burger-ingredients.module.css';
import { Counter, Tab, CurrencyIcon, Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from 'prop-types';

function BurgerIngredient(props) {
  return (
    <div className={ingridientsStyle.ingridient} key={props._id}>
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

  const handleClickTab = (e) => {
    setCurrent(e)
  }
  {
    const [...data] = props.data;
    const bun = data.filter(item => item.type === 'bun');
    const main = data.filter(item => item.type === 'main');
    const sauce = data.filter(item => item.type === 'sauce');
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
            {bun.map(item => <BurgerIngredient {...item} />)}
          </div>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={ingridientsStyle.container}>
            {sauce.map(item => <BurgerIngredient {...item} />)}
          </div>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div className={ingridientsStyle.container}>
            {main.map(item => <BurgerIngredient {...item} />)}
          </div>
        </div>
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