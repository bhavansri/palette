import { Fragment, useState } from "react"
import { useCallback } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import uuid from "react-uuid"
import socketIO from "socket.io-client"
import Comment from "./Comment"
const socket = socketIO.connect("http://localhost:4000")

const firstNames = [
    'Sasha', 'Iris', 'Aniya', 'Karlie', 'Maleah', 'Leonel', 'Riley', 'Itzel', 'Kody', 'Natasha', 'Jonathon', 'Isabela', 'Genesis'
]

const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)]

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
            
            socket.emit("blocks", newBlocks)
            
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
    }, [])

    useEffect(() => {
        socket.on('new-blocks', blocks => {
            setBlocks(blocks)
        })
    }, [blocks])

    const createComment = useCallback((event) => {
        const position = event.currentTarget.getBoundingClientRect()

        setBlocks(prevBlocks => [...prevBlocks, {
            id: uuid(),
            profileColor: randomColor,
            profileName: randomFirstName,
            comment: "",
            submitted: false,
            x: event.clientX - position.left,
            y: event.clientY - position.top}])
    }, [])

    return (
        <div className="flex w-full pr-5 overflow-auto" style={{ height: '700px' }}>
            <aside>
                <ul className="menu menu-compact bg-base-100 w-48 rounded-box mt-5">
                    {blocks.map(block => {
                        if (block.submitted) {
                            return (
                                <Fragment key={block.id}>
                                    <li>
                                        <div>
                                            <span className='h-3 w-3 inline-block' style={{ borderRadius: '50%', background: block.profileColor }}></span>
                                            <span>{block.profileName}</span>
                                        </div>
                                        <div className="text-xs pl-5 text-gray-400">{block.comment}</div>
                                    </li>
                                    <div className="divider px-5"></div>
                                </Fragment>
                            )
                        }
                    }) }
                </ul>
            </aside>
            <div ref={pageRef} className="bg-white w-full h-full relative" onDoubleClick={createComment}>
                {blocks.map(block => { return <div key={block.id} style={{ top: block.y, left: block.x, position: 'absolute', zIndex: 10 }}><Comment pageRef={pageRef} block={block} setBlock={updateBlock} deleteBlock={deleteBlock} /></div> })}
                {image && <picture><img alt='hello' src={image} className="top-0 sticky w-full" /></picture>}
            </div>
        </div>
    )
}

export default Page