import Image from "next/image"
import { useRef, useState } from "react"
import { Editors } from "../../utils/types"
import ButtonPicker from './ButtonPicker'
import ColorPicker from "./ColorPicker"
import CheckboxPicker from "./CheckboxPicker"
import GraphicsPicker from "./GraphicsPicker"
import PhotoPicker from "./PhotoPicker"
import TextAreaPicker from "./TextAreaPicker"
import TextInputPicker from "./TextInputPicker"

const Sidebar = ({ page, onPageChange, onButtonSelect, onImageSelect, onGraphicsSelect, onTextCreate, onTextInputCreate, onTextAreaCreate, onCheckboxInputCreate }) => {
    const [editor, setEditor] = useState('')
    const sidebarRef = useRef()
    
    const onTextEditorExpanded = () => {
        onTextCreate()
    }

    const onButtonExpanded = () => {
        setEditor(Editors.Button)
    }

    const onImageEditorExpanded = () => {
        setEditor(Editors.Image)
    }

    const onGraphicsEditorExpanded = () => {
        setEditor(Editors.GraphicsPicker)
    }

    const onBGEditorExpanded = () => {
        setEditor(Editors.BackgroundColor)
    }

    const onTextInputExpanded = () => {
        setEditor(Editors.TextInput)
    }

    const onTextAreaExpanded = () => {
        setEditor(Editors.TextArea)
    }

    const onCheckboxInputExpanded = () => {
        setEditor(Editors.Checkbox)
    }

    const displaySideToolbar = () => {
        switch (editor) {
            case Editors.BackgroundColor:
                return (
                    <div className="w-60 h-full ml-5 overflow-y-auto py-12">
                        <ColorPicker color={page.backgroundColor} onChange={(value) => { onPageChange('backgroundColor', value) }} />
                    </div>
                )
            case Editors.Button:
                return (
                    <div className="w-60 h-full ml-5 overflow-y-auto py-12">
                        <ButtonPicker handleOnClick={onButtonSelect}/>
                    </div>
                )
            case Editors.Image:
                return (
                    <div className="w-60 h-full ml-5 overflow-y-auto py-12">
                        <PhotoPicker handleOnClick={onImageSelect} />
                    </div>
                )
            case Editors.Illustrations:
                return (
                    <div className="w-36 h-full ml-5 overflow-y-auto py-12 px-5">
                        <GraphicsPicker handleOnClick={onGraphicsSelect} />
                    </div>
                )
            case Editors.TextInput:
                return (
                    <div ref={sidebarRef} className="w-60 h-full ml-5 overflow-y-auto py-12">
                        <TextInputPicker boundsRef={sidebarRef} onCreate={onTextInputCreate} />
                    </div>
                )
            case Editors.Checkbox:
                return (
                    <div ref={sidebarRef} className="w-69 h-full ml-5 overflow-y-auto py-12">
                        <CheckboxPicker boundsRef={sidebarRef} onCreate={onCheckboxInputCreate} />
                    </div>
                )
            case Editors.TextArea:
                return (
                    <div ref={sidebarRef} className="w-60 h-full ml-5 overflow-y-auto py-12 px-3">
                        <TextAreaPicker boundsRef={sidebarRef} onCreate={onTextAreaCreate} />
                    </div>
                )
            default:
                return <></>
        }
    }

    return (
        <aside className="flex items-start pt-12 px-3 overflow-x-hidden">
            <nav>
                <ul className="menu menu-compact p-2">
                    <li className="menu-title">
                        <span>Design Elements</span>
                    </li>
                    <li><a onClick={onTextEditorExpanded}><Image src="/icons/text.svg" alt="Text Icon" height={30} width={30} /><span className="text-xs">Text</span></a></li>
                    <li><a onClick={onImageEditorExpanded}><Image src="/icons/image.svg" alt="Image Icon" height={30} width={30} /><span className="text-xs">Images</span></a></li>
                    <li><a onClick={onBGEditorExpanded} ><Image src="/icons/background.svg" alt="Background Icon" height={30} width={30} /><span className="text-xs">Colors</span></a></li>
                    <li><a onClick={onGraphicsEditorExpanded} ><Image src="/icons/illustrations.svg" alt="Background Icon" height={30} width={30} /><span className="text-xs">Illustrations</span></a></li>
                </ul>
                <div className='divider'></div>
                <ul className="menu menu-compact p-2">
                    <li className="menu-title">
                        <span>Form Elements</span>
                    </li>
                    <li><a onClick={onTextInputExpanded}><Image src="/icons/textfield.svg" alt="Short Answer Icon" height={30} width={30} /><span className="text-xs">Short Answer</span></a></li>
                    <li><a onClick={onTextAreaExpanded}><Image src="/icons/textarea.svg" alt="Short Answer Icon" height={30} width={30} /><span className="text-xs">Long Answer</span></a></li>
                    <li><a onClick={onCheckboxInputExpanded}><Image src="/icons/checkbox.svg" alt="Checkbox Icon" height={30} width={30} /><span className="text-xs">Checkbox</span></a></li>
                    <li><a onClick={onButtonExpanded}><Image src="/icons/button.svg" alt="Button Icon" height={30} width={30} /><span className="text-xs">Button</span></a></li>
                </ul>
            </nav>
            {
                displaySideToolbar()
            }
        </aside>
    )
}

export default Sidebar