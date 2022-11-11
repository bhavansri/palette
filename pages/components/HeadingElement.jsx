import { useEffect, useRef, useState } from "react"
import { Rnd } from "react-rnd"
import { handleTextStyles } from "../../utils/config"
import { useOutsideClick } from "../../utils/hooks"
import { ItemTypes } from "../../utils/types"

const HeadingElement = ({ block, setBlock, didSelectBlock, isSelected, pageRef }) => {
    const { id, type, value, x, y, width } = block
    const [isDragging, setIsDragging] = useState(false)
    const [editingValue, setEditingValue] = useState(value)
    
    const onChange = (event) => setEditingValue(event.target.value)
    
    const handleSelection = (isSelected) => {
        if (isSelected) {
            didSelectBlock(block)
        } else {
            didSelectBlock(null)
        }
    }

    const ref = useOutsideClick(() => { handleSelection(false) }, pageRef)

    const onDragStop = (event, direction) => {
        const { x, y } = direction

        setIsDragging(false)
        setBlock({ id: id, x: x, y: y })
    }

    const onResize = (event, direction, ref, delta) => {
        const { width } = ref.style

        setBlock({ id: id, width: width })
    }

    const onKeyDown = (event) => {
        if (event.key === "Enter" || event.key === "Escape") {
            event.target.blur()
        }
    }

    const onBlur = (event) => {
        if (event.target.value.trim() === "") {
            setBlock({ id: id, value: value })
        } else {
            setBlock({ id: id, value: event.target.value })
        }
    }

    const onDoubleClick = (event) => {
        ref.current.select()
    }
        
    return (
        <Rnd
            size={{ width: width, height: 'auto' }}
            position={{ x: x, y: y }}
            onDragStart={() => { setIsDragging(true) }}
            resizeHandleStyles={isSelected ? handleTextStyles : {}}
            onDragStop={onDragStop}
            onResize={onResize}
            bounds="parent"
            tabIndex={0}
        >
            <input ref={ref} onClick={() => { handleSelection(true) }} className={`caret-transparent ${ isSelected ? 'border border-blue-500' : 'border-0' } text-black ${ type === ItemTypes.HEADING ? 'text-4xl' : 'text-2xl' } bg-transparent p-2 hover:cursor-pointer ${ isDragging ? "focus:caret-transparent" : "focus:caret-inherit"} focus:outline-none w-full`} type="text" onDoubleClick={onDoubleClick} value={editingValue} onChange={onChange} onKeyDown={onKeyDown} onBlur={onBlur} />
        </Rnd>
    )
}

export default HeadingElement