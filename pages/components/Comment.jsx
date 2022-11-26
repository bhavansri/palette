import { Rnd } from 'react-rnd'
import { useOutsideClick } from '../../utils/hooks'

const Comment = ({ block, setBlock }) => {
    const { id } = block || {}
    const onDragStop = (event, direction) => {
        const { x, y } = direction

        setBlock({ id: id, x: x, y: y })
    }

    return (
        <Rnd default={block} onDragStop={onDragStop} bounds="parent" className='z-10 border' enableResizing={false}>
            <p>Hello World!</p>
        </Rnd>
    )
}

export default Comment