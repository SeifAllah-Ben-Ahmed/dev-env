import { useEffect, useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

import "../style/text-editor.css";

const TextEditor: React.FC = () => {
  const ref = useRef<any>(null);
  const [edditing, setEdditing] = useState(false);
  const [value, setValue] = useState("# Header");
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event?.target && ref.current.contains(event.target)) {
        return;
      }
      setEdditing(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  return (
    <div data-color-mode="dark">
      {edditing ? (
        <div ref={ref} className="text-editor">
          <MDEditor
            value={value}
            onChange={(string) => setValue(string || "")}
          />
        </div>
      ) : (
        <div onClick={() => setEdditing(true)} className="text-editor card">
          <div className="card-content">
            <MDEditor.Markdown source={value} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
