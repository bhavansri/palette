import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../utils/ItemTypes'
import { Box } from './Box'

const styles = {
    border: '1px solid black',
    position: 'relative',
}

export const Artboard = ({boxes, setBoxes}) => {
    const moveBox = useCallback((id, left, top, title) => {
        setBoxes(boxes => ({
            ...boxes,
            [id]: { top, left, title }
        }))
    }, [setBoxes])

    const dropHandler = (item, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset()
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)
        moveBox(item.id, left, top, item.title)
        return undefined
    }

    const [{ canDrop, isOver }, dropRef] = useDrop(
        () => ({
            accept: ItemTypes.BOX,
            drop: (item, monitor) => dropHandler(item, monitor),
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop()
            })
        })
    )

    return (
        <div ref={dropRef} style={styles} className="h-full bg-stone-300">
            {Object.keys(boxes).map((key) => {
                const { left, top, title } = boxes[key]
                return (
                    <Box
                        key={key}
                        id={key}
                        left={left}
                        top={top}
                        title={title}
                    />
                )
            })}
        </div>
    )
}