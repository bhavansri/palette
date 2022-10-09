import { ItemTypes } from "../utils/ItemTypes"
import ImageElement from "./ImageElement"

const Page = ({ backgroundColor, blocks, setSize, setPosition }) => {
    
    return (
        <div style={{ backgroundColor: backgroundColor }} className="relative artboard shadow-xl phone-1 mb-5">
            {blocks.map(block => {
                if (block.type === ItemTypes.IMAGE) {
                    const id = block.id
                    return (
                        <ImageElement
                            key={block.id}
                            id={block.id}
                            image={block}
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