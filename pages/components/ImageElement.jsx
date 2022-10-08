import Image from "next/image"
import { useDrag } from "react-dnd"
import { ItemTypes } from "../utils/ItemTypes"

const ImageElement = ({ id, left, top, url }) => {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.IMAGE,
            item: { id, left, top, url },
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            })
        }),
        [id, left, top, url]
    )

    if (isDragging) {
        return <div ref={drag} />
    }

    return (
        <div ref={drag} style={{ left, top, height: 100, width: 100 }} className="absolute cursor-move">
            <Image height={100} width={100} src={url} alt="Image" />
        </div>
    )
}

export default ImageElement