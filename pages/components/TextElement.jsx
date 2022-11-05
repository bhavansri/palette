import { Rnd } from 'react-rnd'
import { useOutsideClick } from '../../utils/hooks'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { useCallback, useMemo } from 'react'

const Leaf = props => {
    const getSize = () => {
        switch (props.leaf.size) {
            case 'sm':
                return 'text-md'
            case 'md':
                return 'text-lg'
            case 'lg':
                return 'text-xl'
            case 'xl':
                return 'text-4xl'
        }
    }

    return (
        <span {...props.attributes}
            className={getSize()}
            style={
                {
                    fontWeight: props.leaf.bold ? 'bold' : 'normal',
                    fontStyle: props.leaf.italic ? 'italic' : 'normal',
                    textDecoration: props.leaf.underline ? 'underline' : 'none',
                    fontFamily: props.leaf.font ? props.leaf.font.label : 'Merriweather'
                }
            }>
            {props.children}
        </span>
    )
}

const TextElement = ({ block, setBlock, isSelected, didSelectBlock, pageRef, deleteBlock }) => {
    const { id, text, width, height, x, y } = block || {}
    const textData = text ? JSON.parse(text) : []
    const editor = useMemo(() => withReact(createEditor()), [])

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])
     
    const onResize = (event, direction, ref, delta) => {
        const { width, height } = ref.style

        setBlock({ id: id, width: width, height: height })
    }

    const onDragStop = (event, direction) => {
        const { x, y } = direction
        
        setBlock({ id: id, x: x, y: y })
    }

    const handleSelection = (isSelected) => {
        if (isSelected) {
            didSelectBlock(block)
        } else {
            didSelectBlock(null)
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace') {
            deleteBlock()
        }
    }

    const ref = useOutsideClick(() => handleSelection(false), pageRef)

    return (
        <Slate editor={editor} value={textData}>
            <Rnd
                className={`${isSelected ? 'border border-blue-500' : 'border-0'} flex items-center justify-center`}
                position={{ x: x, y: y }}
                onResize={onResize}
                onDragStop={onDragStop}
                bounds="parent"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                maxHeight="fit-content"
            >
                <div ref={ref} onClick={() => handleSelection(true)} className="h-full">
                    <Editable renderLeaf={renderLeaf} readOnly className="text-clip text-black" />
                </div>
            </Rnd>
        </Slate>
    )
}

export default TextElement