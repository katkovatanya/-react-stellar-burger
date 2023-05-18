import ingridientsStyle from './burger-ingredients.module.css';
import { Counter, Tab, CurrencyIcon, Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import { Component } from "react";

class BurgerIngredient extends Component {
  render() {
    return (
      <div className={ingridientsStyle.ingridient} key={this.props._id}>
        <Counter count={1} size="default" extraClass="m-1" key={this.props._id} />
        <img className={ingridientsStyle.ingridient__img} src={this.props.image} alt={this.props.name} />
        <div>
          <span className="text text_type_digits-default">{this.props.price + " "}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{this.props.name}</p>
      </div>
    )
  }
}

class BurgerIngredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'one'
    }
  }

  setCurrent = (e) => {
    this.setState(({ current: e }))
  }
  render() {
    const [...data] = this.props.data;
    const bun = data.filter(item => item.type === 'bun');
    const main = data.filter(item => item.type === 'main');
    const sauce = data.filter(item => item.type === 'sauce');
    return (
      <>
        <section className={ingridientsStyle.section}>
          <h1 className="text text_type_main-large">Соберите бургер</h1>
          <div style={{ display: 'flex' }}>
            <Tab value="one" active={this.state.current === 'one'} onClick={this.setCurrent}>
              Булки
            </Tab>
            <Tab value="two" active={this.state.current === 'two'} onClick={this.setCurrent}>
              Соусы
            </Tab>
            <Tab value="three" active={this.state.current === 'three'} onClick={this.setCurrent}>
              Начинки
            </Tab>
          </div>
          <div style={{ overflow: 'scroll', height: '680px', overflowX: 'hidden' }} className='custom-scroll'>
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
      </>)
  }
}

export default BurgerIngredients;