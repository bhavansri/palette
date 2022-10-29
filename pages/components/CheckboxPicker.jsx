import { useState } from "react"
import { useOutsideClick } from "../../utils/hooks"

const initialOptions = [
    { id: 1, text: 'Option 1' },
    { id: 2, text: 'Option 2' },
    { id: 3, text: 'Option 3' }
]

const EditableLabel = ({ setEditMode, text, onChange }) => (
    <input className="bg-transparent outline-none" type="text" value={text} onChange={onChange} onClick={setEditMode ?? (() => {})} />
)

const CheckboxPicker = ({ boundsRef, onCreate }) => {
    const [label, setLabel] = useState("Type a question here")
    const [checkboxOptions, setCheckboxOptions] = useState(initialOptions)
    const [isEditing, setIsEditing] = useState(false)
    const pickerRef = useOutsideClick(() => setIsEditing(false), boundsRef)

    const currOptions = checkboxOptions.map(option => {
        return { value: option.text, text: option.text }
    })

    const onOptionChange = (text, id) => {
        const newState = checkboxOptions.map(option => {
            if (option.id === id) {
                return {...option, text}
            }

            return option
        })

        setCheckboxOptions(newState)
    }

    return (
        <div>
            <div ref={pickerRef} className={`form-control w-full max-w-xs ${isEditing ? 'border border-blue-400' : 'border-0'} pb-5 px-2`}>
                <label className="label mb-3">
                    <span className="label-text text-white"><EditableLabel setEditMode={() => setIsEditing(true)} text={label} onChange={(e) => setLabel(e.target.value)}/></span>
                </label>
                {checkboxOptions.map(option => (
                    <label key={option.id} className="label cursor-pointer">
                        <span className="label-text text-sm"><EditableLabel text={option.text} onChange={(e) => onOptionChange(e.target.value, option.id)}/></span> 
                    <input type="checkbox" className="checkbox" />
                    </label>
                ))}
            </div>
            <button className="btn btn-wide mt-5 uppercase" onClick={() => onCreate(label, currOptions )}>Add to Page</button>
        </div>
    )
}

export default CheckboxPicker