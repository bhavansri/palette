import { useEffect, useState } from 'react'
import Select from 'react-select'
import { HexColorPicker } from "react-colorful"

const options = [
    { value: 'cinzel', label: 'Cinzel' },
    { value: 'dancing-script', label: 'Dancing Script' },
    { value: 'great-vibes', label: 'Great Vibes' },
    { value: 'kalam', label: 'Kalam' },
    { value: 'lato', label: 'Lato' },
    { value: 'merriweather', label: 'Merriweather' },
    { value: 'montserrat', label: 'Montserrat' },
    { value: 'playfair-display', label: 'Playfair Display' }
]

export const TextPicker = ({ selectedBlock, setSelectedBlock }) => {
    const { id, font, color } = selectedBlock
    const [colorPickerOpen, setColorPickerOpen] = useState(false)
    
    return (
        <div className="flex flex-col gap-5 px-3">
            <Select
                value={font}
                className="w-full"
                onChange={(selectedOption) => setSelectedBlock({ id: id, font: selectedOption.value})}
                options={options}
            />
            <div className='inline-flex justify-between'>
                <span>{color}</span>
                <div className='relative'>
                    <div style={{ backgroundColor: color }} onClick={() => { setColorPickerOpen(true) }} className="w-7 h-7 border-2 cursor-pointer" />
                    { colorPickerOpen && <div className="absolute right-0" style={{ top: 'calc(100% + 2px)' }}>
                        <HexColorPicker color={color} onChange={setColor} />
                    </div>}
                </div>
            </div>
            <div>
                <div className='label-text mb-2'>
                    Size
                </div>
                <div className="btn-group">
                    <button className="btn btn-sm">sm</button>
                    <button className="btn btn-sm btn-active">md</button>
                    <button className="btn btn-sm">lg</button>
                    <button className="btn btn-sm">xl</button>
                </div>
            </div>
            <div>
                <div className='label-text mb-2'>
                    Alignment
                </div>
                <div className="btn-group">
                    <button className="btn btn-sm">left</button>
                    <button className="btn btn-sm btn-active">center</button>
                    <button className="btn btn-sm">right</button>
                </div>
            </div>
        </div>
    )
}