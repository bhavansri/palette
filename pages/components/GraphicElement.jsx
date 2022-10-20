import { Rnd } from 'react-rnd'
import { useOutsideClick } from '../utils/hooks'
import { handleStyles } from '../utils/config'
import Image from 'next/image'

const GraphicsElement = ({ block, setBlock, didSelectBlock, isSelected, pageRef, deleteBlock }) => {
    const { id, filename } = block

    const onResize = (event, direction, ref, delta) => {
        const { width, height } = ref.style

        setBlock({ id: id, width: width, height: height })
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
        if (event.key === 'Backspace') {
            deleteBlock()
        }
    }

    const ref = useOutsideClick(() => handleSelection(false), pageRef)
    
    return (
        <Rnd
            default={block}
            onResize={onResize}
            onDragStop={onDragStop}
            bounds="parent"
            lockAspectRatio={true}
            resizeHandleStyles={isSelected ? handleStyles : {}}
            className={isSelected ? 'border border-blue-500' : 'border-0'}
            tabIndex={0}
            onKeyDown={handleKeyDown}>
            <div ref={ref} onClick={() => handleSelection(true)} className="w-full h-full" style={{ backgroundImage: `url(/illustrations/${block.filename})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain'}} />
        </Rnd>
    )
}

export default GraphicsElement