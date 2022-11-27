import { useEffect } from 'react'
import { useOutsideClick } from '../../utils/hooks'

const Comment = ({ pageRef, block, setBlock, deleteBlock }) => {
    const { id, comment, submitted, profileColor, profileName } = block

    const handleSubmit = (event) => {
        if (comment.length > 0) {
            setBlock({ id: id, submitted: true })
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
            <span className='h-6 w-6 inline-block' style={{ borderRadius: '50%', background: profileColor }}>
            </span>
            <div>
                {submitted ?
                    <div className='flex flex-col items-start gap-2 bg-gray-900 py-2 px-3 rounded' style={{ minWidth: '222px' }}>
                        <div className='flex items-center justify-between w-full'>
                            <span className='text-white'>{`${profileName}`}</span>
                            <button className="btn btn-sm btn-square" onClick={handleDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                        </div>
                        <span className='text-sm'>{comment}</span>
                    </div>
                    :
                    <div className="form-control bg-gray-900 p-1 rounded">
                        <label className='label'>
                            <span className='label-text text-white'>{`${profileName}`}</span>
                        </label>
                        <div className="input-group input-group-sm">
                            <input type="text" placeholder="Add a comment" value={comment} readOnly={submitted} onChange={(e) => { setBlock({ id: id, comment: e.target.value }) }} className={`input input-sm bg-gray-800 input-bordered ${submitted ? 'cursor-default' : 'cursor-text'}`} />
                            <button className="btn btn-sm btn-square" onClick={handleSubmit}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            </button>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default Comment