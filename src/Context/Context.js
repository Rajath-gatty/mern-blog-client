import React, { useReducer, useCallback, useContext } from "react";
import reducer from "../reducer/reducer";

export const Context = React.createContext({
    setCurrentUser: () => {},
});

const initialState = {
    isButtonDisabled: true,
    isLoggedIn: false,
    token: null,
    user: {},
};

export const ContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const disableButton = useCallback(() => {
        dispatch({ type: "DISABLE_BUTTON" });
    }, []);

    const enableButton = useCallback(() => {
        dispatch({ type: "ENABLE_BUTTON" });
    }, []);

    const loginUser = (token) => {
        dispatch({ type: "LOGIN_USER", payload: token });
    };

    const logoutUser = useCallback(() => {
        dispatch({ type: "LOGOUT_USER" });
    }, []);

    const setToken = useCallback((token) => {
        dispatch({ type: "SET_TOKEN_FROM_LOCALSTORAGE", payload: token });
    }, []);

    const setCurrentUser = useCallback((user) => {
        dispatch({ type: "SET_USER", payload: user });
    }, []);

    return (
        <Context.Provider
            value={{
                ...state,
                disableButton,
                enableButton,
                loginUser,
                logoutUser,
                setToken,
                setCurrentUser,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export const useBlogContext = () => {
    return useContext(Context);
};
