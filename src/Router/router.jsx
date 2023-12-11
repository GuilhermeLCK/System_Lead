import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Form from "../pages/Form/Form";
import QuestionsEdition from "../pages/QuestionsEdition/QuestionsEdition";
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";

import Intro from "../pages/Intro/Intro";
import Private from "./private";
function RouterApp() {
  return (
    <Routes>
      <Route path="/*" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/Cadastro" element={<Cadastro />} />
      <Route path="/Form" element={<Form />} />

      <Route path="/Intro" element={<Intro />} />

      <Route
        path="/Home"
        element={
          <Private>
            <Home />
          </Private>
        }
      />
      <Route
        path="/Personalizar"
        element={
          <Private>
            <QuestionsEdition />
          </Private>
        }
      />
    </Routes>
  );
}

export default RouterApp;
