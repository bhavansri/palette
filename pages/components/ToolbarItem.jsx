const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    color: 'black'
}

export const ToolbarItem = ({ id, title, setBox }) => {
    return (
        <div className="box" style={{ ...style }} onClick={setBox}>
          {title}
        </div>
    )
}