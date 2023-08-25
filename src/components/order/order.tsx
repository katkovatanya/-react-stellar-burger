import style from "./order.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderIngredient } from "../order-ingredient/order-ingredient";
import { Link, useLocation } from "react-router-dom";
import React, { FC } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  IIngredientInterface,
  IOrderInterface,
} from "../../utils/ingredient-type";

interface IOrderProps {
  order: IOrderInterface;
}

export const Order: FC<IOrderProps> = ({ order }) => {
  const location = useLocation();
  const ingredients: string[] = order.ingredients;
  const data: IIngredientInterface[] = useTypedSelector(
    (state) => state.allItems.allIngredients
  );

  const ingredientsInfo: IIngredientInterface[] | null = ingredients && ingredients.map((item: string) =>
        data?.find((ing: IIngredientInterface) => item == ing._id)
      )

  const totalPrice = React.useMemo(() => {
    return ingredientsInfo?.reduce(
      (sum: number, item: IIngredientInterface) => {
        return item ? sum + item.price : sum;
      },
      0
    );
  }, []);

  let visible;
  let hiden;

  if (ingredients.length > 6) {
    visible = ingredientsInfo.slice(0, 5);
    hiden = ingredients.length - 6;
  }

  return (
    <Link
      key={order.number}
      to={`/feed/${order.number}`}
      state={{ background: location }}
      className={style.order}
    >
      <div className={style.order_number}>
        <p className="text text_type_digits-default">{order.number}</p>
        <p className="text text_type_main-small text_color_inactive">
          {<FormattedDate date={new Date(order.updatedAt)} />}
        </p>
      </div>
      <h3 className={style.order_name + " text text_type_main-medium"}>
        {order.name}
      </h3>
      <div className={style.box_ingredients}>
        <div className={style.ingredients}>
          {!visible &&
            ingredientsInfo?.map((item: IIngredientInterface, i: number) => (
              <OrderIngredient key={i} card={item} />
            ))}
          {visible &&
            visible.map((item: IIngredientInterface, i: number) => (
              <OrderIngredient key={i} card={item} />
            ))}
          {ingredientsInfo.length > 6 && (
            <div className={style.hidden_elements}>
              <OrderIngredient key={5} card={ingredientsInfo[5]} />
              <p className={style.layer + " text text_type_main-default"}>
                +{hiden}
              </p>
            </div>
          )}
        </div>
        <div className={style.total_price}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};
