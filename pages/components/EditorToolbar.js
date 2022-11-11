import React, { useEffect, useState } from "react"

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar"
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};

// Formats objects for setting up the Quill editor
export const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "script",
  "link",
  "color",
];

// Quill Toolbar component
export const QuillToolbar = () => {
    const [enableToolbar, setEnableToolbar] = useState(false)

    useEffect(() => {
        async function loadQuill() {
            return new Promise(async (resolve, reject) => {
                const ReactQuill = (require("react-quill")).Quill
                resolve({ ReactQuill })
            }).then(({ ReactQuill }) => {
                // Add sizes to whitelist and register them
                const Size = ReactQuill.import("formats/size")
                Size.whitelist = ["extra-small", "small", "medium", "large"]
                ReactQuill.register(Size, true)
                
                // Add fonts to whitelist and register them
                const Font = ReactQuill.import("formats/font")
                Font.whitelist = [
                    "arial",
                    "comic-sans",
                    "courier-new",
                    "georgia",
                    "helvetica",
                    "lucida"
                ]
                
                ReactQuill.register(Font, true)
                return
            }).then((value) => {
                setEnableToolbar(true)
            })
        }

        loadQuill()
    }, [])

    return (
        enableToolbar && <div id="toolbar">
            <span className="ql-formats">
                <select className="ql-font" defaultValue="arial">
                    <option value="arial">Arial</option>
                    <option value="comic-sans">Comic Sans</option>
                    <option value="courier-new">Courier New</option>
                    <option value="georgia">Georgia</option>
                    <option value="helvetica">Helvetica</option>
                    <option value="lucida">Lucida</option>
                </select>
                <select className="ql-size" defaultValue="medium">
                    <option value="extra-small">Size 1</option>
                    <option value="small">Size 2</option>
                    <option value="medium">Size 3</option>
                    <option value="large">Size 4</option>
                </select>
            </span>
            <span className="ql-formats">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />
            </span>
            <span className="ql-formats">
                <select className="ql-align" />
                <select className="ql-color" />
            </span>
            <span className="ql-formats">
                <button className="ql-link" />
            </span>
    </div >
    )
}

export default QuillToolbar;