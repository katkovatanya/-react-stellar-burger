import { IIngredientInterface } from "../../utils/ingredient-type";
import style from "./order-ingredient.module.css";
import { v4 as uuidv4 } from "uuid";
import { FC } from "react";

interface IOrderIngredientProps {
  card: IIngredientInterface;
}

export const OrderIngredient: FC<IOrderIngredientProps> = ({ card }) => {
  const key = uuidv4();
  return (
    <>
      {card && (
        <img key={key} className={style.ingredient_image} src={card.image} />
      )}
    </>
  );
};
