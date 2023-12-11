import React, { useState, useEffect, useContext } from "react";
import "./NavBar.scss";
import {
  FaInnosoft,
  FaTimes,
  FaAngleRight,
  FaUserFriends,
  FaMoon,
  FaSun,
  FaRegChartBar,
  FaRegEdit,
  FaRedoAlt,
  FaRegSun,
  FaSignInAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Authentication";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { dbBanco } from "../../Services/firebase";
import { ToastContainer, toast } from "react-toastify";
import { ContextForm } from "../../Context/ContextApp";

import "intro.js/introjs.css";
import { Steps, Hints } from "intro.js-react";
import introJs from "intro.js";

const SidebarMenu = () => {
  const { deslogar } = useContext(AuthContext);

  const { setIsDarkMode, isDarkMode } = useContext(ContextForm);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Adicionar ou remover a classe 'dark' ao elemento body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  async function handleClickDeslogar() {
    await deslogar();
  }

  const [introList, setIntroList] = useState([]);

  async function BuscarIntroSalvar() {
    const introDocRef = doc(dbBanco, "IntroJS", "Header");

    try {
      const docSnap = await getDoc(introDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const adaptadoParaVarIntro = data.introListNew.map((item) => ({
          title: item?.title,
          intro: item?.intro,
          element:
            item.element === null || ""
              ? document.querySelector(item.element)
              : document.querySelector(item.element),
        }));

        setIntroList(adaptadoParaVarIntro);
        console.log(adaptadoParaVarIntro);
      } else {
        console.log("O documento não existe!");
      }
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  }

  useEffect(() => {
    BuscarIntroSalvar();
  }, []);

  const intro = introJs();

  function Handle_Intro() {
    intro.setOptions({
      steps: introList,
    });
    intro.start();
  }

  return (
    <div>
      <nav className={`sidebar ${isSidebarOpen ? "close" : ""}`}>
        <header>
          <div className="image-text">
            <span className="image">
              <FaInnosoft size={32} className="FaInnosoft" />
            </span>
            <div className="text logo-text">
              <span className="name">Customease</span>
              <span className="profession">Controle Ágil</span>
            </div>
          </div>
          <i className="ToogleOpen" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaAngleRight size={16} /> : <FaTimes size={16} />}
          </i>
        </header>
        <div className="menu-bar">
          <div className="menu">
            <ul class="menu-links">
              <li class="nav-link">
                <Link to="/Home" className="Home">
                  <i class="bx bx-home-alt icon">
                    <FaUserFriends size={24} />
                  </i>
                  <span class="text nav-text">Clientes</span>
                </Link>
              </li>
              <li class="nav-link">
                <Link to="/Personalizar" className="Personalizar">
                  <i class="bx bx-bar-chart-alt-2 icon">
                    <FaRegEdit size={24} />
                  </i>
                  <span class="text nav-text">Personalizar</span>
                </Link>
              </li>
              <li class="nav-link">
                <Link to="/Form">
                  <i class="bx bx-bell icon">
                    <FaRegChartBar size={24} />
                  </i>
                  <span class="text nav-text">Formulários</span>
                </Link>
              </li>
              <li class="nav-link" onClick={Handle_Intro}>
                <Link>
                  <i class="bx bx-bell icon">
                    <FaRegChartBar size={24} />
                  </i>
                  <span class="text nav-text">Tuor</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="bottom-content">
            <li>
              <a onClick={handleClickDeslogar}>
                <i className="bx bx-log-out icon">
                  <FaSignInAlt size={24} />
                </i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>
            <li className="mode">
              <div>
                <i
                  className={`bx ${
                    isDarkMode ? "bx-sun" : "bx-moon"
                  } icon sun-moon`}
                >
                  {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                </i>
              </div>
              <span className="mode-text text">
                {isDarkMode ? "Light mode" : "Dark mode"}
              </span>
              <div className="toggle-switch" onClick={toggleDarkMode}>
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>

      {/*
        <section className="home">
        <div className="text">Dashboard Sidebar</div>
        </section>
      */}
    </div>
  );
};

export default SidebarMenu;
