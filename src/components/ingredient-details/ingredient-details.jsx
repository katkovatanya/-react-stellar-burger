import ingredientDetails from './ingredient-details.module.css';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from 'prop-types';


const IngredientDetails = (props) => {
  return (
    <>
      <h2 className={ingredientDetails.title + " text text_type_main-large mt-15 ml-10"}>Детали ингредиента</h2>
      <div className={ingredientDetails.box}>
        <img src={props && props.image} alt={props && props.name} className={ingredientDetails.img} />
        <p className="text text_type_main-medium mt-4">{props && props.name}</p>
        <div className={ingredientDetails.details}>
          <div className={ingredientDetails.column}>
            <p className="text text_type_main-small text_color_inactive">Калории,ккал</p>
            <p className="text text_type_digits-default text_color_inactive">{props && props.calories}</p>
          </div>
          <div className={ingredientDetails.column}>
            <p className="text text_type_main-small text_color_inactive">Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive">{props && props.proteins}</p>
          </div>
          <div className={ingredientDetails.column}>
            <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive">{props && props.fat}</p>
          </div>
          <div className={ingredientDetails.column}>
            <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive">{props && props.carbohydrates}</p>
          </div>
        </div>
      </div>
    </>
  )
}

IngredientDetails.propTypes = {
  data: ingredientPropType
}

export default IngredientDetails;