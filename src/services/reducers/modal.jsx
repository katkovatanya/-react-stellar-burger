import { OPEN_MODAL, CLOSE_MODAL } from "../actions";

const initialState = {
  modal: false,
  modalOrder: false,
  modalIngredient: false
}


export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        modal: true
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        modal: false
      };
    }
    default: {
      return state;
    }
  }
}