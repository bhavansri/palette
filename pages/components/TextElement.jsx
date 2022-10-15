import { useState } from 'react'
import { Rnd } from 'react-rnd'
import { handleStyles } from '../utils/config'
import { useOutsideClick } from '../utils/hooks'
import { TextAlignments, TextSizes } from '../utils/types'

const calculateWidth = (text, font) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    context.font = font || getComputedStyle(document.body).font

    return context.measureText(text).width
}

const TextElement = ({ block, setBlock, blockSelected, pageRef }) => {
    const { id, text, font, color, size, alignment } = block
    const [isDragging, setDragging] = useState(false)
    const [selected, setSelected] = useState(true)

    const onTextChange = (event) => {
        setBlock({ id: id, text: event.target.value })
    }

    const onResize = (event, direction, ref, delta) => {
        const { height } = ref.style
        const width = calculateWidth(text, block.font)
        
        setDragging(true)
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

    const ref = useOutsideClick(() => handleSelection(false), pageRef)

    const textAlignment = () => {
        switch (alignment) {
            case TextAlignments.left:
                return 'text-left'
            case TextAlignments.center:
                return 'text-center'
            case TextAlignments.right:
                return 'text-right'
        }
    }

    const textSize = () => {
        switch (size) {
            case TextSizes.sm:
                return 'text-sm'
            case TextSizes.md:
                return 'text-md'
            case TextSizes.lg:
                return 'text-lg'
            case TextSizes.xl:
                return 'text-xl'
        }
    }

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
                    className={`${textSize()} ${textAlignment()} bg-transparent outline-none ${isDragging ? 'cursor-move' : 'cursor-auto'}`}
                    type="text"
                    ref={ref}
                    value={text}
                    onChange={onTextChange}
                    style={{ color, fontFamily: font }}
                    onClick={e => handleSelection(true)}
                    onDoubleClick={e => e.target.select()}
                />
            }
        </Rnd>
    )
}

export default TextElement