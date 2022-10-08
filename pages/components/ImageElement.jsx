import { useState } from "react"
import { Rnd } from 'react-rnd'
import { ItemTypes } from "../utils/ItemTypes"

const ImageElement = () => {
    const [position, setPosition] = useState({ x: 0, y: 0, width: 120, height: 90, url: 'https://images.unsplash.com/photo-1610809027249-86c649feacd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'})
    
    const onResize = (event, direction, ref, delta) => {
        const { width, height } = ref.style

        setPosition(prevPosition => ({
            ...prevPosition,
            width,
            height
        }))
    }

    const onDragStop = (event, direction) => {
        const { x, y } = direction

        setPosition(prevPosition => ({
            ...prevPosition,
            x,
            y
        }))
    }

    return (
        <Rnd default={position} onResize={onResize} onDragStop={onDragStop} bounds="parent" lockAspectRatio={true}>
            <div className="w-full h-full" style={{ backgroundImage: `url(${position.url})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%' }} />
        </Rnd>
    )
}

export default ImageElement