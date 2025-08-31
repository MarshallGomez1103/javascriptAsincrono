document.addEventListener('DOMContentLoaded', function() {
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
        <img src="${drink.strDrinkThumb}" width="200">
        <p><strong>Categoria:</strong> ${drink.strCategory}</p>
        <p><strong>Instrucciones:</strong> ${drink.strInstructions}</p>
    `;
    container.appendChild(card);
});

        document.querySelectorAll('.delete-fav').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                favorites = favorites.filter(drink => drink.idDrink !== id);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                renderFavorites();
            });
        });
    }

    renderFavorites();
});