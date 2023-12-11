import React, { useEffect, useContext, useState } from "react";

import { ContextForm } from "../../Context/ContextApp";
import ClipLoader from "react-spinners/ClipLoader";
import "./Form.scss";

function Form() {
  const { load, isDarkMode, setIsDarkMode } = useContext(ContextForm);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <div className="section-container">
        {load ? (
          <h1>
            Carregando ...
            <ClipLoader color="#19b493" size={40} speedMultiplier={0.7} />
          </h1>
        ) : (
          <>
            <h1>Calma</h1>
          </>
        )}
      </div>
    </>
  );
}

export default Form;
