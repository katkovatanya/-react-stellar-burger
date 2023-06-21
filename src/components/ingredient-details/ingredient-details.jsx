import ingredientDetails from './ingredient-details.module.css';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';


const IngredientDetails = () => {

  const currentIngredient = useSelector(state => state.currentIngredient.currentIngredient)

  return (
    <>
      <h2 className={ingredientDetails.title + " text text_type_main-large mt-15 ml-10"}>Детали ингредиента</h2>
      <div className={ingredientDetails.box}>
        <img src={currentIngredient && currentIngredient.image} alt={currentIngredient && currentIngredient.name} className={ingredientDetails.img} />
        <p className="text text_type_main-medium mt-4">{currentIngredient && currentIngredient.name}</p>
        <div className={ingredientDetails.details}>
          <div className={ingredientDetails.column}>
            <p className="text text_type_main-small text_color_inactive">Калории,ккал</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient && currentIngredient.calories}</p>
          </div>
          <div className={ingredientDetails.column}>
            <p className="text text_type_main-small text_color_inactive">Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient && currentIngredient.proteins}</p>
          </div>
          <div className={ingredientDetails.column}>
            <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient && currentIngredient.fat}</p>
          </div>
          <div className={ingredientDetails.column}>
            <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient && currentIngredient.carbohydrates}</p>
          </div>
        </div>
      </div>
    </>
  )
}


export default IngredientDetails;