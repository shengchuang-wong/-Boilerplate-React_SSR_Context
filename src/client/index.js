import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import Layout from "../common/Layout";
// import "../sass/index.scss";
import { BrowserRouter } from "react-router-dom";
import StaticContext from "./StaticContext";

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(
    <StaticContext.Provider value={window.INITIAL_DATA}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </StaticContext.Provider>,
    document.getElementById("root")
);