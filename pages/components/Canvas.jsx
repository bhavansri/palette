import React from "react"
import Page from "./Page"

const Canvas = ({ page }) => {
    
    return (
        <div className="min-h-full bg-stone-300 flex flex-col items-center justify-around py-5">
            <Page backgroundColor={page.backgroundColor} />
        </div>
    )
}

export default Canvas