document.addEventListener('DOMContentLoaded', () => {
    const peluqueros = document.querySelectorAll('.peluquero');
    const fechasDiv = document.getElementById('fechas');
    const horariosDiv = document.getElementById('horarios');
    const modalFechas = document.getElementById('modal-fechas');
    const modalHorarios = document.getElementById('modal-horarios');
    const modalFormulario = document.getElementById('modal-form');
    const modalExito = document.getElementById('modal-exito');
    const closeFechas = document.getElementById('close-fechas');
    const closeHorarios = document.getElementById('close-horarios');
    const closeFormulario = document.getElementById('close-formulario');
    const closeExito = document.getElementById('close-exito');
    const cerrarExitoBtn = document.getElementById('cerrar-exito');
    const formularioDiv = document.getElementById('formulario');
    
    let disponibilidad = obtenerDisponibilidad();
  

    // Genera fechas desde hoy hasta 14 días adelante
    function generarFechas() {
        const fechas = [];
        const hoy = new Date();
        for (let i = 0; i <= 15; i++) {
            const fecha = new Date(hoy);
            fecha.setDate(hoy.getDate() + i);
            fechas.push(fecha);
        }
        return fechas;
    }

    // Formatea la fecha en "Lunes 24 - Junio"
    function formatearFecha(fecha) {
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        const diaSemana = diasSemana[fecha.getDay()];
        const dia = fecha.getDate();
        const mes = meses[fecha.getMonth()];

        return `${diaSemana} ${dia} - ${mes}`;
    }

    // Obtener disponibilidad del localStorage
    function obtenerDisponibilidad() {
        let disponibilidad = JSON.parse(localStorage.getItem('disponibilidad'));
        if (!disponibilidad) {
            disponibilidad = generarDisponibilidad();
            guardarLocalStorage(disponibilidad);
        }
        return disponibilidad;
    }

    // Genera disponibilidad aleatoria para los próximos 14 días
    function generarDisponibilidad() {
        const disponibilidad = {};
        const peluquerosIds = ['1', '2', '3'];
        const fechas = generarFechas();
        peluquerosIds.forEach(id => {
            disponibilidad[id] = {};
            fechas.forEach(fecha => {
                const fechaISO = fecha.toISOString().split('T')[0];
                const horarios = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
                const horariosDisponibles = horarios.map(horario => Math.random() > 0.3 ? horario : "ocupado");
                disponibilidad[id][fechaISO] = horariosDisponibles;
            });
        });
        return disponibilidad;
    }


    // Asignar evento click a cada botón de agendar
    document.querySelectorAll('.btn-agendar').forEach(btn => {
        btn.addEventListener('click', () => {
            const peluqueroId = btn.closest('.peluquero').getAttribute('data-id');
            mostrarFechas(peluqueroId);
            abrirModal(modalFechas);
        });
    });

    closeFechas.addEventListener('click', () => cerrarModal(modalFechas));
    closeHorarios.addEventListener('click', () => cerrarModal(modalHorarios));
    closeFormulario.addEventListener('click', () => cerrarModal(modalFormulario));
    closeExito.addEventListener('click', () => cerrarModal(modalExito));
    cerrarExitoBtn.addEventListener('click', () => cerrarModal(modalExito));
    function mostrarFechas(peluqueroId) {
        fechasDiv.innerHTML = '';

        for (const fechaISO in disponibilidad[peluqueroId]) {
            const fecha = new Date(fechaISO);
            const fechaFormateada = formatearFecha(fecha);

            const fechaDiv = document.createElement('div');
            fechaDiv.classList.add('fecha');
            fechaDiv.textContent = fechaFormateada;
            fechaDiv.addEventListener('click', () => {
                mostrarHorarios(peluqueroId, fechaISO);
                cerrarModal(modalFechas);
                abrirModal(modalHorarios);
            });
            fechasDiv.appendChild(fechaDiv);
        }
    }

    function mostrarHorarios(peluqueroId, fecha) {
        horariosDiv.innerHTML = '';

        disponibilidad[peluqueroId][fecha].forEach((horario, index) => {
            const horarioDiv = document.createElement('div');
            horarioDiv.classList.add('horario');
            if (horario === "ocupado") {
                horarioDiv.classList.add('ocupado');
                horarioDiv.textContent = "Ocupado";
            } else {
                horarioDiv.textContent = horario;
                horarioDiv.addEventListener('click', () => abrirFormulario(peluqueroId, fecha, index));
            }
            horariosDiv.appendChild(horarioDiv);
        });
    }

     function abrirFormulario(peluqueroId, fecha, horarioIndex) {
        const horario = disponibilidad[peluqueroId][fecha][horarioIndex];


        // Verificar que el horario esté disponible
        if (horario !== "ocupado") {
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
                        <input type="email" id="email" class="form-input" placeholder="Ingresa tu correo electrónico" />
                    </div>
                    <div class="form-group">
                        <label for="servicio" class="form-label">Servicio</label>
                        <select id="servicio" class="form-select">
                            <option value="">Seleccione un servicio</option>
                            <option value="corte-de-pelo">Corte de pelo - $5500</option>
                            <option value="corte-de-pelo-barba">Corte de pelo y barba - $6000</option>
                            <option value="color">Color y corte - $14500</option>
                            <option value="color-barba">Color, corte y barba - $15000</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="precio" id="precio-label" class="form-label">Precio a abonar</label>
                        <span id="precio" class="form-price"></span>
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
            cerrarModal(modalHorarios);

            const contactForm = document.getElementById('contactForm');
            const servicioSelect = document.getElementById('servicio');
            const precioLabel = document.getElementById('precio-label');
            const precioSpan = document.getElementById('precio');

            // Event listener para actualizar el precio según el servicio seleccionado
            servicioSelect.addEventListener('change', () => {
                const servicioSeleccionado = servicioSelect.value;
                switch (servicioSeleccionado) {
                    case 'corte-de-pelo':
                        precioLabel.textContent = 'Precio a abonar: $5500';
                        break;
                    case 'corte-de-pelo-barba':
                        precioLabel.textContent = 'Precio a abonar: $6000';
                        break;
                    case 'color':
                        precioLabel.textContent = 'Precio a abonar: $14500';
                        break;
                    case 'color-barba':
                        precioLabel.textContent = 'Precio a abonar: $15000';
                        break;
                    default:
                        precioLabel.textContent = 'Precio a abonar';
                        break;
                }
            });

            contactForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const nombre = document.getElementById('name').value;
                const telefono = document.getElementById('phone').value;
                const email = document.getElementById('email').value;
                const medioPago = document.getElementById('payment').value;
                const servicio = document.getElementById('servicio').value;

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
                    marcarError('email');
                    esValido = false;
                }
                if (!medioPago) {
                    marcarError('payment');
                    esValido = false;
                }
                if (!servicio) {
                    marcarError('servicio');
                    esValido = false;
                }
                if (!telefono) {
                    marcarError('phone');
                    esValido = false;
                }
                // Validar formato de email
                var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                if (email && !emailRegex.test(email)) {
                    marcarError('email');
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
                    abrirModal(modalExito);

                    // Actualizar disponibilidad a ocupado y guardar en localStorage
                    disponibilidad[peluqueroId][fecha][horarioIndex] = "ocupado";
                    guardarLocalStorage(disponibilidad);

                    // Cerrar todos los modales
                    cerrarModal(modalFechas);
                    cerrarModal(modalHorarios);
                    cerrarModal(modalFormulario);
                }

                return false; // Prevenir el envío del formulario para realizar la validación
            });

            function marcarError(campoId) {
                var campo = document.getElementById(campoId);
                campo.classList.add('error');
                campo.style.borderColor = 'red';
                campo.style.backgroundColor = '#fdd';
            }
        } else {
            alert('Este horario ya está ocupado. Por favor, selecciona otro horario disponible.');
        }
    }

    function abrirModal(modal) {
        modal.style.display = 'block';
    }

    function cerrarModal(modal) {
        modal.style.display = 'none';
    }

    function guardarLocalStorage(data) {
        const hoy = new Date();
        for (const peluqueroId in data) {
            for (const fechaISO in data[peluqueroId]) {
                if (new Date(fechaISO) < hoy) {
                    delete data[peluqueroId][fechaISO];
                }
            }
        }
        localStorage.setItem('disponibilidad', JSON.stringify(data));
    }

    // Generar automáticamente la próxima fecha disponible después de una reserva

    
});