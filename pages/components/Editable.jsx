import { Fragment, useState } from "react"

const Editable = ({
    text,
    type,
    placeholder,
    children,
    ...props
}) => {
    const [isEditing, setEditing] = useState(false)

    const handleKeyDown = (event, type) => {
        const { key } = event
        const keys = ["Escape", "Tab", "Enter"]

        if (keys.indexOf(key) > -1) {
            setEditing(false)
        }
    }

    return (
        <Fragment {...props}>
            {
                isEditing ? (
                    <div onBlur={() => { setEditing(false) }}
                        onKeyDown={(e) => { handleKeyDown(e, type) }}
                    >
                        {children}
                    </div>
                ) : (
                        <div onDoubleClick={() => { setEditing(true) }}>
                            <span>
                                {text || placeholder || "Editable Content"}
                            </span>
                        </div>
                )
            }
        </Fragment>
    )
}

export default Editable