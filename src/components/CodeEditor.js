import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

const CodeEditor = ({ onCodeChange }) => {
  const [code, setCode] = useState("// Start coding here...");

  const handleEditorChange = (newCode) => {
    setCode(newCode);
    onCodeChange(newCode); // Send changes to the parent component
  };

  return (
    <MonacoEditor
      height="100%"
      language="javascript"
      theme="hc-black"
      value={code}
      onChange={handleEditorChange}
      options={{
        fontSize: 24,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
