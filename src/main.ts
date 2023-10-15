import "./style.css";

// Crear una variable para almacenar la puntuación, inicialmente 0.
let puntuacion = 0;
let juegoTerminado = false; // Variable para controlar si el juego ha terminado

juegoTerminado;

// Función para mostrar la puntuación en el div.
function muestraPuntuacion() {
  let puntuacionDiv = document.getElementById("puntuacion");
  if (puntuacionDiv) {
    puntuacionDiv.textContent = `Puntuación: ${puntuacion}`;
  }
}

// Función para mostrar la carta en la imagen
function muestraCarta(carta: number): void {
  const imagenCarta = document.getElementById(
    "cartaImagen"
  ) as HTMLImageElement;

  switch (carta) {
    case 1:
      imagenCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
      break;
    case 2:
      imagenCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
      break;
    case 3:
      imagenCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
      break;
    case 4:
      imagenCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
      break;
    case 5:
      imagenCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
      break;
    case 6:
      imagenCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
      break;
    case 7:
      imagenCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
      break;
    case 8:
      imagenCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
      break;
    case 9:
      imagenCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
      break;
    case 10:
      imagenCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
      break;
    default:
      imagenCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg"; // Carta boca abajo por defecto
      break;
  }
}

// Función para obtener una carta aleatoria
function dameCarta() {
  let cartaAleatoria = Math.floor(Math.random() * 10) + 1; // Número aleatorio entre 1 y 10
  if ((juegoTerminado = false && cartaAleatoria > 7)) {
    do {
      cartaAleatoria = Math.floor(Math.random() * 10) + 1;
    } while (cartaAleatoria === 8 || cartaAleatoria === 9);
  }
  console.log(`Carta elegida: ${cartaAleatoria}`);
  muestraCarta(cartaAleatoria); // Mostrar la carta elegida

  // Sumar la puntuación de la carta al total
  puntuacion += cartaAleatoria;

  // Mostrar la carta en la imagen
  muestraCarta(cartaAleatoria);

  // Mostrar la puntuación actualizada
  muestraPuntuacion();

  if (puntuacion > 7.5) {
    juegoTerminado = true;
    mostrarGameOver();
  }
  // Obtener el botón "Plantarse" desde el DOM
  const botonPlantarse = document.getElementById("plantarse");

  if (botonPlantarse) {
    // Asociar la función plantarse al evento click del botón
    botonPlantarse.addEventListener("click", () => {
      // Deshabilitar el botón de "Pedir Carta"
      const botonPedirCarta = document.getElementById(
        "pedirCarta"
      ) as HTMLButtonElement;
      if (botonPedirCarta) {
        botonPedirCarta.disabled = true;
      }

      // Mostrar un mensaje en función de la puntuación
      const mensaje = document.getElementById("mensaje");

      if (mensaje) {
        if (puntuacion <= 4) {
          mensaje.textContent = "Has sido muy conservador";
        } else if (puntuacion === 5) {
          mensaje.textContent = "Te ha entrado el canguelo eh?";
        } else if (puntuacion >= 6 && puntuacion <= 7) {
          mensaje.textContent = "Casi casi...";
        } else if (puntuacion === 7.5) {
          mensaje.textContent = "¡Lo has clavado! ¡Enhorabuena!";
        }
      }
    });
  }
}

// Función para mostrar el mensaje de "Game Over" y deshabilitar el botón de "Pedir Carta"
function mostrarGameOver() {
  const gameOverMessage = document.getElementById("gameOverMessage");
  const botonPedirCarta = document.getElementById(
    "pedirCarta"
  ) as HTMLButtonElement;

  if (gameOverMessage && botonPedirCarta) {
    gameOverMessage.textContent = "Game Over";
    gameOverMessage.style.display = "block";
    botonPedirCarta.disabled = true;
  }
}

// Invocar la función cuando el DOM esté disponible.
document.addEventListener("DOMContentLoaded", () => {
  muestraPuntuacion();

  // Obtener el botón desde el DOM
  const botonPedirCarta = document.getElementById(
    "pedirCarta"
  ) as HTMLButtonElement;

  // Asociar la función dameCarta al evento click del botón
  if (botonPedirCarta) {
    botonPedirCarta.addEventListener("click", dameCarta);
  }
});

// Obtener el botón "Nueva Partida" desde el DOM
const botonNuevaPartida = document.getElementById("nuevaPartida");

// Asociar la función para iniciar una nueva partida al evento click del botón
if (botonNuevaPartida) {
  botonNuevaPartida.addEventListener("click", iniciarNuevaPartida);
}

function iniciarNuevaPartida() {
  // Reinicializar la puntuación u otras variables de juego
  puntuacion = 0;
  const imagenCarta = document.getElementById(
    "cartaImagen"
  ) as HTMLImageElement;
  imagenCarta.src =
    "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg"; // Carta boca abajo por defecto
  // Eliminar el mensaje de juego anterior, si lo hay
  const mensaje = document.getElementById("mensaje");
  if (mensaje) {
    mensaje.textContent = "";
  }
  const gameOverMessage = document.getElementById("gameOverMessage");
  if (gameOverMessage) {
    gameOverMessage.textContent = "";
  }

  const botonPedirCarta = document.getElementById(
    "pedirCarta"
  ) as HTMLButtonElement;
  if (botonPedirCarta) {
    botonPedirCarta.disabled = false;
  }
  // Mostrar la puntuación inicial
  muestraPuntuacion();
}
