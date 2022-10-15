import { HexColorPicker } from "react-colorful"
import { presetColors } from "../utils/config"

export const ColorPicker = ({ color, onChange }) => {
    return (
        <div>
            <HexColorPicker color={color} onChange={onChange} />
            <div className="flex p-3 flex-wrap">
                {presetColors.map((presetColor) => (
                    <button
                        key={presetColor}
                        className="w-6 h-6 m-1 cursor-pointer"
                        style={{ background: presetColor }}
                        onClick={() => onChange(presetColor)}
                    />
                ))}
            </div>
        </div>
    )
}