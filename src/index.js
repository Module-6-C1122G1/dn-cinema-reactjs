import {BrowserRouter} from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap/dist/css/bootstrap.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.min.js";
import {ToastContainer} from 'react-toastify';

import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import {Provider} from "react-redux";
import "bootstrap/dist/js/bootstrap.min.js";
import {store} from "./store";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
                <ToastContainer/>
            </BrowserRouter>
        </Provider>

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
