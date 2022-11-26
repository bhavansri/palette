const Sidebar = ({ addCommentHandler }) => (
    <aside className="flex flex-col items-center px-3">
        <button className="btn btn-outline" onClick={addCommentHandler}>Add Comment</button>
    </aside>
)

export default Sidebar