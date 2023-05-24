import constructorStyle from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from 'prop-types';

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

  const bun = props.data.find(item => item.type === 'bun');
  const sauce = props.data.find(item => item.type === 'sauce');
  const main = props.data.filter(item => item.type === 'main').slice(1, 5);



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
        <Button htmlType="button" type="primary" size="large" onClick={props.setISOpen}>
          Оформить заказ
        </Button>
      </div>
    </section >
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType)
}

export default BurgerConstructor;