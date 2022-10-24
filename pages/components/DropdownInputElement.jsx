import { Rnd } from "react-rnd"
import { handleStyles } from "../../utils/config"
import { useOutsideClick } from "../../utils/hooks"

const DropdownInputElement = ({ block, setBlock, didSelectBlock, isSelected, pageRef, deleteBlock }) => {
    const { id, bgColor, label, textColor, options } = block || {}
    const dropdownOptions = options || []

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
            className={`flex items-center justify-center ${isSelected ? 'border border-blue-500' : 'border-0'}`}
            tabIndex={0}
            onKeyDown={handleKeyDown}>
            <div ref={ref} onClick={() => handleSelection(true)} className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text" style={{ color: textColor }}>{label}</span>
                </label>
                <select className="select w-full max-w-xs text-black" style={{ backgroundColor: bgColor }}>
                    {dropdownOptions.map(option => <option key={option.id}>{option.text}</option>)}
                </select>
            </div>
        </Rnd>
    )
}

export default DropdownInputElement