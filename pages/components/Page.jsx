import { useOutsideClick } from "../utils/hooks"

const Page = ({ id, isSelected, onSelect, onDeselect, outerBound }) => {
    const ref = useOutsideClick(onDeselect, outerBound)

    return (
        <div key={id} ref={ref} className={`artboard shadow-xl phone-1 mb-5 bg-stone-50 ${isSelected ? 'border-2 border-stone-400' : 'border-none'}`} onClick={() => { onSelect(id) }}>Hello</div>
    )
}

export default Page