import { useState } from "react"
import { inputBackgroundColors } from "../../utils/config"
import { useOutsideClick } from "../../utils/hooks"

const EditableLabel = ({ setEditMode, text, onChange }) => (
    <input className="bg-transparent outline-none" type="text" value={text} onChange={onChange} onClick={setEditMode} />
)

const TextAreaPicker = ({ boundsRef, onCreate }) => {
    const [label, setLabel] = useState("Type a question here")
    const [bgColor, setBgColor] = useState("#D6D1D3")
    const [isEditing, setIsEditing] = useState(false)
    const [displayLines, setDisplayLines] = useState(false)

    const pickerRef = useOutsideClick(() => setIsEditing(false), boundsRef)

    return (
        <div>
            <div ref={pickerRef} className={`form-control w-full max-w-xs ${isEditing ? 'border border-blue-400' : 'border-0'} pt-2 pb-5 px-2`}>
                <label className="label mb-3">
                    <span className="label-text text-white"><EditableLabel setEditMode={() => setIsEditing(true)} text={label} onChange={(e) => setLabel(e.target.value)}/></span>
                </label>
                {
                    displayLines ? <textarea className="bg-transparent h-24 px-3 py-2 text-sm placeholder-gray-300 text-slate-100" placeholder="Type Something" style={{ backgroundImage: 'linear-gradient(#D6D1D3 1px, transparent 1px)', backgroundSize: '100% 30px', border: 0, outline: 0, lineHeight: '30px' }}></textarea> :
                    <textarea className="textarea textarea-bordered text-black placeholder-black h-24" placeholder="Type Something" style={{ backgroundColor: bgColor }}></textarea>
                }
            </div>
            { !displayLines && <div className="mt-2">
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
            </div>}
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Display Text Lines?</span>
                    <input type="checkbox" className="toggle toggle-primary" checked={displayLines} onClick={() => setDisplayLines(currDisplay => !currDisplay)} />
                </label>
            </div>
            <button className="btn mt-5 uppercase w-full" onClick={() => onCreate(label, bgColor, displayLines)}>Add to Page</button>
        </div>
    )
}

export default TextAreaPicker