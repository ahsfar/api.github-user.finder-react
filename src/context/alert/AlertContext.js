import { createContext, useReducer } from "react";
import alertReducer from "./AlertReducer";

const AlertContext = createContext();

//provider with prop children and initial state null
export const AlertProvider = ({ children }) => {
  const initialState = null;
  // useReducer hook
  const [state, dispatch] = useReducer(alertReducer, initialState);

  //set an alert
  const setAlert = (msg, type) => {
    dispatch({
      type: "SET_ALERT",
      payload: { msg, type },
    });

    //alert box to go away after few seconds
    setTimeout(
      () =>
        dispatch({
          type: "REMOVE_ALERT",
        }),
      3000
    );
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
