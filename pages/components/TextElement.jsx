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

const TextElement = ({ block, setBlock, isSelected, didSelectBlock, pageRef, deleteBlock }) => {
    const { id, text, font, color, size, alignment } = block
    const [isDragging, setDragging] = useState(false)
    const [edit, setEdit] = useState(false)

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
        if (isSelected) {
            didSelectBlock(block)
        } else {
            didSelectBlock(null)
            setEdit(false)
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

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace') {
            deleteBlock()
        }
    }

    return (
        <Rnd
            className={`${isSelected ? 'border border-blue-500' : 'border-0'} overflow-hidden text-ellipsis whitespace-nowrap`}
            default={block}
            resizeHandleStyles={isSelected ? handleStyles : {}}
            onResize={onResize}
            onDragStop={onDragStop}
            bounds="parent"
            tabIndex={0}
            onKeyDown={handleKeyDown}
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
                    readOnly={!edit}
                    onDoubleClick={(e) => {
                        setEdit(true)
                        e.target.select()
                    }}
                />
            }
        </Rnd>
    )
}

export default TextElement