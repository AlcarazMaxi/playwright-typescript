class Persona {
    nombre: string;
    edad: number;

    constructor(nombre: string, edad: number) { 
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        console.log(`Hola, mi nombre es ${this.nombre} y tengo ${this.edad} años.`);
    }
}

const persona = new Persona("Juan", 30);
persona.saludar();

