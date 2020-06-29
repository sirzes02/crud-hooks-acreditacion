import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContext } from "./context/Auth";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

const App = () => {
  // Declaracion de estados y variables
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));

  const [authTokens, setAuthtokens] = useState(existingTokens);

  // Declaracion de funciones
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthtokens(data);
  };

  // Renderizado
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          {/*eslint-disable-next-line*/}
          <a className="navbar-brand">
            Aplicación para la acreditación de alta calidad
          </a>
        </div>
      </nav>

      <AuthContext.Provider value={{ authTokens, setAuthtokens: setTokens }}>
        <Router>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/administrador" component={Admin} />
        </Router>
      </AuthContext.Provider>

      <footer className="page-footer font-small blue">
        <div className="footer-copyright text-center py-3">
          © 2020 Copyright:
          <a href="https://usc.edu.co"> Universidad Santiago de Cali</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
