console.log( 'Dentro de [imprimir-ticket-js-eec.js]' );

const btnImprimirTicket = document.getElementById( 'btn-imprimir-ticket' );
let contador = 0;

//--INI: Impresion REAL de TICKET ::
// Quick Report
btnImprimirTicket.addEventListener('click', () => {

    console.log( 'Se hizo click en el Botón [Imprimir TICKET]...' );
    let nombreImpresora = "POS-58";

    console.log( "--Impresora :: " );
    console.log( nombreImpresora );
    console.log( "++Impresora :: " );

    //--Current date (JS)
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();;
    //++Current date (JS)

    let conector = new ConectorPlugin();
    conector.establecerTamanioFuente(1, 1);
    conector.establecerEnfatizado(0);
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
    // conector.imagenDesdeUrl("https://i.postimg.cc/rFwwGLvY/logo-custom-final.png");
    conector.feed(1);
    conector.texto("Tienda CUSTOM\n");
    // conector.texto("Blog de un programador\n");
    conector.texto("Telefono: 123456789\n");
    conector.texto("Fecha/Hora: " + date + "\n");
    conector.texto("--------------------------------\n");
    conector.texto("Productos\n");
    conector.texto("CANT.  ARTICULO   PRE. UNIT.   TOTAL\n");
    // conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha);

    //--INI: listado de Productos
    if( localStorage.getItem('carritoPOS') ){
        carritoPOS = JSON.parse( localStorage.getItem('carritoPOS') );

        console.log("--carritoPOS");
        console.log( carritoPOS );
        console.log("++carritoPOS");

        let strDetalleProd = '';
        // INI: foreach
        Object.values( carritoPOS ).forEach(producto => {
            console.log( 'producto:: ' );
            console.log( producto );
            /*
            templateCarritoPOS.querySelector( 'th' ).textContent = producto.codigoBarras;
            templateCarritoPOS.querySelectorAll( 'td' )[0].textContent = producto.id;
            templateCarritoPOS.querySelectorAll( 'td' )[1].textContent = producto.nombre;
            templateCarritoPOS.querySelectorAll( 'td' )[2].textContent = producto.cantidad;
            templateCarritoPOS.querySelector( '.btn-info' ).dataset.id = producto.id;
            templateCarritoPOS.querySelector( '.btn-danger' ).dataset.id = producto.id;
    
            templateCarritoPOS.querySelectorAll( 'td' )[4].querySelector('img').src = "../../images/products/" + producto.urlImagen;
            templateCarritoPOS.querySelectorAll( 'td' )[5].querySelector( 'span' ).textContent = producto.precio;
            templateCarritoPOS.querySelectorAll( 'td' )[6].querySelector( 'span' ).textContent = producto.cantidad * producto.precio;

             const clone = templateCarritoPOS.cloneNode( true );
            fragmentPOS.appendChild( clone );
            */
            
            // CANT.  ARTICULO   PRE. UNIT.   TOTAL
            // 64     Cuaderno   11.90        761.0
            //  TOTAL                         761.0
           
            strDetalleProd = '';
            console.log( "##BEFORE :: [strDetalleProd] ::" );
            console.log( strDetalleProd );

            strDetalleProd += producto.cantidad + " | " + producto.nombre + " | $" + producto.precio + " | $" + producto.cantidad * producto.precio + "\n";

            console.log( "++AFTER :: [strDetalleProd] :: " );
            console.log( strDetalleProd );

            conector.texto( strDetalleProd );            
    
        }); // fin: .forEach()
        // FIN: foreach

        // let totalVenta;
        // FINAL : Total...
        const totalVenta = Object.values(carritoPOS).reduce( (acc, {cantidad, precio}) => acc + cantidad * precio, 0);
        conector.texto( "--------------------\n" );
        conector.texto( "TOTAL:  $ " + totalVenta );
        conector.texto( "--------------------\n" );

        // pintarCarritoPOS();
    } //-- fin: IF localStorage('carritoPOS')
    //++FIN: listado de Productos
    
    // CANT.  ARTICULO   PRE. UNIT.   TOTAL
    // 64     Cuaderno   11.90        761.0
    //  TOTAL                         761.0

    // conector.texto("25 USD\n");
    // conector.texto("--------------------------------\n");
    // conector.texto("TOTAL: 25 USD\n");
    // conector.texto("--------------------------------\n");



    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
    conector.texto("***Gracias por su compra***");
    conector.feed(4);
    conector.cortar();
    conector.cortarParcialmente();
    conector.imprimirEn(nombreImpresora)
        .then(respuestaAlImprimir => {
            if (respuestaAlImprimir === true) {
                console.log("Impreso correctamente");
            } else {
                console.log("Error. La respuesta es: " + respuestaAlImprimir);
            }
        });
});
//++FIN: Impresión REAL de TICKET ::

/*
btnImprimirTicket.addEventListener('click', async () => {
    // let nombreImpresora = $listaDeImpresoras.value;
    console.log( 'Se hizo click en el Botón [Imprimir TICKET]...' );
    let nombreImpresora = "POS-58";
    // if (!nombreImpresora) return loguear("Selecciona una impresora");
    console.log( "--Impresora :: " );
    console.log( nombreImpresora );
    console.log( "++Impresora :: " );
    
    let cadenaConAcentos = "Erick Escamilla C. --Test de Impresión--";

    //--Current date (JS)
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();;
    //++Current date (JS)
    cadenaConAcentos = cadenaConAcentos.concat(date) ;

    const respuestaAlImprimir = await new ConectorPlugin()
        .texto("Tratando de imprimir acentos sin forzar:\n")
        .texto(cadenaConAcentos)
        .texto("Ahora tratando de imprimir acentos, pero forzando:\n")
        
        // Nota: solo hace falta llamar a "textoConAcentos" una vez, eso "habilita" los acentos
        // y las siguientes llamadas a "text" ya deben soportar acentos
        
        .textoConAcentos(cadenaConAcentos)
        .texto("Texto con acentos y centrado:")
        .establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro)
        .texto(cadenaConAcentos)
        .feed(3) // Dejar 3 saltos de línea. Esto es muy importante
        .cortar()
        .imprimirEn(nombreImpresora); // Siempre debes invocar a "imprimirEn" al final, pasando el nombre de la impresora
    if (respuestaAlImprimir === true) {
        // loguear("Impreso correctamente");
        console.log("Impreso correctamente");
    } else {
        // loguear("Error. La respuesta es: " + respuestaAlImprimir);
        console.log("Error. La respuesta es: " + respuestaAlImprimir);
    }
});
*/


const manejoDeImpresionTicket = e => {
    console.log( 'manejoDeImpresionTicket(e)' );
    console.log( e.target );

    e.stopPropagation();
} //--fin: funcion manejoDeImpresionTicket(e) 

//-- TEST de Obtención de LISTA DE IMPRESORAS ::

const obtenerListaDeImpresoras = () => {
    // loguear("Cargando lista...");
    contador = 0;
    console.log( 'Cargando Lista de IMPRESORAS...' );
    ConectorPlugin.obtenerImpresoras()
        .then(listaDeImpresoras => {
            // loguear("Lista cargada");
            console.log( 'lista de Impresoras CARGADA - [Ok]' );
            listaDeImpresoras.forEach(nombreImpresora => {
                // const option = document.createElement('option');
                // option.value = option.text = nombreImpresora;
                // $listaDeImpresoras.appendChild(option);
                contador++;
                console.log( contador, ' .- [', nombreImpresora, ']' );
            })
        })
        .catch(() => {
            // loguear("Error obteniendo impresoras. Asegúrese de que el plugin se está ejecutando");
            console.log("Error obteniendo impresoras. Asegúrese de que el plugin se está ejecutando");
        });
} //--fin: función obtenerListaDeImpresoras()

// obtenerListaDeImpresoras();