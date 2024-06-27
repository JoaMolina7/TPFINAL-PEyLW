document.addEventListener('DOMContentLoaded', function() {
    var botonCarrito = document.getElementById('cart-button');
    var desplegableCarrito = document.getElementById('cart-dropdown');
    var overlay = document.getElementById('overlay');
    var botonesAgregar = document.querySelectorAll('.add-to-cart');
    const formularioDiv = document.getElementById('formulario-compra');
    const botonComprar = document.getElementById('buy-button');
    const modalFormulario = document.getElementById('modal-formulario-productos');
    const modalCompra = document.getElementById('modal-exito-compra');
    const closeForm = document.getElementById('close-formulario-productos');
    const closeCompra = document.getElementById('close-exito-compra');
    const cerrarExitoBtn = document.getElementById('cerrar-compra');
    let totalCarrito = 0;
    
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
        totalCarrito = 0;

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
    
    closeForm.addEventListener('click', () => cerrarModal(modalFormulario));
    closeCompra.addEventListener('click', () => cerrarModal(modalCompra));
    cerrarExitoBtn.addEventListener('click', () => cerrarModal(modalCompra));
    
    
    botonComprar.addEventListener('click', function() {
        if(totalCarrito < 1) {
            alert('No hay productos en el carrito');
        }else{
            formularioDiv.innerHTML = '';
            const formularioHTML = `
                <form id="contactForm">
                    <div class="form-group">
                        <label for="name" class="form-label">Nombre completo</label>
                        <input type="text" id="name" class="form-input" placeholder="Ingresa tu nombre completo" />
                    </div>
                    <div class="form-group">
                        <label for="phone" class="form-label">Número telefónico</label>
                        <input type="tel" id="phone" class="form-input" placeholder="Ingresa tu número telefónico" />
                    </div>
                    <div class="form-group">
                        <label for="email" class="form-label">Correo Electrónico</label>
                        <input type="email" id="email-carrito" class="form-input" placeholder="Ingresa tu correo electrónico" />
                    </div>
                    <div class="form-group">
                        <label for="precio" id="precio-label" class="form-label">Precio a abonar:</label>
                        <span id="precio" class="form-price">$${totalCarrito.toFixed(2)}</span>
                    </div>
                    <div class="form-group">
                        <label for="payment" class="form-label">Método de pago</label>
                        <select id="payment" class="form-select">
                            <option value="">Selecciona un método de pago</option>
                            <option value="cash">Efectivo</option>
                            <option value="mercadopago">Mercado Pago</option>
                            <option value="credit-card">Tarjeta de Crédito</option>
                            <option value="debit-card">Tarjeta de Débito</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="form-button">Enviar</button>
                    </div>
                </form>
            `;
            formularioDiv.innerHTML = formularioHTML;
            abrirModal(modalFormulario); 

            const contactForm = document.getElementById('contactForm');
    
            contactForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const nombre = document.getElementById('name').value;
                const telefono = document.getElementById('phone').value;
                const email = document.getElementById('email-carrito').value;
                const medioPago = document.getElementById('payment').value;
        
                // Validación de los campos
                var esValido = true;
        
                // Limpiar mensajes de error anteriores
                var inputs = document.querySelectorAll('#contactForm input, #contactForm select');
                inputs.forEach(function(input) {
                    input.classList.remove('error');
                    input.style.borderColor = '';
                    input.style.backgroundColor = '';
                });
        
                // Validar que los campos obligatorios no estén vacíos
                if (!nombre) {
                    marcarError('name');
                    esValido = false;
                }
                if (!email) {
                    marcarError('email-carrito');
                    esValido = false;
                }
                if (!medioPago) {
                    marcarError('payment');
                    esValido = false;
                }
            
                if (!telefono) {
                    marcarError('phone');
                    esValido = false;
                }
                // Validar formato de email
                var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                if (email && !emailRegex.test(email)) {
                    marcarError('email-carrito');
                    esValido = false;
                }
        
                // Validar que el número de teléfono sea numérico y tenga 9 dígitos
                var telefonoRegex = /^[0-9]{9,}$/;
                if (telefono && !telefonoRegex.test(telefono)) {
                    marcarError('phone');
                    esValido = false;
                }
        
                // Mostrar mensaje de éxito si todo es válido
                if (esValido) {
                    // Mostrar el modal de éxito
                    abrirModal(modalCompra);
                    cerrarModal(modalFormulario);
                    // Limpiar el local storage del carrito
                    localStorage.removeItem('carrito');
                    // Actualizar la visualización del carrito para reflejar que está vacío
                    actualizarVisualizacionCarrito();
                }
        
                return false; // Prevenir el envío del formulario para realizar la validación
            });  
        };
        
    });


    function marcarError(campoId) {
        var campo = document.getElementById(campoId);
        campo.classList.add('error');
        campo.style.borderColor = 'red';
        campo.style.backgroundColor = '#fdd';
    }

    function abrirModal(modal) {
        modal.style.display = 'block';
    }

    function cerrarModal(modal) {
        modal.style.display = 'none';
    }
})
