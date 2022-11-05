import { useState } from "react"
import { ButtonTypes } from "../../utils/types"
import Select from 'react-select'
import { getButtonStyling } from "../../utils/config"

export const typeOptions = [
    { value: 'default', label: 'Default' },
    { value: 'primary', label: 'Primary' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'accent', label: 'Accent' },
    { value: 'ghost', label: 'Ghost' },
    { value: 'link', label: 'Link' },
]

const selectStyles = {
    control: styles => ({ ...styles, color: 'black' }),
    option: styles => ({ ...styles, color: 'black' })
}

const ButtonPicker = ({ handleOnClick }) => {
    const [type, setType] = useState('primary')
    const [title, setTitle] = useState('Placeholder')

    return (
        <div>
            <button className={`btn w-full ${getButtonStyling(type)}`} onClick={() => { handleOnClick(type, title) }}>{title}</button>
            <div className="form-control mt-5">
                <label className="label label-text mb-2">Style</label>
                <Select className="my-5" options={typeOptions} styles={selectStyles} onChange={ type => setType(type.value) } />
                <label className="label label-text mb-2 mt-5">Title</label>
                <input type="text" className="input input-bordered w-full max-w-xs" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
        </div>

    )
}

export default ButtonPicker