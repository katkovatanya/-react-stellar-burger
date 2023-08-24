import style from "./order-readiness.module.css";
import { OrderIngredient } from "../../components/order-ingredient/order-ingredient";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface IOrderReadiness {
  order: any;
}

export const OrderReadiness: FC<IOrderReadiness> = ({ order }) => {
  const location = useLocation();

  const ingredients = order.ingredients;
  const data = useTypedSelector((state) => state.allItems.allIngredients);

  const ingredientsInfo = ingredients.map((item: any) =>
    data.find((ing) => item == ing._id)
  );

  const totalPrice = React.useMemo(() => {
    return ingredientsInfo.reduce((sum: number, item: any) => {
      return item ? sum + item.price : sum;
    }, 0);
  }, []);

  let visible;
  let hiden;

  if (ingredients.length > 6) {
    visible = ingredientsInfo.slice(0, 5);
    hiden = ingredients.length - 6;
  }

  return (
    <Link
      to={`/profile/orders/${order.number}`}
      state={{ background: location }}
      className={style.order}
    >
      <div className={style.order_number}>
        <p className="text text_type_digits-default">{order.number}</p>
        <p className="text text_type_main-small text_color_inactive">
          {<FormattedDate date={new Date(order.updatedAt)} />}
        </p>
      </div>
      <div>
        <h3 className={style.order_name + " text text_type_main-medium"}>
          {order.name}
        </h3>
        {order.status == "done" ? (
          <p className={style.status_done + " text text_type_main-default"}>
            Выполнен
          </p>
        ) : order.status == "created" ? (
          <p className={style.status + " text text_type_main-default"}>
            Создан
          </p>
        ) : (
          <p className={style.status + " text text_type_main-default"}>
            Готовится
          </p>
        )}
      </div>
      <div className={style.box_ingredients}>
        <div className={style.ingredients}>
          {!visible &&
            ingredientsInfo.map((item: any, index: any) => (
              <OrderIngredient key={index} card={item} />
            ))}
          {visible &&
            visible.map((item: any, index: any) => (
              <OrderIngredient key={index} card={item} />
            ))}
          {visible && (
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
