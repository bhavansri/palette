import React, { useEffect, useRef } from "react"
import Page from "./Page"

const Canvas = ({ pages, selectedPage, onSelectPage, onDeselectPage }) => {
    const canvasRef = useRef()
    
    return (
        <div ref={canvasRef} className="min-h-full bg-stone-300 flex flex-col items-center justify-around py-5">
            {
                pages.map(page => {
                    return <Page id={page.id} key={page.id} isSelected={selectedPage ? selectedPage.id === page.id : false} onSelect={onSelectPage} onDeselect={onDeselectPage} outerBound={canvasRef} />
                })
            }
        </div>
    )
}

export const MemoizedCanvas = React.memo(Canvas)