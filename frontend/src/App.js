import React, { useState } from "react";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [resultado, setResultado] = useState("");

  const calcular = async (operacion) => {
    try {
      const response = await fetch(
        `http://localhost:3000/calculadora/${num1}/${num2}/${operacion}`
      );

      const data = await response.json();

      if (data.error) {
        setResultado(data.error);
      } else {
        setResultado(data.resultado);
      }
    } catch (error) {
      setResultado("Error al conectar con el backend");
    }
  };

  return (
    <div>
      <h1>Calculadora</h1>

      <input
        type="number"
        placeholder="Primer número"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Segundo número"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />

      <br /><br />

      <button onClick={() => calcular("sumar")}>Sumar</button>
      <button onClick={() => calcular("restar")}>Restar</button>
      <button onClick={() => calcular("multiplicar")}>Multiplicar</button>
      <button onClick={() => calcular("dividir")}>Dividir</button>

      <h2>Resultado: {resultado}</h2>
    </div>
  );
}

export default App;