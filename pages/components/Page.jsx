import { useRef } from "react"
import { ItemTypes } from "../utils/types"
import DropdownInputElement from "./DropdownInputElement"
import ImageElement from "./ImageElement"
import TextElement from "./TextElement"
import TextFieldElement from "./TextFieldElement"

const Page = ({ backgroundColor, blocks, setBlock, didSelectBlock, selectedBlock, deleteBlock }) => {
    const pageRef = useRef()

    return (
        <div ref={pageRef} style={{ backgroundColor: backgroundColor }} className="relative artboard artboard-horizontal shadow-xl phone-3 mb-5">
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
                            deleteBlock={deleteBlock}
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
                            deleteBlock={deleteBlock}
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
                            deleteBlock={deleteBlock}
                        />
                    )
                } else if (block.type === ItemTypes.DROPDOWN_INPUT) {
                    return (
                        <DropdownInputElement
                            key={id}
                            block={block}
                            setBlock={setBlock}
                            didSelectBlock={didSelectBlock}
                            isSelected={isSelected}
                            pageRef={pageRef}
                            deleteBlock={deleteBlock}
                        />
                    )
                }
            })}
        </div>
    )
}

export default Page