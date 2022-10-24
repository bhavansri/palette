import { useEffect, useRef } from "react"

export const useOutsideClick = (callback, boundsRef) => {
    const ref = useRef()
  
    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target) && boundsRef.current.contains(event.target)) {
                callback()
            }
        }
        
        document.addEventListener('click', handleClick, true)
        
        return () => {
            document.removeEventListener('click', handleClick, true)
        }
    }, [ref, boundsRef, callback])
  
    return ref
}