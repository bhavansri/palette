import { useRef } from "react"
import { ItemTypes } from "../utils/ItemTypes"
import ImageElement from "./ImageElement"
import TextElement from "./TextElement"

const Page = ({ backgroundColor, blocks, setBlock, blockSelected }) => {
    const pageRef = useRef()

    return (
        <div ref={pageRef} style={{ backgroundColor: backgroundColor }} className="relative artboard shadow-xl phone-1 mb-5">
            {blocks.map(block => {
                const id = block.id

                if (block.type === ItemTypes.IMAGE) {
                    return (
                        <ImageElement
                            key={id}
                            block={block}
                            setBlock={setBlock}
                            blockSelected={blockSelected}
                            pageRef={pageRef}
                        />
                    )
                } else if (block.type === ItemTypes.TEXT) {
                    return (
                        <TextElement
                            key={id}
                            block={block}
                            setBlock={setBlock}
                            blockSelected={blockSelected}
                            pageRef={pageRef}
                        />
                    )
                }
            })}
        </div>
    )
}

export default Page