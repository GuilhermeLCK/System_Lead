import React, { useState, useEffect, useContext } from "react";
import "./QuestionsEditionDb.scss";
import { ContextForm } from "../../Context/ContextApp";
import { Link } from "react-router-dom";
import { FaRedoAlt, FaLink, FaExternalLinkAlt } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ClipLoader from "react-spinners/ClipLoader";

function QuestionsEditionDb() {
  const {
    Perguntas01,
    Perguntas02,
    Perguntas03,
    Perguntas04,
    Perguntas05,
    Perguntas06,
    Perguntas07,
    Perguntas08,
    Perguntas09,
    Perguntas10,
    HandleSalvarPerguntas,
    load,
    HandleUnput,
  } = useContext(ContextForm);

  const PerguntasArray = [
    Perguntas01,
    Perguntas02,
    Perguntas03,
    Perguntas04,
    Perguntas05,
    Perguntas06,
    Perguntas07,
    Perguntas08,
    Perguntas09,
    Perguntas10,
  ];

  function handleReloadPage(event) {
    window.location.reload();
  }

  const [copied, setCopied] = useState(false);

  const urlToCopy = "https://typeform-firebase-init.vercel.app/Form";

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Limpa a mensagem de "copiado" após 2 segundos
  };

  return (
    <div className="container-QuestionsEditionDb">
      <div className="container-QuestionsEdition-center">
        <div className="container-title-QuestionsEditionDb">
          <h1 className="title-QuestionsEditionDb">Formulário</h1>
          <p onClick={handleReloadPage}>
            Caso nao queira salvar as alteraçoes, basta clicar aqui
          </p>
        </div>

        {load ? (
          <h1>
            Carregando ...
            <ClipLoader color="#19b493" size={30} speedMultiplier={0.7} />
          </h1>
        ) : (
          <>
            {PerguntasArray.map((quest, index) => (
              <div key={index} className="container-questionsArray">
                <h1>
                  {index + 1}° - {quest}
                </h1>

                <input
                  type="text"
                  onChange={(e) => HandleUnput(e.target.value, index + 1)}
                  placeholder="
                  Insira abaixo as atualizações para refinar a pergunta acima"
                />
              </div>
            ))}
          </>
        )}
      </div>
      <div className="HandleSalvarPerguntas">
        <div className="container-saved">
          <button onClick={HandleSalvarPerguntas}>Salvar</button>
        </div>
        <div className="container-copy">
          <Link to="/Form" target="_blank">
            <span className="copy-none"> Formulário</span>
            <FaExternalLinkAlt size={14} />
          </Link>
          <CopyToClipboard text={urlToCopy}>
            <button onClick={handleCopy}>
              {copied ? (
                "Copiado! "
              ) : (
                <span className="copy-none"> Copiar URL</span>
              )}

              <FaLink size={14} />
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}

export default QuestionsEditionDb;
