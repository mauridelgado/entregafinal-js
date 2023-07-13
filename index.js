const clientes = [
  {
    nombre: "Mauricio Delgado",
    mail: "mauridelgado@mauridelgado.com",
    cedula: 11011010,
    prestamo: 50000,
    plazo: 12,
  },
];
function inicio() {
  const botonCliente = document.getElementsById("inicio");
  botonCliente.addEventListener("click", login);
  console.log(inicio);
}

function login() {
  alert("bienvenido");
}

function registrarse() {
  const botonNuevo = document.getElementById("registro");
  botonNuevo.addEventListener("click", bienvenido);
}
function bienvenido () {
document.getElementById("formulario").innerHTML = "<form><input type="text" id="ci" placeholder="Ingrese su cédula" /><form>";
}