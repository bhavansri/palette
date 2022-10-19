import Select from 'react-select'
import { TextAlignments, TextDecorations, TextSizes } from '../utils/types'
import { presetColors } from '../utils/config'
import Image from 'next/image'
import { useEffect } from 'react'

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: 'black'
    })
}

const options = [
    { value: 'cinzel', label: 'Cinzel' },
    { value: 'dancing script', label: 'Dancing Script' },
    { value: 'great vibes', label: 'Great Vibes' },
    { value: 'kalam', label: 'Kalam' },
    { value: 'lato', label: 'Lato' },
    { value: 'merriweather', label: 'Merriweather' },
    { value: 'montserrat', label: 'Montserrat' },
    { value: 'playfair display', label: 'Playfair Display' }
]

export const TextPicker = ({ selectedBlock, setSelectedBlock }) => {
    const { id, font, color, size, alignment } = selectedBlock

    return (
        <div className="flex flex-col gap-5 px-3">
            <Select
                styles={customStyles}
                value={options.filter(option => option.value === font.toLowerCase())[0]}
                className="w-full"
                onChange={(selectedOption) => setSelectedBlock({ id: id, font: selectedOption.value})}
                options={options}
            />
            <div className="btn-group">
                {Object.keys(TextDecorations).map((key, index) => {
                    const value = TextDecorations[key]
                    const currStatus = selectedBlock[value]

                    return (
                        <button key={index} className='btn btn-sm' onClick={() => setSelectedBlock({ id: id, [value]: !currStatus }) }>
                            <Image src={`/icons/${value}.svg`} alt={`${value} icon`} height={20} width={20} />
                        </button>
                    )
                })}
            </div>
            <div className='flex flex-col justify-between'>
                <span>Color: {color}</span>
                <div className="flex">
                {presetColors.map((presetColor) => (
                    <button
                        key={presetColor}
                        className="w-6 h-6 m-1 cursor-pointer"
                        style={{ background: presetColor }}
                        onClick={() => setSelectedBlock({ id: id, color: presetColor })}
                    />
                ))}
            </div>
            </div>
            <div>
                <div className='label-text mb-2'>
                    Size
                </div>
                <div className="btn-group">
                    {Object.keys(TextSizes).map((key, index) => {
                        const value = TextSizes[key]
                        return (
                            <button key={index} className={`btn btn-sm ${(value === size ? 'btn-active': '' )}`} onClick={() => setSelectedBlock({ id, size: value })}>
                                {value}
                            </button>
                        )
                    })}
                </div>
            </div>
            <div>
                <div className='label-text mb-2'>
                    Alignment
                </div>
                <div className="btn-group">
                    {Object.keys(TextAlignments).map((key, index) => {
                        const value = TextAlignments[key]
                        return (
                            <button key={index} className={`btn btn-sm ${(value === alignment ? 'btn-active': '' )}`} onClick={() => setSelectedBlock({ id, alignment: value })}>
                                {value}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}