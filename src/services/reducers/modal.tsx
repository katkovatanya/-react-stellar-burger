import { ModalActionTypes } from "../actions";

interface IModalState {
  modal: boolean;
}

interface OpenModalAction {
  type: ModalActionTypes.OPEN_MODAL;
}

interface CloseModalAction {
  type: ModalActionTypes.CLOSE_MODAL;
}

const initialState: IModalState = {
  modal: false,
};

export type TModal = OpenModalAction | CloseModalAction;

export const modalReducer = (
  state = initialState,
  action: TModal
): IModalState => {
  switch (action.type) {
    case ModalActionTypes.OPEN_MODAL: {
      return {
        ...state,
        modal: true,
      };
    }
    case ModalActionTypes.CLOSE_MODAL: {
      return {
        ...state,
        modal: false,
      };
    }
    default: {
      return state;
    }
  }
};
