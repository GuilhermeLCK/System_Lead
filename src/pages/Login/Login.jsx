//  IMPORTANDO CONTEXTOS E ESTADOS
import { React, useState, useContext } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../../Context/Authentication";
import { FaInnosoft } from "react-icons/fa";
import LoginSing from "../../Components/LoginSign/LoginSign";
function Login() {
  const { logarUsuario, loadingAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmitLogar(e) {
    e.preventDefault();
    if (password !== "" && email !== "") {
      await logarUsuario(email, password);
    }
  }

  return (
    <>
      <LoginSing />
    </>
  );
}

export default Login;
