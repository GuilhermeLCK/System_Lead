//  IMPORTANDO CONTEXTOS E ESTADOS
import { React, useState, useContext } from "react";

import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../../Context/Authentication";
import { FaInnosoft } from "react-icons/fa";

function Cadastro() {
  const { cadastarUsuario, loadingAuth } = useContext(AuthContext);

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
    }
  }

  return (
    <>
      <div className="container-center">
        <div className="login">
          <div className="login-area">
            <FaInnosoft size={50} />
          </div>
          <form onSubmit={handleSubmit}>
            <h1> Nova conta</h1>
            <input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
            />

            <button type="submit">
              {loadingAuth ? (
                <ClipLoader color="#ffffff" size={16} speedMultiplier={0.7} />
              ) : (
                "Acessar"
              )}
            </button>
          </form>
          <Link to="/"> Já possui uma conta? Faça login</Link>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
