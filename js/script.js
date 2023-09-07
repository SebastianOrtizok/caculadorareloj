const numberButtons = document.querySelectorAll(".botones");
const operaciones = document.querySelectorAll(".operacion");
const visor = document.querySelector(".visor");
const calcular = document.querySelector(".calcular");
const audioElement = document.getElementById("bip");

let number1 = 0;
let number2 = 0;
let operacion;
let resultado;
let borrarpantalla = "false";
let mode=0;
const fechaActual = new Date();
const horaActual = fechaActual.getHours();
const minutosActuales = fechaActual.getMinutes();
const segundosActuales = fechaActual.getSeconds();
const dia = fechaActual.getDate().toString().padStart(2, '0');
const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Nota: Los meses en JavaScript son 0-indexados, por lo que sumamos 1.
const año = fechaActual.getYear();

const fechaCorta = `${dia}/${mes}/${año}`;

function reproducirAudio(audioElement) {
	audioElement.play();
}

opcion()

function opcion(){
    if (mode==0){ //hora
        visor.innerHTML = horaActual + ":" + minutosActuales + ":" + segundosActuales;
    }
    if (mode==1){ //calculadora
        visor.innerHTML = "0";
    }
    if (mode==2){ //cronometro
        visor.innerHTML = "CRONOMETRO";
    }
    if (mode==3){ //fecha
        visor.innerHTML = fechaCorta;
        mode=0
    }
}

// Agrega el evento de clic a cada botón
numberButtons.forEach((Element) => {
	Element.addEventListener("click", function () {
		if (borrarpantalla == "true") {
			visor.innerHTML = "";
		}
		borrarpantalla = "false";
		const number = Element.textContent;
		visor.innerHTML += number;
		reproducirAudio(audioElement)
	});
});

operaciones.forEach((Element) => {
	Element.addEventListener("click", function () {
		const operaciones = Element.textContent;
		number1 = parseFloat(visor.innerHTML);
		borrarpantalla = "true";
		operacion = operaciones;
        audioElement.play();
		if (operacion == "Borrar") {
			visor.innerHTML = "0";
			number1 = 0;
			number2 = 0;
            mode+=1;
			opcion()

		}
	});
});


calcular.addEventListener("click", function () {
	number2 = parseFloat(visor.innerHTML);
	if (isNaN(number1) || isNaN(number2)) {
		visor.innerHTML = "";
		number1 = 0;
		number2 = 0;
	} else {
		if (operacion == "+") {
			resultado = number1 + number2;
		}
		if (operacion == "-") {
			resultado = number1 - number2;
		}
		if (operacion == "*") {
			resultado = number1 * number2;
		}
		if (operacion == "/") {
			resultado = number1 / number2;
		}
        reproducirAudio(audioElement)
		visor.innerHTML = resultado;
	}
});
