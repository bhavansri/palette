import ImageElement from "./ImageElement"

const Page = ({ backgroundColor }) => {

    return (
        <div style={{ backgroundColor: backgroundColor }} className="relative artboard shadow-xl phone-1 mb-5">
            <ImageElement />
        </div>
    )
}

export default Page