// turnos.js
document.addEventListener('DOMContentLoaded', () => {
    const peluqueros = document.querySelectorAll('.peluquero');
    const fechasDiv = document.getElementById('fechas');
    const horariosDiv = document.getElementById('horarios');
    const modalFechas = document.getElementById('modal-fechas');
    const modalHorarios = document.getElementById('modal-horarios');
    const closeFechas = document.getElementById('close-fechas');
    const closeHorarios = document.getElementById('close-horarios');
    
    const disponibilidad = {
        "1": {
            "2024-06-20": ["10:00", "11:00", "15:00", "ocupado", "17:00"],
            "2024-06-21": ["9:00", "ocupado", "13:00", "ocupado", "16:00"]
        },
        "2": {
            "2024-06-20": ["9:00", "ocupado", "12:00", "13:00", "14:00"],
            "2024-06-21": ["10:00", "11:00", "ocupado", "14:00", "17:00"]
        },
        "3": {
            "2024-06-20": ["8:00", "ocupado", "13:00", "14:00", "15:00"],
            "2024-06-21": ["9:00", "10:00", "11:00", "ocupado", "16:00"]
        }
    };

    peluqueros.forEach(peluquero => {
        peluquero.addEventListener('click', () => {
            const peluqueroId = peluquero.getAttribute('data-id');
            mostrarFechas(peluqueroId);
            abrirModal(modalFechas);
        });
    });
    
    closeFechas.addEventListener('click', () => cerrarModal(modalFechas));
    closeHorarios.addEventListener('click', () => cerrarModal(modalHorarios));
    
    function mostrarFechas(peluqueroId) {
        fechasDiv.innerHTML = '';
        
        for (const fecha in disponibilidad[peluqueroId]) {
            const fechaDiv = document.createElement('div');
            fechaDiv.classList.add('fecha');
            fechaDiv.textContent = fecha;
            fechaDiv.addEventListener('click', () => {
                mostrarHorarios(peluqueroId, fecha);
                cerrarModal(modalFechas);
                abrirModal(modalHorarios);
            });
            fechasDiv.appendChild(fechaDiv);
        }
    }
    
    function mostrarHorarios(peluqueroId, fecha) {
        horariosDiv.innerHTML = '';
        
        disponibilidad[peluqueroId][fecha].forEach(horario => {
            const horarioDiv = document.createElement('div');
            horarioDiv.classList.add('horario');
            if (horario === "ocupado") {
                horarioDiv.classList.add('ocupado');
                horarioDiv.textContent = "Ocupado";
            } else {
                horarioDiv.textContent = horario;
                horarioDiv.addEventListener('click', () => reservarTurno(fecha, horario));
            }
            horariosDiv.appendChild(horarioDiv);
        });
    }
    
    function reservarTurno(fecha, horario) {
        alert(`Turno reservado para el ${fecha} a las ${horario}`);
        cerrarModal(modalHorarios);
    }

    function abrirModal(modal) {
        modal.style.display = 'block';
    }

    function cerrarModal(modal) {
        modal.style.display = 'none';
    }

    window.addEventListener('click', (event) => {
        if (event.target === modalFechas) {
            cerrarModal(modalFechas);
        } else if (event.target === modalHorarios) {
            cerrarModal(modalHorarios);
        }
    });
});
