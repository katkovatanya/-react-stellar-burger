import constructorStyle from "./ingredient.module.css";
import { useDispatch } from "react-redux";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorActionTypes } from "../../services/actions";
import { FC } from "react";
import { IIngredientInterface } from "../../utils/ingredient-type";

interface IIngredientProps {
  ingredient: IIngredientInterface;
  index: number;
}

export type DragObject = {
  name: string;
  type: string;
  index: number
}


export const Ingredient: FC<IIngredientProps> = ({ ingredient, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [, dropSort] = useDrop({
    accept: "ingredientSort",
    hover(item: DragObject , monitor: any) {
      console.log(monitor)
      //dragIndex - what comes from Drag: index of the dragging item (46 line)
      const dragIndex = item.index;
      //hoverIndex - comes from props - index of hovered item (dispatch called on it)
      const hoverIndex = index;

      if (!ref.current) {
        return;
      }
      if (item.index === index) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch({
        type: BurgerConstructorActionTypes.SORT_ITEMS,
        dragIndex: item.index,
        hoverIndex: index,
      });

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragSort] = useDrag({
    type: "ingredientSort",
    item: {
      id: ingredient._id,
      index: index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  dragSort(dropSort(ref));

  const handleClose = () => {
    dispatch({
      type: BurgerConstructorActionTypes.DEL_ITEMS,
      id: ingredient.constructorId,
    });
  };

  return (
    <div
      ref={ref}
      className={constructorStyle.ingredient}
      key={ingredient.constructorId}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleClose()}
      />
    </div>
  );
};
