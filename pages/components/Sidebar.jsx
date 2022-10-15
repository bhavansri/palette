import Image from "next/image"
import { useState } from "react"
import { ColorPicker } from "./ColorPicker"
import PhotoPicker from "./PhotoPicker"
import { TextPicker } from "./TextPicker"

const Editors = {
    BackgroundColor: 'BackgroundColor',
    Image: 'ImagePicker',
    Text: 'TextEditor'
}

const Sidebar = ({ page, selectedBlock, setSelectedBlock, onPageChange, onImageSelect, onTextSelect }) => {
    const [editor, setEditor] = useState('')
    
    const onTextEditorExpanded = () => {
        setEditor(Editors.Text)
        onTextSelect()
    }

    const onImageEditorExpanded = () => {
        setEditor(Editors.Image)
    }

    const onBGEditorExpanded = () => {
        setEditor(Editors.BackgroundColor)
    }

    const displaySideToolbar = () => {
        switch (editor) {
            case Editors.Text:
                return (
                    <div className="h-full ml-5 overflow-y-auto py-12">
                        <TextPicker selectedBlock={selectedBlock} setSelectedBlock={setSelectedBlock} />
                    </div>
                )
            case Editors.BackgroundColor:
                return (
                    <div className="h-full ml-5 overflow-y-auto py-12">
                        <ColorPicker color={page.backgroundColor} onChange={(value) => { onPageChange('backgroundColor', value) }} />
                    </div>
                )
            case Editors.Image:
                return (
                    <div className="h-full ml-5 overflow-y-auto py-12">
                        <PhotoPicker handleOnClick={onImageSelect} />
                    </div>
                )
            default:
                return <></>
        }
    }

    return (
        <aside className="flex items-start pt-12 overflow-y-auto">
            <nav>
                <ul className="menu menu-compact p-2">
                    <li className="menu-title">
                        <span>Design Elements</span>
                    </li>
                    <li><a onClick={onTextEditorExpanded}><Image src="/icons/text.svg" alt="Text Icon" height={30} width={30} /><span className="text-xs">Text</span></a></li>
                    <li><a onClick={onImageEditorExpanded}><Image src="/icons/image.svg" alt="Image Icon" height={30} width={30} /><span className="text-xs">Image</span></a></li>
                    <li><a onClick={onBGEditorExpanded} ><Image src="/icons/background.svg" alt="Background Icon" height={30} width={30} /><span className="text-xs">Colors</span></a></li>
                </ul>
                <div className='divider'></div>
                <ul className="menu menu-compact p-2">
                    <li className="menu-title">
                        <span>Form Elements</span>
                    </li>
                    <li><a><Image src="/icons/textfield.svg" alt="Short Answer Icon" height={30} width={30} /><span className="text-xs">Short Answer</span></a></li>
                    <li><a><Image src="/icons/textarea.svg" alt="Long Answer Icon" height={30} width={30} /><span className="text-xs">Long Answer</span></a></li>
                    <li><a><Image src="/icons/checkbox.svg" alt="Checkbox Icon" height={30} width={30} /><span className="text-xs">Checkbox</span></a></li>
                    <li><a><Image src="/icons/dropdown.svg" alt="Dropdown Icon" height={30} width={30} /><span className="text-xs">Dropdown</span></a></li>
                </ul>
                <div className='divider'></div>
                <ul className="menu menu-compact p-2">
                    <li className="menu-title">
                        <span>Links</span>
                    </li>
                    <li><a><Image src="/icons/button.svg" alt="Button Icon" height={30} width={30} /><span className="text-xs">Button</span></a></li>
                    <li><a><Image src="/icons/location.svg" alt="Location Icon" height={30} width={30} /><span className="text-xs">Location</span></a></li>
                    <li><a><Image src="/icons/date.svg" alt="Date Icon" height={30} width={30} /><span className="text-xs">Date</span></a></li>
                </ul>
            </nav>
            {
                selectedBlock && displaySideToolbar()
            }
        </aside>
    )
}

export default Sidebar