import React from "react";
import { useActions } from "../hooks/use-actions";

import "../style/add-cell.css";

interface AddCellPorps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellPorps> = ({ previousCellId, forceVisible }) => {
  const { insertAfterCell } = useActions();

  return (
    <div className={forceVisible ? "add-cell force-visible" : "add-cell"}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary "
          onClick={() => insertAfterCell(previousCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary "
          onClick={() => insertAfterCell(previousCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
    </div>
  );
};

export default AddCell;
