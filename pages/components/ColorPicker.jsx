import { HexColorPicker } from "react-colorful"

export const ColorPicker = ({ color, onChange }) => {
    const presetColors = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"]

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