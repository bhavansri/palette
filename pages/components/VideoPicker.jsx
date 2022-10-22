import YouTubeVideo from "./YoutubeVideo"

const WIDTH_VAL = 320
const HEIGHT_VAL = 180

const VideoPicker = ({ onCreate }) => (
    <div>
        <div onClick={() => { onCreate(WIDTH_VAL, HEIGHT_VAL) }}>
            <YouTubeVideo width={WIDTH_VAL} height={HEIGHT_VAL} disabled={true} />
        </div>
    </div>
)

export default VideoPicker