namespace Personas
{
    export class Cliente extends Persona
    {
        public edad:number;
        public sexo:eTipo;

        constructor(id:number, nombre:string, apellido:string, edad:number, sexo:eTipo)
        {
            super(id, nombre, apellido);
            this.edad = edad;
            this.sexo = sexo;
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

        public getSexo():eTipo
        {
            return this.sexo;
        }

        public setSexo(sexo:eTipo)
        {
            this.sexo = sexo;
        }

        public getEdad():number
        {
            return this.edad;
        }

        public setEdad(edad:number)
        {
            this.edad = edad;
        }
    }
}