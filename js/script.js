const numberButtons = document.querySelectorAll(".botones");
const operaciones=document.querySelectorAll(".operacion");
const visor=document.querySelector(".visor");
const calcular=document.querySelector(".calcular");
let number1=0;
let number2=0;
let operacion;
let resultado;
let borrarpantalla="false"


// Agrega el evento de clic a cada botón
numberButtons.forEach(Element => {
    Element.addEventListener("click", function() {
        if (borrarpantalla=="true"){
            visor.innerHTML=""
        }
        borrarpantalla="false"
        const number = Element.textContent;
        visor.innerHTML+=number    
    });
});


operaciones.forEach(Element =>{
    Element.addEventListener("click", function(){
        const operaciones = Element.textContent;
        number1=parseFloat(visor.innerHTML);
        borrarpantalla="true"
        operacion=operaciones
        if (operacion== "Borrar"){
            visor.innerHTML=""
            number1=0;
            number2=0;
            console.log(operacion)
        }
    })
})

calcular.addEventListener("click", function(){
    number2=parseFloat(visor.innerHTML);
    if (isNaN(number1) || isNaN(number2)) {
        visor.innerHTML=""
        number1=0;
        number2=0; 
    }else {

    if (operacion== "+"){
        resultado= number1 + number2
    }
    if (operacion== "-"){
        resultado= number1 - number2
    }
    if (operacion== "*"){
        resultado= number1 * number2
    }
    if (operacion== "/"){
        resultado= number1 / number2
    }

    visor.innerHTML=resultado
}
}) 





