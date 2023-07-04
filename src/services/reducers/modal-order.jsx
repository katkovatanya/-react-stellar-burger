import {
  OPEN_MODAL_ORDER,
  CLOSE_MODAL_ORDER,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../actions";


const initialOrder = {
  order: {},
  orderRequest: false,
  orderFailed: false,
}


export const modalOrderReducer = (state = initialOrder, action) => {
  switch (action.type) {
    case OPEN_MODAL_ORDER: {
      return {
        ...state,
        modalOrder: true
      };
    }
    case CLOSE_MODAL_ORDER: {
      return {
        ...state,
        modalOrder: false,
        order: {}
      };
    }
    default: {
      return state;
    }
  }
}

export const orderReducer = (state = initialOrder, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        order: { number: 'wait...' }
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order
      };
    }
    case GET_ORDER_FAILED: {
      console.log('ошибка')
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
        order: { number: action.order }
      };
    }
    default: {
      return state;
    }
  }
}