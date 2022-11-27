import { Fragment, useState } from "react"
import { useCallback } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import { Rnd } from "react-rnd"
import uuid from "react-uuid"
import socketIO from "socket.io-client"
import Comment from "./Comment"
const socket = socketIO.connect("http://localhost:4000")

const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
const firstNames = [
    'Sasha', 'Iris', 'Aniya', 'Karlie', 'Maleah', 'Leonel', 'Riley', 'Itzel', 'Kody', 'Natasha', 'Jonathon', 'Isabela', 'Genesis'
]

const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)]

const Page = () => {
    const defaultURL = 'https://www.pageblox.io'
    const pageRef = useRef(null)
    const [searchTerm, setSearchTerm] = useState('')
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
            url: defaultURL
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

    const onDragStop = useCallback((d, id) => {
        updateBlock({ id: id, x: d.x, y: d.y })
    }, [])

    const submitSearch = () => {
        if (urlRegex.test(searchTerm)) {
            socket.emit('browse', {
                url: searchTerm
            })
        } else {
            alert('Enter a valid URL.')
        }
    }

    return (
        <>
            <div className="navbar flex justify-end pr-5">
                <div className="flex gap-2">
                    <input pattern="https://.*" type="url" placeholder="Enter a URL" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} className="input input-bordered input-sm w-64" />
                    <button className="btn btn-ghost" onClick={() => { submitSearch() }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
            </div>
            <div className="flex w-full pr-5 overflow-auto h-screen">
                <aside>
                    <ul className="menu menu-compact w-48 rounded-box mt-5">
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
                    {blocks.map(block => <Rnd size={{ width: 'auto', height: 'auto' }} position={{ x: block.x, y: block.y }} enableResizing={false} onDragStop={(e, d) => { onDragStop(d, block.id) }} key={block.id} style={{ position: 'absolute', zIndex: 10, cursor: 'default' }}>
                            <Comment pageRef={pageRef} block={block} setBlock={updateBlock} deleteBlock={deleteBlock} />
                        </Rnd>
                    )}
                    {image && <picture><img alt='hello' src={image} className="top-0 sticky w-full" /></picture>}
                </div>
            </div>
        </>
    )
}

export default Page