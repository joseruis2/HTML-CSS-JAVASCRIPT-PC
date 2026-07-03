var lista = Array();

function ingresar(){
    var cantidad = prompt("cuantos elementos: ",""); // Solicitar al usuario
    var ingresar_valores_nombres;

    for (var contador = 0; contador < cantidad; contador++) {
        ingresar_valores_nombres = prompt("ingresar elemento nombres: ");
        lista.push(ingresar_valores_nombres); //push para agregar uno o más elementos al final ejem 1,2 con push 1,2,3
    }
    document.getElementById("contenido1").innerHTML = lista; //document.getElementById = seleccionar un elemento HTML de un documento innerHTML para modifica o actualizar
}



function listar(){
    var valores = "";

    for (var contador  = 0; contador < lista.length; contador++) {
        valores = valores + "la posicion [" + contador + "] es [" + lista[contador] + "] <br> " ; 
    }
    document.getElementById("contenido2").innerHTML = valores;
}

function buscar() {
    var buscar = prompt("Ingresar elemento a buscar: ");
    var encontrado = -1;
    var valores = "";

    for (var contador = 0; contador < lista.length; contador++) {
        if (lista[contador] == buscar) {
            encontrado = contador;
            break; 
        }
    }

    if (encontrado == -1) {
        valores = "No se ha encontrado el elemento.";
    } else {
        valores = lista[encontrado] + " está en la posición [" + encontrado + "]";
    }

    document.getElementById("contenido3").innerHTML = valores;
}



function eliminar(){
    var posicion = prompt("ingresar posicion para eliminar");
    lista.splice(posicion,1) //splice = eliminar array
    document.getElementById("contenido4").innerHTML = lista;
}
