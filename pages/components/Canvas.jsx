import { useState } from "react"
import Page from "./Page"

export const Canvas = ({ pages }) => {
    const [selectedPage, setSelectedPage] = useState(null)
    return (
        <div className="min-h-full bg-stone-300 flex flex-col items-center justify-around py-5">
        {
            pages.map(page => {
                return <Page id={page.id} key={page.id} isSelected={selectedPage ? selectedPage.id === page.id : false} onSelect={() => {
                    const selectedPage = pages.filter(currPage => currPage.id === page.id)[0]
                    setSelectedPage(selectedPage)
                }} onDeselect={() => {
                    setSelectedPage(null)
                }} />
            })
        }
    </div>
    )
}