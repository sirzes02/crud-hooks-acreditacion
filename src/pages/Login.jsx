import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/Auth";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  // Declaracion de variables y estados
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [contrasenia, setContrasenia] = useState("");
  const { setAuthtokens } = useAuth();

  // Declaracion de funciones
  const ingresar = (e) => {
    e.preventDefault();

    axios.get(`http://localhost:4000/contra/${contrasenia}`).then((result) => {
      if (result.data.status) {
        setAuthtokens(result.data);
        setLoggedIn(true);
      } else {
        Swal.fire("Error", "Contraseña incorrecta, no encontrada", "error");
        setContrasenia("");
      }
    });
  };

  // Renderizado
  if (isLoggedIn) return <Redirect to="/administrador" />;

  return (
    <div className="Login">
      <div
        className="row justify-content-center bg-white rounded aling-middle"
        style={{ marginTop: "15%", marginBottom: "17%" }}
      >
        <form className="container" onSubmit={ingresar}>
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            id="contrasenia_input"
            required
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
          <div className="mt-3">
            <button type="submit" className="btn btn-primary float-left">
              Ingresar
            </button>
            <button
              type="reset"
              className="btn btn-danger float-right"
              onClick={() => setContrasenia("")}
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
