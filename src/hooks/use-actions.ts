import { useDispatch } from "react-redux";
import { Action, bindActionCreators, Dispatch } from "redux";
import { actionCreator } from "../state";

export const useActions = () => {
  const dispatch = useDispatch<Dispatch<Action>>();

  return bindActionCreators(actionCreator, dispatch);
};
