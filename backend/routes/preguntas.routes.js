const express = require("express");
const router = express.Router();

const Preguntas = require("../models/Preguntas");

router.get("/", async (req, res) => {
  var pre = await Preguntas.find();
  pre.reverse();
  res.json(pre);
});

router.get("/:id", async (req, res) => {
  const pre = await Preguntas.findById(req.params.id);
  res.json(pre);
});

router.post("/", async (req, res) => {
  const { id, titulo, opcCorrecta, opc1, opc2, opc3, factor } = req.body;
  const pre = new Preguntas({
    id,
    titulo,
    opcCorrecta,
    opc1,
    opc2,
    opc3,
    factor,
  });
  await pre.save();
  res.json({ estado: true });
});

router.put("/:id", async (req, res) => {
  const { id, titulo, opcCorrecta, opc1, opc2, opc3, factor } = req.body;
  const pre = { id, titulo, opcCorrecta, opc1, opc2, opc3, factor };
  await Preguntas.findByIdAndUpdate(req.params.id, pre);
  res.json({ estado: true });
});

router.delete("/:id", async (req, res) => {
  await Preguntas.findByIdAndDelete(req.params.id);
  res.json({ estado: true });
});

module.exports = router;
