document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('favorites-container');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    function renderFavorites() {
        container.innerHTML = "";
        if (favorites.length === 0) {
            container.innerHTML = "<p class= title>No tienes cocteles favoritos aún.</p>";
            return;
        }

        favorites.forEach((drink, idx) => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
        <button class="delete-fav" data-id="${drink.idDrink}" aria-label="Eliminar favorito">
            <ion-icon name="close-circle-outline" class="icon-delete"></ion-icon>
        </button>
        <h2>${drink.strDrink}</h2>
        
        
        <button class="ver-fav" data-id="${drink.idDrink}">Ver detalle</button>

        <div class="detalle" id="detalle-${drink.idDrink}"></div>
    `;
            container.appendChild(card);
        });

        document.querySelectorAll('.delete-fav').forEach(btn => {
            btn.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                favorites = favorites.filter(drink => drink.idDrink !== id);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                renderFavorites();
            });
        });

        // ver detalle (fetch a la API por id)
        document.querySelectorAll('.ver-fav').forEach(btn => {
            btn.addEventListener('click', async function () {
                const id = this.getAttribute('data-id');
                const panel = document.getElementById(`detalle-${id}`);
                panel.innerHTML = "<p>Cargando...</p>";

                try {
                    const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
                    const data = await resp.json();
                    const d = data?.drinks?.[0];
                    if (!d) {
                        panel.innerHTML = "<p>No se encontró el detalle.</p>";
                        return;
                    }

                    // Ingredientes + medidas
                    const ingredientes = [];
                    for (let i = 1; i < 16; i++) {
                        const ing = d[`strIngredient${i}`];
                        const qty = d[`strMeasure${i}`];
                        if (!ing) break;
                        ingredientes.push(`${ing}${qty ? `: ${qty}` : ''}`);
                    }

                    // Pintar detalle
                    panel.innerHTML = `
                        <img src="${d.strDrinkThumb}" width="200" alt="${d.strDrink}">
                        <p><strong>Categoría:</strong> ${d.strCategory ?? '—'}</p>
                        <p><strong>Ingredientes:</strong><br>${ingredientes.join('<br>')}</p>
                        <p><strong>Instrucciones:</strong> ${d.strInstructions ?? '—'}</p>
                    `;
                } catch (err) {
                    console.error(err);
                    panel.innerHTML = "<p>Error consultando el detalle.</p>";
                }
            });
        });


    }

    renderFavorites();
});