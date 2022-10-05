import Image from "next/image"

const Sidebar = () => (
    <aside className="w-50 pt-10">
        <nav>
            <ul className="menu menu-compact w-full p-2">
            <li className="menu-title">
                <span>Design Elements</span>
            </li>
            <li><a><Image src="/icons/text.svg" alt="Text Icon" height={30} width={30} />Text</a></li>
            <li><a><Image src="/icons/image.svg" alt="Image Icon" height={30} width={30} />Image</a></li>
            <li><a><Image src="/icons/background.svg" alt="Background Icon" height={30} width={30} />Background</a></li>
            </ul>
            <div className='divider'></div>
            <ul className="menu menu-compact w-full p-2">
            <li className="menu-title">
                <span>Form Elements</span>
            </li>
            <li><a><Image src="/icons/textfield.svg" alt="Short Answer Icon" height={30} width={30} />Short Answer</a></li>
            <li><a><Image src="/icons/textarea.svg" alt="Long Answer Icon" height={30} width={30} />Long Answer</a></li>
            <li><a><Image src="/icons/checkbox.svg" alt="Checkbox Icon" height={30} width={30} />Checkbox</a></li>
            <li><a><Image src="/icons/dropdown.svg" alt="Dropdown Icon" height={30} width={30} />Dropdown</a></li>
            </ul>
            <div className='divider'></div>
            <ul className="menu menu-compact w-full p-2">
            <li className="menu-title">
                <span>Links</span>
            </li>
            <li><a><Image src="/icons/button.svg" alt="Button Icon" height={30} width={30} />Button</a></li>
            <li><a><Image src="/icons/location.svg" alt="Location Icon" height={30} width={30} />Location</a></li>
            <li><a><Image src="/icons/date.svg" alt="Date Icon" height={30} width={30} />Date</a></li>
            </ul>
        </nav>
    </aside>
)

export default Sidebar