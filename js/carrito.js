document.addEventListener('DOMContentLoaded', function() {
    var botonCarrito = document.getElementById('cart-button');
    var desplegableCarrito = document.getElementById('cart-dropdown');
    var overlay = document.getElementById('overlay');
    var botonesAgregar = document.querySelectorAll('.add-to-cart');

    // Evento para alternar el menú desplegable del carrito
    botonCarrito.addEventListener('click', function(evento) {
        evento.preventDefault(); // Evita la acción predeterminada del enlace
        alternarDesplegableCarrito();
    });

    // Función para alternar la visibilidad del menú desplegable del carrito
    function alternarDesplegableCarrito() {
        var isVisible = desplegableCarrito.style.display === 'block';
        desplegableCarrito.style.display = isVisible ? 'none' : 'block';
        overlay.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) {
            actualizarVisualizacionCarrito();
        }
    }

    // Añadir evento de clic a cada botón de "Añadir al carrito"
    botonesAgregar.forEach(function(boton) {
        boton.addEventListener('click', agregarAlCarrito);
    });

    // Función para agregar un producto al carrito
    function agregarAlCarrito(evento) {
        var boton = evento.target;
        var id = boton.getAttribute('data-id');
        var nombre = boton.getAttribute('data-name');
        var precio = parseFloat(boton.getAttribute('data-price')); // Convertimos el precio a número
        var imagen = boton.getAttribute('data-image'); // Obtiene la URL de la imagen del producto

        // Obtenemos el carrito desde localStorage
        var carrito = localStorage.getItem('carrito');
        carrito = carrito ? JSON.parse(carrito) : [];

        // Buscamos si el producto ya está en el carrito
        var indiceItem = carrito.findIndex(function(item) {
            return item.id === id;
        });

        if (indiceItem > -1) {
            // Si ya está, aumentamos la cantidad
            carrito[indiceItem].cantidad += 1;
        } else {
            // Si no está, lo añadimos al carrito
            carrito.push({ id: id, nombre: nombre, precio: precio, cantidad: 1, imagen: imagen });
        }

        // Guardamos el carrito actualizado en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert('Producto añadido al carrito');
        actualizarVisualizacionCarrito();
    }

    // Función para actualizar la visualización del carrito
    function actualizarVisualizacionCarrito() {
        var carrito = localStorage.getItem('carrito');
        carrito = carrito ? JSON.parse(carrito) : [];

        var contenedorItemsCarrito = document.querySelector('.cart-items');
        var elementoTotalCarrito = document.getElementById('cart-total');
        contenedorItemsCarrito.innerHTML = ''; // Limpiamos el contenedor de items
        var totalCarrito = 0;

        // Iteramos sobre cada producto en el carrito para mostrarlo
        carrito.forEach(function(item) {
            var elementoItem = document.createElement('div');
            elementoItem.classList.add('cart-item');
            elementoItem.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}">
                <h3>${item.nombre}</h3>
                <p>$${item.precio.toFixed(2)}</p>
                <p><button class="decrement-item" data-id="${item.id}">-</button>
                ${item.cantidad} <button class="increment-item" data-id="${item.id}">+</button></p>
                <button class="delete-item" data-id="${item.id}">Eliminar</button>
            `;
            contenedorItemsCarrito.appendChild(elementoItem);

            // Botón eliminar producto del carrito
            var botonEliminar = elementoItem.querySelector('.delete-item');
            botonEliminar.addEventListener('click', function() {
                carrito = carrito.filter(function(producto) {
                    return producto.id !== item.id;
                });
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarVisualizacionCarrito();
            });

            // Botón incrementar cantidad del producto
            var botonIncrementar = elementoItem.querySelector('.increment-item');
            botonIncrementar.addEventListener('click', function() {
                item.cantidad += 1;
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarVisualizacionCarrito();
            });

            // Botón decrementar cantidad del producto
            var botonDecrementar = elementoItem.querySelector('.decrement-item');
            botonDecrementar.addEventListener('click', function() {
                if (item.cantidad > 1) {
                    item.cantidad -= 1;
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    actualizarVisualizacionCarrito();
                }
            });

            // Calculamos el total del carrito
            totalCarrito += item.precio * item.cantidad;
        });

        // Actualizamos el total del carrito en la interfaz
        elementoTotalCarrito.textContent = "Total: $" + totalCarrito.toFixed(2);
    }

    // Evento para cerrar el menú desplegable del carrito
    overlay.addEventListener('click', function() {
        desplegableCarrito.style.display = 'none';
        overlay.style.display = 'none';
    });

    var cerrarX = document.getElementById('cerrar-X');
    cerrarX.addEventListener('click', function(evento) {
        evento.preventDefault();
        desplegableCarrito.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Actualizamos la visualización del carrito al cargar la página
    actualizarVisualizacionCarrito();
});
