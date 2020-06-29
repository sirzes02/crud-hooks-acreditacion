const express = require("express");
const usuarioRutas = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/Usuario");
usuarioRutas.use(cors());

process.env.SECRET_KEY = "secret";

usuarioRutas.post("/registro", (req, res) => {
  const datosUsuario = {
    cedula: req.body.cedula,
    email: req.body.email,
    avatar: req.body.avatar,
    nombre: req.body.nombre,
    contrasenia: req.body.contrasenia,
    tipo: req.body.tipo,
    programa: req.body.programa,
    facultad: req.body.facultad,
    dependencia: req.body.dependencia,
    puntaje: req.body.puntaje,
  };

  Usuario.findOne({
    email: req.body.email,
  })
    .then((usuario) => {
      if (!usuario)
        bcrypt.hash(req.body.contrasenia, 10, (err, hash) => {
          datosUsuario.contrasenia = hash;
          Usuario.create(datosUsuario)
            .then((usuario) =>
              res.json({ status: `${usuario.email} registrado con exito!` })
            )
            .catch((err) => res.send(`error: ${err}`));
        });
      else res.json({ error: "El usuario ya existe..." });
    })
    .catch((err) => res.send(`error: ${err}`));
});

usuarioRutas.post("/ingreso", (req, res) => {
  Usuario.findOne({
    email: req.body.email,
  })
    .then((usuario) => {
      if (usuario)
        if (bcrypt.compareSync(req.body.contrasenia, usuario.contrasenia)) {
          const payload = {
            cedula: usuario.email,
            nombre: usuario.nombre,
            avatar: usuario.avatar,
            semanas: usuario.semanas,
          };

          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });

          res.send(token);
        } else res.json({ error: "El usuario no existe..." });
      else res.json({ error: "El usuario no existe..." });
    })
    .catch((err) => res.send(`error: ${err}`));
});

usuarioRutas.get("/", async (req, res) => {
  var usuarios = await Usuario.find();
  res.json(usuarios);
});

usuarioRutas.get("/resueltas/:id", (req, res) => {
  Usuario.findOne({
    email: req.params.id,
  })
    .then((usuario) => {
      if (usuario) res.json({ resueltas: usuario.resueltas });
      else res.send("Problema, no se encuentra el correo");
    })
    .catch((err) => res.send(`error: ${err}`));
});

usuarioRutas.delete("/:id", async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ estado: true });
});

usuarioRutas.put("/resueltas", (req, res) => {
  Usuario.findOne({
    email: req.body.email,
  })
    .then((usuario) => {
      if (usuario) {
        const arr = usuario.resueltas;
        arr.push(req.body.resueltas);

        Usuario.updateOne(
          { email: req.body.email },
          { $set: { resueltas: arr } }
        )
          .then(() =>
            res.json({ status: `${usuario.email} actualizado con exito!` })
          )
          .catch((err) => res.send(`error: ${err}`));
      } else res.json({ error: "Problema, no se encuentra el correo" });
    })
    .catch((err) => res.send(`error: ${err}`));
});

usuarioRutas.get("/semanas/:id", (req, res) => {
  Usuario.findOne({
    email: req.params.id,
  })
    .then((usuario) => {
      if (usuario) res.json({ semanas: usuario.semanas });
      else res.send("Problema, no se encuentra el correo");
    })
    .catch((err) => res.send(`error: ${err}`));
});

usuarioRutas.put("/semanas", (req, res) => {
  Usuario.findOne({
    email: req.body.email,
  })
    .then((usuario) => {
      if (usuario) {
        const arr = usuario.semanas;
        arr.push(req.body.semanas);

        Usuario.updateOne({ email: req.body.email }, { $set: { semanas: arr } })
          .then(() =>
            res.json({ status: `${usuario.email} actualizado con exito!` })
          )
          .catch((err) => res.send(`error: ${err}`));
      } else res.json({ error: "Problema, no se encuentra el correo" });
    })
    .catch((err) => res.send(`error: ${err}`));
});

module.exports = usuarioRutas;
