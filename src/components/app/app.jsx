import styles from "./app.module.css";
// import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useContext, useEffect, useState, useReducer, useMemo } from "react";
import api from "../../utils/api";
import { useDispatch, useSelector } from 'react-redux';
import { GET_INGREDIENTS_REQUEST, getIngredients } from "../../services/actions";


function App() {

  const dispatch = useDispatch();

  const data = useSelector(store => store.allItems.allIngredients);
  const ingredientsRequest = useSelector(store => store.allItems.ingredientsRequest);

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

  // useEffect(() => {
  //   api(urlIngredients)
  //     .then(res => {
  //       setData(res.data);
  //     })
  // }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      {data && <main className={styles.main}>
        {content}
        <BurgerConstructor />
      </main>}
    </div >
  )
}

export default App;
