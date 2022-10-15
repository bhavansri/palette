import { useState } from 'react'
import { Rnd } from 'react-rnd'
import { useOutsideClick } from '../utils/hooks'
import { handleStyles } from '../utils/config'

const ImageElement = ({ block, setBlock }) => {
    const { id } = block
    const [selected, setSelected] = useState(true)

    const onSelect = () => {
        setSelected(true)
    }

    const onDeselect = () => {
        setSelected(false)
    }

    const ref = useOutsideClick(onDeselect)

    const onResize = (event, direction, ref, delta) => {
        const { width, height } = ref.style

        setBlock({ id: id, width: width, height: height })
    }

    const onDragStop = (event, direction) => {
        const { x, y } = direction

        setBlock({ id: id, x: x, y: y })
        onDeselect()
    }

    return (
        <Rnd
            default={block}
            onResize={onResize}
            onResizeStart={onSelect}
            onResizeStop={onDeselect}
            onDragStart={onSelect}
            onDragStop={onDragStop}
            bounds="parent"
            lockAspectRatio={true}
            resizeHandleStyles={selected ? handleStyles : {}}
            className={ selected ? 'border border-blue-500' : 'border-0'}>
            <div ref={ref} className="w-full h-full" style={{ backgroundImage: `url(${block.url})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%' }} />
        </Rnd>
    )
}

export default ImageElement