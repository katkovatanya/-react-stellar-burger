import { IngredientsActionTypes } from "../actions";
import { IIngredientInterface } from "../../utils/ingredient-type";

interface IIngredientsState {
  allIngredients: IIngredientInterface[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

interface GetIngredientsRequestAction {
  type: IngredientsActionTypes.GET_INGREDIENTS_REQUEST;
}

interface GetIngredientsSuccesAction {
  type: IngredientsActionTypes.GET_INGREDIENTS_SUCCESS;
  data: IIngredientInterface[];
}

interface GetIngredientsFailedAction {
  type: IngredientsActionTypes.GET_INGREDIENTS_FAILED;
}

export type TIngredientsAction =
  | GetIngredientsRequestAction
  | GetIngredientsSuccesAction
  | GetIngredientsFailedAction;

const initialIngredients: IIngredientsState = {
  allIngredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const allIngredientsReducer = (
  state = initialIngredients,
  action: TIngredientsAction
): IIngredientsState => {
  switch (action.type) {
    case IngredientsActionTypes.GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case IngredientsActionTypes.GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        allIngredients: action.data,
        ingredientsRequest: false,
      };
    }
    case IngredientsActionTypes.GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
