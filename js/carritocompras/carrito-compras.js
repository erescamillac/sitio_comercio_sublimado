// Obtener REF. al <div> 'Fila' que es el contenedor de los 'productos' (GUI : HTML5)
// Utilizado SOLO PARA atach del EventListener para el Evento CLICK
const filaProductos = document.getElementById('id-contenedor-productos');

// Obtener REF. al 'template' del FOOTER de la Tabla-HTML que en este momento representa al Carrito de compras (GUI: HTML5)
// 'footer' ::== TOTAL de la Venta
const templateFooter = document.getElementById('template-footer').content

// TODO: Generar equivalente de templateFooter para TEMPLATE-HTML5 Naranja:
// EQUIV. footer 'naranja' ::== TOTAL de la Venta
const templateOrangeFooter = document.getElementById('template-orange-footer').content


// 'template-carrito' : (GUI: HTML5) representa UNA FILA (<tr>) de 'Detalle de venta' en el carrito (GUI: HTML5)
const templateCarrito = document.getElementById('template-carrito').content

// EQUIV. (orange) : (GUI: HTML5) representa un 'FILA' (<li>) de 'Detalle de Venta' en el carrito (Orange)
const templateOrangeCarrito = document.getElementById('template-orange-carrito').content

// 'items' hace REF. al <tbody> de la TABLA-HTML que representa visualmente al Carrito de compras
// <tbody> Actua como el 'contenedor' de las FILAS ('Detalles de Venta') 
const items = document.getElementById('items')

// EQUIV. Carrito Orange :: 'Real Container' de las FILAS ('Detalles de Venta')
// 'Real-Container' :: <ul id="real-container-detalles-venta" class="shopping-list"> (UL) ::
const itemsOrange = document.getElementById('real-container-detalles-venta')

// 'footer' hace REF. al CONTAINER de [templateFooter]
// CONTAINER que tiene como hijo al choro de 'TOTAL de Venta' y eso...
const footer = document.getElementById('footer')

// EQUIV. footerOrange :: CONTAINER de [templateOrangeFooter]
// <div id="contenedor-template-orange-footer" class="bottom">
const footerOrange = document.getElementById('contenedor-template-orange-footer')

// Representación del CARRITO a nivel LÓGICO (en Memoria) como un OBJETO, inicialmente VACÍO (sin propiedades)
let carrito = {};

// CADA VEZ que se haga CLIC en alguno de los elementos hijo de la 'Fila de productos'
// <div> contenedor de los 'Productos' (GUI) [div.single-product 'tarjeta de producto(GUI)']
// se invoca a la función ${ addCarrito(e) }
filaProductos.addEventListener('click', e => {
	addCarrito(e)
});

const addCarrito = e => {
	console.log( "dentro de la función addCarrito(e)..." );
	console.log( e.target );
	console.log( e.target.classList.contains('btn-add-to-cart') );
	if( e.target.classList.contains('btn-add-to-cart') ){
		// SOLO si se ha hecho CLIC en el LIINK (anchor tag) 'Agregar a carrito' :
		// se procede a ejecutar la LÓGICA para MODIFICAR el OBJETO [carrito = {}]
		// y que dicho OBJETO [carrito = {}] contenga la 'Lista' de los productos seleccionados por el usuario (cliente)
		console.log( "se hizo CLIC en el ENLACE 'Agregar a carrito', procediendo a AGREGAR el Producto al OBJ. js [carrito = {}]..." );
		// Agregar producto (item) al Carrito (OBJ) ['lista' / 'Colección' en JS]
		// console.log( e.target.parentElement.parentElement.parentElement.parentElement );
		// [e.target] : REFERS to LINK 'Agregar a carrito'
		// .parentElement... : 'apuntar' a div.single-product (Contenedor General 
		// de los Detalles del Artículo ESPECÍFICO [nombre_art, precio_unit, id_prod])

		// la función [setCarrito()] es la QUE REALMENTE 'agregar' el Producto a la 'Lista interna' del OBJ. js [carrito={}] 
		setCarrito( e.target.parentElement.parentElement.parentElement.parentElement );
	}
	e.stopPropagation();
}

const setCarrito = objeto => {
	console.log( "dentro de la función setCarrito(objeto)" );
	// [objeto] :: 'apunta' a div.single-product
	console.log( objeto );
    console.log( '--TEST de queryselector-- :: ' );
    console.log( objeto.querySelector("div.product-content input[name='prod_id']") );
    console.log( "id (del Producto a AGREGAR al carrito-JS-) :: " );
    console.log( objeto.querySelector("div.product-content input[name='prod_id']").id );
    
	// 'Construcción' del objeto [producto] que se AGREGARÁ al carrito...
	const producto = {
        // var el = document.querySelector("div.user-panel.main input[name='login']");
		// id: objeto.querySelector('.btn-dark').dataset.id
        id: objeto.querySelector("div.product-content input[name='prod_id']").id,
        titulo: objeto.querySelector('div.product-content h3 a').textContent,
        precio: objeto.querySelector('div.product-content div.product-price span').textContent,
        cantidad: 1
	};


    producto.precio = producto.precio.replace("$", "");

    if( carrito.hasOwnProperty(producto.id) ){
		// SOLO aumentar la cantidad del artículo::
		producto.cantidad = carrito[producto.id].cantidad + 1;
	}

	// {...producto} :: COPIA del OBJ. JS [producto]
    carrito[producto.id] = {...producto};

	// función pintarCarrito() :: 'RENDERIZAR' en GUI (Tabla-HTML5)
    pintarCarrito();
    
	// console.log( producto );
    // console.log( carrito );
}


// función pintarCarrito() :: 'RENDERIZAR' en GUI (Tabla-HTML5) el contenido del OBJ. JS [carrito = {}]
/*
TODO:
1.- Estudiar la Estructura del Template HTML5 que se está utilizando.
2.- Adaptar lógica de la función pintarCarrito() para 'agregar' gráficamentes los artículos al 'Carrito' del TEMPLATE-HTML5 (base: naranja)
*/
// -- HERE IS THE KEY... funcion [pintarCarrito()] es la encargada de RENDERIZAR (GUI) el 'Contenido LÓGICO'
// del Carrito de Compras en PANTALLA (a vista del Usuario -Cliente-)...
const pintarCarrito = () => {
    console.log( "dentro de la función pintarCarrito()..." );
	console.log( carrito );
	// 'items' hace REF. al <tbody> de la TABLA-HTML que representa visualmente al Carrito de compras
    items.innerHTML = '';
	// EQUIV. Orange Carrito::
	itemsOrange.innerHTML = '';

    let fragment = new DocumentFragment();
	let fragmentOrange = new DocumentFragment();

	Object.values(carrito).forEach( producto => {
		// 'template-carrito' : (GUI: HTML5) representa UNA FILA (<tr>) de 'Detalle de venta' en el carrito (GUI: HTML5)
		templateCarrito.querySelector('th').textContent = producto.id
		templateCarrito.querySelectorAll('td')[0].textContent = producto.titulo
		// Orange ... ?? 
		templateOrangeCarrito.querySelector('h4 a').textContent = producto.titulo

		templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
		// <button class="btn btn-info btn-sm" data-id="4">
		templateCarrito.querySelector('.btn-info').dataset.id = producto.id
		templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
		templateCarrito.querySelectorAll('td')[3].querySelector('span').textContent = producto.precio
		templateCarrito.querySelectorAll('td')[4].querySelector('span').textContent = producto.precio * producto.cantidad
		const clone = templateCarrito.cloneNode(true)
		fragment.appendChild( clone )

		const cloneOrange = templateOrangeCarrito.cloneNode(true)
		fragmentOrange.appendChild( cloneOrange )
	});
	
	// [fragment] :: <tr> </tr> correspondiente a N 'DetalleS de venta' (GUI), se agrregaN como hijos al
	// <tbody> de la Tabla-HTML5 (GUI: del carrito de compras) 
	items.appendChild( fragment );
	itemsOrange.appendChild( fragmentOrange );
}