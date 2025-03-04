import { useReducer } from "react";

const initialState = {
  value: "",
  isTouch: false,
  message: "",
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, value: action.payload };
    case "IS_TOUCH":
      return { ...state, isTouch: true };
    case "RESET_VALUE":
      return { message: "", value: "", isTouch: false };
    default:
      break;
  }
};

export function useInput(isValidated, setNetworkError) {
  const [inputState, dispatch] = useReducer(reducer, initialState);

  const onChangeHandler = (event) => {
    setNetworkError(false);
    dispatch({ type: "SET_VALUE", payload: event.target.value });
    dispatch({ type: "IS_TOUCH" });
  };

  const { validated, message } = isValidated(inputState.value);
  const hasError = !validated && inputState.isTouch;

  const onBlurHandler = () => {
    dispatch({ type: "IS_TOUCH" });
  }

  const reset = () => {
    dispatch({ type: "RESET_VALUE" });
  };

  const setDirect = (val) => {
    setNetworkError(false);
    dispatch({ type: "SET_VALUE", payload: val });
  }

  return {
    hasError,
    enterValue: inputState.value,
    onChangeHandler,
    reset,
    isTouch: inputState.isTouch,
    message,
    onBlurHandler,
    setDirect,
  };
}
