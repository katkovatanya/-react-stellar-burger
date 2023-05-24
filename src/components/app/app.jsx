import styles from "./app.module.css";
// import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useEffect, useState } from "react";

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [data, setData] = useState([]);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    fetch(URL)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} setISOpen={setModalActive} />
      </main>
      <ModalOverlay isOpen={modalActive} />
      <Modal isOpen={modalActive} setISOpen={setModalActive} />
    </div>
  )
}

export default App;
