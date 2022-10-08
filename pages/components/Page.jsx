import { useCallback, useEffect, useState } from "react"
import { useDrop } from "react-dnd"
import { ItemTypes } from "../utils/ItemTypes"
import ImageElement from "./ImageElement"

const Page = ({ backgroundColor }) => {

    const [elements, setElements] = useState({
        a: { type: ItemTypes.IMAGE, top: 20, left: 80, url: 'https://images.unsplash.com/photo-1610809027249-86c649feacd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80' }
    })

    useEffect(() => {
        console.log(elements)
    })

    const moveBox = useCallback((id, top, left, url) => {
        setElements(prevElements => ({
            ...prevElements,
            [id]: {
                top: top,
                left: left,
                url: url
            }
        }))
    }, [setElements])

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.IMAGE,
            drop(item, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset()
                const left = Math.round(item.left + delta.x)
                const top = Math.round(item.top + delta.y)
                moveBox(item.id, top, left, item.url)
                
                return undefined
            }
        }),
        [moveBox]
    )

    return (
        <div ref={drop} style={{ backgroundColor: backgroundColor }} className="relative artboard shadow-xl phone-1 mb-5">
            {
                Object.keys(elements).map((key) => {
                    const { top, left, url } = elements[key]
                    return (
                        <ImageElement
                            key={key}
                            id={key}
                            left={left}
                            top={top}
                            url={url}
                        />
                    )
                })
            }
        </div>
    )
}

export default Page