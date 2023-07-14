const cumples = document.getElementById("cumples");
const listaCumples = document.getElementById("listaCumples");

const cumpleanos = JSON.parse(localStorage.getItem("cumpleanos")) || [];

function mostrarCumples() {
  listaCumples.innerHTML = "";

  cumpleanos.forEach((cumple, index) => {
    const li = document.createElement("li");
    li.textContent = `${cumple.nombre} - ${cumple.fecha}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => {
      cumpleanos.splice(index, 1);
      mostrarCumples();
      loGuardo();
    });

    li.appendChild(deleteButton);
    listaCumples.appendChild(li);
  });
}

function loGuardo() {
  localStorage.setItem("cumpleanos", JSON.stringify(cumpleanos));
}

cumples.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const fecha = document.getElementById("fecha").value;

  const cumple = { nombre, fecha };

  cumpleanos.push(cumple);
  mostrarCumples();
  loGuardo();
  cumples.reset();
});

mostrarCumples();
