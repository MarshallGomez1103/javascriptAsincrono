// === Seleccionar elementos del DOM ===
const form = document.getElementById("form-buscar");
const input = document.getElementById("input-ingrediente"); // <- usa este id en el HTML
const estado = document.getElementById("estado");
const resultados = document.getElementById("resultados");

// === Helpers UI muy simples (re-usan tu loader .loader del CSS) ===
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

// === Buscar ingrediente usando la API: search.php?i= ===
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = input.value.trim();
    if (!nombre) {
        resultados.innerHTML = "<p>Escribe un ingrediente (ej: vodka, gin, rum).</p>";
        return;
    }

    resultados.innerHTML = "";
    mensajeEstado("");
    mostrarLoader();

    // SIN encodeURIComponent, igual a tu otro JS
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${nombre}`;

    try {
        const resp = await fetch(url);
        const data = await resp.json();
        ocultarLoader();
        console.log(data);

        if (data.ingredients && data.ingredients.length > 0) {
            mostrarIngrediente(data.ingredients[0]);
        } else {
            resultados.innerHTML = `<p>No se encontró información para: ${nombre}</p>`;
        }
    } catch (error) {
        ocultarLoader();
        resultados.innerHTML = "<p>Error al consultar la API.</p>";
        console.error(error);
    }
});

// === Render del resultado del ingrediente ===
function mostrarIngrediente(ing) {
    resultados.innerHTML = ""; // limpia resultados anteriores

    const card = document.createElement("div");
    card.className = "card"; // opcional: puedes estilizar .card en tu CSS

    // Campos típicos que trae esta API para ingredientes
    const nombre = ing.strIngredient || "—";
    const tipo = ing.strType || "—";
    const alcohol = ing.strAlcohol === "Yes" ? "Sí" : (ing.strAlcohol === "No" ? "No" : "—");
    const abv = ing.strABV ? `${ing.strABV}%` : "—";
    const desc = ing.strDescription ? ing.strDescription : "Descripción no disponible.";

    card.innerHTML = `
    <h2>${nombre}</h2>
    <p><strong>Tipo:</strong> ${tipo}</p>
    <p><strong>¿Contiene alcohol?</strong> ${alcohol}</p>
    <p><strong>ABV:</strong> ${abv}</p>
    <p><strong>Descripción:</strong> ${desc}</p>
  `;

    resultados.appendChild(card);
}

// Oculta el loader al cargar
ocultarLoader();
