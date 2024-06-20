// js/slider.js

let indiceDiapositiva = 0;
const diapositivas = document.querySelectorAll('.slide'); // Obtener todas las diapositivas
const totalDiapositivas = diapositivas.length; // Obtener el número total de diapositivas

function cambiarSlide(direccion) {
    indiceDiapositiva = (indiceDiapositiva + direccion + totalDiapositivas) % totalDiapositivas; // Calcula el índice de la diapositiva
    mostrarDiapositiva();
}

function mostrarDiapositiva() {
    const offset = -indiceDiapositiva * 100; // Calcula la posición de la diapositiva (el offset sirve para mover la imagen de la diapositiva)
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`; // Aplica la transformación
}

// Inicializa la primera diapositiva
mostrarDiapositiva();

// Cambiar la diapositiva automáticamente cada 10 segundos
setInterval(() => {
    cambiarSlide(1);
}, 10000);
