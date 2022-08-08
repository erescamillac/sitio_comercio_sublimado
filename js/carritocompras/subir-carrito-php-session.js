
    console.log( "--dentro del Script (JS): subir-carrito-php-session.js" );
    var currentdate = new Date(); 
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    // TODO :: emplear jQuery .post() para tomar el 'carrito' de localStorage y 'colgarlo' en $_SESSION (PHP)...
    console.log( 'Intentando obtener la REF. al BOTÓN [btn-proceder-pago]...' );
        let btnProcederPago = document.getElementById('btn-proceder-pago');
        console.log( datetime );
        console.log( 'btnProcederPago' );
        console.log( btnProcederPago );
        /*
        
        */
        if( btnProcederPago == null ){
            // El btn 'AÚN NO EXISTE'
            console.log( 'El btn-proceder-pago AÚN NO EXISTE' );
        }else{
            console.log( 'el btn-proceder-pago YA existe..., se procede a agregar el EventListener...' );
            // addEventListener [onClick] - ${btnProcederPago}
            btnProcederPago.addEventListener('click', e => {
                iniciarSesionClientePorPago(e)
            }); 

            const iniciarSesionClientePorPago = e => {
                console.log('Se hizo CLICK en el botón [PAGAR]');
                // Paso 1.- Recuperar el 'carrito' de compras del localStorage
                if(localStorage.getItem('carrito')){
                    // carrito = JSON.parse( localStorage.getItem('carrito') );
                    // pintarCarrito();
                    let strCarrito = localStorage.getItem('carrito');
                    console.log( "strCarrito :: " );
                    console.log( typeof strCarrito );
                    console.log( strCarrito );
                    // Paso 2.- Enviar carrito a 'controller' PHP /iniciarSesionClientePorPago.php
                    // $.post ...
                    console.log( "Intentando enviar datos a CONTROLADOR PHP - /iniciarSesionClientePorPago.php - $.post()" );
                    //--INI: $.post()
                    /*
                    $.post('../../php/clientes/iniciarSesionClientePorPago.php', 
                            { jsonStrCarrito : strCarrito }, 
                            function(data, status){
                                console.log(data + " " + status);

                    }); 
                    */
                    $.ajax({
                        type: "POST",
                        // url: $(this).attr("action"),
                        url: "php/clientes/iniciarSesionClientePorPago.php",
                        // data: { "jsonStrCarrito" : JSON.stringify(strCarrito) },
                        data: { "jsonStrCarrito" : strCarrito },
                        beforeSend: function(){
                            /*
                            * Esta función se ejecuta durante el envió de la petición al
                            * servidor.
                            * */
                            // POSIBLE: 'animación' de loading...
                            // btnEnviar.text("Enviando..."); Para button 
                            // btnEnviar.val("Enviando..."); // Para input de tipo button
                            // btnEnviar.attr("disabled","disabled");
                        },
                        complete:function(data){
                            /*
                            * Se ejecuta al termino de la petición
                            * */
                            // btnEnviar.val("Enviar formulario");
                            // btnEnviar.removeAttr("disabled");
                        },
                        success: function(data){
                            /*
                            * Se ejecuta cuando termina la petición y esta ha sido
                            * correcta
                            * */
                           console.log( "--INI: Respuesta recibida del Servidor (iniciarSesionClientePorPago.php): " );
                           console.log( data );
                           console.log( "++FIN: Respuesta recibida del Servidor (iniciarSesionClientePorPago.php): " );
                           // 1.- Revisar código devuelto en [data] : 100 (OK-Dejar pasar)
                           // data.codigoAcceso : 300 (NO dejar pasar)...
                           if( data.codigoEstado == 100 ){
                            //OK: del lado del Controlador PHP -/iniciarSesionClientePorPago.php-, se pudo 
                            //subir a SESSION el carrito de compras.
                            // SE procede a redigir...
                            console.log( "El Controlador PHP /iniciarSesionClientePorPago.php SUBIÓ A SESSION el carrito de compras - OK - se procede a redirigir a Formulario de Login de Cliente..." );
                            window.location.href = "php/clientes/formularioLoginCliente.php";
                           }
            
                            // $(".respuesta").html(data);
                        },
                        error: function(data){
                            /*
                            * Se ejecuta si la peticón ha sido erronea
                            * */
                            console.log( 'data - ERROR :: ' );
                            console.log( data );
                            alert("Problemas al tratar de enviar el formulario");
                        }
                    }); //-- fin: llamado AJAX
                    //++FIN: $.post()
                } //-- FIN: if :: localStorage.getItem('carrito')

            }
        } //-- fin : ELSE


    var intervalId = window.setInterval(function(){
        // call your function HERE:
        
    }, 3000); //-- fin_ window.setInterval
   

// TODO: Implement logic (revisar cada 3 seg SI el botón 'a' [btn-proceder-pago] EXISTE o aún NO ya que se crea
// de forma DINÁMICA)...
