/**Opción 1 CALCULADORA */
function reiniciarCalculadora() {
	visor.innerHTML = "0";
	resultado = 0;
	operacion=""
	number1 = 0;
	number2 = 0;
}

function calculadora() {
    let number1 = 0;
    let number2 = 0;
    let resultado;
    let borrarpantalla = true;
    reiniciarCalculadora();

    // Remueve los manejadores de eventos de clic en los botones numéricos
    numberButtons.forEach(Element => {
        Element.removeEventListener("click", clickHandler);
    });

    // Define la función de manejador de clic para los botones numéricos
    function clickHandler() {
        const number = this.textContent;
        if (visor.innerHTML === "0" || borrarpantalla) {
            visor.innerHTML = number;
            borrarpantalla = false;
        } else {
            visor.innerHTML += number;
        }
        audioElement.play();
    }

    // Agrega los manejadores de eventos de clic en los botones numéricos
    numberButtons.forEach(Element => {
        Element.addEventListener("click", clickHandler);
    });

    operaciones.forEach(Element => {
        Element.addEventListener("click", function () {
            const operaciones = Element.textContent;
            number1 = parseFloat(visor.innerHTML);
            ultimaOperacion = operaciones;
            borrarpantalla = true;
            audioElement.play();
        });
    });

    calcular.addEventListener("click", function () {
        number2 = parseFloat(visor.innerHTML);
        if (!isNaN(number1) && !isNaN(number2)) {
            if (ultimaOperacion === "+") {
                resultado = number1 + number2;
            } else if (ultimaOperacion === "-") {
                resultado = number1 - number2;
            } else if (ultimaOperacion === "*") {
                resultado = number1 * number2;
            } else if (ultimaOperacion === "/") {
                resultado = number1 / number2;
            }
            visor.innerHTML = resultado;
            borrarpantalla = true;
        }
    });
}
