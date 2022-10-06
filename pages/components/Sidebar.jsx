import Image from "next/image"
import { useState } from "react"
import { useOutsideClick } from "../utils/hooks"
import { ColorPicker } from "./ColorPicker"

const Sidebar = ({ focusedPage, onPageChange }) => {
    const [expanded, setExpanded] = useState(false)
    
    const HoverLink = ({ children }) => (
        <a onMouseOver={ () => { setExpanded(true) }}>{children}</a>
    )

    return (
        <aside className={`flex ${ expanded ? 'w-96' : 'w-48' } pt-12`}>
            <nav className="overflow-y-auto">
                <ul className="menu menu-compact p-2">
                    <li className="menu-title">
                        <span>Design Elements</span>
                    </li>
                    <li><HoverLink><Image src="/icons/text.svg" alt="Text Icon" height={30} width={30} /><span className="text-xs">Text</span></HoverLink></li>
                    <li><HoverLink><Image src="/icons/image.svg" alt="Image Icon" height={30} width={30} /><span className="text-xs">Image</span></HoverLink></li>
                    <li><HoverLink><Image src="/icons/background.svg" alt="Background Icon" height={30} width={30} /><span className="text-xs">Colors</span></HoverLink></li>
                </ul>
                <div className='divider'></div>
                <ul className="menu menu-compact p-2">
                    <li className="menu-title">
                        <span>Form Elements</span>
                    </li>
                    <li><HoverLink><Image src="/icons/textfield.svg" alt="Short Answer Icon" height={30} width={30} /><span className="text-xs">Short Answer</span></HoverLink></li>
                    <li><HoverLink><Image src="/icons/textarea.svg" alt="Long Answer Icon" height={30} width={30} /><span className="text-xs">Long Answer</span></HoverLink></li>
                    <li><HoverLink><Image src="/icons/checkbox.svg" alt="Checkbox Icon" height={30} width={30} /><span className="text-xs">Checkbox</span></HoverLink></li>
                    <li><HoverLink><Image src="/icons/dropdown.svg" alt="Dropdown Icon" height={30} width={30} /><span className="text-xs">Dropdown</span></HoverLink></li>
                </ul>
                <div className='divider'></div>
                <ul className="menu menu-compact p-2">
                    <li className="menu-title">
                        <span>Links</span>
                    </li>
                    <li><HoverLink><Image src="/icons/button.svg" alt="Button Icon" height={30} width={30} /><span className="text-xs">Button</span></HoverLink></li>
                    <li><HoverLink><Image src="/icons/location.svg" alt="Location Icon" height={30} width={30} /><span className="text-xs">Location</span></HoverLink></li>
                    <li><HoverLink><Image src="/icons/date.svg" alt="Date Icon" height={30} width={30} /><span className="text-xs">Date</span></HoverLink></li>
                </ul>
            </nav>
            <div className={`${ expanded ? 'block' : 'hidden' } ml-5 py-12`}>
                <ColorPicker color={focusedPage.backgroundColor} onChange={(value) => { onPageChange('backgroundColor', value) }} />
            </div>
        </aside>
    )
}

export default Sidebar