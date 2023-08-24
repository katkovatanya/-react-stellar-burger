import { IIngredientInterface } from "../../utils/ingredient-type";
import { BurgerConstructorActionTypes } from "../actions";

interface IConstructorState {
  items: IIngredientInterface[];
  bun: any;
}

interface AddItemsAction {
  type: BurgerConstructorActionTypes.ADD_ITEMS;
  item: IIngredientInterface;
}

interface AddBunAction {
  type: BurgerConstructorActionTypes.ADD_BUN;
  bun: IIngredientInterface;
}

interface DelItemsAction {
  type: BurgerConstructorActionTypes.DEL_ITEMS;
  id: string;
}

interface SortItemsAction {
  type: BurgerConstructorActionTypes.SORT_ITEMS;
  dragIndex: number;
  hoverIndex: number;
}

export type TBurgerConstructorAction =
  | AddItemsAction
  | AddBunAction
  | DelItemsAction
  | SortItemsAction;

const initialConstructor: IConstructorState = {
  items: [],
  bun: null,
};

export const burgerConstructorReducer = (
  state = initialConstructor,
  action: TBurgerConstructorAction
): IConstructorState => {
  switch (action.type) {
    case BurgerConstructorActionTypes.ADD_BUN: {
      return {
        ...state,
        bun: action.bun,
      };
    }
    case BurgerConstructorActionTypes.ADD_ITEMS: {
      return {
        ...state,
        items: [...state.items, action.item],
      };
    }
    case BurgerConstructorActionTypes.DEL_ITEMS: {
      return {
        ...state,
        items: state.items.filter((item) => {
          return item.constructorId !== action.id;
        }),
      };
    }
    case BurgerConstructorActionTypes.SORT_ITEMS: {
      const dragItem = state.items[action.dragIndex];
      const newItems = [...state.items];
      newItems.splice(action.dragIndex, 1);
      newItems.splice(action.hoverIndex, 0, dragItem);
      return {
        ...state,
        items: newItems,
      };
    }
    default: {
      return state;
    }
  }
};
