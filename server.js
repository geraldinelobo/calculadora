const express = require("express");
const calculadoraRouter = require("./route");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "API Calculadora funcionando",
  });
});

app.use("/calculadora", calculadoraRouter);

app.listen(port, () => {
  console.log("La api está corriendo en el puerto " + port);
});