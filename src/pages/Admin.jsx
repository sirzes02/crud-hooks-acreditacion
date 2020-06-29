import React from "react";
import { useAuth } from "../context/Auth";
import Swal from "sweetalert2";
import Preguntas from "../components/Preguntas";
import Usuarios from "../components/Usuarios";

function Admin() {
  // Declaracion de variables y estados
  const { setAuthtokens } = useAuth();
  const permiso = JSON.parse(localStorage.getItem("tokens")).permisos;

  // Declaracion de funciones
  const cerrarSesion = () => setAuthtokens("");

  // Acciones
  Swal.fire({
    title: "Bienvenido!",
    html: `Estas en la sesion de: <b>${
      permiso === 0 ? "Vicerrectoria" : "Decanatura"
    }</b>`,
    timer: 4000,
  });

  // Renderizado
  return (
    <div className="Admin">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${permiso === 1 ? "disabled" : ""}`}
            id="home-tab"
            data-toggle="tab"
            href="#home"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Preguntas
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${permiso === 1 ? "disabled" : ""}`}
            id="profile-tab"
            data-toggle="tab"
            href="#profile"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Usuario
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            id="contact-tab"
            data-toggle="tab"
            href="#contact"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Información
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <Preguntas />
        </div>
        <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <Usuarios />
        </div>
        <div
          className="tab-pane fade show active"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          Información
        </div>
      </div>

      <button
        className="btn btn-danger"
        onClick={cerrarSesion}
        style={{
          position: "fixed",
          bottom: 50,
          right: 20,
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Admin;
