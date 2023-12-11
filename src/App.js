import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { BrowserRouter } from "react-router-dom";
import RouterApp from "./Router/router";
import Authentication from "./Context/Authentication";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Authentication>
          <RouterApp />
          <ToastContainer />
        </Authentication>
      </BrowserRouter>
    </div>
  );
}

export default App;
