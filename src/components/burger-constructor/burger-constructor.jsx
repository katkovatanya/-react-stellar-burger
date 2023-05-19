import constructorStyle from './burger-constructor.module.css';
import { Component } from "react";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from 'prop-types';


class Ingredient extends Component {
  render() {
    return (
      <div className={constructorStyle.ingredient}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={this.props.name}
          price={this.props.price}
          thumbnail={this.props.image}
        />
      </div>
    )
  }
}

class BurgerConstructor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const bun = this.props.data.find(item => item.type === 'bun');
    const sauce = this.props.data.find(item => item.type === 'sauce');
    const main = this.props.data.filter(item => item.type === 'main').slice(1, 5);
    return (
      <section className={constructorStyle.section}>
        <div className={constructorStyle.box + ' custom-scroll'}>
          <div className={constructorStyle.ingredient}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + "(верх)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
          <div className={constructorStyle.ingredient}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={sauce.name}
              price={sauce.price}
              thumbnail={sauce.image}
            />
          </div>
          {main.map(item => <Ingredient {...item} />)}
          <div className={constructorStyle.ingredient}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + "(низ)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        </div>
        <div className={constructorStyle.ordering}>
          <div className={constructorStyle.sum}>
            <p className="text text_type_main-large">5535</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section >
    )
  }
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType)
}

export default BurgerConstructor;