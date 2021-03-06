var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Personas;
(function (Personas) {
    var Cliente = /** @class */ (function (_super) {
        __extends(Cliente, _super);
        function Cliente(id, nombre, apellido, edad, sexo) {
            var _this = _super.call(this, id, nombre, apellido) || this;
            _this.edad = edad;
            _this.sexo = sexo;
            return _this;
        }
        Cliente.prototype.getId = function () {
            return this.id;
        };
        Cliente.prototype.setId = function (id) {
            this.id = id;
        };
        Cliente.prototype.getNombre = function () {
            return this.nombre;
        };
        Cliente.prototype.setNombre = function (nombre) {
            this.nombre = nombre;
        };
        Cliente.prototype.getApellido = function () {
            return this.apellido;
        };
        Cliente.prototype.setApellido = function (apellido) {
            this.apellido = apellido;
        };
        Cliente.prototype.getSexo = function () {
            return this.sexo;
        };
        Cliente.prototype.setSexo = function (sexo) {
            this.sexo = sexo;
        };
        Cliente.prototype.getEdad = function () {
            return this.edad;
        };
        Cliente.prototype.setEdad = function (edad) {
            this.edad = edad;
        };
        return Cliente;
    }(Personas.Persona));
    Personas.Cliente = Cliente;
})(Personas || (Personas = {}));
