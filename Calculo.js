//Modelo

class Calculo {
    constructor(cod, a, b, operacion, resultado, fecha) {
        this.cod = cod;
        this.a = a;
        this.b = b;
        this.operacion = operacion;
        this.resultado = resultado;
        this.fecha = fecha;
    
    }
}

module.exports = Calculo;