import { useRef } from "react"
import { ItemTypes } from "../../utils/types"
import ButtonElement from "./ButtonElement"
import GraphicsElement from "./GraphicElement"
import ImageElement from "./ImageElement"
import TextAreaElement from "./TextAreaElement"
import HeadingElement from "./HeadingElement"
import TextFieldElement from "./TextFieldElement"
import BodyElement from "./BodyElement"

const Page = ({ backgroundColor, blocks, setBlock, didSelectBlock, selectedBlock, deleteBlock }) => {
    const pageRef = useRef()

    return (
        <div ref={pageRef} style={{ backgroundColor: backgroundColor, width: '595px', height: '841px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}>
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
                } else if (block.type === ItemTypes.BUTTON) {
                    return (
                        <ButtonElement
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
                } else if (block.type === ItemTypes.HEADING) {
                    return (
                        <HeadingElement
                            key={id}
                            block={block}
                            setBlock={setBlock}
                            didSelectBlock={didSelectBlock}
                            isSelected={isSelected}
                            pageRef={pageRef}
                        />
                    )
                } else if (block.type === ItemTypes.BODY) {
                    return (
                        <BodyElement
                            key={id}
                            block={block}
                            setBlock={setBlock}
                            didSelectBlock={didSelectBlock}
                            isSelected={isSelected}
                            pageRef={pageRef} />
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
                }
            })}
        </div>
    )
}

export default Page