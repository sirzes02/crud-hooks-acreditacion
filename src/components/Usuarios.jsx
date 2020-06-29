import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Usuario = () => {
  // Declaracion de variable y estados
  const [busqueda, setBusqueda] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosCopia, setUsuarioCopia] = useState([]);
  const [cargado, setCargado] = useState(false);

  // Declaracion de funciones
  const cargar = () =>
    axios.get(`http://localhost:4000/usuario/`).then((result) => {
      setUsuarios(result.data);
      setUsuarioCopia(result.data);
      setCargado(true);
    });

  const reiniciar = () => {
    setBusqueda("");
    setUsuarios(usuariosCopia);
  };

  const eliminar = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se borrará totalmente el usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si ¡Borrarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        axios
          .delete(`http://localhost:4000/usuario/${id}`)
          .then(() => {
            reiniciar();
            cargar();
          })
          .catch((err) => console.log(err));
        Swal.fire("¡Borrado!", "El usuario ha sido borrada.", "success");
      } else Swal.fire("Cancelado", "Proceso de eliminado cancelado.", "error");
    });
  };

  const wipe = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const buscarGeneral = (e) => {
    setBusqueda(e);

    let arr = [];

    for (const usuario of usuariosCopia)
      if (wipe(usuario.email).search(wipe(busqueda)) !== -1) arr.push(usuario);
      else if (usuario.cedula.search(busqueda) !== -1) arr.push(usuario);
      else if (wipe(usuario.nombre).search(wipe(busqueda)) !== -1)
        arr.push(usuario);
      else if (wipe(usuario.programa).search(wipe(busqueda)) !== -1)
        arr.push(usuario);
      else if (wipe(usuario.facultad).search(wipe(busqueda)) !== -1)
        arr.push(usuario);

    setUsuarios(arr);
  };

  // Efectos
  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="Usuario">
      <div className="container center p-3 mb-3 bg-white rounded">
        <form className="card card-body">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Busqueda"
              id="busqueda_input"
              required
              value={busqueda}
              onChange={(e) => buscarGeneral(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <button
              type="reset"
              className="btn btn-danger float-right"
              onClick={reiniciar}
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
      <div className="mx-5 mb-3 shadow bg-white rounded d-flex justify-content-center">
        {cargado ? (
          <div
            className="table-responsive"
            style={{ overflow: "scroll", height: 500 }}
          >
            <table className="table">
              <thead>
                <tr>
                  <th>Cédula</th>
                  <th>Tipo</th>
                  <th>Correo</th>
                  <th>Nombre</th>
                  <th>Programa</th>
                  <th>Facultad</th>
                  <th>Puntaje</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario._id}>
                    <td>{usuario.cedula}</td>
                    <td>{usuario.tipo}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.programa}</td>
                    <td>{usuario.facultad}</td>
                    <td>{usuario.puntaje}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => eliminar(usuario._id)}
                      >
                        <i className="material-icons">delete_forever</i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            className="spinner-border"
            style={{ width: 120, height: 120 }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Usuario;
