import { useState } from "react"
import { useCallback } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import socketIO from "socket.io-client"
import Comment from "./Comment"
const socket = socketIO.connect("http://localhost:4000")

const Page = ({ blocks, setBlock }) => {
    const url = 'https://blog.logrocket.com/implementing-websocket-communication-next-js/'
    const ref = useRef(null)
    const [image, setImage] = useState('')
    const [cursor, setCursor] = useState('')
    const [fullHeight, setFullHeight] = useState('')

    useEffect(() => {
        socket.emit('browse', {
            url
        })

        socket.on('image', ({img, fullHeight}) => {
            setImage('data:image/png;base64,' + img);
            setFullHeight(fullHeight);
        })

        socket.on("cursor", (cur) => {
            setCursor(cur);
        })
    }, [url])

    const mouseMove = useCallback((event) => {
        const position = event.currentTarget.getBoundingClientRect()
        const widthChange = 1255 / position.width
        const heightChange = 800 / position.height
        socket.emit('mouseMove', {
            x: widthChange * (event.pageX - position.left),
            y: heightChange * (event.pageY - position.top - document.documentElement.scrollTop),
        })
    }, [])

    const mouseClick = useCallback((event) => {
        const position = event.currentTarget.getBoundingClientRect()
        const widthChange = 1255 / position.width
        const heightChange = 800 / position.height
        socket.emit('mouseClick', {
            x: widthChange * (event.pageX - position.left),
            y: heightChange * (event.pageY - position.top - document.documentElement.scrollTop),
        })
    }, [])

    const mouseScroll = useCallback((event) => {
        const position = event.currentTarget.scrollTop
        socket.emit('scroll', {
            position
        })
    }, [])

    return (
        <div className="w-full px-5 overflow-auto" style={{ height: '700px' }} onScroll={mouseScroll}>
            <div ref={ref} className="bg-white w-full h-full relative" style={{ cursor, height: fullHeight }}>
                {blocks?.map(block => {
                    const id = block.id
                    return <Comment key={id} block={block} setBlock={setBlock} />
                })}
                {image && <picture><img alt='hello' src={image} onMouseMove={mouseMove} onClick={mouseClick} className="top-0 sticky w-full" /></picture>}
            </div>
        </div>
    )
}

export default Page