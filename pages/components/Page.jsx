import { useRef } from "react"
import { ItemTypes } from "../utils/types"
import ImageElement from "./ImageElement"
import TextElement from "./TextElement"
import TextFieldElement from "./TextFieldElement"

const Page = ({ backgroundColor, blocks, setBlock, didSelectBlock, selectedBlock }) => {
    const pageRef = useRef()

    return (
        <div ref={pageRef} style={{ backgroundColor: backgroundColor }} className="relative artboard shadow-xl phone-1 mb-5">
            {blocks.map(block => {
                const id = block.id
                const isSelected = selectedBlock !== null ? selectedBlock.id === id : false

                if (block.type === ItemTypes.IMAGE) {
                    return (
                        <ImageElement
                            key={id}
                            block={block}
                            setBlock={setBlock}
                            didSelectBlock={didSelectBlock}
                            isSelected={isSelected}
                            pageRef={pageRef}
                        />
                    )
                } else if (block.type === ItemTypes.TEXT) {
                    return (
                        <TextElement
                            key={id}
                            block={block}
                            setBlock={setBlock}
                            didSelectBlock={didSelectBlock}
                            isSelected={isSelected}
                            pageRef={pageRef}
                        />
                    )
                } else if (block.type === ItemTypes.TEXT_INPUT) {
                    return (
                        <TextFieldElement
                            key={id}
                            block={block}
                            setBlock={setBlock}
                            didSelectBlock={didSelectBlock}
                            isSelected={isSelected}
                            pageRef={pageRef}
                        />
                    )
                }
            })}
        </div>
    )
}

export default Page