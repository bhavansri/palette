import Image from "next/image"
import { useState } from "react"
import { ColorPicker } from "./ColorPicker"
import PhotoPicker from "./PhotoPicker"

const Sidebar = ({ page, onPageChange }) => {
    const [colorsExpanded, setColorsExpanded] = useState(false)
    const [imagesExpanded, setImagesExpanded] = useState(false)
    
    return (
        <aside className="flex items-start pt-12 overflow-y-auto">
            <nav>
                <ul className="menu menu-compact p-2">
                    <li className="menu-title">
                        <span>Design Elements</span>
                    </li>
                    <li><a><Image src="/icons/text.svg" alt="Text Icon" height={30} width={30} /><span className="text-xs">Text</span></a></li>
                    <li><a onClick={() => { setImagesExpanded(true) }}><Image src="/icons/image.svg" alt="Image Icon" height={30} width={30} /><span className="text-xs">Image</span></a></li>
                    <li><a onClick={() => { setColorsExpanded(true) }} ><Image src="/icons/background.svg" alt="Background Icon" height={30} width={30} /><span className="text-xs">Colors</span></a></li>
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
                colorsExpanded && (
                    <div className="h-full ml-5 py-12">
                        <ColorPicker color={page.backgroundColor} onChange={(value) => { onPageChange('backgroundColor', value) }} />
                    </div>)
            }
            {
                imagesExpanded && (
                    <div className="h-full ml-5 overflow-y-auto">
                        <PhotoPicker />
                    </div>)
            }
        </aside>
    )
}

export default Sidebar