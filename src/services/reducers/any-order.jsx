import {
  GET_ANY_ORDER_FAILED,
  GET_ANY_ORDER_REQUEST,
  GET_ANY_ORDER_SUCCESS,
} from "../actions";


const initialIngredients = {
  order: null,
  orderRequest: false,
  orderFailed: false
}


export const anyOrderReducer = (state = initialIngredients, action) => {
  switch (action.type) {
    case GET_ANY_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case GET_ANY_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        order: action.order,
        oredrRequest: false
      };
    }
    case GET_ANY_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false
      };
    }
    default: {
      return state;
    }
  }
}
