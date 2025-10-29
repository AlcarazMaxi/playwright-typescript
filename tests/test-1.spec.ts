let edad: number = 25;
let altura: number = 1.752323;
let peso: number = 70;

let suma: number = edad + altura + peso;
let resta: number = edad - altura - peso;
let multiplicacion: number = edad * altura * peso;
let division: number = edad / altura / peso;

let primerNombre: string = "Juan";
let apellido: string = "Pérez";
let nombreCompleto: string = primerNombre + " " + apellido;

let estaActivo: boolean = true;
let esMayorDeEdad: boolean = edad >= 18;
let tieneLicencia: boolean = false;

if(estaActivo && esMayorDeEdad) {
    console.log("El usuario está activo y es mayor de edad.");
} else {
    console.log("El usuario no está activo o no es mayor de edad.");
}

let numeros: number[] = [1, 2, 3, 4, 5];
let frutas: string[] = ["manzana", "banana", "naranja"];
let persona: string[] = ["Anibal", "Jara", "Roberto", "Ana", "Maria"];

console.log(persona[0]); // Accediendo al primer elemento del array
console.log(frutas.length); // Longitud del array de frutas
frutas.push("uva"); // Agregando un elemento al array de frutas
frutas.pop(); // Eliminando el último elemento del array de frutas
frutas.splice(1, 1); // Eliminando el segundo elemento del array de frutas
frutas.sort(); // Ordenando el array de frutas
frutas.reverse(); // Revirtiendo el array de frutas

console.log(persona[0]); // Accediendo al primer elemento de la tupla
console.log(persona[1]); // Accediendo al segundo elemento de la tupla
console.log(persona[2]); // Accediendo al tercer elemento de la tupla
console.log(persona.length); // Longitud de la tupla
persona.push("nuevo valor"); // Agregando un elemento a la tupla
persona.pop(); // Eliminando el último elemento de la tupla
persona.splice(0, 1); // Eliminando el primer elemento de la tupla
persona.sort(); // Ordenando la tupla
persona.reverse(); // Revirtiendo la tupla
console.log(persona);
console.log(suma);
