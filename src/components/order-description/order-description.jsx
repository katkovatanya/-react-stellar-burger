import { useSelector } from "react-redux";
import style from './order-description.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientOnOrder } from "../ingredient-on-order/ingredient-on-order";

export const OrderDescription = () => {

  const data = useSelector(state => state.allItems.allIngredients);


  const sample = data.slice(1, 10);



  return (
    <div className={style.order}>
      <p className={style.order_number + " text text_type_digits-default"}>#034535</p>
      <h3 className={style.name + " text text_type_main-medium"}>Death Star Starship Main бургер</h3>
      <p className={style.status + " text text_type_main-default"}>Выполнен</p>
      <p className={style.composition + " text text_type_main-medium"}>Состав:</p>
      <div className={style.ingredients + " custom-scroll"}>
        {
          sample.map(item => <IngredientOnOrder card={item} />)
        }
      </div>
      <div className={style.total}>
        <p className="text text_type_main-small text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
        <div className={style.total_price}>
          <p className="text text_type_digits-default">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}