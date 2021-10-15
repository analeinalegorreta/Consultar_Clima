const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {

    formulario.addEventListener('submit', buscarClima);

})


function buscarClima(e) {
    e.preventDefault();

    // Vlaidar

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {

        mostrarError('Todos los campos son obligatorios');


        return;

    }


    // Consultar la API


    consultarAPI(ciudad, pais);

}





function mostrarError(mensaje) {

    const alerta = document.querySelector('.error-formato');

    if (!alerta) {

        console.log(mensaje)
        const alerta = document.createElement('div');

        alerta.classList.add('error-formato');

        alerta.innerHTML = `
        <span>${mensaje}</span>
        `;

        container.appendChild(alerta);

        setTimeout(() => {

            alerta.remove();

        }, 3000);

    }



}


function consultarAPI(ciudad, pais) {

    const appId = '1991d04d654ee9c95f55024c4dda817c';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

Spinner(); // Muestra un spinner de carga

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {

            console.log(datos);

            limpiarHTML(); // Limpiar el HTML previo

      

            if (datos.cod === "404") {

                mostrarError('Ciudad no encontrada')
                return;
            }

            // Imprime la respuesta que mostrara el HTML
            mostrarClima(datos);

            
        })

}

function mostrarClima(datos){

    const {name, main : { temp, temp_max, temp_min}} = datos;
 const centigrados= kelvinACentigrados(temp);
 const max= kelvinACentigrados(temp_max);
 const min= kelvinACentigrados(temp_min);

 

const resultadoDiv =document.createElement('div');
resultadoDiv.innerHTML=` Temperatura Actual en ${name} de : ${centigrados} &#8451 <br>   <br> Max : ${max} &#8451; <br> Min : ${min} &#8451;`;

resultadoDiv.classList.add('formato');


resultado.appendChild(resultadoDiv);



}

const kelvinACentigrados = grados =>parseInt(grados-273.15);



function limpiarHTML (){
    while(resultado.firstChild){

resultado.removeChild(resultado.firstChild);

    }
}



function Spinner(){

    limpiarHTML();


    const divSpinner =document.createElement('div');
    divSpinner.classList.add('spinner');

    divSpinner.innerHTML = `
   
 
    <div class="dot1"></div>
    <div class="dot2"></div>


    `;

    resultado.appendChild(divSpinner);

}







