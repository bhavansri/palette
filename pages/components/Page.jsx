import { useOutsideClick } from "../utils/hooks"

const Page = ({ id, isSelected, onSelect, onDeselect }) => {

    const ref = useOutsideClick(onDeselect)

    return (
        <div key={id} ref={ref} className={`artboard shadow-xl phone-1 mb-5 bg-stone-50 ${isSelected ? 'border-2 border-stone-600' : 'border-none'}`} onClick={onSelect}>Hello</div>
    )
}

export default Page