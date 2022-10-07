import { useEffect, useState } from "react"
import { createApi } from "unsplash-js"

const api = createApi({
    accessKey: "xgcleP01T474D-5Vgh9-irgsHMdp34GaOWPkFNe3JbU"
})

const StockPhoto = ({ photo }) => {
    const { user, urls } = photo
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseOver = () => {
        setIsHovering(true)
    }

    const handleMouseOut = () => {
        setIsHovering(false)
    }

    return (
        <div className="flex flex-col items-center">
            <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{ backgroundImage: `url(${urls.regular})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '175px', width: '150px' }}>
                {isHovering && <a className="text-xs font-bold underline text-black mt-2 ml-2" href={`https://unsplash.com/@${user.username}`}>
                    {user.name}
                </a>}
            </div>
        </div>
    )
}

const PhotoPicker = () => {
    const [photos, setPhotosResponse] = useState(null)
    const [searchTerm, setSearchTerm] = useState("mountains")

    useEffect(() => {
        api.search
            .getPhotos({ query: searchTerm, orientation: 'portrait' })
            .then(result => {
                setPhotosResponse(result.response)
            })
            .catch(() => {
            console.log("Something went wrong.")
        })
    }, [searchTerm])

    if (photos === null) {
        return <div>Loading...</div>
    } else if (photos.errors) {
        return <div>{console.log(photos)}</div>
    } else {
        return (
            <div className="flex flex-col">
                <div className="form-control">
                    <div className="input-group mb-5">
                        <input type="text" placeholder="Search…" className="input input-bordered input-sm" value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value) }} />
                        <button className="btn btn-square btn-sm pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
                <ul className="list-none py-2">
                    {photos.results.map(photo => (
                        <li key={photo.id} className="mb-3">
                            <StockPhoto photo={photo}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default PhotoPicker