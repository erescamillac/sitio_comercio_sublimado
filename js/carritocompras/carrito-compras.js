const filaProductos = document.getElementById('id-contenedor-productos');

const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content

const items = document.getElementById('items')
const footer = document.getElementById('footer')

let carrito = {};

filaProductos.addEventListener('click', e => {
	addCarrito(e)
});

const addCarrito = e => {
	console.log( e.target );
	console.log( e.target.classList.contains('btn-add-to-cart') );
	if( e.target.classList.contains('btn-add-to-cart') ){
		// Agregar producto (item) al Carrito ['lista' / 'Colección' en JS]
		// console.log( e.target.parentElement.parentElement.parentElement.parentElement );
		setCarrito( e.target.parentElement.parentElement.parentElement.parentElement );
	}
	e.stopPropagation();
}

const setCarrito = objeto => {
	console.log( objeto );
    console.log( '--TEST de queryselector-- :: ' );
    console.log( objeto.querySelector("div.product-content input[name='prod_id']") );
    console.log( "id :: " );
    console.log( objeto.querySelector("div.product-content input[name='prod_id']").id );
    
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

    carrito[producto.id] = {...producto};

    pintarCarrito();
    
	// console.log( producto );
    // console.log( carrito );
}

const pintarCarrito = () => {
    console.log( "dentro de la función pintarCarrito()..." );
	console.log( carrito );
    items.innerHTML = '';
    let fragment = new DocumentFragment();
	Object.values(carrito).forEach( producto => {
		templateCarrito.querySelector('th').textContent = producto.id
		templateCarrito.querySelectorAll('td')[0].textContent = producto.titulo
		templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
		templateCarrito.querySelector('.btn-info').dataset.id = producto.id
		templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
		templateCarrito.querySelectorAll('td')[3].querySelector('span').textContent = producto.precio
		templateCarrito.querySelectorAll('td')[4].querySelector('span').textContent = producto.precio * producto.cantidad
		const clone = templateCarrito.cloneNode(true)
		fragment.appendChild( clone )
	});
	
	items.appendChild( fragment );
}