import { useRef, useState } from 'react'
import { Rnd } from 'react-rnd'
import { handleStyles } from '../utils/config'
import { useOutsideClick } from '../utils/hooks'

const calculateWidth = (text, font) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    context.font = font || getComputedStyle(document.body).font

    return context.measureText(text).width
}

const TextElement = ({ block, setBlock, blockSelected }) => {
    const { id } = block
    const [text, setText] = useState("Placeholder Text")
    const [width, setWidth] = useState(100)
    const [isEditing, setEditing] = useState(false)
    const [isDragging, setDragging] = useState(false)
    const [selected, setSelected] = useState(true)

    const onResize = (event, direction, ref, delta) => {
        const { height } = ref.style
        const width = calculateWidth(text, block.font)
        
        setDragging(true)
        setWidth(width)

        setBlock({ id: id, width: width, height: height })
    }

    const onDragStop = (event, direction) => {
        const { x, y } = direction
        
        setDragging(true)

        setBlock({ id: id, x: x, y: y })
    }

    const handleSelection = (isSelected) => {
        setSelected(isSelected)

        if (isSelected) {
            blockSelected(block)
        } else {
            blockSelected(null)
        }
    }

    const ref = useOutsideClick(() => handleSelection(false))

    return (
        <Rnd
            className={`${selected ? 'border border-blue-500' : 'border-0' } overflow-hidden text-ellipsis whitespace-nowrap`}
            default={block}
            resizeHandleStyles={selected ? handleStyles : {}}
            onResize={onResize}
            onDragStop={onDragStop}
            bounds="parent"
        >
            {
                <input
                    className={`bg-transparent outline-none ${isDragging ? 'cursor-move' : 'cursor-auto'}`}
                    type="text"
                    ref={ref}
                    value={text}
                    onBlur={() => setEditing(false)}
                    onChange={e => setText(e.target.value)}
                    onClick={e => handleSelection(true)}
                    onDoubleClick={e => e.target.select()}
                />
            }
        </Rnd>
    )
}

export default TextElement