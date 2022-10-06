import { useEffect, useRef } from "react"

export const useOutsideClick = (callback, outerBound) => {
    const ref = useRef()
  
    useEffect(() => {
        const handleClick = (event) => {
            const withinOuterLimit =  (outerBound !== undefined) ? outerBound.current.contains(event.target) : true
            if (ref.current && !ref.current.contains(event.target) && withinOuterLimit) {
                callback()
            }
        }
        
        document.addEventListener('click', handleClick, true)
        
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [ref])
  
    return ref
}