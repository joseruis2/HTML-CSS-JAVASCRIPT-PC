function prueba1(){
    var valor = prompt("dime la contraseña");

    if (valor == "jose") {
        alert("la contraseña es correcta");                
    }
    else{
        alert("contraseña no valida"+valor);
        location.href = "https://www.google.com.pe/?hl=es"; /* location.href = cambia de pagina*/
    }
}