const express = require("express")
const router = express.Router();
const control = require("../Controllers/index.controller")

//! De esta ruta dependen todas mis rutas que se encuentren en mi controllador
//! el cual corresponde hacer peticiones.

router.get("/", control.index)// es para obtener el protocolo HTTP que estamos usando
//! .post
//! .put
//! .delete
module.exports = router;