import { createContext, useContext, useReducer } from "react";
import { TOGGLE_DETAIL_LETTER, TOGGLE_FIND_ACCOUNT, TOGGLE_USER_INFO } from "../_actions/toggleComponent";

const initialState = {
  findAccount: '',
  userInfo: false,
  detailLetter: false
}

function toggleReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FIND_ACCOUNT:
      return { ...state, findAccount: action.payload }
    case TOGGLE_USER_INFO:
      return { ...state, userInfo: !state.userInfo };
    case TOGGLE_DETAIL_LETTER:
      return { ...state, detailLetter: !state.detailLetter };
    default:
      return state;
  }
}

const toggleStateContext = createContext();
const toggleDispatchContext = createContext();

export function ToggleProvider({ children }) {
  const [state, dispatch] = useReducer(toggleReducer, initialState);
  return (
    <toggleStateContext.Provider value={state}>
      <toggleDispatchContext.Provider value={dispatch}>
        { children }
      </toggleDispatchContext.Provider>
    </toggleStateContext.Provider>
  );
}

export function useToggleState() {
  return useContext(toggleStateContext);
}

export function useToggleDispatch() {
  return useContext(toggleDispatchContext);
}