console.log("coctel.js cargado"); //comprobar que el navegador esté cargando el JavaScript

//seleccionar los elementos del DOM para poder manipularlos
const form = document.getElementById("form-buscar");
const input = document.getElementById("input-coctel");
const estado = document.getElementById("estado");
const resultados = document.getElementById("resultados");

// verificar que la persona haya mandado un input texto y que la pápgina no se recargue cada vez que se cargue
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // evita recarga
  const q = input.value.trim();
  if (!q) {
    renderEstado("Escribe el nombre de un cóctel.");
    return;
  }
  await buscarCoctel(q);
});

