import { React, useEffect } from "react";
import QuestionsEditionDb from "../../Components/QuestionsEditionDb/QuestionsEditionDb";
import NavBar from "../../Components/NavBarMenu/NavBar";
import "./QuestionsEdition.scss";

function QuestionsEdition() {
  useEffect(() => {
    localStorage.setItem("PaginaAtual", "QuestionsEdition");
  }, []);

  return (
    <>
      <div className="container-QuestionsEdition">
        <NavBar />
        <div className="container-flexBody">
          <QuestionsEditionDb />
        </div>
      </div>
    </>
  );
}

export default QuestionsEdition;
