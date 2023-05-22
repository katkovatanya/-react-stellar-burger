import styles from "./app.module.css";
// import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useEffect, useState} from "react";

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {


  const [data, setData] = useState([]);

  useEffect(() => {
      fetch('https://norma.nomoreparties.space/api/ingredients')
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
        <BurgerConstructor data={data} />
      </main>
    </div>
  )
}

export default App;
