import { Fragment } from "react";

import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";

import "../style/cell-list.css";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) =>
    cells?.order.map((id) => cells.data[id])
  );

  const renderedCells = cells?.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells?.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
