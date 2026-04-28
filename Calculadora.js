class Calculadora {
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
}

// Ejemplo de uso
/*const calculadora = new Calculadora();

console.log(calculadora.sumar(10, 5));        // 15
console.log(calculadora.restar(10, 5));       // 5
console.log(calculadora.multiplicar(10, 5));  // 50
console.log(calculadora.dividir(10, 5));      // 2
console.log(calculadora.dividir(10, 0));      // Error
*/