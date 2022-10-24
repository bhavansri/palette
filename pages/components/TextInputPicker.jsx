import { useState } from "react"
import { inputBackgroundColors, inputLabelColors } from "../../utils/config"
import { useOutsideClick } from "../../utils/hooks"

const EditableLabel = ({ setEditMode, text, onChange }) => (
    <input className="bg-transparent outline-none" type="text" value={text} onChange={onChange} onClick={setEditMode} />
)

const TextInputPicker = ({ boundsRef, onCreate }) => {
    const [label, setLabel] = useState("Type a question here")
    const [textColor, setTextColor] = useState('#000')
    const [bgColor, setBgColor] = useState("#D6D1D3")
    const [isEditing, setIsEditing] = useState(false)
    const pickerRef = useOutsideClick(() => setIsEditing(false), boundsRef)

    return (
        <div>
            <div ref={pickerRef} className={`form-control w-full max-w-xs bg-stone-100 ${isEditing ? 'border border-blue-400' : 'border-0'} pt-2 pb-5 px-2`}>
                <label className="label">
                    <span className="label-text" style={{ color: textColor }}><EditableLabel setEditMode={() => setIsEditing(true)} text={label} onChange={(e) => setLabel(e.target.value)}/></span>
                </label>
                <input type="text" className="input input-sm input-bordered text-black w-full max-w-xs" style={{ backgroundColor: bgColor }} />
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
            <div>
                <span className="label-text">Text Color</span>
                <div className="flex py-3 flex-wrap">
                    {inputLabelColors.map((presetColor) => (
                        <button
                            key={presetColor}
                            className="w-6 h-6 m-1 cursor-pointer"
                            style={{ background: presetColor }}
                            onClick={() => setTextColor(presetColor)}
                        />
                    ))}
                </div>
            </div>
            <button className="btn btn-wide mt-5 uppercase" onClick={() => onCreate(label, textColor, bgColor)}>Add to Page</button>
        </div>
    )
}

export default TextInputPicker