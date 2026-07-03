var temporizador;

function mensaje(){
    alert("se han transmitido 5 seg");
}

//función repetidamente
function iniciar(){
    temporizador = setInterval("mensaje()",5000)
}

// detiene un temporizador
function detener(){
    clearInterval(temporizador);
}


