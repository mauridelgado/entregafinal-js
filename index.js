const cumples = document.getElementById("cumples");
const listaCumples = document.getElementById("listaCumples");

const cumpleanos = JSON.parse(localStorage.getItem("cumpleanos")) || [];

async function mostrarCumples() {
  listaCumples.innerHTML = "";

  for (const [index, cumple] of cumpleanos.entries()) {
    const li = document.createElement("li");

    const diaCumple = obtenerDia(cumple.fecha);

    const mesCumple = obtenerMes(cumple.fecha);
    const rutaImagen = await obtenerImagenMes(mesCumple);
    if (rutaImagen) {
      const img = document.createElement("img");
      img.src = rutaImagen;
      img.alt = mesCumple;
      img.classList.add("imgCumple");
      li.appendChild(img);
    }

    const nombreFechaTexto = document.createElement("span");
    nombreFechaTexto.textContent = `${cumple.nombre} cumple el ${
      diaCumple + 1
    } de ${mesCumple}`;
    li.appendChild(nombreFechaTexto);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => {
      cumpleanos.splice(index, 1);
      mostrarCumples();
      loGuardo();
    });

    li.appendChild(deleteButton);
    listaCumples.appendChild(li);
  }
}

function obtenerDia(fecha) {
  const fechaObj = new Date(fecha);
  return fechaObj.getDate();
}

function obtenerMes(fecha) {
  const fechaObj = new Date(fecha);
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  return meses[fechaObj.getMonth()];
}

async function obtenerImagenMes(mes) {
  try {
    const response = await fetch("api.json");
    const data = await response.json();
    const mesData = data.find((item) => item.nombre === mes);
    return mesData ? mesData.imagen : null;
  } catch (error) {
    console.error("Error al cargar el archivo 'api.json':", error);
    return null;
  }
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
  Swal.fire({
    title: "Buena brooo!",
    text: "El cumple ha sido guardado.",
    imageUrl: "./assets/img/exito.avif",
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Lionel",
  });
});

mostrarCumples();
