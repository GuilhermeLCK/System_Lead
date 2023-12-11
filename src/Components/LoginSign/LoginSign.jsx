import React, { useState, useEffect, useContext } from "react";
import "./LoginSign.scss"; // Importe seu arquivo CSS aqui

import {
  FaGooglePlusG,
  FaFacebookSquare,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../../Context/Authentication";

function Login() {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    const handleRegisterClick = () => {
      container.classList.add("active");
      setIsSignUp(true);
    };

    const handleLoginClick = () => {
      container.classList.remove("active");
      setIsSignUp(false);
    };

    registerBtn.addEventListener("click", handleRegisterClick);
    loginBtn.addEventListener("click", handleLoginClick);

    return () => {
      registerBtn.removeEventListener("click", handleRegisterClick);
      loginBtn.removeEventListener("click", handleLoginClick);
    };
  }, []);

  // Cadastro User

  const { cadastarUsuario, logarUsuario, loadingAuth } =
    useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (name !== "" && email !== "" && name !== "") {
      await cadastarUsuario(name, email, password).then(() => {
        setEmail("");
        setName("");
        setPassword("");
      });
    } else {
      console.log("Error");
    }
  }

  async function handleSubmitLogar(event) {
    event.preventDefault();

    if (email !== "" && password !== "") {
      await logarUsuario(email, password).then(() => {
        setEmail("");
        setPassword("");
      });
    } else {
      console.log("Poirque ta vazu");
    }
  }

  return (
    <div className="container" id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <div className="social-icons">
            <a href="#" className="icon">
              <i className="fab fa-google-plus-g">
                <FaGooglePlusG />
              </i>
            </a>
            <a href="#" className="icon">
              <i className="fab fa-facebook-f">
                <FaFacebookSquare />
              </i>
            </a>
            <a href="#" className="icon">
              <i className="fab fa-github">
                <FaGithub />
              </i>
            </a>
            <a href="#" className="icon">
              <i className="fab fa-linkedin-in">
                <FaLinkedinIn />
              </i>
            </a>
          </div>
          <span>
            Registre-se com seu e-mail e senha para aproveitar todos os recursos
            do sistema
          </span>
          <input
            type="text"
            placeholder="Nome"
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
          <button type="submit">
            {loadingAuth ? (
              <ClipLoader color="#ffffff" size={16} speedMultiplier={0.7} />
            ) : (
              "Criar conta"
            )}
          </button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleSubmitLogar}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <i className="fab fa-google-plus-g">
                <FaGooglePlusG />
              </i>
            </a>
            <a href="#" className="icon">
              <i className="fab fa-facebook-f">
                <FaFacebookSquare />
              </i>
            </a>
            <a href="#" className="icon">
              <i className="fab fa-github">
                <FaGithub />
              </i>
            </a>
            <a href="#" className="icon">
              <i className="fab fa-linkedin-in">
                <FaLinkedinIn />
              </i>
            </a>
          </div>
          <span>Use sua senha e e-mail para acessar</span>
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
              console.log(event.target.value);
              console.log(email);
            }}
            value={email}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(event) => {
              setPassword(event.target.value);
              console.log(event.target.value);
              console.log(password);
            }}
            value={password}
          />
          <a href="#">Esqueceu sua senha?</a>
          <button type="submit">
            {loadingAuth ? (
              <ClipLoader color="#ffffff" size={16} speedMultiplier={0.7} />
            ) : (
              "Acessar"
            )}
          </button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Já tem uma conta?</h1>
            <p>Volte e acesse usando seus dados.</p>
            <button className="hidden" id="login">
              Acessar o sistema
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Ainda não possui uma conta?</h1>
            <p>
              Registre-se com suas informações pessoais para aproveitar todos os
              recursos do sistema.
            </p>
            <button className="hidden" id="register">
              Criar uma conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
