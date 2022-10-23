import { useState } from "react"
import { getButtonStyling } from "../utils/config"
import { ButtonTypes } from "../utils/types"

const ButtonPicker = ({ handleOnClick }) => {
    const [type, setType] = useState(ButtonTypes.default)
    const [title, setTitle] = useState('Placeholder')
    
    return (
        <div>
            <button className={`btn w-full ${getButtonStyling(type)}`} onClick={() => { handleOnClick(type, title) }}>{title}</button>
            <div className="form-control mt-5">
                <label className="label label-text mb-2">Style</label>
                <select className="select select-bordered w-full max-w-xs">
                    {Object.keys(ButtonTypes).map((buttonType, index) => {
                        return (<option key={index} selected={type === buttonType} onClick={() => { setType(ButtonTypes[buttonType]) }}>{ButtonTypes[buttonType]}</option>)
                    })}
                </select>
                <label className="label label-text mb-2 mt-5">Title</label>
                <input type="text" className="input input-bordered w-full max-w-xs" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
        </div>
        
    )
}

export default ButtonPicker