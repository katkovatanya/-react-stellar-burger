import styles from "./app.module.css";
// import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import { useEffect, useState } from "react";
import OrderDetails from "../order-details/order-details";
import api from "../../utils/api";

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [data, setData] = useState([]);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    api(URL)
      .then(res => setData(res.data))
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} setIsOpen={setModalActive} />
      </main>
      {modalActive && <Modal setIsOpen={setModalActive}><OrderDetails /></Modal>}
    </div>
  )
}

export default App;
