import { Rnd } from 'react-rnd'

const ImageElement = ({ id, image, setSize, setPosition }) => {

    const onResize = (event, direction, ref, delta) => {
        const { width, height } = ref.style

        setSize(id, width, height)
    }

    const onDragStop = (event, direction) => {
        const { x, y } = direction

        setPosition(id, x, y)
    }

    return (
        <Rnd default={image} onResize={onResize} onDragStop={onDragStop} bounds="parent" lockAspectRatio={true}>
            <div className="w-full h-full" style={{ backgroundImage: `url(${image.url})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%' }} />
        </Rnd>
    )
}

export default ImageElement