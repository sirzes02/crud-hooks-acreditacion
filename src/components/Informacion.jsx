import React, { useState } from "react";
import Chart from "react-google-charts";

const Informacion = () => {
  // Declaracion de variables y estados
  const [programa, setPrograma] = useState("");
  const [facultad, setFacultad] = useState("");
  const [dependencia, setDependencia] = useState("");
  const [factor, setFactor] = useState("");

  // Declaracion de funciones
  const reiniciar = () => {
    setPrograma("");
    setFacultad("");
    setDependencia("");
    setFactor("");
  };

  // Renderizado
  return (
    <div className="Informacion">
      <div className="container center p-3 mb-3 rounded">
        <form className="card card-body">
          <div className="row row-cols-2">
            <div className="form-group col">
              <select
                className="custom-select"
                value={programa}
                onChange={(e) => setPrograma(e.target.value)}
              >
                <option defaultValue>Programa</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="form-group col">
              <select
                className="custom-select"
                value={facultad}
                onChange={(e) => setFacultad(e.target.value)}
              >
                <option defaultValue>Facultad</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="form-group col">
              <select
                className="custom-select"
                value={dependencia}
                onChange={(e) => setDependencia(e.target.value)}
              >
                <option defaultValue>Dependencia</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="form-group col">
              <select
                className="custom-select"
                value={factor}
                onChange={(e) => setFactor(e.target.value)}
              >
                <option defaultValue>Factor</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
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
      <div className="row row-cols-2">
        <div className="col-md-5 rounded">
          <Chart
            className="container"
            width={"100%"}
            height={400}
            chartType="ColumnChart"
            loader={
              <div className="d-flex justify-content-center py-5">
                <div
                  className="spinner-border"
                  style={{ width: 50, height: 50 }}
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
            data={[
              ["Pregunta", "Docentes", "Estudiantes"],
              ["4", 123, 253],
              ["9", 243, 369],
              ["29", 212, 289],
              ["82", 21, 19],
              ["15", 153, 151],
            ]}
            options={{
              title: "Docentes VS Estudiantes",
              chartArea: { width: "30%" },
              hAxis: {
                title: "Preguntas",
                minValue: 0,
              },
              vAxis: {
                title: "Soluciones",
              },
            }}
            legendToggle
          />
        </div>
        <div className="col-md-5 rounded ml-auto">
          <Chart
            width={"100%"}
            height={"400px"}
            chartType="PieChart"
            loader={
              <div className="d-flex justify-content-center py-5">
                <div
                  className="spinner-border"
                  style={{ width: 50, height: 50 }}
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
            data={[
              ["Facultad", "Registrados"],
              ["Ingeniería", 11],
              ["Derecho", 2],
              ["Comunicación", 2],
              ["Salud", 2],
              ["Ciencias Básicas", 7],
            ]}
            options={{
              title: "Facultades jugando",
            }}
          />
        </div>
        <div className="col-md-5 rounded">
          <Chart
            width={"100%"}
            height={"400px"}
            chartType="LineChart"
            loader={
              <div className="d-flex justify-content-center py-5">
                <div
                  className="spinner-border"
                  style={{ width: 50, height: 50 }}
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
            data={[
              ["Factor", "Egresados", "Estudiantes"],
              [0, 0, 0],
              [1, 10, 5],
              [2, 23, 15],
              [3, 17, 9],
              [4, 18, 10],
            ]}
            options={{
              hAxis: {
                title: "Factor",
              },
              vAxis: {
                title: "registros",
              },
              series: {
                1: { curveType: "function" },
              },
            }}
          />
        </div>
        <div className="col-md-5 rounded ml-auto">
          <Chart
            width={"100%"}
            height={"400px"}
            chartType="ComboChart"
            loader={
              <div className="d-flex justify-content-center py-5">
                <div
                  className="spinner-border"
                  style={{ width: 50, height: 50 }}
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
            data={[
              [
                "Facultad",
                "Ingenieria",
                "Derecho",
                "Salud",
                "Ciencias Básicas",
                "Idiomas",
                "Comunicación",
              ],
              ["1", 165, 938, 522, 998, 450, 614.6],
              ["2", 135, 1120, 599, 1268, 288, 682],
              ["3", 157, 1167, 587, 807, 397, 623],
              ["4", 136, 691, 629, 1026, 366, 569.6],
            ]}
            options={{
              title: "Factor completas",
              vAxis: { title: "Personas" },
              hAxis: { title: "Factor" },
              seriesType: "bars",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Informacion;
