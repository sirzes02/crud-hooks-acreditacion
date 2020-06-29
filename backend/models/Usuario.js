const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  cedula: { type: "String", required: true },
  email: { type: "String", required: true },
  avatar: { type: "Number", required: true },
  nombre: { type: "String", required: true },
  contrasenia: { type: "String", required: true },
  tipo: { type: "String", required: true },
  programa: { type: "String", required: false },
  facultad: { type: "String", required: false },
  dependencia: { type: "String", required: false },
  puntaje: { type: "Number", default: 0 },
  resueltas: [],
  semanas: [],
});

module.exports = Usuario = mongoose.model("user", UsuarioSchema);
