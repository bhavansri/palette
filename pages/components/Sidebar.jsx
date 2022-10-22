import Image from "next/image"
import { useRef, useState } from "react"
import { Editors } from "../utils/types"
import { ColorPicker } from "./ColorPicker"
import DropdownPicker from "./DropdownPicker"
import GraphicsPicker from "./GraphicsPicker"
import PhotoPicker from "./PhotoPicker"
import TextInputPicker from "./TextInputPicker"
import { TextPicker } from "./TextPicker"
import VideoPicker from "./VideoPicker"

const Sidebar = ({ page, selectedBlock, setSelectedBlock, onPageChange, onImageSelect, onGraphicsSelect, onVideoSelect, createNewTextBlock, onTextInputCreate, onDropdownInputCreate }) => {
    const [editor, setEditor] = useState('')
    const sidebarRef = useRef()
    
    const onTextEditorExpanded = () => {
        createNewTextBlock()
        
        setEditor(Editors.Text)
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

    const onDropdownInputExpanded = () => {
        setEditor(Editors.Dropdown)
    }

    const onVideoEditorExpanded = () => {
        setEditor(Editors.Video)
    }

    const displaySideToolbar = () => {
        switch (editor) {
            case Editors.Text:
                return (
                    selectedBlock && <div className="w-60 h-full ml-5 overflow-y-auto py-12">
                        <TextPicker selectedBlock={selectedBlock} setSelectedBlock={setSelectedBlock} />
                    </div>
                )
            case Editors.BackgroundColor:
                return (
                    <div className="w-60 h-full ml-5 overflow-y-auto py-12">
                        <ColorPicker color={page.backgroundColor} onChange={(value) => { onPageChange('backgroundColor', value) }} />
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
            case Editors.Dropdown:
                return (
                    <div ref={sidebarRef} className="w-69 h-full ml-5 overflow-y-auto py-12">
                        <DropdownPicker boundsRef={sidebarRef} onCreate={onDropdownInputCreate} />
                    </div>
                )
            case Editors.Video:
                return (
                    <div ref={sidebarRef} className="w-69 h-full ml-5 overflow-y-auto py-12 px-5">
                        <VideoPicker boundsRef={sidebarRef} onCreate={onVideoSelect} />
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
                    <li><a onClick={onImageEditorExpanded}><Image src="/icons/image.svg" alt="Image Icon" height={30} width={30} /><span className="text-xs">Images</span></a></li>
                    <li><a onClick={onBGEditorExpanded} ><Image src="/icons/background.svg" alt="Background Icon" height={30} width={30} /><span className="text-xs">Colors</span></a></li>
                    <li><a onClick={onGraphicsEditorExpanded} ><Image src="/icons/illustrations.svg" alt="Background Icon" height={30} width={30} /><span className="text-xs">Illustrations</span></a></li>
                    <li><a onClick={onVideoEditorExpanded} ><Image src="/icons/video.svg" alt="Background Icon" height={30} width={30} /><span className="text-xs">Videos</span></a></li>
                </ul>
                <div className='divider'></div>
                <ul className="menu menu-compact p-2">
                    <li className="menu-title">
                        <span>Form Elements</span>
                    </li>
                    <li><a onClick={onTextInputExpanded}><Image src="/icons/textfield.svg" alt="Short Answer Icon" height={30} width={30} /><span className="text-xs">Short Answer</span></a></li>
                    <li><a><Image src="/icons/textarea.svg" alt="Long Answer Icon" height={30} width={30} /><span className="text-xs">Long Answer</span></a></li>
                    <li><a onClick={onDropdownInputExpanded}><Image src="/icons/dropdown.svg" alt="Dropdown Icon" height={30} width={30} /><span className="text-xs">Dropdown</span></a></li>
                    <li><a><Image src="/icons/button.svg" alt="Button Icon" height={30} width={30} /><span className="text-xs">Button</span></a></li>
                    <li><a><Image src="/icons/checkbox.svg" alt="Checkbox Icon" height={30} width={30} /><span className="text-xs">Checkbox</span></a></li>
                </ul>
            </nav>
            {
                displaySideToolbar()
            }
        </aside>
    )
}

export default Sidebar