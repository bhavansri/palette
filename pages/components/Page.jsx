import { ItemTypes } from "../utils/ItemTypes"
import ImageElement from "./ImageElement"
import TextElement from "./TextElement"

const Page = ({ backgroundColor, blocks, setSize, setPosition }) => {
    
    return (
        <div style={{ backgroundColor: backgroundColor }} className="relative artboard shadow-xl phone-1 mb-5">
            {blocks.map(block => {
                const id = block.id

                if (block.type === ItemTypes.IMAGE) {
                    return (
                        <ImageElement
                            key={id}
                            id={id}
                            block={block}
                            setSize={setSize}
                            setPosition={setPosition}
                        />
                    )
                } else if (block.type === ItemTypes.TEXT) {
                    return (
                        <TextElement
                            key={id}
                            id={id}
                            block={block}
                            setSize={setSize}
                            setPosition={setPosition}
                        />
                    )
                }
            })}
        </div>
    )
}

export default Page