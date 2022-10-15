import { useRef, useState } from 'react'
import { Rnd } from 'react-rnd'

const calculateWidth = (text, font) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    context.font = font || getComputedStyle(document.body).font

    return context.measureText(text).width
}

const TextElement = ({ block, setBlock }) => {
    const { id } = block
    const [text, setText] = useState("Placeholder Text")
    const [width, setWidth] = useState(100)
    const [isEditing, setEditing] = useState(false)
    const [isDragging, setDragging] = useState(false)

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

    return (
        <Rnd
            className='overflow-hidden text-ellipsis whitespace-nowrap'
            default={block}
            onResize={onResize}
            onDragStop={onDragStop}
            bounds="parent"
        >
            {
                <input
                    className={`bg-transparent outline-none ${isDragging ? 'cursor-move' : 'cursor-auto'}`}
                    type="text"
                    value={text}
                    onBlur={() => setEditing(false)}
                    onChange={e => setText(e.target.value)}
                    onDoubleClick={e => e.target.select()}
                />
            }
        </Rnd>
    )
}

export default TextElement