import { useSelector } from "react-redux";
import style from './order-readiness.module.css';
import { OrderIngredient } from "../../components/order-ingredient/order-ingredient";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderReadiness = () => {

  const data = useSelector(state => state.allItems.allIngredients);


  const sample = data.slice(1, 10);
  let visible;
  let hiden;

  if (sample.length > 6) {
    visible = sample.slice(0, 5);
    hiden = sample.length - 6;
  }

  return (
    <div className={style.order}>
      <div className={style.order_number}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-small text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Death Star Starship Main бургер</h3>
        <p className={style.status + " text text_type_main-default"}>Готовится</p>
      </div>
      <div className={style.box_ingredients}>
        <div className={style.ingredients}>
          {!visible && (sample.map(item => <OrderIngredient card={item} />))}
          {visible && (visible.map(item => <OrderIngredient card={item} />))}
          {visible && (<div className={style.hidden_elements}><OrderIngredient card={sample[5]} /><p className={style.layer + " text text_type_main-default"}>+{hiden}</p></div>)}
        </div>
        <div className={style.total_price}>
          <p className="text text_type_digits-default">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}