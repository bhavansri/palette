export const presetColors = ["#000000", "#14213D", "#FCA311", "#E5E5E5", "#FFFFFF"]
export const inputBackgroundColors = ["#F8F9FA", "#E9ECEF", "#DEE2E6", "#CED4DA", "#ADB5BD", "#6C757D", "#495057", "#343A40", "#212529"]

export const getButtonStyling = (type) => {
    switch (type) {
        case 'default':
            return ''
        case 'primary':
            return 'btn-primary'
        case 'secondary':
            return 'btn-secondary'
        case 'accent':
            return 'btn-accent'
        case 'ghost':
            return 'btn-ghost'
        case 'link':
            return 'btn-link'
    }
}

export const handleTextStyles = {
    left: {
        marginTop: -5,
        marginLeft: -3,
        top: "50%",
        left: 0,
        cursor: "ew-resize",
        border: "3px solid #999",
        borderTop: "none",
        borderRight: "none",
        borderBottom: "none",
        borderWidth: 5,
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    },
    right: {
        marginTop: -5,
        marginLeft: -7,
        top: "50%",
        left: "100%",
        cursor: "ew-resize",
        border: "3px solid #999",
        borderTop: "none",
        borderLeft: "none",
        borderBottom: "none",
        borderWidth: 5,
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    }
}

export const handleStyles = {
    top: {
        marginTop: -3,
        marginLeft: -5,
        top: 0,
        left: "50%",
        cursor: "ns-resize",
        border: "3px solid #999",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "none",
        borderWidth: 5,
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    },
    topLeft: {
        marginTop: -2,
        marginLeft: -2,
        top: 0,
        left: 0,
        cursor: "nwse-resize",
        border: "3px solid #999",
        borderRight: "none",
        borderBottom: "none",
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    },
    left: {
        marginTop: -5,
        marginLeft: -3,
        top: "50%",
        left: 0,
        cursor: "ew-resize",
        border: "3px solid #999",
        borderTop: "none",
        borderRight: "none",
        borderBottom: "none",
        borderWidth: 5,
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    },
    bottomLeft: {
        marginTop: -7,
        marginLeft: -2,
        top: "100%",
        left: 0,
        cursor: "nesw-resize",
        border: "3px solid #999",
        borderRight: "none",
        borderTop: "none",
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    },
    bottom: {
        marginTop: -7,
        marginLeft: -5,
        top: "100%",
        left: "50%",
        cursor: "ns-resize",
        border: "3px solid #999",
        borderLeft: "none",
        borderRight: "none",
        borderTop: "none",
        borderWidth: 5,
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    },
    bottomRight: {
        marginTop: -7,
        marginLeft: -7,
        top: "100%",
        left: "100%",
        cursor: "nwse-resize",
        border: "3px solid #999",
        borderLeft: "none",
        borderTop: "none",
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    },
    right: {
        marginTop: -5,
        marginLeft: -7,
        top: "50%",
        left: "100%",
        cursor: "ew-resize",
        border: "3px solid #999",
        borderTop: "none",
        borderLeft: "none",
        borderBottom: "none",
        borderWidth: 5,
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    },
    topRight: {
        marginTop: -2,
        marginLeft: -7,
        top: 0,
        left: "100%",
        cursor: "nesw-resize",
        border: "3px solid #999",
        borderLeft: "none",
        borderBottom: "none",
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    }
}