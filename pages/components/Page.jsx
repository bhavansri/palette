import { useOutsideClick } from "../utils/hooks"

const Page = ({ id, backgroundColor, isSelected, onSelect, onDeselect, outerBound }) => {
    const ref = useOutsideClick(onDeselect, outerBound)

    return (
        <div key={id} ref={ref} style={{ backgroundColor: backgroundColor }} className={`artboard shadow-xl phone-1 mb-5 ${isSelected ? 'border-2 border-stone-400' : 'border-none'}`} onClick={() => { onSelect(id) }}>Hello</div>
    )
}

export default Page