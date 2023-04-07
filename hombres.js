class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        let productoAComprar = new ProductoAComprar(producto.id, 1, producto.precio);
        if(this.productos.filter( p => p.id === producto.id).length === 0) {
            this.productos.push(productoAComprar);
        } else {
            let productoAAumentarCantidad = this.productos.find( p => p.id === producto.id);
            productoAAumentarCantidad.cantidad += 1
        }
    }

    quitarDelCarrito(id) {
        let productoABajarCantidad = this.productos.find( p => p.id === id);
        if (productoABajarCantidad && productoABajarCantidad.cantidad !== 0) {
            productoABajarCantidad.cantidad -= 1;
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'No hay ítems de este producto en el carrito :(',
                icon: 'error',
                confirmButtonText: 'Continuar comprando'
              });
            //alert('Gil! Ya no hay productos para sacar!');
        }
    }

    obtenerCantidadTotal() {
        function sumarCantidadTotal(acumulador, producto) {
            acumulador = acumulador + producto.cantidad;
            return acumulador;
        }
        let cantidadTotal = this.productos.reduce(sumarCantidadTotal, 0);
        return cantidadTotal;
    }
    obtenerImporteTotal() {
        function sumarImporteTotal(acumulador, producto) {
            acumulador = acumulador + producto.precio * producto.cantidad;
            return acumulador;
        }
        let importeTotal = this.productos.reduce(sumarImporteTotal, 0);
        return importeTotal;
    }
}

class ProductoAComprar {
    constructor(id, cantidad, precio){
        this.id = id;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}

const carrito = new Carrito();

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
    let botonAgregarAlCarrito = document.createElement('button');
    let botonQuitarDelCarrito = document.createElement('button');
    botonAgregarAlCarrito.textContent = 'Agregar al carrito';
    botonAgregarAlCarrito.addEventListener('click', () => {
        carrito.agregarProducto(producto)
        mostrarCantidadProductosSeleccionados(); 
        mostrarImporteTotal();  
    });

    botonQuitarDelCarrito.textContent = 'Quitar del carrito';
    botonQuitarDelCarrito.addEventListener('click', () => {
        carrito.quitarDelCarrito(producto.id);
        mostrarCantidadProductosSeleccionados();
        mostrarImporteTotal();
    });
    
    let cajaProducto = document.createElement('div');
    cajaProducto.dataset.idProducto = producto.id;

    cajaProducto.append(imagenProducto);
    cajaProducto.append(parrafoNombre);
    cajaProducto.append(parrafoPrecio);
    cajaProducto.append(botonAgregarAlCarrito);
    cajaProducto.append(botonQuitarDelCarrito);

    return cajaProducto;
}

function cargarProductos() {
    const contenedorProductos = document.getElementsByClassName('mainhombres')[0];
    buscarProductos().then( productos => {
        Array.from(productos).forEach( producto => contenedorProductos.append(crearCajaProducto(producto)));
    });
}

function mostrarCantidadProductosSeleccionados() {
    const textosCantidadCarrito = document.querySelectorAll('.victoria-js-cantidad-productos-carrito');
    Array.from(textosCantidadCarrito).forEach( textoCantidad => textoCantidad.textContent = carrito.obtenerCantidadTotal());
}
function mostrarImporteTotal() {
    const textosCantidadCarrito = document.querySelectorAll('.victoria-js-importe-total-carrito');
    Array.from(textosCantidadCarrito).forEach( textoCantidad => textoCantidad.textContent = carrito.obtenerImporteTotal());
}

cargarProductos();


/* 
let botones = document.getElementsByClassName("victoria-js-agregar-carrito");
Array.from(botones).forEach(boton => boton.addEventListener("click", function(e) {
    let contenedorProducto = this.parentElement;
    let nombreProducto = contenedorProducto.getElementsByClassName("victoria-js-nombre-producto")[0].textContent;
    let precioProducto = contenedorProducto.getElementsByClassName("victoria-js-precio-producto")[0].textContent;
    let producto = new Producto(1, nombreProducto , precioProducto, "");
    carrito.agregarProducto(producto)
})); */


