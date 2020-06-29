import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function Preguntas() {
  // Declaracion de variables y estados
  const [idGlobal, setIdGlobal] = useState("");
  const [titulo, setTitulo] = useState("");
  const [opcCorrecta, setOpcCorrecta] = useState("");
  const [opc1, setOpc1] = useState("");
  const [opc2, setOpc2] = useState("");
  const [opc3, setOpc3] = useState("");
  const [factor, setFactor] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [preguntasRespaldo, setPreguntasRespaldo] = useState([]);
  const [cargado, setCargado] = useState(false);

  // Declaracion de funciones
  const cargar = () =>
    axios.get(`http://localhost:4000/preguntas/`).then((result) => {
      setPreguntas(result.data);
      setPreguntasRespaldo(result.data);
      setCargado(true);
    });

  const reiniciar = () => {
    setPreguntas(preguntasRespaldo);
    setIdGlobal("");
    setTitulo("");
    setOpcCorrecta("");
    setOpc1("");
    setOpc2("");
    setOpc3("");
    setFactor("");
  };

  const agregar = (e) => {
    e.preventDefault();

    if (!idGlobal)
      axios
        .post(`http://localhost:4000/preguntas/`, {
          id: preguntasRespaldo.length + 1,
          titulo: titulo,
          opcCorrecta: opcCorrecta,
          opc1: opc1,
          opc2: opc2,
          opc3: opc3,
          factor: factor,
        })
        .then(() =>
          Swal.fire(
            "¡Almacenada!",
            "La pregunta ha sido almacenada.",
            "success"
          )
        )
        .catch((err) => console.log(err));
    else
      axios
        .put(`http://localhost:4000/preguntas/${idGlobal}`)
        .then(() =>
          Swal.fire(
            "¡Modificada!",
            "La pregunta ha sido modificada.",
            "success"
          )
        )
        .catch((err) => console.log(err));
    reiniciar();
    cargar();
  };

  const eliminar = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se borrará totalmente la pregunta",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si ¡Borrarla!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        axios
          .delete(`http://localhost:4000/preguntas/${id}`)
          .then(() => {
            reiniciar();
            cargar();
          })
          .catch((err) => console.log(err));
        Swal.fire("¡Borrada!", "La pregunta ha sido borrada.", "success");
      } else Swal.fire("Cancelado", "Proceso de eliminado cancelado.", "error");
    });
  };

  const editar = (pregunta) => {
    setTitulo(pregunta.titulo);
    setOpcCorrecta(pregunta.opcCorrecta);
    setOpc1(pregunta.opc1);
    setOpc2(pregunta.opc2);
    setOpc3(pregunta.opc3);
    setFactor(pregunta.factor);
  };

  const wipe = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const buscarGeneral = (busqueda) => {
    reiniciar();

    let arr = [];

    for (const pregunta of preguntas) {
      if (wipe(pregunta.titulo).search(wipe(busqueda)) !== -1)
        arr.push(pregunta);
      else if (wipe(pregunta.opcCorrecta).search(wipe(busqueda)) !== -1)
        arr.push(pregunta);
      else if (wipe(pregunta.opc1).search(wipe(busqueda)) !== -1)
        arr.push(pregunta);
      else if (wipe(pregunta.opc2).search(wipe(busqueda)) !== -1)
        arr.push(pregunta);
      else if (wipe(pregunta.opc3).search(wipe(busqueda)) !== -1)
        arr.push(pregunta);
      else if (wipe(pregunta.factor).search(wipe(busqueda)) !== -1)
        arr.push(pregunta);
    }

    setPreguntas(arr);
  };

  // Efectos
  useEffect(() => {
    cargar();
  }, []);

  // Renderizado
  return (
    <div className="Preguntas">
      <div className="container center p-3 mb-3 bg-white rounded">
        <form onSubmit={agregar} className="card card-body">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Titulo"
              id="titulo_input"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Opcion correcta"
              id="opcCorrecta_input"
              required
              value={opcCorrecta}
              onChange={(e) => setOpcCorrecta(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Opcion 1"
              id="opcion1_input"
              required
              value={opc1}
              onChange={(e) => setOpc1(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Opcion 2"
              id="opcion2_input"
              required
              value={opc2}
              onChange={(e) => setOpc2(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Opcion 3"
              id="opcion3_input"
              required
              value={opc3}
              onChange={(e) => setOpc3(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              placeholder="Factor"
              id="factor_input"
              required
              min="0"
              max="12"
              value={factor}
              onChange={(e) => setFactor(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-primary float-left">
              Ingresar
            </button>
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
      <button
        className="btn btn-warning ml-5 mb-3"
        onClick={() =>
          Swal.mixin({
            input: "text",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
          })
            .queue([
              {
                title: "Ingrese datos para buscar",
                text: "Debe ingresar cualquier palabra como referencia",
              },
            ])
            .then((result) => {
              if (result.value) buscarGeneral(result.value[0]);
            })
        }
      >
        Buscar
      </button>
      <div style={{ float: "right", marginRight: "3%" }}>
        <b>Cantidad:</b> {preguntas.length} de {preguntasRespaldo.length}
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
                  <th>Código</th>
                  <th>Título</th>
                  <th>Correcta</th>
                  <th>Opción 1</th>
                  <th>Opción 2</th>
                  <th>Opción 3</th>
                  <th>Factor</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {preguntas.map((pregunta) => {
                  return (
                    <tr key={pregunta._id}>
                      <td>{pregunta.id}</td>
                      <td>{pregunta.titulo}</td>
                      <td>{pregunta.opcCorrecta}</td>
                      <td>{pregunta.opc1}</td>
                      <td>{pregunta.opc2}</td>
                      <td>{pregunta.opc3}</td>
                      <td>
                        {pregunta.factor === "0" ? "General" : pregunta.factor}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => eliminar(pregunta._id)}
                        >
                          <i className="material-icons">delete_forever</i>
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => editar(pregunta)}
                        >
                          <i className="material-icons">edit</i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
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
}

export default Preguntas;
