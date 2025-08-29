console.log("coctel.js cargado"); //comprobar que el navegador esté cargando el JavaScript

//seleccionar los elementos del DOM para poder manipularlos
const form = document.getElementById("form-buscar");
const input = document.getElementById("input-coctel");
const estado = document.getElementById("estado");
const resultados = document.getElementById("resultados");

// verificar que la persona haya mandado un input texto y que la pápgina no se recargue cada vez que se cargue
/*

//comentario mientras realizo el fetch de cocteles ya que como no esta completamente establecido el form da error -----> Cannot read properties of null (reading 'addEventListener')

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // evita recarga
    const q = input.value.trim();
    if (!q) {
        renderEstado("Escribe el nombre de un cóctel.");
        return;
    }
    await buscarCoctel(q);
});

 */

function obtenerUnCoctelRandom() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Parece que hay un problema asi que pailas' + response.status);
                    return;
                }

                //Aqui se ejecuta el fetch si todo sale bien
                response.json().then(function (data) {
                    //console.log(data);
                    mostrarCoctelRandom(data)
                });
            }
        )
        .catch(function (err) {
            console.log("Fetch error :-S", err)
        });
}

obtenerUnCoctelRandom();


//Aqui hacemos una salida por consola que basicamente seleccionamos
//el array que ya viene del API que se llama drinks y mostramos el primer
//elemento que es el 0, ademas podemos mostrar solo el nombre
//console.log(coctel.drinks[0].strDrink);
//y hay mas cosas para mostrar
function mostrarCoctelRandom(coctel){
    console.log(coctel.drinks[0]);
}
