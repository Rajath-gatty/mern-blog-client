const reducer = (state, action) => {
    if (action.type === "DISABLE_BUTTON") {
        return { ...state, isButtonDisabled: true };
    }
    if (action.type === "ENABLE_BUTTON") {
        return { ...state, isButtonDisabled: false };
    }
    if (action.type === "LOGIN_USER") {
        return { ...state, isLoggedIn: true, token: action.payload };
    }
    if (action.type === "LOGOUT_USER") {
        localStorage.removeItem("token");
        return {
            ...state,
            isLoggedIn: false,
            token: "",
            user: {},
            userTotalPost: 0,
        };
    }
    if (action.type === "SET_TOKEN_FROM_LOCALSTORAGE") {
        if (action.payload) {
            return { ...state, isLoggedIn: true, token: action.payload };
        } else {
            return state;
        }
    }
    if (action.type === "SET_USER") {
        return { ...state, user: action.payload };
    }
};

export default reducer;
