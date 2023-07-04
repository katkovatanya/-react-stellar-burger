import {
  ADD_ITEMS,
  ADD_BUN,
  DEL_ITEMS,
  SORT_ITEMS
} from '../actions/index'

const initialConstructor = {
  items: [],
  bun: {}
}

export const burgerConstructorReducer = (state = initialConstructor, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.bun
      }
    }
    case ADD_ITEMS: {
      return {
        ...state,
        items: [...state.items, action.item]
      }
    }
    case DEL_ITEMS: {
      return {
        ...state,
        items: state.items.filter(item => {
          return item.constructorId !== action.id
        })
      }
    }
    case SORT_ITEMS: {
      const dragItem = state.items[action.dragIndex];
      const newItems = [...state.items];
      newItems.splice(action.dragIndex, 1);
      newItems.splice(action.hoverIndex, 0, dragItem);
      return {
        ...state,
        items: newItems
      }
    }
    default: {
      return state;
    }
  }
}
