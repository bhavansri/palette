import { useRef } from "react"
import { ItemTypes } from "../../utils/types"
import CheckboxInputElement from "./CheckboxInputElement"
import GraphicsElement from "./GraphicElement"
import ImageElement from "./ImageElement"
import TextAreaElement from "./TextAreaElement"
import TextElement from "./TextElement"
import TextFieldElement from "./TextFieldElement"
import VideoElement from "./VideoElement"

const Page = ({ backgroundColor, blocks, setBlock, didSelectBlock, selectedBlock, deleteBlock }) => {
    const pageRef = useRef()

    return (
        <div ref={pageRef} style={{ backgroundColor: backgroundColor, width: 700, height: 600 }} className="relative shadow-xl mb-5">
            {blocks?.map(block => {
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
                } else if (block.type === ItemTypes.GRAPHIC) {
                    return (
                        <GraphicsElement
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
                } else if (block.type === ItemTypes.TEXT_AREA) {
                    return (
                        <TextAreaElement
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
                } else if (block.type === ItemTypes.CHECKBOX_INPUT) {
                    return (
                        <CheckboxInputElement
                            key={id}
                            block={block}
                            setBlock={setBlock}
                            didSelectBlock={didSelectBlock}
                            isSelected={isSelected}
                            pageRef={pageRef}
                            deleteBlock={deleteBlock}
                        />
                    )
                } else if (block.type === ItemTypes.VIDEO) {
                    return (
                        <VideoElement
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