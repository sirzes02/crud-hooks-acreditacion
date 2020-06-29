const mongoose = require("mongoose");
const { Schema } = mongoose;

const preguntasSchema = new Schema({
  id: { type: Number, required: true },
  titulo: { type: String, required: true },
  opcCorrecta: { type: String, required: true },
  opc1: { type: String, required: true },
  opc2: { type: String, required: true },
  opc3: { type: String, required: true },
  factor: { type: String, required: true },
});

module.exports = mongoose.model("questions", preguntasSchema);
