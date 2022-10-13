import { useState } from 'react'
import { Rnd } from 'react-rnd'
import Editable from './Editable'

const calculateWidth = (text, font) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    context.font = font || getComputedStyle(document.body).font

    return context.measureText(text).width
}

const TextElement = ({ id, block, setSize, setPosition }) => {
    const [text, setText] = useState("Placeholder Text")
    const [width, setWidth] = useState(100)

    const onResize = (event, direction, ref, delta) => {
        const { height } = ref.style
        const width = calculateWidth(text, block.font)

        setWidth(width)
        setSize(id, width, height)
    }

    const onDragStop = (event, direction) => {
        const { x, y } = direction

        setPosition(id, x, y)
    }

    return (
        <Rnd className='border overflow-hidden text-ellipsis whitespace-nowrap' default={block} onResize={onResize} onDragStop={onDragStop} bounds="parent">
            <Editable
                text={text}
                type="input"
            >
                <input
                    className='w-full'
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
            </Editable>
        </Rnd>
    )
}

export default TextElement