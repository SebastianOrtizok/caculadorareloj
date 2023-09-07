const navegacion=document.querySelector(".opcion");
const numberButtons = document.querySelectorAll(".botones");
const operaciones = document.querySelectorAll(".operacion");
const visor = document.querySelector(".visor");
const calcular = document.querySelector(".calcular");
const audioElement = document.getElementById("bip");

const fechaActual = new Date();
const horaActual = fechaActual.getHours();
const minutosActuales = fechaActual.getMinutes();
const segundosActuales = fechaActual.getSeconds();

let number1=0;
let number2 = 0;
let operacion;
let resultado;
let borrarpantalla = "false";
let mode=0;

function reproducirAudio(audioElement) {
	audioElement.play();
}

//****Navegación*/
opcion()
navegacion.addEventListener("click", function() {
	reproducirAudio(audioElement)
	if (mode<3) {
		mode++
	}else {
		mode=0
	}
	console.log(mode)
	opcion()

 });



 //*** Opciones */
function opcion(){
	if (mode==0){ //hora
		hora()
    }
    if (mode==1){ //calculadora
		calculadora()
    }
    if (mode==2){ //cronometro
        visor.innerHTML = "00:00 00";
		cronometro()
    }
    if (mode==3){ //fecha
        fecha()
    }
}


/**Opción 0 HORA */
	function hora(){
		visor.innerHTML = horaActual + ":" + minutosActuales + ":" + segundosActuales;
	}

/**Opción 1 CALCULADORA */	

function reiniciarCalculadora() {
    number1 = 0;
	number2=0;
	number=0;
	visor.innerHTML = "0";
	resultado=0;
}

	function calculadora(){
		reiniciarCalculadora()
		// Agrega el evento de clic a cada botón
		numberButtons.forEach((Element) => {
			Element.addEventListener("click", function () {
				if (borrarpantalla == "true"  || visor.innerHTML == "0" ) {
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

 }


//**Opción 2 cronometro**

function cronometro() {

	let intervalId;
	let segundos = 0;
	let minutos = 0;
	let centesimas = 0;
	
	function actualizarCronometro() {
	
		if (operacion=="+" & mode==2){
			centesimas++; // Actualizar centésimas de segundo (cada centésima de segundo)
	
			if (centesimas === 100) { // Cuando las centésimas llegan a 100, incrementa los segundos
				centesimas = 0;
				segundos++;
		
				if (segundos === 60) { // Cuando los segundos llegan a 60, incrementa los minutos
					minutos++;
					segundos = 0;
				}
			}
		
			const minutosStr = minutos < 10 ? "0" + minutos : minutos;
			const segundosStr = segundos < 10 ? "0" + segundos : segundos;
			const centesimasStr = centesimas < 10 ? "0" + centesimas : centesimas;
		
			visor.innerHTML = minutosStr + ":" + segundosStr + " " + centesimasStr; // Mostrar centésimas en el visor
		}
			// intervalId = setInterval(actualizarCronometro);
		}
		if (number1==0){
			clearInterval(intervalId);
		}
	intervalId = setInterval(actualizarCronometro, 10);
	
}

//**Opción FECHA */
function fecha(){
const dia = fechaActual.getDate().toString().padStart(2, '0');
const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Nota: Los meses en JavaScript son 0-indexados, por lo que sumamos 1.
const año = fechaActual.getYear();
const fechaCorta = `${dia}/${mes}/${año}`;
visor.innerHTML = fechaCorta;
}