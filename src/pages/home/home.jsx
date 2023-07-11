import styles from "../../components/app/app.module.css";
import AppHeader from "../../components/app-header/app-header";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingridients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from "../../services/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { typeBun } from "../../utils/constants";
import { ADD_BUN, ADD_ITEMS } from "../../services/actions";
import { v4 as uuidv4 } from 'uuid';



export function Home({ modal, setModal }) {

  const dispatch = useDispatch();

  const data = useSelector(store => store.allItems.allIngredients);
  const ingredientsRequest = useSelector(store => store.allItems.ingredientsRequest);

  const onDropHandler = (item) => {
    const key = uuidv4();
    if (item.type == typeBun) {
      dispatch({ type: ADD_BUN, bun: { ...item, constructorId: key } })
    } else {
      dispatch({ type: ADD_ITEMS, item: { ...item, constructorId: key } })
    }
  }

  // useEffect(
  //   () => {
  //     dispatch(getIngredients());
  //   },
  //   []
  // );

  const content = useMemo(
    () => {
      return ingredientsRequest ? (
        <p>Waiting...</p>
      ) : (
        <BurgerIngredients modal={modal} setModal={setModal} />
      );
    },
    [ingredientsRequest, data]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        {data && <main className={styles.main}>
          {content}
          <BurgerConstructor onDropHandler={onDropHandler} />
        </main>}
      </div >
    </DndProvider>
  )
}

