/**Script para cambiar la imagen de la diapositiva/sliders */

let indiceDiapositiva = 0;
const diapositivas = document.querySelectorAll('.slide');// Obtener todas las diapositivas
const totalDiapositivas = diapositivas.length;// Obtener el numero total de diapositivas

function cambiarSlide(direccion) {
    indiceDiapositiva = (indiceDiapositiva + direccion + totalDiapositivas) % totalDiapositivas;// Calcula el indice de la diapositiva
    mostrarDiapositiva();
}

function mostrarDiapositiva() {
    const offset = -indiceDiapositiva * 100;// Calcula la posición de la diapositiva (el offset sirve para mover la imagen de la diapositiva)
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`; // El query
}

// Inicializa la primera diapositiva
mostrarDiapositiva();

