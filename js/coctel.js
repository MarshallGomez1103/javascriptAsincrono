//seleccionar los elementos del DOM para poder manipularlos
const form = document.getElementById("form-buscar");
const input = document.getElementById("input-coctel");
const estado = document.getElementById("estado");
const resultados = document.getElementById("resultados");

// === Loader helpers (mismo patrón que ingrediente.js) ===
function mostrarLoader() {
    estado.classList.add("loader");
    estado.style.display = "block";
}
function ocultarLoader() {
    estado.classList.remove("loader");
    estado.style.display = "none";
}
function mensajeEstado(msg) {
    ocultarLoader();
    estado.textContent = msg || "";
    estado.style.display = msg ? "block" : "none";
}
// Al iniciar, oculto el loader
ocultarLoader();


//creo la contante boton aleatorio para que cada vez que se oprima se recargue la pagina
const btnAleatorio = document.querySelector(".aleatorio");
btnAleatorio.addEventListener("click", () => {
    location.reload();
})

// verificar que la persona haya mandado un input texto y que la pápgina no se recargue cada vez que se cargue 

function obtenerUnCoctelRandom() {

    mostrarLoader();
    estado.textContent = "";   // limpia cualquier mensaje


    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(function (response) {
            if (response.status !== 200) {
                ocultarLoader();
                console.log('Parece que hay un problema asi que pailas' + response.status);
                return;
            }

            //Aqui se ejecuta el fetch si todo sale bien
            response.json().then(function (data) {
                //console.log(data);
                ocultarLoader();
                mostrarCoctelRandom(data)
            });
        })
        .catch(function (err) {
            ocultarLoader();
            console.log("Fetch error type: ", err)
        });
}


obtenerUnCoctelRandom();


//Aqui hacemos una salida por consola que basicamente seleccionamos
//el array que ya viene del API que se llama drinks y mostramos el primer
//elemento que es el 0, ademas podemos mostrar solo el nombre
//console.log(coctel.drinks[0].strDrink);
//y hay mas cosas para mostrar
function mostrarCoctelRandom(cocktail) {
    console.log(cocktail.drinks[0]);

    let drinkSection = document.querySelector('.drinkSection');

    // contenedor con estilo de tarjeta
    const card = document.createElement("div");
    card.className = "card";

    //Esto pone el nombre del coctel
    let drinkName = document.createElement("h2")
    drinkName.innerHTML = `<br>` + cocktail.drinks[0].strDrink + `, ID(${cocktail.drinks[0].idDrink})` + `<br> Category: ${cocktail.drinks[0].strCategory}`;

    card.appendChild(drinkName);


    //Esto toma y pone la imagen del coctel
    let img = document.createElement("img")
    img.src = cocktail.drinks[0].strDrinkThumb;

    card.appendChild(img);

    //Esto itera por los 15 posibles ingredientes y los agrega
    for (let i = 1; i < 16; i++) {

        if (cocktail.drinks[0][`strIngredient${i}`] === null || cocktail.drinks[0][`strIngredient${i}`] === "") {
            break;
        }
        let ingredient = document.createElement("ingredients")
        ingredient.innerHTML = `<br>` + cocktail.drinks[0][`strIngredient${i}`] + ": " + cocktail.drinks[0][`strMeasure${i}`];

        card.appendChild(ingredient);
    }

    //esto agrega la preparacion
    let instrucciones = document.createElement("ons-card");
    instrucciones.innerHTML = `<br>` + `<br>` + cocktail.drinks[0].strInstructions;

    card.appendChild(instrucciones);



    drinkSection.appendChild(card)
}



form.addEventListener("submit", async (e) => {
    e.preventDefault(); // evita que se recargue la página

    const nombre = input.value.trim();
    if (!nombre) {
        resultados.innerHTML = "<p>Escribe un cóctel primero.</p>";
        return;
    }

    resultados.innerHTML = "";
    mensajeEstado("");
    mostrarLoader();

    // Llamada a la API
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nombre}`;
    try {
        const resp = await fetch(url);
        const data = await resp.json();

        ocultarLoader();

        console.log(data)

        if (data.drinks) {
            mostrarResultados(data.drinks);
        } else {
            resultados.innerHTML = `<p>No se encontró el cóctel: ${nombre}</p>`;
        }
    } catch (error) {
        ocultarLoader();

        resultados.innerHTML = "<p>Error al consultar la API.</p>";
        console.error(error);
    }
});

function mostrarResultados(drinks) {
    resultados.innerHTML = ""; // limpia resultados anteriores
    drinks.forEach(drink => {
        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML =
            `<h2>${drink.strDrink}</h2>
            <img src="${drink.strDrinkThumb}" width="200">
            <p><strong>Categoria:</strong> ${drink.strCategory}</p>
            <p><strong>Instrucciones:</strong> ${drink.strInstructions}</p>`;
        resultados.appendChild(card);
    });
}

let lastShownCocktail = null; // Variable para guardar el último cóctel mostrado

function mostrarCoctelRandom(cocktail) {
    const drink = cocktail.drinks[0];
    lastShownCocktail = drink; // Guardar el cóctel aleatorio mostrado

    let drinkSection = document.querySelector('.drinkSection');
    drinkSection.innerHTML = ""; // Limpiar antes de mostrar

    const card = document.createElement("div");
    card.className = "card";

    let drinkName = document.createElement("h2")
    drinkName.innerHTML = `<br>${drink.strDrink}, ID(${drink.idDrink})<br> Category: ${drink.strCategory}`;
    card.appendChild(drinkName);

    let img = document.createElement("img")
    img.src = drink.strDrinkThumb;
    card.appendChild(img);

    for (let i = 1; i < 16; i++) {
        if (!drink[`strIngredient${i}`]) break;
        let ingredient = document.createElement("ingredients")
        ingredient.innerHTML = `<br>${drink[`strIngredient${i}`]}: ${drink[`strMeasure${i}`]}`;
        card.appendChild(ingredient);
    }

    let instrucciones = document.createElement("ons-card");
    instrucciones.innerHTML = `<br><br>${drink.strInstructions}`;
    card.appendChild(instrucciones);

    drinkSection.appendChild(card)
}

function mostrarResultados(drinks) {
    resultados.innerHTML = ""; // limpia resultados anteriores
    if (drinks.length > 0) {
        lastShownCocktail = drinks[0]; // Guardar el primer cóctel mostrado
    }
    drinks.forEach(drink => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML =
            `<h2>${drink.strDrink}</h2>
            <img src="${drink.strDrinkThumb}" width="200">
            <p><strong>Categoria:</strong> ${drink.strCategory}</p>
            <p><strong>Instrucciones:</strong> ${drink.strInstructions}</p>`;
        resultados.appendChild(card);
    });
}

// Manejo de favoritos usando localStorage
document.getElementById('add-favorite').addEventListener('click', function() {
    if (!lastShownCocktail) {
        alert('No hay cóctel para añadir.');
        return;
    }
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Evitar duplicados por idDrink
    if (!favorites.some(fav => fav.idDrink === lastShownCocktail.idDrink)) {
        favorites.push(lastShownCocktail);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('¡Coctel añadido a favoritos!');
    } else {
        alert('Este cóctel ya está en favoritos.');
    }
});
