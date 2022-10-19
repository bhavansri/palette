import { useState } from "react"

import { inputBackgroundColors, inputTextColors } from "../utils/config"
import { useOutsideClick } from "../utils/hooks"

const initialOptions = [
    { id: 1, text: 'Option 1' },
    { id: 2, text: 'Option 2' },
    { id: 3, text: 'Option 3' }
]

const EditableLabel = ({ setEditMode, text, onChange }) => (
    <input className="bg-transparent outline-none" type="text" value={text} onChange={onChange} onClick={setEditMode ?? (() => {})} />
)

const DropdownPicker = ({ boundsRef, onCreate }) => {
    const [label, setLabel] = useState("Type a question here")
    const [dropdownOptions, setDropdownOptions] = useState(initialOptions)
    const [textColor, setTextColor] = useState('#000000')
    const [bgColor, setBgColor] = useState("#D6D1D3")
    const [isEditing, setIsEditing] = useState(false)
    const pickerRef = useOutsideClick(() => setIsEditing(false), boundsRef)

    const currOptions = dropdownOptions.map(option => {
        return { value: option.text, text: option.text }
    })

    const onOptionChange = (text, id) => {
        const newState = dropdownOptions.map(option => {
            if (option.id === id) {
                return {...option, text}
            }

            return option
        })

        setDropdownOptions(newState)
    }

    return (
        <div>
            <ul className="menu menu-compact bg-base-100">
                {dropdownOptions.map((option) => <><li key={option.id}><EditableLabel text={option.text} onChange={(e) => onOptionChange(e.target.value, option.id)}/></li></>)}
            </ul>
            <div>
                <div ref={pickerRef} className={`mt-5 form-control w-full max-w-xs ${isEditing ? 'border border-blue-400' : 'border-0'} pt-2 pb-5 px-2`}>
                    <label className="label">
                        <span className="label-text"><EditableLabel setEditMode={() => setIsEditing(true)} text={label} onChange={(e) => setLabel(e.target.value)}/></span>
                    </label>
                    <select className="select w-full max-w-xs" style={{ backgroundColor: bgColor, color: textColor }}>
                        {currOptions.map(option => <option key={option.id}>{option.text}</option>)}
                    </select>
                </div>
                <div className="mt-5">
                    <span className="label-text">Background Color</span>
                    <div className="flex py-3 flex-wrap">
                        {inputBackgroundColors.map((presetColor) => (
                            <button
                                key={presetColor}
                                className="w-6 h-6 m-1 cursor-pointer"
                                style={{ background: presetColor }}
                                onClick={() => setBgColor(presetColor)}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <span className="label-text">Text Color</span>
                    <div className="flex py-3 flex-wrap">
                        {inputTextColors.map((presetColor) => (
                            <button
                                key={presetColor}
                                className="w-6 h-6 m-1 cursor-pointer"
                                style={{ background: presetColor }}
                                onClick={() => setTextColor(presetColor)}
                            />
                        ))}
                    </div>
                </div>
                <button className="btn btn-wide mt-5 uppercase" onClick={() => onCreate(label, currOptions, textColor, bgColor)}>Add to Page</button>
            </div>
        </div>
    )
}

export default DropdownPicker