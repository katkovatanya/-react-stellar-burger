import constructorStyle from './ingredient.module.css';
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from 'prop-types';
import { useDispatch} from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { SORT_ITEMS, DEL_ITEMS } from '../../services/actions';


export function Ingredient({ ingredient, index }) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  
  const [, dropSort] = useDrop({
    accept: 'ingredientSort',
    hover(item, monitor) {
      //dragIndex - what comes from Drag: index of the dragging item (46 line)
      const dragIndex = item.index;
      //hoverIndex - comes from props - index of hovered item (dispatch called on it)
      const hoverIndex = index;

      if (!ref.current) { return }
      if (item.index === index) { return }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      dispatch({
        type: SORT_ITEMS,
        dragIndex: item.index,
        hoverIndex: index
      })

      item.index = hoverIndex;
    }
  })

  const [{ isDragging }, dragSort] = useDrag({
    type: 'ingredientSort',
    item: {
      id: ingredient._id,
      index: index
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })
  const opacity = isDragging ? 0 : 1;
  dragSort(dropSort(ref));

  const handleClose = (e) => {
    e.preventDefault();
    dispatch({ type: DEL_ITEMS, id: ingredient.constructorId })
  }

  return (
    <div ref={ref} className={constructorStyle.ingredient} key={ingredient.constructorId} style={{ opacity }} >
      <DragIcon type="primary" />
      <ConstructorElement text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={(e) => handleClose(e)}
      />
    </div>
  )
}

Ingredient.propTypes = {
  ingredient: ingredientPropType,
  index: PropTypes.number
}
