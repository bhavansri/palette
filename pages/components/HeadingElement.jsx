import dynamic from "next/dynamic"
import { useState } from "react"
import { Rnd } from "react-rnd"
import { handleTextStyles } from "../../utils/config"
import { useOutsideClick } from "../../utils/hooks"

const ReactQuill = dynamic(import('react-quill'), { ssr: false, loading: () => <p>Loading...</p> })

const modules  = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline"],
        [{ color: [] }],
    ],
}

const HeadingElement = ({ block, setBlock, didSelectBlock, isSelected, pageRef }) => {
    const { id, x, y, width, value } = block
    const [text, setText] = useState(value)
    const [isEditable, setEditable] = useState(false)
    
    const handleSelection = (isSelected) => {
        if (isSelected) {
            didSelectBlock(block)
        } else {
            setEditable(false)
            didSelectBlock(null)
        }
    }

    const ref = useOutsideClick(() => { handleSelection(false) }, pageRef)

    const onDragStop = (event, direction) => {
        const { x, y } = direction

        setBlock({ id: id, x: x, y: y })
    }

    const onResize = (event, direction, ref, delta) => {
        const { width } = ref.style

        setBlock({ id: id, width: width })
    }
    
    return (
        <Rnd
            size={{ width: width, height: 'auto' }}
            position={{ x: x, y: y }}
            resizeHandleStyles={isSelected ? handleTextStyles : {}}
            onDragStop={onDragStop}
            onResize={onResize}
            bounds="parent"
            tabIndex={0}
            disableDragging={isEditable}
            enableResizing={{
                top: false,
                right: true,
                bottom: false,
                left: true,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false
            }}
            enableUserSelectHack={!isEditable}
            className="cursor cursor-move"
        >
            <div ref={ref}
                onDoubleClick={() => { setEditable(true) }}
                onClick={() => { handleSelection(true) }}
                className={`${isSelected ? 'border border-blue-500' : 'border-0'} text-black`}>
                <ReactQuill
                    theme="bubble"
                    value={text}
                    onChange={setText}
                    modules={modules}
            />
            </div>
        </Rnd>
    )
}

export default HeadingElement