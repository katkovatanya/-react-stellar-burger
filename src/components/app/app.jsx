import styles from "./app.module.css";
// import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import { useContext, useEffect, useState, useReducer } from "react";
import OrderDetails from "../order-details/order-details";
import api from "../../utils/api";
import { URL } from "../../utils/constants";
import { IngredientsContext, ConstructorContext, BunContext, TotalPriceContext, OrderContext } from "../../utils/context";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        totalPrice: state.totalPrice + action.payload
      };
    case "delete":
      return { totalPrice: state.totalPrice - action.payload };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}


function App() {
  const [data, setData] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [constructorBurger, setConstructorBurger] = useState([]);
  const [bunConstructor, setBunConstructor] = useState();
  const [totalPrice, totalPriceDispatcher] = useReducer(reducer, { totalPrice: 0 });
  const [order, setOrder] = useState();

  useEffect(() => {
    api(URL)
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
            <TotalPriceContext.Provider value={{ totalPrice, totalPriceDispatcher }}>
              <OrderContext.Provider value={{ order, setOrder }}>
              {data && <main className={styles.main}>
                <BurgerIngredients />
                <BurgerConstructor setIsOpen={setModalActive} />
              </main>}
              {modalActive && <Modal setIsOpen={setModalActive}><OrderDetails /></Modal>}
              </OrderContext.Provider>
            </TotalPriceContext.Provider>
          </BunContext.Provider>
        </ConstructorContext.Provider>
      </IngredientsContext.Provider>
    </div >
  )
}

export default App;
