import dynamic from 'next/dynamic'
import { Rnd } from 'react-rnd'
import { useOutsideClick } from '../../utils/hooks'

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import 'react-quill/dist/quill.bubble.css';
import { handleTextStyles } from '../../utils/config'

const TextElement = ({ block, setBlock, isSelected, didSelectBlock, pageRef, deleteBlock }) => {
    const { id, width, x, y, text } = block || {}

    const onResize = (event, direction, ref, delta) => {
        const { width } = ref.style

        setBlock({ id: id, width: width })
    }

    const onDragStop = (event, direction) => {
        const { x, y } = direction
        
        setBlock({ id: id, x: x, y: y })
    }

    const handleSelection = (isSelected) => {
        if (isSelected) {
            didSelectBlock(block)
        } else {
            didSelectBlock(null)
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === '1') {
            deleteBlock()
        }
    }

    const ref = useOutsideClick(() => handleSelection(false), pageRef)

    return (
        <Rnd
            className={`${ isSelected ? 'border border-blue-500' : 'border-0' }`}
            position={{ x: x, y: y }}
            size={{ width: width, height: 'auto' }}
            resizeHandleStyles={isSelected ? handleTextStyles : {}}
            tabIndex={0}
            onResize={onResize}
            onDragStop={onDragStop}
            onKeyDown={handleKeyDown}
            enableResizing={{
                top: false,
                right: true,
                bottom: false,
                left: true,
                topRight: false,
                topLeft: false,
                bottomRight: false,
                bottomLeft: false,
            }}
            bounds="parent"
            enableUserSelectHack={false}>
            <div ref={ref} onClick={() => { handleSelection(true) }} className="text-black">
                <ReactQuill theme='bubble' value={text} onChange={(value) => { setBlock({ id: id, text: value }) }} />
            </div>
        </Rnd>
    )
}

export default TextElement