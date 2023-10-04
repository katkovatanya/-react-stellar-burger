import { ModalOrderActionTypes } from "../actions";
import { IOrderInterface } from "../../utils/ingredient-type";

interface IOrderState {
  order: {number: string }| null | IOrderInterface;
  orderRequest: boolean;
  orderFailed: boolean;
  modalOrder: boolean;
}

interface OpenModalOrderAction {
  type: ModalOrderActionTypes.OPEN_MODAL_ORDER;
}

interface CloseModalOrderAction {
  type: ModalOrderActionTypes.CLOSE_MODAL_ORDER;
}

interface GetOrderRequestAction {
  type: ModalOrderActionTypes.GET_ORDER_REQUEST;
}

interface GetOrderSuccessAction {
  type: ModalOrderActionTypes.GET_ORDER_SUCCESS;
  order: IOrderInterface;
}

interface GetOrderFailedAction {
  type: ModalOrderActionTypes.GET_ORDER_FAILED;
  order: string;
}

export type TOrderModal =
  | OpenModalOrderAction
  | CloseModalOrderAction
  | GetOrderRequestAction
  | GetOrderSuccessAction
  | GetOrderFailedAction;

const initialOrder: IOrderState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
  modalOrder: true,
};

export const modalOrderReducer = (
  state = initialOrder,
  action: TOrderModal
): IOrderState => {
  switch (action.type) {
    case ModalOrderActionTypes.OPEN_MODAL_ORDER: {
      return {
        ...state,
        modalOrder: true,
      };
    }
    case ModalOrderActionTypes.CLOSE_MODAL_ORDER: {
      return {
        ...state,
        modalOrder: false,
        order: null,
      };
    }
    default: {
      return state;
    }
  }
};

export const orderReducer = (
  state = initialOrder,
  action: TOrderModal
): IOrderState => {
  switch (action.type) {
    case ModalOrderActionTypes.GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        order: { number: "wait..." },
      };
    }
    case ModalOrderActionTypes.GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order,
      };
    }
    case ModalOrderActionTypes.GET_ORDER_FAILED: {
      console.log("ошибка");
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
        order: { number: action.order },
      };
    }
    default: {
      return state;
    }
  }
};
