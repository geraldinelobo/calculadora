const express = require('express');

const app = express();
const port = 3000;

function sumar(a,b){
    return a + b;
}

function restar(a,b){
    return a - b;
}

function multiplicar(a,b){
    return a * b;
}

function dividir(a,b){
    if (b === 0) {
        return 'Error: No se puede dividir por cero';
    } if (a === 0) {
        return 0;
    } else {
        return a / b;
    }
}