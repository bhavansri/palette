import { ItemTypes } from "../utils/ItemTypes"
import ImageElement from "./ImageElement"
import TextElement from "./TextElement"

const Page = ({ backgroundColor, blocks, setBlock, blockSelected }) => {
    
    return (
        <div style={{ backgroundColor: backgroundColor }} className="relative artboard shadow-xl phone-1 mb-5">
            {blocks.map(block => {
                const id = block.id

                if (block.type === ItemTypes.IMAGE) {
                    return (
                        <ImageElement
                            key={id}
                            block={block}
                            setBlock={setBlock}
                            blockSelected={blockSelected}
                        />
                    )
                } else if (block.type === ItemTypes.TEXT) {
                    return (
                        <TextElement
                            key={id}
                            block={block}
                            setBlock={setBlock}
                            blockSelected={blockSelected}
                        />
                    )
                }
            })}
        </div>
    )
}

export default Page