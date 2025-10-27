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
let persona1: [string, number, boolean] = ["Ana", 30, true];

console.log(persona1[0]); // Accediendo al primer elemento del array
console.log(frutas.length); // Longitud del array de frutas
frutas.push("uva"); // Agregando un elemento al array de frutas
frutas.pop(); // Eliminando el último elemento del array de frutas
frutas.splice(1, 1); // Eliminando el segundo elemento del array de frutas
frutas.sort(); // Ordenando el array de frutas
frutas.reverse(); // Revirtiendo el array de frutas

enum Color {
    Rojo,
    Verde,
    Azul
}

let colorFavorito: Color = Color.Rojo;
console.log(colorFavorito);