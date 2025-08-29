console.log("coctel.js cargado"); //comprobar que el navegador esté cargando el JavaScript

//seleccionar los elementos del DOM para poder manipularlos
const form = document.getElementById("form-buscar");
const input = document.getElementById("input-coctel");
const estado = document.getElementById("estado");
const resultados = document.getElementById("resultados");

//creo la contante boton aleatorio para que cada vez que se oprima se recargue la pagina
const btnAleatorio = document.querySelector(".aleatorio");
btnAleatorio.addEventListener("click", () =>{
    location.reload();
})

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
function mostrarCoctelRandom(cocktail){
    console.log(cocktail.drinks[0]);

    let drinkSection = document.querySelector('.drinkSection');

    //Esto pone el nombre del coctel
    let drinkName = document.createElement("h2")
    drinkName.innerHTML = `<br>` + cocktail.drinks[0].strDrink + `, ID(${cocktail.drinks[0].idDrink})` + `<br> Category: ${cocktail.drinks[0].strCategory}`;

    drinkSection.appendChild(drinkName);


    //Esto toma y pone la imagen del coctel
    let img = document.createElement("img")
    img.src = cocktail.drinks[0].strDrinkThumb;

    drinkSection.appendChild(img);

    //Esto itera por los 15 posibles ingredientes y los agrega
    for (let i = 1; i < 16; i++) {

        if (cocktail.drinks[0][`strIngredient${i}`] === null || cocktail.drinks[0][`strIngredient${i}`] === ""){
            break;
        }
        let ingredient = document.createElement("ingredients")
        ingredient.innerHTML = `<br>` + cocktail.drinks[0][`strIngredient${i}`] + ": " + cocktail.drinks[0][`strMeasure${i}`];

        drinkSection.appendChild(ingredient);
    }

    //esto agrega la preparacion
    let card = document.createElement("ons-card");
    card.innerHTML = `<br>` + `<br>` + cocktail.drinks[0].strInstructions;

    drinkSection.appendChild(card)
}
