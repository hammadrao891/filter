import React from "react";
import ReactDOM from "react-dom/client";

// import {Counter} from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import App from "./App";
import Dashboard from "./components/Dashboard";
import { BrowserRouter } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
    <App/>
    </BrowserRouter> 
);