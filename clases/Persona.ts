namespace Personas 
{
    export class Persona
    {
        public id:number;
        public nombre:string;
        public apellido:string;

        constructor(id:number, nombre:string, apellido:string)
        {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
        }

        public getId():number
        {
            return this.id;
        }

        public setId(id:number)
        {
            this.id = id;
        }

        public getNombre():string
        {
            return this.nombre;
        }

        public setNombre(nombre:string)
        {
            this.nombre = nombre;
        }

        public getApellido():string
        {
            return this.apellido;
        }

        public setApellido(apellido:string)
        {
            this.apellido = apellido;
        }
    }
}