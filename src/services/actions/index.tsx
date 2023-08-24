import { api, postOrder } from "../../utils/api";
import { PATH } from "../../utils/constants";
import { Dispatch } from "redux";
import { TIngredientsAction } from "../reducers/all-ingredients";
import { TAnyOrderAction } from "../reducers/any-order";
import { TOrderModal } from "../reducers/modal-order";

export enum IngredientsActionTypes {
  GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST",
  GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS",
  GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED",
}

export enum GetAnyOrderActionTypes {
  GET_ANY_ORDER_FAILED = "GET_ANY_ORDER_FAILED",
  GET_ANY_ORDER_REQUEST = "GET_ANY_ORDER_REQUEST",
  GET_ANY_ORDER_SUCCESS = "GET_ANY_ORDER_SUCCESS",
}

export enum BurgerConstructorActionTypes {
  ADD_ITEMS = "ADD_ITEMS",
  ADD_BUN = "ADD_BUN",
  DEL_ITEMS = "DEL_ITEMS",
  SORT_ITEMS = "SORT_ITEMS",
}

export enum ModalIngredientActionTypes {
  GET_CURRENT_INGREDIENT = "GET_CURRENT_INGREDIENT",
  DEL_CURRENT_INGREDIENT = "DEL_CURRENT_INGREDIENT",
  OPEN_MODAL_INGREDIENT = "OPEN_MODAL_INGREDIENT",
  CLOSE_MODAL_INGREDIENT = "CLOSE_MODAL_INGREDIENT",
}

export enum ModalOrderActionTypes {
  OPEN_MODAL_ORDER = "OPEN_MODAL_ORDER",
  CLOSE_MODAL_ORDER = "CLOSE_MODAL_ORDER",
  GET_ORDER_REQUEST = "GET_ORDER_REQUEST",
  GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS",
  GET_ORDER_FAILED = "GET_ORDER_FAILED",
}

export enum ModalActionTypes {
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
}

export enum UserActionTypes {
  LOGIN = "LOGIN",
  REGISTRATION_NEW_USER = "REGISTRATION_NEW_USER",
  LOGOUT = "LOGOUT",
  CHANGE_USER_INFO = "CHANGE_USER_INFO",
  CHECK_TOKEN = "CHECK_TOKEN",
  GET_USER = "GET_USER",
}

// //Добавление данных о просматриваемом в модальном окне IngredientDetails ингредиенте.
// export const GET_CURRENT_INGREDIENT: "GET_CURRENT_INGREDIENT" =
//   "GET_CURRENT_INGREDIENT";

// //Удаление данных о просматриваемом в модальном окне ингредиенте при закрытии модального окна.
// export const DEL_CURRENT_INGREDIENT: "DEL_CURRENT_INGREDIENT" =
//   "DEL_CURRENT_INGREDIENT";

// //Получение и обновление номера заказа в модальном окне OrderDetails.
// export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
// export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
// export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";

// export const CANCEL_ORDER: "CANCEL_ORDER" = "CANCEL_ORDER";

// export const OPEN_MODAL_ORDER: "OPEN_MODAL_ORDER" = "OPEN_MODAL_ORDER";
// export const CLOSE_MODAL_ORDER: "CLOSE_MODAL_ORDER" = "CLOSE_MODAL_ORDER";

// export const OPEN_MODAL_INGREDIENT: "OPEN_MODAL_INGREDIENT" =
//   "OPEN_MODAL_INGREDIENT";
// export const CLOSE_MODAL_INGREDIENT: "CLOSE_INGREDIENT" = "CLOSE_INGREDIENT";

// export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
// export const ADD_ITEMS: "ADD_ITEMS" = "ADD_ITEMS";

// export const DEL_ITEMS: "DEL_ITEMS" = "DEL_ITEMS";
// export const SORT_ITEMS: "SORT_ITEMS" = "SORT_ITEMS";

// export const REGISTRATION_NEW_USER: "REGISTRATION_NEW_USER" =
//   "REGISTRATION_NEW_USER";
// export const LOGIN: "LOGIN" = "LOGIN";
// export const LOGOUT: "LOGOUT" = "LOGOUT";
// export const CHANGE_USER_INFO: "CHANGE_USER_INFO" = "CHANGE_USER_INFO";
// export const CHECK_TOKEN: "CHECK_TOKEN" = "CHECK_TOKEN";
// export const GET_USER: "GET_USER" = "GET_USER";

// export const GET_ANY_ORDER_REQUEST: "GET_ANY_ORDER_REQUEST" =
//   "GET_ANY_ORDER_REQUEST";
// export const GET_ANY_ORDER_SUCCESS: "GET_ANY_ORDER_SUCCESS" =
//   "GET_ANY_ORDER_SUCCESS";
// export const GET_ANY_ORDER_FAILED: "GET_ANY_ORDER_FAILED" =
//   "GET_ANY_ORDER_FAILED";

export function getIngredients() {
  return function (dispatch: Dispatch<TIngredientsAction>) {
    dispatch({
      type: IngredientsActionTypes.GET_INGREDIENTS_REQUEST,
    });
    api(`${PATH}/ingredients`)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: IngredientsActionTypes.GET_INGREDIENTS_SUCCESS,
            data: res.data,
          });
        } else {
          dispatch({
            type: IngredientsActionTypes.GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((err) => console.log(err));
  };
}

export function getAnyOrder(number: string) {
  return function (dispatch: Dispatch<TAnyOrderAction>) {
    dispatch({
      type: GetAnyOrderActionTypes.GET_ANY_ORDER_REQUEST,
    });
    api(`${PATH}/orders/${number}`)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GetAnyOrderActionTypes.GET_ANY_ORDER_SUCCESS,
            order: res.orders[0],
          });
        } else {
          dispatch({
            type: GetAnyOrderActionTypes.GET_ANY_ORDER_FAILED,
          });
        }
      })
      .catch((err) => console.log(err));
  };
}

export function getOrder(burger: string[]) {
  return function (dispatch: Dispatch<TOrderModal>) {
    dispatch({
      type: ModalOrderActionTypes.GET_ORDER_REQUEST,
    });
    return postOrder(burger)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: ModalOrderActionTypes.GET_ORDER_SUCCESS,
            order: res.order,
          });
        } else {
          dispatch({
            type: ModalOrderActionTypes.GET_ORDER_FAILED,
            order: res,
          });
        }
      })
      .catch((err) => console.log(err));
  };
}
