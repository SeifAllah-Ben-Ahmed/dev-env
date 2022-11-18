import { useEffect, useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

import "../style/text-editor.css";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<any>(null);
  const { updateCell } = useActions();
  const [edditing, setEdditing] = useState(false);

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
            value={cell.content}
            onChange={(string) => updateCell(cell.id, string || "")}
          />
        </div>
      ) : (
        <div onClick={() => setEdditing(true)} className="text-editor card">
          <div className="card-content">
            <MDEditor.Markdown source={cell.content || "## Click me to edit"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
