const express = require("express");
const router = express.Router();

const Password = require("../models/Contrasenias");

router.get("/", async (req, res) => {
  var pre = await Password.find();
  pre.reverse();
  res.json(pre);
});

router.get("/:id", async (req, res) => {
  Password.findOne({ password: req.params.id }).then((sesion) => {
    if (sesion) res.json({ status: true, permisos: sesion.permisos });
    else res.json({ status: false });
  });
});

router.post("/", async (req, res) => {
  const { password, permisos } = req.body;

  const pre = new Password({ password, permisos });
  await pre.save();
  res.json({ estado: true });
});

router.put("/:id", async (req, res) => {
  await Password.findByIdAndUpdate(req.params.id, req.body);
  res.json({ estado: true });
});

router.delete("/:id", async (req, res) => {
  await Password.findByIdAndDelete(req.params.id);
  res.json({ estado: true });
});

module.exports = router;
