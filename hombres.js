class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    }
}

class Producto {
    constructor(id, nombre, precio, imagen){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

async function buscarProductos() {
    let json = await fetch('/productos.json',
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
    let productos = await json.json();
    return productos;
}

function crearCajaProducto(producto) {
    let imagenProducto = document.createElement('img');
    imagenProducto.setAttribute('src', '../imagen/' + producto.imagen);
    let parrafoPrecio = document.createElement('p');
    parrafoPrecio.textContent = producto.precio;
    let parrafoNombre = document.createElement('p');
    parrafoNombre.textContent = producto.nombre;

    let cajaProducto = document.createElement('div');

    cajaProducto.append(imagenProducto);
    cajaProducto.append(parrafoNombre);
    cajaProducto.append(parrafoPrecio);

    return cajaProducto;
}

function cargarProductos() {
    const contenedorProductos = document.getElementsByClassName('mainhombres')[0];
    buscarProductos().then( productos => {
        Array.from(productos).forEach( producto => contenedorProductos.append(crearCajaProducto(producto)));
    });
}

cargarProductos();



/* 
const carrito = new Carrito();

let botones = document.getElementsByClassName("victoria-js-agregar-carrito");
Array.from(botones).forEach(boton => boton.addEventListener("click", function(e) {
    let contenedorProducto = this.parentElement;
    let nombreProducto = contenedorProducto.getElementsByClassName("victoria-js-nombre-producto")[0].textContent;
    let precioProducto = contenedorProducto.getElementsByClassName("victoria-js-precio-producto")[0].textContent;
    let producto = new Producto(1, nombreProducto , precioProducto, "");
    carrito.agregarProducto(producto)
})); */


