 const Calculadora = require("./Calculadora");

// calculadora.router.js
const express = require("express");

const router = express.Router();

/* class Calculadora {
  sumar(a, b) {
    return a + b;
  }

  restar(a, b) {
    return a - b;
  }

  multiplicar(a, b) {
    return a * b;
  }

  dividir(a, b) {
    if (b === 0) {
      return "Error: No se puede dividir por cero";
    }

    return a / b;
  }
} */

const calculadora = new Calculadora();

 
router.get("/sumar/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);

  const resultado = calculadora.sumar(a, b);

  res.json({
    operacion: "sumar",
    resultado,
  });
});

router.get("/restar/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);

  const resultado = calculadora.restar(a, b);

  res.json({
    operacion: "restar",
    resultado,
  });
});

router.get("/multiplicar/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);

  const resultado = calculadora.multiplicar(a, b);

  res.json({
    operacion: "multiplicar",
    resultado,
  });
});

router.get("/dividir/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);

  const resultado = calculadora.dividir(a, b);

  res.json({
    operacion: "dividir",
    resultado,
  });
});

module.exports = router;