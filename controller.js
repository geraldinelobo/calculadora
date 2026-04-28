const Calculadora = require('./Calculadora');
const calculadora = new Calculadora();

function calcular(req, res) {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const operacion = req.params.operacion;

    let resultado;

    switch (operacion) {
        case 'sumar':
            resultado = calculadora.sumar(a, b);
            break;
        case 'restar':
            resultado = calculadora.restar(a, b);
            break;
        case 'multiplicar':
            resultado = calculadora.multiplicar(a, b);
            break;
        case 'dividir':
            resultado = calculadora.dividir(a, b);
            break;
        default:
            return res.status(400).json({ error: 'Operación no válida' });
    }

    //crear objeto para guardar
    const nuevoCalculo = new Calculo(
        Date.now(),
        a,
        b,
        operacion,
        resultado,
        new Date()
    );

    console.log("operacion guardada: ", nuevoCalculo);

    res.json({ 
        mensaje: "Operación realizada y guardad con éxito",
        operacion,
        resultado,
        datosGuardados: nuevoCalculo 
    });
}

module.exports = {
    calcular
}; 