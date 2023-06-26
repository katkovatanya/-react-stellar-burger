import { api, apiOrder } from "../../utils/api";
import { urlIngredients, urlOrder } from "../../utils/constants";
//Получение списка ингредиентов от API. Используется в компоненте BurgerIngredients.
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

//Получение списка ингредиентов для конструктора бургера. Используется в компоненте BurgerConstructor.
export const GET_INGREDIENTS_CONSTRUCTOR = 'GET_INGREDIENTS_CONSTRUCTOR';

//Добавление данных о просматриваемом в модальном окне IngredientDetails ингредиенте.
export const GET_CURRENT_INGREDIENT = 'GET_CURRENT_INGREDIENT';

//Удаление данных о просматриваемом в модальном окне ингредиенте при закрытии модального окна.
export const DEL_CURRENT_INGREDIENT = 'DEL_CURRENT_INGREDIENT';

//Получение и обновление номера заказа в модальном окне OrderDetails.
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const CANCEL_ORDER = 'CANCEL_ORDER';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';


export const OPEN_MODAL_ORDER = 'OPEN_MODAL_ORDER';
export const CLOSE_MODAL_ORDER = 'CLOSE_MODAL_ORDER';

export const OPEN_MODAL_INGREDIENT = 'OPEN_MODAL_INGREDIENT';
export const CLOSE_MODAL_INGREDIENT = 'CLOSE_INGREDIENT';

export const ADD_BUN = 'ADD_BUN';
export const ADD_ITEMS = 'ADD_ITEMS';

export const DEL_ITEMS = 'ADD_ITEMS';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    api(urlIngredients).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    });
  };
}

export function getOrder(burger) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    apiOrder(urlOrder, burger)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.order
        });
      } else {
        dispatch({
          type: GET_ORDER_FAILED,
          order: res
        });
      }
    });
  };
}