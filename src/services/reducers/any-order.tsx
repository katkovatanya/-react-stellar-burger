import { IOrderInterface } from "../../utils/ingredient-type";
import { GetAnyOrderActionTypes } from "../actions";

interface GetAnyOrderFailedAction {
  type: GetAnyOrderActionTypes.GET_ANY_ORDER_FAILED;
}

interface GetAnyOrderRequestAction {
  type: GetAnyOrderActionTypes.GET_ANY_ORDER_REQUEST;
}

interface GetAnyOrderSuccesAction {
  type: GetAnyOrderActionTypes.GET_ANY_ORDER_SUCCESS;
  order: IOrderInterface;
}

interface IAnyOrderState {
  order: IOrderInterface | null;
  orderRequest: boolean;
  orderFailed: boolean;
}

export type TAnyOrderAction =
  | GetAnyOrderFailedAction
  | GetAnyOrderRequestAction
  | GetAnyOrderSuccesAction;

const initialIngredients: IAnyOrderState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const anyOrderReducer = (
  state = initialIngredients,
  action: TAnyOrderAction
): IAnyOrderState => {
  switch (action.type) {
    case GetAnyOrderActionTypes.GET_ANY_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GetAnyOrderActionTypes.GET_ANY_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        order: action.order,
        orderRequest: false,
      };
    }
    case GetAnyOrderActionTypes.GET_ANY_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
