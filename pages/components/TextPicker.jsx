import Image from "next/image"
import React, { useCallback, useState } from "react"
import { Editor, Transforms, Text, createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import Select from 'react-select'

const fontOptions = [
    { value: 'montserrat', label: 'Montserrat' },
    { value: 'cinzel', label: 'Cinzel' },
    { value: 'dancingScript', label: 'Dancing Script' },
    { value: 'openSans', label: 'Open Sans' },
    { value: 'bodoniModa', label: 'Bodoni Moda' },
    { value: 'lato', label: 'Lato' },
    { value: 'merriweather', label: 'Merriweather' },
    { value: 'playfairDisplay', label: 'Playfair Display' }
]

const selectStyles = {
    control: styles => ({ ...styles, color: 'black' }),
    option: styles => ({ ...styles, color: 'black' })
}

const CustomEditor = {
    isFontActive(editor, font) {
        const [match] = Editor.nodes(editor, {
            match: n => JSON.stringify(n.font) === JSON.stringify(font),
            universal: true
        })

        return !!match
    },
    isSizeActive(editor, size) {
        const [match] = Editor.nodes(editor, {
            match: n => n.size === size,
            universal: true
        })

        return !!match
    },
    isBoldMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.bold === true,
            universal: true
        })

        return !!match
    },
    isItalicMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.italic === true,
            universal: true
        })

        return !!match
    },
    isUnderlineMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.underline === true,
            universal: true
        })

        return !!match
    },
    toggleBoldMark(editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor)
        Transforms.setNodes(
            editor,
            { bold: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },
    toggleItalicsMark(editor) {
        const isActive = CustomEditor.isItalicMarkActive(editor)
        Transforms.setNodes(
            editor,
            { italic: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },
    toggleUnderlineMark(editor) {
        const isActive = CustomEditor.isUnderlineMarkActive(editor)
        Transforms.setNodes(
            editor,
            { underline: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },
    toggleSize(editor, size) {
        const isActive = CustomEditor.isSizeActive(editor, size)
        Transforms.setNodes(
            editor,
            { size: isActive ? null : size },
            { match: n => Text.isText(n), split: true }
        )
    },
    toggleFont(editor, font) {
        const isActive = CustomEditor.isFontActive(editor, font)
        Transforms.setNodes(
            editor,
            { font: isActive ? null : font },
            { match: n => Text.isText(n), split: true }
        )
    }
}

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph' }]
    }
]

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
                return 'text-2xl'
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

const TextPicker = ({ onTextCreate }) => {
    const [editor] = useState(() => withReact(createEditor()))
    const [text, setText] = useState(JSON.stringify(initialValue))

    const handleAddText = (event) => {
        onTextCreate(text)
    }

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])

    return (
        <Slate
            editor={editor}
            value={JSON.parse(text)}
            onChange={value => {
                const isAstChange = editor.operations.some(
                    op => 'set_selection' !== op.type
                )

                if (isAstChange) {
                    const content = JSON.stringify(value)
                    setText(content)
                }
            }}>
            <div>
                <div className="flex items-center mb-2 ml-1">
                    <button
                        className={`btn btn-sm ${ CustomEditor.isBoldMarkActive(editor) ? 'bg-gray-700' : 'bg-gray-400'}`}
                        onMouseDown={event => {
                            event.preventDefault()
                            CustomEditor.toggleBoldMark(editor)
                        }}
                    >
                        <Image src={`/icons/bold.svg`} alt='bold icon' height={15} width={15} />
                    </button>
                    <button
                        className={`btn btn-sm ${ CustomEditor.isItalicMarkActive(editor) ? 'bg-gray-700' : 'bg-gray-400'}`}
                        onMouseDown={event => {
                            event.preventDefault()
                            CustomEditor.toggleItalicsMark(editor)
                        }}
                    >
                        <Image src={`/icons/italic.svg`} alt='italic icon' height={15} width={15} />
                    </button>
                    <button
                        className={`btn btn-sm ${ CustomEditor.isUnderlineMarkActive(editor) ? 'bg-gray-700' : 'bg-gray-400'}`}
                        onMouseDown={event => {
                            event.preventDefault()
                            CustomEditor.toggleUnderlineMark(editor)
                        }}
                    >
                        <Image src={`/icons/underline.svg`} alt='underline icon' height={15} width={15} />
                    </button>
                </div>
                <div className="flex items-center mb-2 ml-1">
                    <button className={`btn btn-sm ${ CustomEditor.isSizeActive(editor, 'sm') ? 'bg-gray-800' : 'bg-gray-600'}`}
                        onMouseDown={event => {
                            event.preventDefault()
                            CustomEditor.toggleSize(editor, 'sm')
                        }}>
                        sm
                    </button>
                    <button className={`btn btn-sm ${ CustomEditor.isSizeActive(editor, 'md') ? 'bg-gray-800' : 'bg-gray-600'}`}
                        onMouseDown={event => {
                            event.preventDefault()
                            CustomEditor.toggleSize(editor, 'md')
                        }}>
                        md
                    </button>
                    <button className={`btn btn-sm ${ CustomEditor.isSizeActive(editor, 'lg') ? 'bg-gray-800' : 'bg-gray-600'}`}
                        onMouseDown={event => {
                            event.preventDefault()
                            CustomEditor.toggleSize(editor, 'lg')
                        }}>
                        lg
                    </button>
                    <button className={`btn btn-sm ${ CustomEditor.isSizeActive(editor, 'xl') ? 'bg-gray-800' : 'bg-gray-600'}`}
                        onMouseDown={event => {
                            event.preventDefault()
                            CustomEditor.toggleSize(editor, 'xl')
                        }}>
                        xl
                    </button>
                </div>
                <Select className="my-5" options={fontOptions} styles={selectStyles} onChange={ font => CustomEditor.toggleFont(editor, font) } />
                <Editable
                    className="border rounded p-2 my-5 bg-slate-100 text-black"
                    renderLeaf={renderLeaf}
                    onKeyDown={event => {
                        if (!event.ctrlKey) {
                            return
                        }

                        switch (event.key) {
                            case 'b': {
                                event.preventDefault()
                                CustomEditor.toggleBoldMark(editor)
                            }
                            case 'i': {
                                event.preventDefault()
                                CustomEditor.toggleItalicsMark(editor)
                            }
                            case 'u': {
                                event.preventDefault()
                                CustomEditor.toggleUnderlineMark(editor)
                            }
                        }
                    }}
                />
                <button onClick={handleAddText} className="btn btn-primary w-full">Add Text</button>
            </div>
        </Slate>
    )
}

export default TextPicker