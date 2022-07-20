$(document).ready(function () {
    $("#id-formulario-login").bind("submit",function(){
        // Capturamnos el boton de envío
        var btnEnviar = $("#btnEnviarLogin");
        console.log( "--Formulario seleccionado desde DOM: " );
        console.log( this );
        console.log( "++Formulario selecionado desde DOM: " )
        $.ajax({
            type: $(this).attr("method"),
            // url: $(this).attr("action"),
            url: "http://localhost/api_tmp_sublimado/login.php",
            data:$(this).serialize(),
            beforeSend: function(){
                /*
                * Esta función se ejecuta durante el envió de la petición al
                * servidor.
                * */
                // btnEnviar.text("Enviando"); Para button 
                btnEnviar.val("Enviando"); // Para input de tipo button
                btnEnviar.attr("disabled","disabled");
            },
            complete:function(data){
                /*
                * Se ejecuta al termino de la petición
                * */
                btnEnviar.val("Enviar formulario");
                btnEnviar.removeAttr("disabled");
            },
            success: function(data){
                /*
                * Se ejecuta cuando termina la petición y esta ha sido
                * correcta
                * */
               console.log( "--Respuesta recibida del Servidor (API): " );
               console.log( data );
               console.log( "++Respuesta recibida del Servidor (API): " );
               // 1.- Revisar código devuelto en [data] : 100 (OK-Dejar pasar)
               // data.codigoAcceso : 300 (NO dejar pasar)...

                // SI SE PERMITE EL ACCESO::
                // a.- Redirigir al 'Controlador' original [php/usuarios/loginUsuarios.php]
                // enviando por método POST los datos del usuario recuperados desde la API (en [data])
                // SE ESPERA QUE INTERNAMENTE el 'Controlador' original [php/usuarios/loginUsuarios.php]
                // se encargue de la creación de la SESION correspondiente y subir datos del usuario a SESION...
                // TODO: implement logic HERE:: (2022-jul-11)


                // $(".respuesta").html(data);
            },
            error: function(data){
                /*
                * Se ejecuta si la peticón ha sido erronea
                * */
                alert("Problemas al tratar de enviar el formulario");
            }
        }); //-- fin: llamado AJAX
        // Nos permite cancelar el envio del formulario
        return false;
    }); //-- FIN: .bind("submit")
});