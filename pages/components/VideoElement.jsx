import { useState } from "react"
import { Rnd } from "react-rnd"
import { handleStyles } from "../../utils/config"
import { useOutsideClick } from "../../utils/hooks"
import YouTubeVideo from "./YoutubeVideo"

const VideoElement = ({ block, setBlock, didSelectBlock, isSelected, pageRef, deleteBlock }) => {
    const { id, width, height } = block || {}
    const [disabled, setDisabled] = useState(true)

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
            setDisabled(true)
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
            <div ref={ref} onClick={() => handleSelection(true)} onDoubleClick={() => { setDisabled(false) }} className="w-full h-full">
                <YouTubeVideo width={width} height={height} disabled={disabled} />
            </div>
        </Rnd>
    )
}

export default VideoElement