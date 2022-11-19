import { useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

import "../style/text-editor.css";
import { useClickOutside } from "../hooks/use-click-outside";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<any>(null);
  const { updateCell } = useActions();
  const [edditing, setEdditing] = useState(false);

  useClickOutside(ref, setEdditing);

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
