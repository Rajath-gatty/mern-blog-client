import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./Context/Context";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

//axios.defaults.baseURL = "https://healthyroutine24.com";
axios.defaults.baseURL = "https://mern-blog12.herokuapp.com";

ReactDOM.render(
    <React.StrictMode>
        <ContextProvider>
            <App />
        </ContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
