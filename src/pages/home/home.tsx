import styles from "../../components/app/app.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingridients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { FC} from "react";
import { useDispatch} from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { typeBun } from "../../utils/constants";
import { BurgerConstructorActionTypes } from "../../services/actions";
import { v4 as uuidv4 } from 'uuid';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IIngredientInterface } from "../../utils/ingredient-type";

interface IHomeProps {
  modal: boolean;
  setModal: any;
}

export const Home:FC<IHomeProps> = ({ modal, setModal }) => {

  const dispatch = useDispatch();

  const data = useTypedSelector(store => store.allItems.allIngredients);
  const ingredientsRequest = useTypedSelector(store => store.allItems.ingredientsRequest);

  const onDropHandler = (item: IIngredientInterface) => {
    const key = uuidv4();
    if (item.type == typeBun) {
      dispatch({ type: BurgerConstructorActionTypes.ADD_BUN, bun: { ...item, constructorId: key } })
    } else {
      dispatch({ type: BurgerConstructorActionTypes.ADD_ITEMS, item: { ...item, constructorId: key } })
    }
  }



  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        {data && <main className={styles.main}>
          {ingredientsRequest ? (
            <p>Waiting...</p>
          ) : (
            <BurgerIngredients modal={modal} setModal={setModal} />
          )}
          <BurgerConstructor onDropHandler={onDropHandler} />
        </main>}
      </div >
    </DndProvider>
  )
}

