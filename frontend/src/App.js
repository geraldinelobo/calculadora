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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Calculadora
        </h1>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Primer número"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            className="w-full border rounded-xl p-3 text-lg outline-none"
          />

          <input
            type="number"
            placeholder="Segundo número"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            className="w-full border rounded-xl p-3 text-lg outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={() => calcular("sumar")}
            className="p-3 rounded-xl shadow border"
          >
            Sumar
          </button>

          <button
            onClick={() => calcular("restar")}
            className="p-3 rounded-xl shadow border"
          >
            Restar
          </button>

          <button
            onClick={() => calcular("multiplicar")}
            className="p-3 rounded-xl shadow border"
          >
            Multiplicar
          </button>

          <button
            onClick={() => calcular("dividir")}
            className="p-3 rounded-xl shadow border"
          >
            Dividir
          </button>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold">
            Resultado: {resultado}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default App;
