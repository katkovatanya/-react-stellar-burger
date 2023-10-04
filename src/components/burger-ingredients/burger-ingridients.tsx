import ingridientsStyle from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredient } from "../burger-ingredient/burger-ingredient";
import React, { FC } from "react";
import { useMemo, useEffect } from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { typeBun, typeSauce, typeMain } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { ModalIngredientActionTypes } from "../../services/actions";
import { useInView } from "react-intersection-observer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface IBurgerIngredientsProps {
  modal: boolean;
  setModal: (arg: boolean) => void;
}

const BurgerIngredients: FC<IBurgerIngredientsProps> = ({
  modal,
  setModal,
}) => {
  const Tabs = useMemo(() => {
    return {
      BUN: "bun",
      SAUCE: "sauce",
      MAIN: "main",
    };
  }, []);

  const [current, setCurrent] = React.useState(Tabs.BUN);
  const dispatch = useDispatch();

  const data = useTypedSelector((state) => state.allItems.allIngredients);
  const modalIngredient = useTypedSelector(
    (state) => state.modalIngredient.modalIngredient
  );

  const { ref: refBun, inView: inViewBun } = useInView({
    threshold: 0,
  });
  const { ref: refSauce, inView: inViewSauce } = useInView({
    threshold: 0,
  });
  const { ref: refMain, inView: inViewMain } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inViewBun) {
      setCurrent(Tabs.BUN);
    } else if (inViewSauce) {
      setCurrent(Tabs.SAUCE);
    } else if (inViewMain) {
      setCurrent(Tabs.MAIN);
    }
  }, [inViewBun, inViewSauce, inViewMain]);

  const closeModal = () => {
    dispatch({ type: ModalIngredientActionTypes.CLOSE_MODAL_INGREDIENT });
    dispatch({ type: ModalIngredientActionTypes.DEL_CURRENT_INGREDIENT });
    setModal(false);
  };

  const handleClickTab = (e: string) => {
    setCurrent(e);
  };

  {
    const bun = React.useMemo(() => {
      return data.filter((item) => item.type === typeBun);
    }, [data]);
    const main = React.useMemo(() => {
      return data.filter((item) => item.type === typeMain);
    }, [data]);
    const sauce = React.useMemo(() => {
      return data.filter((item) => item.type === typeSauce);
    }, [data]);
    return (
      <section className={ingridientsStyle.section}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
        <div style={{ display: "flex" }}>
          <Tab
            value={Tabs.BUN}
            active={current === Tabs.BUN}
            onClick={handleClickTab}
          >
            Булки
          </Tab>
          <Tab
            value={Tabs.SAUCE}
            active={current === Tabs.SAUCE}
            onClick={handleClickTab}
          >
            Соусы
          </Tab>
          <Tab
            value={Tabs.MAIN}
            active={current === Tabs.MAIN}
            onClick={handleClickTab}
          >
            Начинки
          </Tab>
        </div>
        <div className={ingridientsStyle.ingridients + " custom-scroll"}>
          <DndProvider backend={HTML5Backend}>
            <h2 ref={refBun} className="text text_type_main-medium">
              Булки
            </h2>
            <div className={ingridientsStyle.container}>
              {bun.map((item) => (
                <BurgerIngredient
                  card={item}
                  setModal={setModal}
                  key={item._id}
                />
              ))}
            </div>
            <h2 ref={refSauce} className="text text_type_main-medium">
              Соусы
            </h2>
            <div className={ingridientsStyle.container}>
              {sauce.map((item) => (
                <BurgerIngredient
                  card={item}
                  setModal={setModal}
                  key={item._id}
                />
              ))}
            </div>
            <h2 ref={refMain} className="text text_type_main-medium">
              Начинки
            </h2>
            <div className={ingridientsStyle.container}>
              {main.map((item) => (
                <BurgerIngredient
                  card={item}
                  setModal={setModal}
                  key={item._id}
                />
              ))}
            </div>
          </DndProvider>
        </div>
        {modal && modalIngredient && (
          <Modal closeModal={closeModal}>
            <IngredientDetails />
          </Modal>
        )}
      </section>
    );
  }
};

export default BurgerIngredients;
