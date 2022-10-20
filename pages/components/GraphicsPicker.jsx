import Image from "next/image"
import { useEffect, useState } from "react"

const GraphicsPicker = ({ handleOnClick }) => {
    const [graphics, setGraphics] = useState([])

    const importAll = (r) => {
        return r.keys().map((key) => { return key.replace('./', '') })
    }

    useEffect(() => {
        setGraphics(importAll(require.context('../../public/illustrations/', false, /\.(png|jpe?g|svg)$/)))
    }, [])

    return (
        <div className="flex flex-col">
            <ul className="list-none py-2">
                {graphics.map((graphicFile, index) => (
                    <li key={index} className="mb-3 bg-white p-2">
                        <Image alt={graphicFile} height={100} width={100} src={`/illustrations/${graphicFile}`} onClick={() => { handleOnClick(graphicFile) }} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default GraphicsPicker