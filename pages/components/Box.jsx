import { useDrag } from 'react-dnd'
import { ItemTypes } from '../utils/ItemTypes'

const style = {
    position: 'absolute',
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    cursor: 'move',
    color: 'black'
  }

export const Box = ({ id, left, top, title }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top, title },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        }),
    }),
    [id, left, top, title],
  )
  
  if (isDragging) {
      return <div ref={drag} />
  }
  

      
  return (
      <div className="box" ref={drag} style={{ ...style, left, top }}>
        {title}
      </div>
  )
}