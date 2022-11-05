import { Rnd } from "react-rnd"
import { handleStyles } from "../../utils/config"
import { useOutsideClick } from "../../utils/hooks"

const CheckboxInputElement = ({ block, setBlock, didSelectBlock, isSelected, pageRef, deleteBlock }) => {
    const { id, label, options } = block || {}
    const checkboxOptions = options || []

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
            resizeHandleStyles={isSelected ? handleStyles : {}}
            className={`flex items-center justify-center ${isSelected ? 'border border-blue-500' : 'border-0'}`}
            tabIndex={0}
            onKeyDown={handleKeyDown}>
            <div ref={ref} onClick={() => handleSelection(true)} className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text text-black">{label}</span>
                </label>
                {checkboxOptions.map(option => (
                    <label key={option.id} className="cursor-pointer flex items-center gap-2 mb-5">
                        <input type="checkbox" className="checkbox border-1 border-gray-800" />
                        <span className="label-text text-sm text-black">{option.text}</span>
                    </label>
                ))}
            </div>
        </Rnd>
    )
}

export default CheckboxInputElement