console.log( "---dentro del Script :: [punto-venta-script.js]---" );

var barcode = '';
var interval;
const fragmentPOS = document.createDocumentFragment();

const itemsPOS = document.getElementById( 'items-POS' );
const footerPOS = document.getElementById( 'footer-POS' );

const templateFooterPOS = document.getElementById( 'template-footer-POS' ).content;
const templateCarritoPOS = document.getElementById( 'template-carrito-POS' ).content;



let carritoPOS = {};

document.addEventListener('DOMContentLoaded', () => {
    if( localStorage.getItem('carritoPOS') ){
        carritoPOS = JSON.parse( localStorage.getItem('carritoPOS') );
        pintarCarritoPOS();
    } //-- fin: IF localStorage('carritoPOS')
});

document.addEventListener('keydown', function(evt){
    if(interval)
        clearInterval(interval);
    
    if(evt.code == 'Enter'){
        // Se detecto 'key' ['ENTER'] (lectura de Código de Barras - Presión del BOTÓN del Lector).
        console.log( 'Se DETECTÓ [keydown] :: ENTER ...' );
        if(barcode)
            handleBarcode(barcode);
        barcode = '';
        return;
    } //-- FIN: if (evt.code == 'Enter')

    if(evt.key != 'Shift')
        barcode += evt.key;
    interval = setInterval( () => barcode = '', 20 );
    
}); // .addEventListener ['keydown']

// itemsPOS :: <tbody>
itemsPOS.addEventListener('click', e => {
    btnAccion( e ); 
}); //--fin: itemsPOS.eventListener('click')

function handleBarcode( scanned_barcode ){
    console.log( 'handleBarcode :: ' );
    console.log( 'Último CÓDIGO DE BARRAS LEIDO :: [' + scanned_barcode + "]" );
    document.querySelector('#last-barcode').innerHTML = scanned_barcode;
    // TODO: agregar aquí lógica de Agregar Productos a la Tabla visible de html ::
    // Paso 1.- Invocación .AJAX para traer datos del Producto desde la BD ::
    console.log( 'Intentando recuperar DATOS del Producto -barCode-(' + scanned_barcode + ') desde la BD mediante AJAX...' );
    //++ini: .AJAX ::
    $.ajax({
        type: "GET",
        // url: $(this).attr("action"),
        url: "consulta-producto-por-codigo-barras.php",
        // data: { "jsonStrCarrito" : JSON.stringify(strCarrito) },
        data: { "codigoBarras" : scanned_barcode },
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
           console.log( "--INI: Respuesta recibida del Servidor (consulta-producto-por-codigo-barras.php): " );
           console.log( data );
           console.log( "++FIN: Respuesta recibida del Servidor (consulta-producto-por-codigo-barras.php): " );

           console.log( "type(data) :: " +  typeof(data) );
           console.log( "--INI: data[0]" );
           console.log( data[0] );
           console.log( "++FIN: data[0]" );

           let originalProduct = data[0];
           console.log( "originalProduct: ", originalProduct );

           // 'Agregar' originalProduct a 'carritoPOS'
           addCarritoPOS( originalProduct );

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
    //--fin: .AJAX ::
    // Paso 2.- Agregarr producto a obj JS 'carritoTicket'

    // Paso 2.1.- 'Render' lista de productos en Tabla HTML:

} //FIN: function handleBarcode()

const addCarritoPOS = originalProduct => {
    console.log( "funcion addCarritoPOS(originalProduct)..." );
    setCarritoPOS( originalProduct );
} //--FIN: funcion addCarritoPOS()

const setCarritoPOS = objProductoOrg => {
    console.log( "funcion setCarritoPOS(objProductoOrg)+++" );
    console.log( "objProductoOrg :: ", objProductoOrg );

    // productoTmp
    const productoTmp = {
        id: objProductoOrg.id_prod,
        nombre: objProductoOrg.nombre,
        descripcion: objProductoOrg.descripcion,
        urlImagen: objProductoOrg.url_imagen,
        precio: objProductoOrg.precio_venta,
        fechaCreacion: objProductoOrg.fecha_creacion,
        codigoBarras: objProductoOrg.codigo_barras,
        cantidad: 1
    } 

    // productoTmp
    if( carritoPOS.hasOwnProperty(productoTmp.id) ){
        console.log( "++Se DETECTÓ Producto REPETIDO :: " );
        console.log( productoTmp.id );
        console.log( "--Se DETECTÓ Producto REPETIDO :: " );
        productoTmp.cantidad = carritoPOS[productoTmp.id].cantidad + 1;    
    }

    carritoPOS[productoTmp.id] = {...productoTmp};

    console.log( "--carritoPOS--" );
    console.log( carritoPOS );
    console.log( "++carritoPOS++" );

    pintarCarritoPOS();
} //--FIN: funcion setCarritoPOS()

const pintarCarritoPOS = () => {
    console.log( "-- funcion: pintarCarritoPOS() EEC -- " );
    console.log( carritoPOS );

    itemsPOS.innerHTML = '';

    Object.values( carritoPOS ).forEach(producto => {
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

    }); // fin: .forEach()

    itemsPOS.appendChild( fragmentPOS );

    pintarFooterPOS();

    // Guardar 'carritoPOS' (obj. JS) en localStorage ::
    localStorage.setItem( 'carritoPOS', JSON.stringify(carritoPOS) );
} //--FIN: pintarCarritoPOS()

const pintarFooterPOS = () => {
    footerPOS.innerHTML = '';

    if( Object.keys(carritoPOS).length === 0 ){
        footerPOS.innerHTML = `<th scope="row" colspan="5">¡Lista VACÍA - comience a comprar!</th>`;
        return
    } // fin: IF (carrito VACÍO) ??

    const nCantidad = Object.values(carritoPOS).reduce( (acc, {cantidad}) => acc + cantidad, 0);
    const nPrecio = Object.values(carritoPOS).reduce( (acc, {cantidad, precio}) => acc + cantidad * precio, 0);
    console.log( nCantidad );
    console.log( nPrecio );


    templateFooterPOS.querySelectorAll( 'td' )[0].textContent = nCantidad;
    templateFooterPOS.querySelector( 'span' ).textContent = nPrecio;

    const clone = templateFooterPOS.cloneNode( true );
    fragmentPOS.appendChild( clone );
    footerPOS.appendChild( fragmentPOS );

    const btnVaciar = document.getElementById( 'vaciar-carrito' );
    btnVaciar.addEventListener( 'click', () => {
        carritoPOS = {};
        pintarCarritoPOS();

    });
} //--FIN: pintarFooterPOS()

const btnAccion = e => {
    console.log( e.target );
    // Acción de AUMENTAR
    if(e.target.classList.contains('btn-info')){
        const producto = carritoPOS[e.target.dataset.id]; 
        producto.cantidad = carritoPOS[e.target.dataset.id].cantidad + 1;
        carritoPOS[e.target.dataset.id] = {...producto};
        pintarCarritoPOS();
    } //-- fin: IF .btn-info (+) [Aumentar Prod.]

    if(e.target.classList.contains('btn-danger')){
        const producto = carritoPOS[e.target.dataset.id];
        producto.cantidad--;
        if(producto.cantidad === 0){
            delete carritoPOS[e.target.dataset.id];
        }
        pintarCarritoPOS();
    } //--fin: IF .btn-danger (-) [Disminuir]

    e.stopPropagation();

}//-- fin: funcion btnAccion(e)