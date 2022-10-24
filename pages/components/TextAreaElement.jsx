import { Rnd } from "react-rnd"
import { handleStyles } from "../../utils/config"
import { useOutsideClick } from "../../utils/hooks"

const TextAreaElement = ({ block, setBlock, didSelectBlock, isSelected, pageRef, deleteBlock }) => {
    const { id, bgColor, label, displayLines } = block || {}

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
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className={`flex items-center justify-center p-2 ${isSelected ? 'border border-blue-500' : 'border-0'}`}>
            <div ref={ref} onClick={() => handleSelection(true)} className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text text-black">{label}</span>
                </label>
                {
                    displayLines ? <textarea className="h-24 px-3 py-2 placeholder-black text-black" placeholder="Type Something" style={{ backgroundColor: bgColor, backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 30px', border: 0, outline: 0, lineHeight: '30px' }}></textarea> :
                    <textarea className="textarea textarea-bordered text-black placeholder-black h-24" placeholder="Type Something" style={{ backgroundColor: bgColor }}></textarea>
                }
            </div>
        </Rnd>
    )
}

export default TextAreaElement