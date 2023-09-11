const navegacion = document.getElementById("navegacion");
const visor = document.querySelector(".visor");
const audioElement = document.getElementById("bip");

let mode = 0;
const fechaActual = new Date();
let numberButtons; 
let btncronometro // Almacena los botones para agregar/eliminar event listeners

function reproducirAudio(audioElement) {
  audioElement.play();
}

opcion();

// **** Navegación
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

// *** Opciones
function opcion() {
  // Eliminar event listeners de los botones si existen
  if (numberButtons) {
    numberButtons.forEach((boton) => {
      boton.removeEventListener("click", handleCalculadoraButtonClick);
    });
  }

  if (btncronometro) {
    btncronometro.forEach((cronoboton) => {
        cronoboton.removeEventListener("click", manejocronometro);
    });
  }


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

//**Opción 1 CALCULADORA */
let number1 = 0;
let number2 = 0;
let resultado = 0;
let operacion = "";
let boton = "";

function calculadora() {
  visor.innerHTML = 0;
  resultado = 0;
  operacion = "";
  number1 = 0;
  number2 = 0;
  boton = "";

  // Agregar event listeners a los botones para la calculadora
  numberButtons = document.querySelectorAll(".botones");
  numberButtons.forEach((boton) => {
    boton.addEventListener("click", handleCalculadoraButtonClick);
  });   
}

function handleCalculadoraButtonClick(event) {
  const botones = event.target;
  audioElement.play();
  if (visor.innerHTML == 0) {
    visor.innerHTML = "";
  }
  boton = botones.textContent;
  if (boton == "+" || boton == "-" || boton == "/" || boton == "*") {
    operacion = boton;
    number1 = parseFloat(visor.innerHTML);
    visor.innerHTML = 0;
  } else {
    const number = boton;
    visor.innerHTML += number;
  }
  if (boton == "=") {
    number2 = parseFloat(visor.innerHTML);
    calcular();
  }
}

function calcular() {
  if (operacion === "+") {
    resultado = number1 + number2;
  } else if (operacion === "-") {
    resultado = number1 - number2;
  } else if (operacion === "/") {
    resultado = number1 / number2;
  } else if (operacion === "*") {
    resultado = number1 * number2;
  }
  visor.innerHTML = resultado;
  mode = 0;
}



//**Opción 2 cronometro**

function cronometro() {

    visor.innerHTML = "00:00 00";

    btncronometro = document.querySelectorAll(".cronometro");
    btncronometro.forEach((cronoboton) => {
        cronoboton.addEventListener("click", manejocronometro);
        console.log("el contenido de boton " + boton)

    });
}
let intervalId;
let segundos = 0;
let minutos = 0;
let centesimas = 0;
let iniciar = false;    

    function manejocronometro(event){
    const btncrono=event.target.textContent
    console.log("la funcion extraña btnstart: " + btncrono)
    if (btncrono=="+") {
        iniciar = true;
        console.log("voy a poner iniciar en true para que arranque ")
    }
    if (btncrono=="/"){
        iniciar = false; 
    }

    if (btncrono==0){
        visor.innerHTML = "00:00 00";
    }
    actualizarCronometro()
}
    function actualizarCronometro() {
        if (iniciar==true) {
            centesimas++; // Actualizar centésimas de segundo (cada centésima de segundo)
        if (centesimas === 100) {
            console.log("estoy dentro de iniciar true")
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
            clearInterval(intervalId); // Detener el intervalo antes de volver a iniciarlo 
            console.log("que carajos pasa con el visor; " +visor.innerHTML)
            intervalId = setInterval(actualizarCronometro, 10); // Volver a iniciar el intervalo
        }

    }




//**Opción FECHA */
function fecha() {
	const dia = fechaActual.getDate().toString().padStart(2, "0");
	const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0"); // Nota: Los meses en JavaScript son 0-indexados, por lo que sumamos 1.
	const año = fechaActual.getYear();
	const fechaCorta = `${dia}/${mes}/${año}`;
	visor.innerHTML = fechaCorta;
}
