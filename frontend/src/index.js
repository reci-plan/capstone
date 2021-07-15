import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import "./index.css";

import { DataLayer } from "./context/DataLayer";
import reducer, { initialState } from "./context/reducer";

ReactDOM.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <App />
    </DataLayer>
  </React.StrictMode>,
  document.getElementById("root")
);
