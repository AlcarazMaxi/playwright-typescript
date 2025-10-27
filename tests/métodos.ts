const persona2 = new Persona("Juan", 30);
persona2.saludar();

function sumar(a: number, b: number): number {
    return a + b;
}

const resultadoSuma = sumar(1, 2);
console.log("El resultado de la suma es: " + resultadoSuma);

// Función Flecha Básica
const sumarFlecha = (a: number, b: number): number => {
    return a + b;
}

const resultadoSumaFlecha = sumarFlecha(1, 2);
console.log("El resultado de la suma es: " + resultadoSumaFlecha);

// Función Flecha sin paréntesis alrededor de un solo parámetro
const esPar =num => num % 2 === 0;

console.log("¿El número es par de 6?", esPar(6));

// Función Flecha con Cuerpo Implícito
const saludar = nombre => `Hola, ${nombre}!`;

console.log(saludar("Juan"));

// Función Flecha en Mapeo de Arrays
const numbers = [1, 2, 3, 4, 5];
const alCuadrado = numbers.map(num => num * num);

console.log("Arreglo al cuadrado: " + alCuadrado);
console.log("Arreglo original: " + numbers);