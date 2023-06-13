import styles from "./app.module.css";
// import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import { useContext, useEffect, useState, useReducer } from "react";
import OrderDetails from "../order-details/order-details";
import api from "../../utils/api";
import { urlIngredients } from "../../utils/constants";
import { IngredientsContext, ConstructorContext, BunContext, TotalPriceContext, OrderContext } from "../../utils/context";


function App() {
  const [data, setData] = useState([]);
  // const [modalActive, setModalActive] = useState(false);
  const [constructorBurger, setConstructorBurger] = useState([]);
  const [bunConstructor, setBunConstructor] = useState();

  useEffect(() => {
    api(urlIngredients)
      .then(res => {
        setData(res.data);
      })
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <IngredientsContext.Provider value={{ data, setData }}>
        <ConstructorContext.Provider value={{ constructorBurger, setConstructorBurger }}>
          <BunContext.Provider value={{ bunConstructor, setBunConstructor }}>
            {data && <main className={styles.main}>
              <BurgerIngredients />
              <BurgerConstructor />
            </main>}
          </BunContext.Provider>
        </ConstructorContext.Provider>
      </IngredientsContext.Provider>
    </div >
  )
}

export default App;
