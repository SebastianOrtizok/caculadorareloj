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

opcion()

function opcion(){
    if (mode==0){
        visor.innerHTML = "HORA";
    }
    if (mode==1){
        visor.innerHTML = "0";
    }
    if (mode==2){
        visor.innerHTML = "CRONOMETRO";
    }
    if (mode==3){
        visor.innerHTML = "FECHA";
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
		audioElement.play();
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
        audioElement.play();
		visor.innerHTML = resultado;
	}
});
