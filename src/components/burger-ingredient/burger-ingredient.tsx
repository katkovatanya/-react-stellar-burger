import ingridientStyle from "./burger-ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ModalIngredientActionTypes } from "../../services/actions";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IIngredientInterface } from "../../utils/ingredient-type";

interface IBurgerIngredientProps {
  card: IIngredientInterface;
  setModal: (arg: boolean) => void;
}

export const BurgerIngredient: React.FC<IBurgerIngredientProps> = ({
  card,
  setModal,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);
  const { items, bun } = useTypedSelector((state) => state.burgerConstructor);

  useEffect(() => {
    if (bun && bun._id === card._id) {
      setCounter(1);
    } else {
      setCounter(
        items.filter((ingredient) => ingredient._id === card._id).length
      );
    }
  }, [items, bun, card._id]);

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredients",
    item: { card },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const openModal = (item: IIngredientInterface) => {
    dispatch({
      type: ModalIngredientActionTypes.GET_CURRENT_INGREDIENT,
      ingredient: item,
    });
    dispatch({ type: ModalIngredientActionTypes.OPEN_MODAL_INGREDIENT });
    setModal(true);
  };

  return (
    <Link
      to={`/ingredients/${card._id}`}
      state={{ background: location }}
      ref={dragRef}
      className={ingridientStyle.ingridient}
      key={card._id}
      onClick={() => openModal(card)}
    >
      {counter > 0 && (
        <Counter
          count={counter}
          size="default"
          extraClass="m-1"
          key={card._id}
        />
      )}
      <img
        className={ingridientStyle.ingridient__img}
        src={card.image}
        alt={card.name}
      />
      <div>
        <span className="text text_type_digits-default">
          {card.price + " "}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{card.name}</p>
    </Link>
  );
};
