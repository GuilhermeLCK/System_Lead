import React from "react";
import "./ModalCliente.scss";
import { FaTimes } from "react-icons/fa";

function ModalCliente({ currentProject, setCurrentProject, perguntasForm }) {
  function closeModal() {
    setCurrentProject(null);
    console.log(perguntasForm);
  }

  const responseModal = [
    {
      id: currentProject.Id,
      Questions01: currentProject.Questions01,
      Questions02: currentProject.Questions02,
      Questions03: currentProject.Questions03,
      Questions04: currentProject.Questions04,
      Questions05: currentProject.Questions05,
      Questions06: currentProject.Questions06,
      Questions07: currentProject.Questions07,
      Questions08: currentProject.Questions08,
      Questions09: currentProject.Questions09,
      Questions10: currentProject.Questions10,
      dataCriacao: currentProject.dataCriacao,
      horaCriacao: currentProject.horaCriacao,
    },
  ];

  return (
    <div className="container-modal">
      <div className="modal-content">
        {responseModal.map((item, index) => (
          <div key={index} className="modal-content-map">
            <div className="modal-title">
              <h1>Informações completas dos clientes</h1>
            </div>
            <div className="modal-info">
              <h1>#ID do Usuario</h1>
              <h2>{item.id}</h2>
            </div>
            <div className="modal-info">
              <h1>{perguntasForm[0]}</h1>
              <h2>{item.Questions01}</h2>
            </div>
            <div className="modal-info">
              <h1>{perguntasForm[1]}</h1>
              <h2>{item.Questions02}</h2>
            </div>
            <div className="modal-info">
              <h1>{perguntasForm[2]}</h1>
              <h2>{item.Questions03}</h2>
            </div>
            <div className="modal-info">
              <h1>{perguntasForm[3]}</h1>
              <h2>{item.Questions04}</h2>
            </div>
            <div className="modal-info">
              <h1>{perguntasForm[4]}</h1>
              <h2>{item.Questions05}</h2>
            </div>
            <div className="modal-info">
              <h1>{perguntasForm[5]}</h1>
              <h2>{item.Questions06}</h2>
            </div>
            <div className="modal-info">
              <h1>{perguntasForm[6]}</h1>
              <h2>{item.Questions07}</h2>
            </div>
            <div className="modal-info">
              <h1>{perguntasForm[7]}</h1>
              <h2>{item.Questions08}</h2>
            </div>

            <div className="modal-info">
              <h1>{perguntasForm[8]}</h1>
              <h2>{item.Questions09}</h2>
            </div>
            <div className="modal-info">
              <h1>{perguntasForm[9]}</h1>
              <h2>{item.Questions10}</h2>
            </div>
            <div className="modal-info">
              <h1>dataCriacao</h1>
              <h2>{item.dataCriacao}</h2>
            </div>
            <div className="modal-info">
              <h1>horaCriacao</h1>
              <h2>{item.horaCriacao}</h2>
            </div>
          </div>
        ))}
        <button className="close-button" onClick={closeModal}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
}

export default ModalCliente;
