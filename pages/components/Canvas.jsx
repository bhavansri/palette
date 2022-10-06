import React, { useEffect, useRef } from "react"
import Page from "./Page"

const Canvas = ({ pages, selectedPageId, onSelectPage, onDeselectPage }) => {
    const canvasRef = useRef()

    return (
        <div ref={canvasRef} className="min-h-full bg-stone-300 flex flex-col items-center justify-around py-5">
            {
                pages.map((page) => {
                    const isSelected = (page.id === selectedPageId)
                    return <Page id={page.id} key={page.id} backgroundColor={page.backgroundColor} isSelected={isSelected} onSelect={onSelectPage} onDeselect={onDeselectPage} outerBound={canvasRef} />
                })
            }
        </div>
    )
}

export default Canvas