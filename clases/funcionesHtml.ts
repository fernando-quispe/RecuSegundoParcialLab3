namespace Personas
{
    window.addEventListener("load",function(){
        (<HTMLInputElement>document.getElementById("btnAlta")).addEventListener("click",mostrarForm); 
        (<HTMLInputElement>document.getElementById("btnCerrar")).addEventListener("click",hideForm);
        (<HTMLInputElement>document.getElementById("btnEliminar")).addEventListener("click",eliminar);  
        (<HTMLInputElement>document.getElementById("btnAgregar")).addEventListener("click",guardar);
        (<HTMLInputElement>document.getElementById("btnLimpiar")).addEventListener("click",limpiadorCompleto);
        (<HTMLInputElement>document.getElementById("idOcultar")).addEventListener("change",filtradoColumna);
        (<HTMLInputElement>document.getElementById("nombreOcultar")).addEventListener("change",filtradoColumna);
        (<HTMLInputElement>document.getElementById("apellidoOcultar")).addEventListener("change",filtradoColumna);
        (<HTMLInputElement>document.getElementById("edadOcultar")).addEventListener("change",filtradoColumna);
        (<HTMLInputElement>document.getElementById("sexoOcultar")).addEventListener("change",filtradoColumna);
        (<HTMLInputElement>document.getElementById("filtroSexo")).addEventListener("change",filtrador);
        (<HTMLInputElement>document.getElementById("btnPromedio")).addEventListener("click",promedio); 
    })

    window.addEventListener("load",hideForm);

    var listaPersonas:Array<Persona> = new Array<Persona>();
    var listaFiltradaGlobal:Array<Persona> = new Array<Persona>();
    var rowGlobal:any;

    export function mostrarForm()
    {
        (<HTMLInputElement>document.getElementById("contAgregar")).hidden = false;
    }

    export function hideForm()
    {
        (<HTMLInputElement>document.getElementById("contAgregar")).hidden = true;
        vaciarAlta();
    }

    export function guardar()
    {
        var nombre:string= (<HTMLInputElement>document.getElementById("nombre")).value;
        var apellido:string= (<HTMLInputElement>document.getElementById("apellido")).value;
        var edad:number = parseInt((<HTMLInputElement>document.getElementById("edad")).value);
        var sexoPersona:eTipo = eTipo.Masculino;

        if((<HTMLInputElement>document.getElementById("sexo")).value == "1")
        {
            var sexoPersona:eTipo = eTipo.Masculino;
        } 
        else if((<HTMLInputElement>document.getElementById("sexo")).value == "2")
        {
            var sexoPersona:eTipo = eTipo.Femenino;
        }

        var tempId:number;
        var idRow:number = 0;
        var control:boolean = false;

        if(nombre != "" && apellido != "" && edad != null)
        {
            (<HTMLInputElement>document.getElementById("nombre")).className="sinError";
            (<HTMLInputElement>document.getElementById("apellido")).className="sinError";
            (<HTMLInputElement>document.getElementById("edad")).className="sinError";
            (<HTMLInputElement>document.getElementById("sexo")).className="sinError";
            tempId = calcularID();
            var miCliente:Cliente = new Cliente(tempId,nombre,apellido,edad,sexoPersona);
            idRow = miCliente.id;
            listaPersonas.push(miCliente);
            control = true;
        }
        else
        {
            alert("Debe completar todos los campos");
            (<HTMLInputElement>document.getElementById("nombre")).className="error";
            (<HTMLInputElement>document.getElementById("apellido")).className="error";
            (<HTMLInputElement>document.getElementById("edad")).className="error";
            (<HTMLInputElement>document.getElementById("sexo")).className="error";
        }
        
        if(control == true)
        {
            var sexoTemp:string = "";

            if(sexoPersona == 0)
            {
                sexoTemp = "Masculino";
            }
            else if(sexoPersona == 1)
            {
                sexoTemp = "Femenino";
            }

            agregarItemTabla(idRow.toString(),nombre,apellido,edad.toString(),sexoTemp);
            control = false;
            vaciarAlta();
            (<HTMLInputElement>document.getElementById("contAgregar")).hidden = true;   
        }        
    }
    
    function vaciarAlta()
    {
        (<HTMLInputElement>document.getElementById("id")).value = "";
        (<HTMLInputElement>document.getElementById("nombre")).value = "";
        (<HTMLInputElement>document.getElementById("apellido")).value = "";
        (<HTMLInputElement>document.getElementById("edad")).value = "";
        (<HTMLInputElement>document.getElementById("sexo")).value = "1";
    }

    function agregarItemTabla(id:string, nombre:string, apellido:string, edad:string, sexo:string)
    {
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
        row.setAttribute("idPersona",id);

        if((<HTMLInputElement>document.getElementById("sexo")).value == "1")
        {
            row.setAttribute("sexoPersona","Masculino");
        }
        else if((<HTMLInputElement>document.getElementById("sexo")).value == "2")
        {
            row.setAttribute("sexoPersona","Femenino");
        }

        text1 = document.createTextNode(id);
        text2 = document.createTextNode(nombre);
        text3 = document.createTextNode(apellido);
        text4 = document.createTextNode(edad)
        text5 = document.createTextNode(sexo)
        cel1.appendChild(text1);
        cel1.setAttribute("name","idTabla");
        cel2.appendChild(text2);
        cel2.setAttribute("name","nombreTabla");
        cel3.appendChild(text3);
        cel3.setAttribute("name","apellidoTabla");
        cel4.appendChild(text4);
        cel4.setAttribute("name","edadTabla");
        cel5.appendChild(text5);
        cel5.setAttribute("name","sexoTabla");
        row.appendChild(cel1);
        row.appendChild(cel2);
        row.appendChild(cel3);
        row.appendChild(cel4);
        row.appendChild(cel5);
        row.addEventListener("dblclick",clickGrilla);
        (<HTMLInputElement>tCuerpo).appendChild(row);
    }

    export function eliminar()
    {
        var indice = listaPersonas.reduce(function(idTotal,item,index)
        {
            if(idTotal = item.id)
            {
                return index;
            }
            else
            {
                return -1;
            }
        },0);

        if(indice >= 0)
        {
            listaPersonas.splice(indice,1);
            rowGlobal.remove();
            vaciarAlta();
            console.log(listaPersonas);  
        }
        else
        {
            alert("El indice no existe");
        } 
    }

    export function clickGrilla(e:any)
    {
        var trClick = e.target.parentNode;
        rowGlobal = trClick;
        (<HTMLInputElement>document.getElementById("id")).value = trClick.childNodes[0].innerHTML;
        (<HTMLInputElement>document.getElementById("nombre")).value = trClick.childNodes[1].innerHTML;
        (<HTMLInputElement>document.getElementById("apellido")).value = trClick.childNodes[2].innerHTML;
        (<HTMLInputElement>document.getElementById("edad")).value = trClick.childNodes[3].innerHTML;

        if(trClick.getAttribute("sexoPersona") == "Masculino")
        {
            (<HTMLInputElement>document.getElementById("sexo")).value = "1";
        }
        else if(trClick.getAttribute("sexoPersona") == "Femenino")
        {
            (<HTMLInputElement>document.getElementById("sexo")).value = "2";
        }
        mostrarForm();
    }

    export function limpiadorCompleto()
    {
        console.log(listaPersonas);
        listaPersonas = [];
        console.log(listaPersonas);
        (<HTMLInputElement>document.getElementById("tCuerpo")).innerHTML = "";
        vaciarAlta();
    }

    export function filtrador()
    {
        if((<HTMLInputElement>document.getElementById("filtroSexo")).value == "1")
        {
           var searchInput =  eTipo.Masculino;
        }
        else         
        {
            var searchInput = eTipo.Femenino;
        }

        var filterPersona:Array<Persona> = listaPersonas.filter(x=> (<Cliente>x).sexo == searchInput);
        listaFiltradaGlobal = filterPersona;
        borrarTabla();
        rearmarTabla(filterPersona);
    }

    export function promedio()
    {
        var listaEdad:Array<number>;
        var promedio:number;

        if(listaFiltradaGlobal.length > 0)
        {
            listaEdad = listaFiltradaGlobal.map(x => (<Cliente>x).edad);
            promedio = listaEdad.reduce(function(total, num){
                total += num;
                return total;
            },0);
        }
        else
        {
            listaEdad = listaPersonas.map(x => (<Cliente>x).edad);
            promedio = listaEdad.reduce(function(total, num){
                total += num;
                return total;
            },0);
        }
        (<HTMLInputElement>document.getElementById("promedio")).value = (promedio/listaEdad.length).toString();
    }

    function borrarTabla()
    {
        let tCuerpo = document.getElementById("tCuerpo");
        (<HTMLInputElement>tCuerpo).innerHTML = "";
    }

    function rearmarTabla(filterPersona:Array<Persona>)
    {
        filterPersona.forEach(x => {
            if((<Cliente>x).sexo.toString() == "Masculino")
            {
                agregarItemTabla(x.id.toString(), x.nombre, x.apellido, (<Cliente>x).edad.toString(), "Masculino");
            }
            else         
            {
                agregarItemTabla(x.id.toString(), x.nombre, x.apellido, (<Cliente>x).edad.toString(), "Femenino");
            }            
        });
    }

    export function filtradoColumna()
    {
        var id = (<HTMLInputElement>document.getElementById("idOcultar"));
        var nombre = (<HTMLInputElement>document.getElementById("nombreOcultar"));
        var apellido = (<HTMLInputElement>document.getElementById("apellidoOcultar"));
        var edad = (<HTMLInputElement>document.getElementById("edadOcultar"));
        var sexo = (<HTMLInputElement>document.getElementById("sexoOcultar"));

        if(id.checked)
        {
            var tablasIds = document.getElementsByName("idTabla");
            tablasIds.forEach(x=>{
                x.hidden = false;
            })
        }
        else
        {
            var tablasIds = document.getElementsByName("idTabla");
            tablasIds.forEach(x=>{
                x.hidden = true;
            })
        }

        if(nombre.checked)
        {
            var tablasMarcas = document.getElementsByName("nombreTabla");
            tablasMarcas.forEach(x=>{
                x.hidden = false;
            })
        }
        else
        {
            var tablasMarcas = document.getElementsByName("nombreTabla");
            tablasMarcas.forEach(x=>{
                x.hidden = true;
            })
        }

        if(apellido.checked)
        {
            var tablasModelos = document.getElementsByName("apellidoTabla");
            tablasModelos.forEach(x=>{
                x.hidden = false;
            })
        }
        else
        {
            var tablasModelos = document.getElementsByName("apellidoTabla");
            tablasModelos.forEach(x=>{
                x.hidden = true;
            })
        }

        if(edad.checked)
        {
            var tablasPrecios = document.getElementsByName("edadTabla");
            tablasPrecios.forEach(x=>{
                x.hidden = false;
            })
        }
        else
        {
            var tablasPrecios = document.getElementsByName("edadTabla");
            tablasPrecios.forEach(x=>{
                x.hidden = true;
            })
        }

        if(sexo.checked)
        {
            var tablasPrecios = document.getElementsByName("sexoTabla");
            tablasPrecios.forEach(x=>{
                x.hidden = false;
            })
        }
        else
        {
            var tablasPrecios = document.getElementsByName("sexoTabla");
            tablasPrecios.forEach(x=>{
                x.hidden = true;
            })
        }
    }

    function calcularID():number
    {
        var id:number;
        id = listaPersonas.reduce(function(idTotal,item)
        {
            return idTotal = item.id;
        },0);
        return id+1;
    }
}