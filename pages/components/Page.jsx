import { useState } from "react"
import { useCallback } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import uuid from "react-uuid"
import socketIO from "socket.io-client"
import Comment from "./Comment"
const socket = socketIO.connect("http://localhost:4000")

const Page = () => {
    const url = 'https://www.pageblox.io'
    const pageRef = useRef(null)
    const [image, setImage] = useState('')
    const [blocks, setBlocks] = useState([])

    const updateBlock = (blockProps) => {
        setBlocks(prevBlocks => {
            const newBlocks = prevBlocks.map(prevBlock => {
                if (prevBlock.id === blockProps.id) {
                    return Object.assign(prevBlock, blockProps)
                }
                
                return prevBlock
            })
            
            return newBlocks
        })
    }

    const deleteBlock = (id) => {
        setBlocks(prevBlocks => {
          const newBlocks = prevBlocks.filter(block => block.id !== id)
    
          return newBlocks
        })
    }

    useEffect(() => {
        socket.emit('browse', {
            url
        })

        socket.on('image', ({ image, buffer }) => {
            if (image) {
                setImage('data:image/png;base64,' + buffer)
            }
        })
    }, [url])

    useEffect(() => {
        console.log(blocks)
    })

    const createComment = useCallback((event) => {
        const position = event.currentTarget.getBoundingClientRect()

        setBlocks(prevBlocks => [...prevBlocks, {
            id: uuid(),
            comment: "",
            x: event.clientX - position.left,
            y: event.clientY - position.top}])
    }, [])

    return (
        <div className="w-full px-5 overflow-auto" style={{ height: '700px' }}>
            <div ref={pageRef} className="bg-white w-full h-full relative" onDoubleClick={createComment}>
                {blocks.map(block => { return <div key={block.id} style={{ top: block.y, left: block.x, position: 'absolute', zIndex: 10 }}><Comment pageRef={pageRef} block={block} setBlock={updateBlock} deleteBlock={deleteBlock} /></div> })}
                {image && <picture><img alt='hello' src={image} className="top-0 sticky w-full" /></picture>}
            </div>
        </div>
    )
}

export default Page