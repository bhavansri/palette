import { useState } from 'react'
import { useOutsideClick } from '../../utils/hooks'

const Comment = ({ pageRef, block, setBlock, deleteBlock }) => {
    const { id, comment } = block
    const [inputVal, setInputVal] = useState(comment)
    const isNewComment = comment.length === 0

    const handleSubmit = (event) => {
        if (inputVal.length > 0) {
            setBlock({ id: id, comment: inputVal })
        }
    }

    const handleDelete = (event) => {
        deleteBlock(id)
    }

    const handleOutsideClick = () => {
        if (comment.length === 0) {
            deleteBlock(id)
        }
    }

    const ref = useOutsideClick(() => handleOutsideClick(), pageRef)

    return (
        <div ref={ref} className='flex gap-2'>
            <span className='h-6 w-6 bg-orange-500 inline-block' style={{ borderRadius: '50%' }}>
            </span>
            <div className="form-control">
                <div className="input-group input-group-sm pt-5">
                    <input type="text" placeholder="Search…" value={inputVal} onChange={(e) => { setInputVal(e.target.value) }} readOnly={!isNewComment} className={`input input-sm input-bordered ${ isNewComment ? 'cursor-text' : 'cursor-default' } `} />
                    { isNewComment ? <button className="btn btn-sm btn-square" onClick={handleSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    </button> : <button className="btn btn-sm btn-square" onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>}
                </div>
            </div>
        </div>
    )
}

export default Comment