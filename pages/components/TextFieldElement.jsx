import { Rnd } from "react-rnd"
import { handleStyles } from "../utils/config"
import { useOutsideClick } from "../utils/hooks"

const TextFieldElement = ({ block, setBlock, didSelectBlock, isSelected, pageRef }) => {
    const { id } = block

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

    const ref = useOutsideClick(() => handleSelection(false), pageRef)

    return (
        <Rnd
            default={block}
            onResize={onResize}
            onDragStop={onDragStop}
            bounds="parent"
            lockAspectRatio={true}
            resizeHandleStyles={isSelected ? handleStyles : {}}
            className={`flex items-center justify-center p-2 ${isSelected ? 'border border-blue-500' : 'border-0'}`}>
            <div ref={ref} onClick={() => handleSelection(true)} className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">{block.label}</span>
                </label>
                <input type="text" value="Placeholder" className="input input-sm input-bordered w-full max-w-xs" style={{ backgroundColor: block.bgColor, color: block.textColor }} />
            </div>
        </Rnd>
    )
}

export default TextFieldElement