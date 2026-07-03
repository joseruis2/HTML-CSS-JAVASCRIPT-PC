$(document).ready(function () {
    // Cuando el documento esté completamente cargado, se ejecutará el siguiente código

    // Maneja la apertura del menú en modo responsive
    $("#menu-toggle").click(function () {
        // Cuando se hace clic en el botón de menú, se muestra el menú modal quitando la clase "hidden"
        $("#menu-modal").removeClass("hidden");
    });

    // Maneja el cierre del menú en modo responsive
    $("#menu-close").click(function () {
        // Cuando se hace clic en el botón de cerrar, se oculta el menú modal agregando la clase "hidden"
        $("#menu-modal").addClass("hidden");
    });

    let openSubmenu = null; // Variable para almacenar el submenú actualmente abierto

    // Manejo de los submenús
    $(document).on("click", ".toggle-submenu", function (e) {
        e.preventDefault(); // Previene la acción predeterminada del enlace

        const $submenu = $(this).next("ul"); // Selecciona el siguiente elemento <ul> (submenú) después del elemento clicado

        if ($submenu.is(':visible')) { // Si el submenú ya está visible
            $submenu.slideToggle(); // Alterna la visibilidad del submenú (lo oculta)
            return true; // Termina la ejecución
        }

        if (openSubmenu && openSubmenu !== $submenu) { 
            // Si hay un submenú abierto y no es el que se acaba de seleccionar
            openSubmenu.slideUp(); // Cierra el submenú anteriormente abierto
        }

        $submenu.slideToggle(); // Alterna la visibilidad del submenú seleccionado (lo muestra)
        openSubmenu = $submenu.is(":visible") ? $submenu : null; // Actualiza el submenú actualmente abierto
    });

    // Inicializa la agenda de eventos y la actualiza cada 60 segundos
    obtenerAgenda();
    setInterval(upgrade, 60000); // Llama a la función 'upgrade' cada 60 segundos (60000 ms)

    // Desplazamiento suave al inicio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function loadDoc() {
    // Obtiene la zona horaria del usuario utilizando la API de Intl
    const resolvedOptions = Intl.DateTimeFormat().resolvedOptions();
    return resolvedOptions.timeZone;
}

function convertToUserTimeZone(utcHour) {
    // Convierte la hora UTC proporcionada a la hora local del usuario utilizando Luxon
    const DateTime = luxon.DateTime;
    const utcDateTime = DateTime.fromISO(utcHour, { zone: "America/Lima" }); // Convierte la hora en UTC a la hora de Lima
    const localDateTime = utcDateTime.toLocal(); // Convierte a la hora local del usuario
    return localDateTime.toFormat("HH:mm"); // Devuelve la hora en formato de 24 horas (HH:mm)
}

function obtenerAgenda() {
    // Obtiene los eventos de la agenda desde una URL externa, utilizando un proxy para evitar problemas de CORS
    const agendaUrl = "https://corsproxy.io/?url=https://futbollibrehd.pe/agenda.json";
    let html = ""; // Inicializa una variable para almacenar el HTML dinámico
    moment.locale("es"); // Configura Moment.js para usar el idioma español
    loadDoc(); // Llama a la función para obtener la zona horaria del usuario

    $(".menu").empty(); // Vacía el contenido del elemento con la clase "menu"

    // Realiza una solicitud GET para obtener los datos de la agenda en formato JSON
    $.getJSON(agendaUrl, function (result) {
        // Ordena los datos por la hora de los eventos
        const data = result.data.sort((a, b) =>
            a.attributes.diary_hour.localeCompare(b.attributes.diary_hour)
        );

        // Muestra la fecha de la agenda si hay datos, de lo contrario muestra la fecha actual
        if (data.length > 0) {
            const dateCompleted = moment(data[0].attributes.date_diary).format("LL");
            $(".title-agenda").html("Agenda - " + dateCompleted);
        } else {
            const dateCompleted = moment().format("LL");
            $(".title-agenda").html("Agenda - " + dateCompleted);
        }

        // Recorre cada evento en la agenda y genera HTML para cada uno
        $.each(data, function (key, value) {
            let imageUrl = "https://img.futbollibrehd.pe/uploads/sin_imagen_d36205f0e8.png"; // URL predeterminada para imágenes

            // Verifica si hay una imagen disponible y la establece
            if (value.attributes.country.data != null) {
                imageUrl = "https://img.futbollibrehd.pe" + value.attributes.country.data.attributes.image.data.attributes.url;
            }

            // Genera HTML para cada evento
            html += '<li class="pl-4 hover:bg-gray-50 rounded-lg">';
            html += '<div class="flex items-center cursor-pointer justify-between toggle-submenu">';
            html += '<div class="flex items-center"><time datetime="12:00:00" class="text-center font-bold text-black bg-white rounded-lg p-2">' +
                convertToUserTimeZone(value.attributes.diary_hour) + "</time>";
            html += '<img src="' + imageUrl + '" alt="" class="ml-2 object-cover h-6 w-6"><span class="flex-1 ml-4 text-left font-medium text-gray-800 text-1xl">' +
                value.attributes.diary_description + "</span></div>";
            html += '<span class="ml-2 text-gray-500"></span>';
            html += "</div>";
            html += '<ul class="ml-16 rounded-lg submenu divide-y divide-gray-300 hidden">';

            // Recorre cada enlace de transmisión de un evento y genera el HTML correspondiente
            $.each(value.attributes.embeds.data, function (i, embed) {
                if (embed) {
                    const url_complete = embed.attributes.embed_iframe
                        ? ensureAbsoluteUrl(embed.attributes.embed_iframe)
                        : "https://futbollibretv.pe/star-plus";
                    html += '<div><a href="' + url_complete + '" target="_top" class="text-sm text-gray-700 hover:text-green-600"><li class="w-full pt-2 pb-2"><img src="https://img.icons8.com/?size=10&id=59862&format=png&color=000000" class="inline mr-2" alt="play"/>' +
                        embed.attributes.embed_name + "</li></a></div>";
                }
            });

            html += "</ul>";
            html += "</li>";
        });

        // Agrega el HTML generado al elemento con la clase "menu"
        $(".menu").append(html);
    });
}

function ensureAbsoluteUrl(url) {
    // Asegura que la URL proporcionada sea una URL absoluta (completa)
    if (!url.startsWith('http')) {
        return `https://futbollibretv.pe${url}`;
    }
    return url;
}
