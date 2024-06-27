function validar() {
    // Obtener los valores de los campos
    var nombre = document.getElementById('nombre').value.trim();
    var apellido = document.getElementById('apellido').value.trim();
    var email = document.getElementById('email').value.trim();
    var servicio = document.getElementById('servicio').value;
    var duracion = document.getElementById('duracion').value.trim();
    var costo = document.getElementById('costo').value.trim();
    var dia = document.getElementById('dia').value.trim();
    var mes = document.getElementById('mes').value.trim();
    var anio = document.getElementById('anio').value.trim();
    var observaciones = document.getElementById('observaciones').value.trim();

    // Limpiar mensajes de error anteriores
    var inputs = document.querySelectorAll('input, textarea, select'); 
    inputs.forEach(function(input) {
        input.classList.remove('error');
        input.style.borderColor = '';
        input.style.backgroundColor = '';
    });

    var esValido = true;

    // Validar que los campos obligatorios no estén vacíos
    if (!nombre) {
        marcarError('nombre');
        esValido = false;
    }
    if (!apellido) {
        marcarError('apellido');
        esValido = false;
    }
    if (!email) {
        marcarError('email');
        esValido = false;
    }
    if (!servicio) {
        marcarError('servicio');
        esValido = false;
    }
    if (!duracion) {
        marcarError('duracion');
        esValido = false;
    }
    if (!costo) {
        marcarError('costo');
        esValido = false;
    }
    if (!dia) {
        marcarError('dia');
        esValido = false;
    }
    if (!mes) {
        marcarError('mes');
        esValido = false;
    }
    if (!anio) {
        marcarError('anio');
        esValido = false;
    }

    // Validar formato de email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        marcarError('email');
        esValido = false;
    }

    // Validar que día, mes y año sean números enteros positivos
    if (dia && (!/^\d+$/.test(dia) || parseInt(dia) <= 0)) {
        marcarError('dia');
        esValido = false;
    }
    if (mes && (!/^\d+$/.test(mes) || parseInt(mes) <= 0)) {
        marcarError('mes');
        esValido = false;
    }
    if (anio && (!/^\d+$/.test(anio) || parseInt(anio) <= 0)) {
        marcarError('anio');
        esValido = false;
    }

    // Validar fecha válida
    if (dia && mes && anio) {
        var fecha = new Date(anio, mes - 1, dia);
        var fechaHoy = new Date();
        var fechaLimite = new Date(fechaHoy.getFullYear() - 100, fechaHoy.getMonth(), fechaHoy.getDate());

        if (fecha.getFullYear() != anio || fecha.getMonth() + 1 != mes || fecha.getDate() != dia) {
            marcarError('dia');
            marcarError('mes');
            marcarError('anio');
            esValido = false;
        } else if (fecha > fechaHoy) {
            marcarError('dia');
            marcarError('mes');
            marcarError('anio');
            esValido = false;
        } else if (fecha < fechaLimite) {
            marcarError('dia');
            marcarError('mes');
            marcarError('anio');
            esValido = false;
        }
    }

    // Validar duración y costo como números positivos
    if (duracion && (!/^\d+$/.test(duracion) || parseInt(duracion) <= 0)) {
        marcarError('duracion');
        esValido = false;
    }
    if (costo && (!/^\d+(\.\d{1,2})?$/.test(costo) || parseFloat(costo) <= 0)) {
        marcarError('costo');
        esValido = false;
    }

    // Mostrar mensaje de éxito si todo es válido
    if (esValido) {
        alert('Su reseña ha sido enviada con exito!');
    }

    return false; // Prevenir el envío del formulario para realizar la validación

    function marcarError(campoId) {
        var campo = document.getElementById(campoId);
        campo.classList.add('error');
        campo.style.borderColor = 'red';
        campo.style.backgroundColor = '#fdd';
    }
}

       //Script para controlar el pintado de las estrellas en el formulario (Si elijo la estrella 2, que también se pinte la 1 y etc.)
       document.addEventListener('DOMContentLoaded', function() {
        const stars = document.querySelectorAll('.rating input');
        
        stars.forEach(star => {
            star.addEventListener('change', function() {
                updateStars(this.value);
            });
        });
    
        function updateStars(rating) {
            stars.forEach(star => {
                const label = star.nextElementSibling;
                if (star.value <= rating) {
                    label.classList.add('checked');
                } else {
                    label.classList.remove('checked');
                }
            });
        }
    });