const navegacion = document.querySelector(".opcion");
const numberButtons = document.querySelectorAll(".botones");
const operaciones = document.querySelectorAll(".operacion");
const visor = document.querySelector(".visor");
const calcular = document.querySelector(".calcular");
const audioElement = document.getElementById("bip");

let operacion;
let mode = 0;
const fechaActual = new Date();
function reproducirAudio(audioElement) {
	audioElement.play();
}



//****Navegación*/

navegacion.addEventListener("click", function () {
	reproducirAudio(audioElement);
	if (mode < 3) {
		mode++;
	} else {
		mode = 0;
	}
	console.log(mode);
	opcion();
});
opcion();

//*** Opciones */
function opcion() {
	if (mode == 0) {
		hora();
	}
	if (mode == 1) {
		calculadora();
	}
	if (mode == 2) {
		cronometro();
	}
	if (mode == 3) {
		fecha();
	}
}

/**Opción 0 HORA */
function hora() {
	const horaActual = fechaActual.getHours();
	const minutosActuales = fechaActual.getMinutes();
	const segundosActuales = fechaActual.getSeconds();
	visor.innerHTML = horaActual + ":" + minutosActuales + "    " + segundosActuales;
}



//**Opción 2 cronometro**

const btn0 = document.querySelector(".cero");

function cronometro() {
	let intervalId;
	let segundos = 0;
	let minutos = 0;
	let centesimas = 0;
	visor.innerHTML = "00:00 00";

	operaciones.forEach(Element => {
		Element.addEventListener("click", function() {
			operacion = Element.textContent;
		});
	});
	

	function actualizarCronometro() {
		if ((operacion == "+") & (mode == 2)) {
			centesimas++; // Actualizar centésimas de segundo (cada centésima de segundo)

			if (centesimas === 100) {
				// Cuando las centésimas llegan a 100, incrementa los segundos
				centesimas = 0;
				segundos++;

				if (segundos === 60) {
					// Cuando los segundos llegan a 60, incrementa los minutos
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
	btn0.addEventListener("click", function() {
		clearInterval(intervalId);
		cronometro()
		})
		intervalId = setInterval(actualizarCronometro, 10);
	}


//**Opción FECHA */
function fecha() {
	const dia = fechaActual.getDate().toString().padStart(2, "0");
	const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0"); // Nota: Los meses en JavaScript son 0-indexados, por lo que sumamos 1.
	const año = fechaActual.getYear();
	const fechaCorta = `${dia}/${mes}/${año}`;
	visor.innerHTML = fechaCorta;
}
