import ingridientStyle from './burger-ingredient.module.css';
import { Counter, CurrencyIcon, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { GET_CURRENT_INGREDIENT, OPEN_MODAL_INGREDIENT, ADD_KEY } from '../../services/actions';
import { useDrag } from "react-dnd";
import { typeBun } from '../../utils/constants';

export const BurgerIngredient = ({ card, setModal }) => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);
  const { items, bun } = useSelector(state => state.burgerConstructor);

  useEffect(() => {
    if (bun._id === card._id) {
      setCounter(1)
    } else {
      setCounter(items.filter(ingredient => ingredient._id === card._id).length);
    }
  }, [items, bun, card._id]);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredients',
    item: { card },
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    })
  });

  const openModal = (item) => {
    dispatch({ type: GET_CURRENT_INGREDIENT, ingredient: item });
    dispatch({ type: OPEN_MODAL_INGREDIENT });
    setModal(true);
  }


  return (
    <div ref={dragRef} className={ingridientStyle.ingridient} key={card._id} onClick={() => openModal(card)}>
      {counter > 0 && <Counter count={counter} size="default" extraClass="m-1" key={card._id} />}
      <img className={ingridientStyle.ingridient__img} src={card.image} alt={card.name} />
      <div>
        <span className="text text_type_digits-default">{card.price + " "}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{card.name}</p>
    </div>
  )
}