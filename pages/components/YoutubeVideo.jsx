const YouTubeVideo = ({ width, height, disabled }) => (
    <iframe width={width} height={height} className={ disabled ? 'pointer-events-none' : 'pointer-events-auto'} src="https://www.youtube.com/embed/teqk-UDPCrc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
)

export default YouTubeVideo