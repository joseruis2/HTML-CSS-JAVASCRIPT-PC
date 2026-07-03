function muevereloj(){

    momentoActual = new Date() //hora actual
    hora = momentoActual.getHours()
    minutos = momentoActual.getMinutes()
    segundos = momentoActual.getSeconds()

    str_segundo = new String(segundos) //convierte en texto
    if (str_segundo.length == 1) { //length = longitud
        segundos = "0"+segundos        
    }

    str_minuto = new String(minutos)
    if (str_minuto.length == 1) {
        minutos = "0"+minutos      
    }

    str_hora = new String(hora)
    if (str_hora.length == 1) {
        hora = "0"+hora    
    }

    horaImprimibles = hora + " : "+ minutos + " : " + segundos

    //document = toma toda la pagina html,form_reloj nombre del formulario,caja del reloj,value significa cambiar de valor
    document.form_reloj.reloj.value = horaImprimibles

    //bucle Infinito
    setTimeout("muevereloj()",1000)
}