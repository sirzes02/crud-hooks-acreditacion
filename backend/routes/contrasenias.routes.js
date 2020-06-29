const express = require("express");
const router = express.Router();

const Password = require("../models/Contrasenias");

router.get("/", async (req, res) => {
  var pre = await Password.find();
  pre.reverse();
  res.json(pre);
});

router.get("/:id", async (req, res) => {
  const password = await Password.find();

  for (let i = 0; i < password.length; i++)
    if (password[i].password === req.params.id) {
      res.json({ status: true, permisos: password[i].permisos });
      return;
    }

  res.json({ status: false });
});

router.post("/", async (req, res) => {
  const { password, permisos } = req.body;

  const pre = new Password({ password, permisos });
  await pre.save();
  res.json({ estado: true });
});

router.put("/:id", async (req, res) => {
  const { password, permisos } = req.body;
  const pre = { password, permisos };
  await Password.findByIdAndUpdate(req.params.id, pre);
  res.json({ estado: true });
});

router.delete("/:id", async (req, res) => {
  await Password.findByIdAndDelete(req.params.id);
  res.json({ estado: true });
});

module.exports = router;
