var Personas;
(function (Personas) {
    window.addEventListener("load", function () {
        document.getElementById("btnAlta").addEventListener("click", mostrarForm);
        document.getElementById("btnCerrar").addEventListener("click", hideForm);
        document.getElementById("btnEliminar").addEventListener("click", eliminar);
        document.getElementById("btnAgregar").addEventListener("click", guardar);
        document.getElementById("btnLimpiar").addEventListener("click", limpiadorCompleto);
        document.getElementById("idOcultar").addEventListener("change", filtradoColumna);
        document.getElementById("nombreOcultar").addEventListener("change", filtradoColumna);
        document.getElementById("apellidoOcultar").addEventListener("change", filtradoColumna);
        document.getElementById("edadOcultar").addEventListener("change", filtradoColumna);
        document.getElementById("sexoOcultar").addEventListener("change", filtradoColumna);
        document.getElementById("filtroSexo").addEventListener("change", filtrador);
        document.getElementById("btnPromedio").addEventListener("click", promedio);
    });
    window.addEventListener("load", hideForm);
    var listaPersonas = new Array();
    var listaFiltradaGlobal = new Array();
    var rowGlobal;
    function mostrarForm() {
        document.getElementById("contAgregar").hidden = false;
    }
    Personas.mostrarForm = mostrarForm;
    function hideForm() {
        document.getElementById("contAgregar").hidden = true;
        vaciarAlta();
    }
    Personas.hideForm = hideForm;
    function guardar() {
        var nombre = document.getElementById("nombre").value;
        var apellido = document.getElementById("apellido").value;
        var edad = parseInt(document.getElementById("edad").value);
        var sexoPersona = Personas.eTipo.Masculino;
        if (document.getElementById("sexo").value == "1") {
            var sexoPersona = Personas.eTipo.Masculino;
        }
        else if (document.getElementById("sexo").value == "2") {
            var sexoPersona = Personas.eTipo.Femenino;
        }
        var tempId;
        var idRow = 0;
        var control = false;
        if (nombre != "" && apellido != "" && edad != null) {
            document.getElementById("nombre").className = "sinError";
            document.getElementById("apellido").className = "sinError";
            document.getElementById("edad").className = "sinError";
            document.getElementById("sexo").className = "sinError";
            tempId = calcularID();
            var miCliente = new Personas.Cliente(tempId, nombre, apellido, edad, sexoPersona);
            idRow = miCliente.id;
            listaPersonas.push(miCliente);
            control = true;
        }
        else {
            alert("Debe completar todos los campos");
            document.getElementById("nombre").className = "error";
            document.getElementById("apellido").className = "error";
            document.getElementById("edad").className = "error";
            document.getElementById("sexo").className = "error";
        }
        if (control == true) {
            var sexoTemp = "";
            if (sexoPersona == 0) {
                sexoTemp = "Masculino";
            }
            else if (sexoPersona == 1) {
                sexoTemp = "Femenino";
            }
            agregarItemTabla(idRow.toString(), nombre, apellido, edad.toString(), sexoTemp);
            control = false;
            vaciarAlta();
            document.getElementById("contAgregar").hidden = true;
        }
    }
    Personas.guardar = guardar;
    function vaciarAlta() {
        document.getElementById("id").value = "";
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("edad").value = "";
        document.getElementById("sexo").value = "1";
    }
    function agregarItemTabla(id, nombre, apellido, edad, sexo) {
        var tCuerpo = document.getElementById("tCuerpo");
        var row = document.createElement("tr");
        var cel1 = document.createElement("td");
        var cel2 = document.createElement("td");
        var cel3 = document.createElement("td");
        var cel4 = document.createElement("td");
        var cel5 = document.createElement("td");
        var text1 = document.createTextNode("");
        var text2 = document.createTextNode("");
        var text3 = document.createTextNode("");
        var text4 = document.createTextNode("");
        var text5 = document.createTextNode("");
        row.setAttribute("idPersona", id);
        if (document.getElementById("sexo").value == "1") {
            row.setAttribute("sexoPersona", "Masculino");
        }
        else if (document.getElementById("sexo").value == "2") {
            row.setAttribute("sexoPersona", "Femenino");
        }
        text1 = document.createTextNode(id);
        text2 = document.createTextNode(nombre);
        text3 = document.createTextNode(apellido);
        text4 = document.createTextNode(edad);
        text5 = document.createTextNode(sexo);
        cel1.appendChild(text1);
        cel1.setAttribute("name", "idTabla");
        cel2.appendChild(text2);
        cel2.setAttribute("name", "nombreTabla");
        cel3.appendChild(text3);
        cel3.setAttribute("name", "apellidoTabla");
        cel4.appendChild(text4);
        cel4.setAttribute("name", "edadTabla");
        cel5.appendChild(text5);
        cel5.setAttribute("name", "sexoTabla");
        row.appendChild(cel1);
        row.appendChild(cel2);
        row.appendChild(cel3);
        row.appendChild(cel4);
        row.appendChild(cel5);
        row.addEventListener("dblclick", clickGrilla);
        tCuerpo.appendChild(row);
    }
    function eliminar() {
        var indice = listaPersonas.reduce(function (idTotal, item, index) {
            if (idTotal = item.id) {
                return index;
            }
            else {
                return -1;
            }
        }, 0);
        if (indice >= 0) {
            listaPersonas.splice(indice, 1);
            rowGlobal.remove();
            vaciarAlta();
            console.log(listaPersonas);
        }
        else {
            alert("El indice no existe");
        }
    }
    Personas.eliminar = eliminar;
    function clickGrilla(e) {
        var trClick = e.target.parentNode;
        rowGlobal = trClick;
        document.getElementById("id").value = trClick.childNodes[0].innerHTML;
        document.getElementById("nombre").value = trClick.childNodes[1].innerHTML;
        document.getElementById("apellido").value = trClick.childNodes[2].innerHTML;
        document.getElementById("edad").value = trClick.childNodes[3].innerHTML;
        if (trClick.getAttribute("sexoPersona") == "Masculino") {
            document.getElementById("sexo").value = "1";
        }
        else if (trClick.getAttribute("sexoPersona") == "Femenino") {
            document.getElementById("sexo").value = "2";
        }
        mostrarForm();
    }
    Personas.clickGrilla = clickGrilla;
    function limpiadorCompleto() {
        console.log(listaPersonas);
        listaPersonas = [];
        console.log(listaPersonas);
        document.getElementById("tCuerpo").innerHTML = "";
        vaciarAlta();
    }
    Personas.limpiadorCompleto = limpiadorCompleto;
    function filtrador() {
        if (document.getElementById("filtroSexo").value == "1") {
            var searchInput = Personas.eTipo.Masculino;
        }
        else {
            var searchInput = Personas.eTipo.Femenino;
        }
        var filterPersona = listaPersonas.filter(function (x) { return x.sexo == searchInput; });
        listaFiltradaGlobal = filterPersona;
        borrarTabla();
        rearmarTabla(filterPersona);
    }
    Personas.filtrador = filtrador;
    function promedio() {
        var listaEdad;
        var promedio;
        if (listaFiltradaGlobal.length > 0) {
            listaEdad = listaFiltradaGlobal.map(function (x) { return x.edad; });
            promedio = listaEdad.reduce(function (total, num) {
                total += num;
                return total;
            }, 0);
        }
        else {
            listaEdad = listaPersonas.map(function (x) { return x.edad; });
            promedio = listaEdad.reduce(function (total, num) {
                total += num;
                return total;
            }, 0);
        }
        document.getElementById("promedio").value = (promedio / listaEdad.length).toString();
    }
    Personas.promedio = promedio;
    function borrarTabla() {
        var tCuerpo = document.getElementById("tCuerpo");
        tCuerpo.innerHTML = "";
    }
    function rearmarTabla(filterPersona) {
        filterPersona.forEach(function (x) {
            if (x.sexo.toString() == "Masculino") {
                agregarItemTabla(x.id.toString(), x.nombre, x.apellido, x.edad.toString(), "Masculino");
            }
            else {
                agregarItemTabla(x.id.toString(), x.nombre, x.apellido, x.edad.toString(), "Femenino");
            }
        });
    }
    function filtradoColumna() {
        var id = document.getElementById("idOcultar");
        var nombre = document.getElementById("nombreOcultar");
        var apellido = document.getElementById("apellidoOcultar");
        var edad = document.getElementById("edadOcultar");
        var sexo = document.getElementById("sexoOcultar");
        if (id.checked) {
            var tablasIds = document.getElementsByName("idTabla");
            tablasIds.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablasIds = document.getElementsByName("idTabla");
            tablasIds.forEach(function (x) {
                x.hidden = true;
            });
        }
        if (nombre.checked) {
            var tablasMarcas = document.getElementsByName("nombreTabla");
            tablasMarcas.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablasMarcas = document.getElementsByName("nombreTabla");
            tablasMarcas.forEach(function (x) {
                x.hidden = true;
            });
        }
        if (apellido.checked) {
            var tablasModelos = document.getElementsByName("apellidoTabla");
            tablasModelos.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablasModelos = document.getElementsByName("apellidoTabla");
            tablasModelos.forEach(function (x) {
                x.hidden = true;
            });
        }
        if (edad.checked) {
            var tablasPrecios = document.getElementsByName("edadTabla");
            tablasPrecios.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablasPrecios = document.getElementsByName("edadTabla");
            tablasPrecios.forEach(function (x) {
                x.hidden = true;
            });
        }
        if (sexo.checked) {
            var tablasPrecios = document.getElementsByName("sexoTabla");
            tablasPrecios.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablasPrecios = document.getElementsByName("sexoTabla");
            tablasPrecios.forEach(function (x) {
                x.hidden = true;
            });
        }
    }
    Personas.filtradoColumna = filtradoColumna;
    function calcularID() {
        var id;
        id = listaPersonas.reduce(function (idTotal, item) {
            return idTotal = item.id;
        }, 0);
        return id + 1;
    }
})(Personas || (Personas = {}));
