console.log( "[carga-productos-api-uriel.js] (EEC)" );
$( document ).ready(function() {
    console.log( "Document READY! -- [carga-productos-api-uriel.js]..." );
    console.log( "--Inicia CARGA de PRODUCTOS desde Serv. Virtualizados de URIEL...-Remote API-" );

    // ++INI: .ajax hacia Servidor Remoto de URIEL...
    $.ajax({
        // la URL para la petición
        url : 'http://187.141.38.231:380/productos',
     
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data : { },
     
        // especifica si será una petición POST o GET
        type : 'GET',
     
        // el tipo de información que se espera de respuesta
        dataType : 'json',
     
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : function(json) {
            //$('<h1/>').text(json.title).appendTo('body');
            //$('<div class="content"/>')
                //.html(json.html).appendTo('body');
            console.log( "#RESPUESTA de Listado de Productos recuperados DESDE el SERVIDOR Remoto de URIEL :: " );
            console.log( json );
            console.log( typeof(json) );
        },
     
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto jqXHR (extensión de XMLHttpRequest), un texto con el estatus
        // de la petición y un texto con la descripción del error que haya dado el servidor
        error : function(jqXHR, status, error) {
            alert('Disculpe, existió un problema');
        },
     
        // código a ejecutar sin importar si la petición falló o no
        complete : function(jqXHR, status) {
            // alert('Petición realizada');
        }
    });
    // --FIN: .ajax hacia Servidor Remoto de URIEL...

});