import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import FormProvider from "./Context/ContextApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FormProvider>
    <App />
  </FormProvider>
);
