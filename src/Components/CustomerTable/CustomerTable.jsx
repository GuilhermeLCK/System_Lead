import { React, useState, useEffect, useContext } from "react";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

import { dbBanco } from "../../Services/firebase";
import "./CustomerTable.scss";
import InputSearch from "../InputSearch/InputSearch";
import ModalCliente from "./ModalCliente";

import {
  FaFilter,
  FaEllipsisV,
  FaWhatsapp,
  FaTrash,
  FaInfoCircle,
  FaTimes,
  FaRedoAlt,
  FaRegBuilding,
  FaRegClipboard,
  FaRegEnvelope,
  FaRegCalendarCheck,
  FaPhoneAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { ContextForm } from "../../Context/ContextApp";
import { AuthContext } from "../../Context/Authentication";

function CustomerTable() {
  const { perguntasForm } = useContext(ContextForm);

  const [customers, setCustomers] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

  const trList = [
    "Nome da Empresa",
    "Ramo de Atividade",
    "E-mail",
    "Telefone",
    "Data de Contato",
    "Detalhes",
    "Deletar",
  ];
  const [showDivId, setShowDivId] = useState(null);
  const [valueSearch, setValueSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  useEffect(() => {
    const unsubscribe = listenForCustomers();

    return () => unsubscribe;
  }, []); //
  async function listenForCustomers() {
    const postRef = collection(dbBanco, "respostasForm");
    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      const formArrayList = [];
      snapshot.forEach((form) => {
        formArrayList.push({
          Id: form.id,
          Questions01: form.data().Questions01,
          Questions02: form.data().Questions02,
          Questions03: form.data().Questions03,
          Questions04: form.data().Questions04,
          Questions05: form.data().Questions05,
          Questions06: form.data().Questions06,
          Questions07: form.data().Questions07,
          Questions08: form.data().Questions08,
          Questions09: form.data().Questions09,
          Questions10: form.data().Questions10,
          dataCriacao: form.data().dataCriacao,
          horaCriacao: form.data().horaCriacao,
        });
      });

      setCustomers(formArrayList); // Atualize o estado com os novos dados
    });

    return unsubscribe; // Retorna a função de limpeza para remover o ouvinte quando necessário
  }

  const filterNames = ({ Questions01, Questions02 }) => {
    return (
      (Questions01?.toLowerCase() &&
        Questions01?.toLowerCase().indexOf(valueSearch.toLowerCase()) !== -1) ||
      (Questions02?.toLowerCase() &&
        Questions02?.toLowerCase().indexOf(valueSearch.toLowerCase()) !== -1)
    );
  };

  function handleShowDivClick(id) {
    if (id === showDivId) {
      setShowDivId(null);
    } else {
      setShowDivId(id);
    }
    //setShowDivId((returnId) => (returnId === id ? null : id));
  }

  // Delete

  async function deleteForm(id) {
    const postRef = doc(dbBanco, "respostasForm", id);

    await deleteDoc(postRef)
      .then(() => {
        toast.success("Deletado com sucesso!", {
          style: {
            marginTop: "0px",
          },
          autoClose: 3000, // Defina o tempo em milissegundos (3 segundos neste exemplo)
        });
      })
      .catch((e) => {
        alert.error(e);
      });
  }

  const openModal = (project, index) => {
    setCurrentProject(project);
    console.log(index);
    console.log(project);
    setShowDivId(null);
  };

  function openWhatsAppWithMessage(Number) {
    const phoneNumberToConvert = Number;
    const message = "Conhecer mais sobre a Customease!";

    const numericPhoneNumber = phoneNumberToConvert.replace(/\D/g, "");
    const countryCode = "+55";
    const areaCode = numericPhoneNumber.substring(0, 2);
    const restOfNumber = numericPhoneNumber.substring(2);
    const formattedNumber = `${countryCode}${areaCode}${restOfNumber}`;
    const encodedMessage = encodeURIComponent(message);

    const whatsappURL = `https://api.whatsapp.com/send?phone=${formattedNumber}&text=${encodedMessage}`;

    window.open(whatsappURL);
  }
  const { user } = useContext(AuthContext);

  const [sortOrder, setSortOrder] = useState(""); // Estado inicial vazio

  const sortItems = (a, b) => {
    if (sortOrder === "nomeCrescente") {
      return a.Questions01.localeCompare(b.Questions01);
    } else if (sortOrder === "nomeDecrescente") {
      return b.Questions01.localeCompare(a.Questions01);
    } else if (sortOrder === "dataCadastro") {
      if (a.dataCriacao < b.dataCriacao) return -1;
      if (a.dataCriacao > b.dataCriacao) return 1;
      return 0;
    }
    return 0;
  };

  const sortedCustomers = customers.sort(sortItems);

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  function handleisFilterOpen() {
    setIsFilterOpen(!isFilterOpen);
  }

  const handleBlur = () => {
    // Feche o filtro quando o botão perder o foco.
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="container-map">
      <div className="container-search">
        <InputSearch
          setValueSearch={setValueSearch}
          valueSearch={valueSearch}
        />
        <button onClick={handleisFilterOpen} onBlur={handleBlur}>
          <FaFilter /> Filtros
        </button>
      </div>

      <div className={`container-alphabetical ${isFilterOpen ? "close" : ""}`}>
        <h2>ORDENAR POR:</h2>
        <div>
          <input
            type="radio"
            id="nomeCrescente"
            name="ordenarPor"
            value="nomeCrescente"
            checked={sortOrder === "nomeCrescente"}
            onChange={handleSortOrderChange}
          />
          <label htmlFor="nomeCrescente">Nome crescente</label>
        </div>
        <div>
          <input
            type="radio"
            id="nomeDecrescente"
            name="ordenarPor"
            value="nomeDecrescente"
            checked={sortOrder === "nomeDecrescente"}
            onChange={handleSortOrderChange}
          />
          <label htmlFor="nomeDecrescente">Nome decrescente</label>
        </div>

        <div>
          <input
            type="radio"
            id="dataCadastro"
            name="ordenarPor"
            value="dataCadastro"
            checked={sortOrder === "dataCadastro"}
            onChange={handleSortOrderChange}
          />
          <label htmlFor="dataCadastro">Data de cadastro</label>
        </div>
      </div>

      <div className="table">
        <div className="thead">
          {trList.map((indice, index) => {
            return (
              <div
                key={index}
                className="th"
                id={index === 5 || index === 6 ? "td-icon" : ""}
              >
                {" "}
                {indice}
                {index === 0 && <FaRegBuilding />}
                {index === 1 && <FaRegClipboard />}
                {index === 2 && <FaRegEnvelope />}
                {index === 3 && <FaPhoneAlt />}
                {index === 4 && <FaRegCalendarCheck />}
              </div>
            );
          })}
        </div>

        <div className="tbody">
          {sortedCustomers.filter(filterNames).map((item, index) => (
            <div key={index} className="tr">
              <div className="td">{item.Questions01}</div>
              <div className="td">{item.Questions02}</div>

              <div className="td">{item.Questions03}</div>
              <div className="td">
                {item.Questions04}
                <FaWhatsapp
                  className="FaWhatsapp"
                  size={20}
                  onClick={() => {
                    openWhatsAppWithMessage(item.Questions04);
                  }}
                />
              </div>
              <div className="td">{item.dataCriacao}</div>
              <div className="td" id="td-icon">
                <p onClick={() => openModal(item, index)}>
                  <FaInfoCircle size={18} />
                </p>
              </div>
              <div className="td" id="td-icon">
                <p onClick={() => deleteForm(item.Id)} className="Deletar">
                  <FaTrash size={18} />
                </p>
              </div>

              <div className="">
                {currentProject && (
                  <div>
                    <ModalCliente
                      currentProject={currentProject}
                      setCurrentProject={setCurrentProject}
                      perguntasForm={perguntasForm}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="total-clients">
        <p>Total de clientes: {customers.length}</p>
      </div>
    </div>
  );
}

export default CustomerTable;
