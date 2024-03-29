import constructorStyle from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import React from "react";
import { useDispatch } from "react-redux";
import { getOrder, ModalOrderActionTypes } from "../../services/actions";
import { useDrop } from "react-dnd";
import { Ingredient } from "../ingredient/ingredient";
import { useNavigate } from "react-router-dom";
import { IIngredientInterface } from "../../utils/ingredient-type";
import { useTypedSelector } from "../../hooks/useTypedSelector";

function BurgerConstructor(props: {
  onDropHandler: (item: IIngredientInterface) => void;
}) {
  const user = useTypedSelector((store) => store.user.user);
  const navigate = useNavigate();
  const { onDropHandler } = props;

  const [, dropRef] = useDrop({
    accept: "ingredients",
    drop(item: { card: IIngredientInterface }) {
      onDropHandler(item.card);
    },
  });

  const dispatch = useDispatch();

  const { items, bun } = useTypedSelector((state) => state.burgerConstructor);
  const modalOrder = useTypedSelector((state) => state.modalOrder.modalOrder);
  const [orderModal, setOrderModal] = React.useState(false);

  const totalPrice = React.useMemo(() => {
    const itemPrice = items
      ? items.reduce((sum: number, item) => {
          return sum + item.price;
        }, 0)
      : 0;
    const bunPrice = bun ? bun.price * 2 : 0;
    return itemPrice + bunPrice;
  }, [items, bun]);

  const handleClickOrder = () => {
    if (user) {
      let burger = items.map((item) => item._id);
      bun && burger.push(bun._id, bun._id);
      dispatch(getOrder(burger));
      //так как ожидание модального окна получилось слишком длительным, я убрала асинхронную конструкцию. Пока идёт ответ сервера, пользователь видит надпись "wait"
      dispatch({ type: ModalOrderActionTypes.OPEN_MODAL_ORDER });
      setOrderModal(true);
    } else {
      navigate("/login");
    }
  };

  const closeModal = () => {
    setOrderModal(false);
    dispatch({ type: ModalOrderActionTypes.CLOSE_MODAL_ORDER });
  };

  return (
    <>
      <section className={constructorStyle.section}>
        <div ref={dropRef} className={constructorStyle.box + " custom-scroll"}>
          <div className={constructorStyle.ingredient}>
            {bun && (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={bun.name + "(верх)"}
                price={bun.price}
                thumbnail={bun.image}
              />
            )}
          </div>
          {items.map((item, index) => (
            <Ingredient
              key={item.constructorId}
              ingredient={item}
              index={index}
            />
          ))}
          <div className={constructorStyle.ingredient}>
            {bun && (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bun.name + "(низ)"}
                price={bun.price}
                thumbnail={bun.image}
              />
            )}
          </div>
        </div>
        <div className={constructorStyle.ordering}>
          <div className={constructorStyle.sum}>
            <p className="text text_type_main-large">
              {totalPrice ? totalPrice : "0"}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          {bun ? (
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={() => handleClickOrder()}
            >
              Оформить заказ
            </Button>
          ) : (
            <Button
              htmlType="button"
              type="primary"
              size="large"
              disabled={true}
            >
              Оформить заказ
            </Button>
          )}
        </div>
      </section>
      {orderModal && modalOrder && (
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
