import styles from "./app.module.css";
// import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from "../../services/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { typeBun } from "../../utils/constants";
import { ADD_BUN, ADD_ITEMS } from "../../services/actions";
import { v4 as uuidv4 } from 'uuid';


function App() {

  const dispatch = useDispatch();

  const data = useSelector(store => store.allItems.allIngredients);
  const ingredientsRequest = useSelector(store => store.allItems.ingredientsRequest);

  const onDropHandler = (item) => {
    const key = uuidv4();
    if (item.type == typeBun) {
      dispatch({ type: ADD_BUN, bun: {...item, constructorId: key} })
    } else {
      dispatch({ type: ADD_ITEMS, item: {...item, constructorId: key} })
    }
  }

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  const content = useMemo(
    () => {
      return ingredientsRequest ? (
        <p>Waiting...</p>
      ) : (
        <BurgerIngredients />
      );
    },
    [ingredientsRequest, data]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <AppHeader />
        {data && <main className={styles.main}>
          {content}
          <BurgerConstructor onDropHandler={onDropHandler} />
        </main>}
      </div >
    </DndProvider>
  )
}

export default App;
