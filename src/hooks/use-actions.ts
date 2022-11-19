import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { Action, bindActionCreators, Dispatch } from "redux";

import { actionCreator } from "../state";

export const useActions = () => {
  const dispatch = useDispatch<Dispatch<Action>>();

  return useMemo(() => bindActionCreators(actionCreator, dispatch), [dispatch]);
};
