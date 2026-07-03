function color()
{
    // Solicitar al usuario que ingrese
    var r = prompt("valor hexadeciaml del rojo: ");
    var g = prompt("valor hexadeciaml del verde: ");
    var b = prompt("valor hexadecimal del azul: ");

    var rgb = "#"+r+g+b;

    // Establecer el color de fondo del cuerpo
    document.body.style.background = rgb;
    // Establecer el color del texto
    document.body.style.color = "yellow";
}