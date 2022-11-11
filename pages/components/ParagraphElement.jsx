import React from "react";
import dynamic from "next/dynamic";
import { modules, formats } from "./EditorToolbar";

const ReactQuill = dynamic(import('react-quill'), { ssr: false, loading: () => <p>Loading...</p> })

export const ParagraphElement = () => {
  const [state, setState] = React.useState({ value: null });
  const handleChange = value => {
    setState({ value });
  };
  return (
    <ReactQuill
        theme="snow"
        value={state.value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
  );
};

export default ParagraphElement;