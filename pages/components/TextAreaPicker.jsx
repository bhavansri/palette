import { useState } from "react"
import { inputBackgroundColors } from "../../utils/config"
import { useOutsideClick } from "../../utils/hooks"

const EditableLabel = ({ setEditMode, text, onChange }) => (
    <input className="bg-transparent outline-none" type="text" value={text} onChange={onChange} onClick={setEditMode} />
)

const TextAreaPicker = ({ boundsRef, onCreate }) => {
    const [label, setLabel] = useState("Type a question here")
    const [textColor, setTextColor] = useState('#000')
    const [bgColor, setBgColor] = useState("#D6D1D3")
    const [isEditing, setIsEditing] = useState(false)
    const pickerRef = useOutsideClick(() => setIsEditing(false), boundsRef)

    return (
        <div>
            <div ref={pickerRef} className={`form-control w-full max-w-xs ${isEditing ? 'border border-blue-400' : 'border-0'} pt-2 pb-5 px-2`}>
                <label className="label">
                    <span className="label-text text-white"><EditableLabel setEditMode={() => setIsEditing(true)} text={label} onChange={(e) => setLabel(e.target.value)}/></span>
                </label>
                <input type="textarea" className="textarea textarea-bordered text-black h-24" style={{ backgroundColor: bgColor }} />
            </div>
            <div className="mt-2">
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
            <button className="btn btn-wide mt-5 uppercase" onClick={() => onCreate(label, textColor, bgColor)}>Add to Page</button>
        </div>
    )
}

export default TextAreaPicker