import { useEffect, useRef } from "react"

export const useOutsideClick = (callback, outerBound) => {
    const ref = useRef()
  
    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target) && outerBound.current.contains(event.target)) {
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