import { React, useEffect } from "react";
import NavBar from "../../Components/NavBarMenu/NavBar";
import CustomerTable from "../../Components/CustomerTable/CustomerTable";

import "./Home.scss";

function Home() {
  useEffect(() => {
    localStorage.setItem("PaginaAtual", "Home");
  }, []);

  return (
    <div className="container-Home">
      <NavBar />

      <div className="container-flexBody">
        <CustomerTable />
      </div>
    </div>
  );
}

export default Home;
