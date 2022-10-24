import { useEffect, useState } from "react"
import { getButtonStyling } from "../../utils/config"
import { ButtonTypes } from "../../utils/types"

const ButtonPicker = ({ handleOnClick }) => {
    const [type, setType] = useState(ButtonTypes.default)
    const [title, setTitle] = useState('Placeholder')
    
    return (
        <div>
            <button className={`btn w-full ${getButtonStyling(type)}`} onClick={() => { handleOnClick(type, title) }}>{title}</button>
            <div className="form-control mt-5">
                <label className="b-2 text-center text-blue-400 uppercase mt-2">Style</label>
                {Object.keys(ButtonTypes).map((buttonType, index) => {
                    return (
                        <label key={index} className="label cursor-pointer">
                            <span className="label-text capitalize">{ButtonTypes[buttonType]}</span>
                            <input type="radio" name="radio-6" className="radio checked:bg-green-500" checked={buttonType === type} onClick={() => { setType(buttonType) }} />
                        </label>
                    )
                })}
                <label className="label label-text mb-2 mt-5 text-blue-400">Title</label>
                <input type="text" className="input input-bordered w-full max-w-xs" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
        </div>
        
    )
}

export default ButtonPicker