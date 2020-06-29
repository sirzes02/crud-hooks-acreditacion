const mongoose = require("mongoose");
const { Schema } = mongoose;

const contraseniaSchema = new Schema({
  password: { type: String, required: true },
  permisos: { type: Number, required: true },
});

module.exports = mongoose.model("password", contraseniaSchema);
