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

// EQUIV :: header 
const carritoGeneralOrange = document.getElementById('carrito-general-orange')

// EQUIV :: 'Orange'-header : Total de Artículos ::
const barraNaranjaDeCompras = document.getElementById('barraDeCompras')

// Representación del CARRITO a nivel LÓGICO (en Memoria) como un OBJETO, inicialmente VACÍO (sin propiedades)
let carrito = {};

// --
document.addEventListener('DOMContentLoaded', () => {
	// fetchData();
	if(localStorage.getItem('carrito')){
		carrito = JSON.parse( localStorage.getItem('carrito') );
		pintarCarrito();
	}
});

const fetchData = async () => {
	try{
		const res = await fetch('api.json');
		const data = await res.json();
	}catch(error){
		console.log(error)
	}
}

// CADA VEZ que se haga CLIC en alguno de los elementos hijo de la 'Fila de productos'
// <div> contenedor de los 'Productos' (GUI) [div.single-product 'tarjeta de producto(GUI)']
// se invoca a la función ${ addCarrito(e) }
filaProductos.addEventListener('click', e => {
	addCarrito(e)
});

// CADA VEZ que se haga CLIC en alguno de los DETALLES DE VENTA (elementos hijo) del 'UL' 
// se invoca a la función ${deteccionBtnIdBasura}
// 'Real-Container' :: <ul id="real-container-detalles-venta" class="shopping-list"> (UL) ::
// const itemsOrange = document.getElementById('real-container-detalles-venta')
itemsOrange.addEventListener('click', e => {
	btnAccionArticulo(e)
});

const btnAccionArticulo = e =>{
	console.log( "dentro de la función deteccionBtnIdBasura(e)..." );
	console.log( e.target );
	console.log( "LISTA DE TODAS LAS Clases del elemento HTML en el que se hizo CLICK" );
	console.log( e.target.classList );
	console.log( e.target.classList.contains('fa-trash') );
	if( e.target.classList.contains('fa-trash') ){
		// e.target :: <i class="fa fa-trash"></i>
		console.log( "se hizo click en el Botón [ELIMINAR Artículo]" );
		/*
		<button class="boton_personalizado btn_eliminar_art" data-id="1">
													<i class="fa fa-trash"></i>
												</button>
		*/
		let btnEliminarArticulo = e.target.parentElement;
		console.log( btnEliminarArticulo );
		console.log( "El Artículo SELECCIONADO para ser Eliminado del carrito (id) es :: " );
		console.log( btnEliminarArticulo.dataset.id );

		//1.- Actualizar el objeto carrito [Eliminar la propiedad del Artículo]
		// carrito
		idProductoEliminar = btnEliminarArticulo.dataset.id;
		delete carrito[idProductoEliminar];
		//delete carrito[producto.id];

		//2.- pintarCarrito()
		// pintarCarrito();
	}else if( e.target.classList.contains('btnAgregar') ){
		console.log( "Se hizo clic en el Boton [AGREGAR] : [+]" );
		let btnAumentar = e.target;
		idProductoAumentar = btnAumentar.dataset.id;
		console.log( "id del Producto (Aumentar) :: " );
		console.log( idProductoAumentar );
		const prodcutoTmp = carrito[idProductoAumentar];
		prodcutoTmp.cantidad = carrito[idProductoAumentar].cantidad + 1;
		carrito[idProductoAumentar] = {...prodcutoTmp};
	}else if( e.target.classList.contains('btnDisminuir') ){
		console.log( "Se hizo clic en el Boton [DISMINUIR] : [-]" );
		let btnDisminuir = e.target;
		idProductoDisminuir = btnDisminuir.dataset.id;

		const prodcutoTmp = carrito[idProductoDisminuir];
		prodcutoTmp.cantidad = carrito[idProductoDisminuir].cantidad - 1;

		if( prodcutoTmp.cantidad === 0 ){
			delete carrito[idProductoDisminuir];
		}else{
			console.log( "id del Producto (Disminuir) :: " );
			console.log( idProductoDisminuir );
			carrito[idProductoDisminuir] = {...prodcutoTmp};
		}

	}
	console.log( "--SE VUELVE A PINTAR EL CARRITO() :: " );
	pintarCarrito();
	e.stopPropagation();
}

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
		// de los Detalles del Artículo ESPECÍFICO (seleccionado / clickeado por el Usuario) [nombre_art, precio_unit, id_prod])

		// la función [setCarrito()] es la QUE REALMENTE 'agregar' el Producto a la 'Lista interna' del OBJ. js [carrito={}] 
		setCarrito( e.target.parentElement.parentElement.parentElement.parentElement );
	}
	e.stopPropagation();
}


// la funcion setCarrito( objeto ) :: contiene la LÓGICA
//  para agregar el Artículo seleccionado por el Cliente 
// al obj. JS [carrito] EN MEMORIA (--sin mostrar en Pantalla : GUI / HTML5--)
const setCarrito = objeto => {
	console.log( "dentro de la función setCarrito(objeto)" );
	// [objeto] :: 'apunta' a div.single-product
	console.log( objeto );
    console.log( '--TEST de queryselector-- :: ' );
    console.log( objeto.querySelector("div.product-content input[name='prod_id']") );
    console.log( "id (del Producto a AGREGAR al carrito-JS-) :: " );
    console.log( objeto.querySelector("div.product-content input[name='prod_id']").id );
    
	// 'Construcción' del objeto [producto] (EN MEMORIA) que se AGREGARÁ al carrito...
	const producto = {
        // var el = document.querySelector("div.user-panel.main input[name='login']");
		// id: objeto.querySelector('.btn-dark').dataset.id
        id: objeto.querySelector("div.product-content input[name='prod_id']").id,
        titulo: objeto.querySelector('div.product-content h3 a').textContent,
        precio: objeto.querySelector('div.product-content div.product-price span').textContent,
		urlImagen: objeto.querySelector('div.product-img a.img-producto-menu img.default-img').src,
        cantidad: 1
	};

	// Mostrar el contenido del OBJ. recién creado [producto] :
	console.log( "--Contenido del Nuevo-OBJ [producto]." );
	console.log( producto );
	console.log( "++Contenido del Nuevo-OBJ [producto]." );


    producto.precio = producto.precio.replace("$", "");

	// -- SI el carrito YA CONTIENE (previamente) el Artículo seleccionado
	// ++ EVITAR: duplicidad en el Listado de Artículos (SOLO AUMENTAR la .propiedad ${.cantidad} del OBJ-JS [producto])
    if( carrito.hasOwnProperty(producto.id) ){
		// SOLO aumentar la cantidad del artículo::
		console.log( "****SE dectecto PRODUCTO REPETIDO::" );
		producto.cantidad = carrito[producto.id].cantidad + 1;
	}

	// {...producto} :: COPIA del OBJ. JS [producto]
	console.log( "++Producto YA MODIFICADO en su attr. ${.cantidad} :: " );
	console.log( producto );
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
	console.log( "##-- INI: Contenido del OBJ. JS carrito" );
	console.log( carrito );
	console.log( "##++ FIN: Contenido del OBJ. JS carrito" );
	// 'items' hace REF. al <tbody> de la TABLA-HTML que representa visualmente al Carrito de compras
    items.innerHTML = '';
	// EQUIV. Orange Carrito::
	itemsOrange.innerHTML = '';

    let fragment = new DocumentFragment();
	let fragmentOrange = new DocumentFragment();

	Object.values(carrito).forEach( producto => {
		// 'template-carrito' : (GUI: HTML5) representa UNA FILA (<tr>) de 'Detalle de venta' en el carrito (GUI: HTML5)
		templateCarrito.querySelector('th').textContent = producto.id
		// equivalente en Orange ...
		templateOrangeCarrito.querySelector("input[name='prod_id_detalle_carrito']").value = producto.id

		templateCarrito.querySelectorAll('td')[0].textContent = producto.titulo
		// Orange ... ?? 
		templateOrangeCarrito.querySelector('h4 a').textContent = producto.titulo

		templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
		// Orange ...??
		templateOrangeCarrito.querySelector( 'p.quantity span.cantidad-articulos' ).textContent = producto.cantidad
		// <button class="btn btn-info btn-sm" data-id="4">
		templateCarrito.querySelector('.btn-info').dataset.id = producto.id
		templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

		// Equivalente 'Orange' de los botones de Aumentar / Disminuir ::
		templateOrangeCarrito.querySelector('div.contenedor-botones-mas-menos').querySelectorAll('button')[0].dataset.id = producto.id
		templateOrangeCarrito.querySelector('div.contenedor-botones-mas-menos').querySelectorAll('button')[1].dataset.id = producto.id

		templateOrangeCarrito.querySelector('div.contenedor-botones-mas-menos').querySelectorAll('button')[2].dataset.id = producto.id

		templateCarrito.querySelectorAll('td')[3].querySelector('span').textContent = producto.precio
		// Orange ...??
		// precio unitario
		templateOrangeCarrito.querySelector('p.quantity span.amount').textContent = producto.precio
		templateCarrito.querySelectorAll('td')[4].querySelector('span').textContent = producto.precio * producto.cantidad
		// Orange ...
		templateOrangeCarrito.querySelector('p.quantity span.subtotal-detalle strong').textContent = producto.precio * producto.cantidad

		templateOrangeCarrito.querySelector('div.contenedor-img-art-carrito a.cart-img img.img-70p-70p').src = producto.urlImagen
		// Paso 1.- obtener la URL de la img (desde la BD)
		// -- utilizar AJAX ::
		/* 
		const dataImgProd = await obtenerImagenProducto( { "id_producto" : producto.id } );
		templateOrangeCarrito.querySelector('div.contenedor-img-art-carrito a.cart-img img.img-70p-70p').src = dataImgProd.url_imagen;
		// --- INI: AJAX
		*/
		
		// templateOrangeCarrito 
		/*
		<img class="img-70p-70p" src="https://via.placeholder.com/70x70" alt="#">
		*/
		// URL : http://localhost/api_tmp_sublimado/productos.php
		
		// +++ FIN: AJAX

		const clone = templateCarrito.cloneNode(true)
		fragment.appendChild( clone )

		const cloneOrange = templateOrangeCarrito.cloneNode(true)
		fragmentOrange.appendChild( cloneOrange )

		// const cloneOrange = templateOrangeCarrito.cloneNode(true)
		// fragmentOrange.appendChild( cloneOrange )
	});
	
	// [fragment] :: <tr> </tr> correspondiente a N 'DetalleS de venta' (GUI), se agrregaN como hijos al
	// <tbody> de la Tabla-HTML5 (GUI: del carrito de compras) 
	items.appendChild( fragment );
	itemsOrange.appendChild( fragmentOrange );

	console.log( "se vuelve a pintar el FOOTER... ::" );
	pintarFooter();
	// ALMACENAR [carrito] en LOCAL-STORAGE ::
	localStorage.setItem('carrito', JSON.stringify(carrito));
}

const pintarFooter = () =>{
	console.log( "dentro de la función pintarFooter()" );
	let fragment = new DocumentFragment();
	let fragmentOrange = new DocumentFragment();
	footer.innerHTML = '';
	footerOrange.innerHTML = '';
	// SI el carrito está VACÍO
	if(Object.keys(carrito).length === 0){
		console.log( "--El carrito ESTÁ VACÍO ::--" );
		footer.innerHTML = `<th scope="row" colspan="6">Carrito vacío - comience a comprar!</th>`;
		fragmentOrange.innerHTML = `<div>Carrito vacío - comience a comprar!</div>`;
		// Actualizar Total de Artículos Naranja 'barra'
		barraNaranjaDeCompras.querySelectorAll('a')[0].querySelector('span.total-count').textContent = 0
		carritoGeneralOrange.querySelector('div.dropdown-cart-header span').textContent = 0 + " Artículos"
		return
	} //-- fin IF carrito VACÍO
	const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0);
	// producto.precio * producto.cantidad
	const nPrecio = Object.values(carrito).reduce(
		(accMonto, {precio, cantidad}) => accMonto + (precio * cantidad), 
	0);
	console.log( "Cantidad TOTAL de artículos en el Carrito ::" );
	console.log( nCantidad );
	console.log( "TOTAL de la Compra :: " );
	console.log( nPrecio );

	templateFooter.querySelectorAll('td')[0].textContent = nCantidad
	
	templateFooter.querySelector('span').textContent = nPrecio
	templateOrangeFooter.querySelector('div.total span.total-amount').textContent = nPrecio

	carritoGeneralOrange.querySelector('div.dropdown-cart-header span').textContent = nCantidad + " Artículos"
	barraNaranjaDeCompras.querySelectorAll('a')[0].querySelector('span.total-count').textContent = nCantidad

	const clone = templateFooter.cloneNode(true)
	const cloneOrange = templateOrangeFooter.cloneNode(true)

	fragment.appendChild(clone)
	fragmentOrange.appendChild(cloneOrange)
	footer.appendChild(fragment)
	footerOrange.appendChild(fragmentOrange)

	const btnVaciar = document.getElementById('vaciar-carrito')
	btnVaciar.addEventListener('click', () => {
		carrito = {} // OBJ. JS -- vacío
		pintarCarrito()
	});
}
