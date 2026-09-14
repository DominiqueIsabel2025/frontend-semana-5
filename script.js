// ========================================
// SELECCIÓN DE ELEMENTOS DEL DOM
// ========================================

const mensaje = document.getElementById("mensaje");
const btnCambiar = document.getElementById("btnCambiar");
const contenedor = document.getElementById("contenedor");
const bienvenida = document.getElementById("bienvenida");
const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const resultado = document.getElementById("resultado");
const datos = document.getElementById("datos");
const btnCargar = document.getElementById("btnCargar");


// ========================================
// FUNCIONES
// ========================================

/**
 * Cambia el mensaje de bienvenida cuando
 * el usuario presiona el botón.
 */
function cambiarMensaje() {
    mensaje.textContent = "¡Hola! Has cambiado el mensaje mediante JavaScript.";
}


/**
 * Crea un párrafo dinámicamente y lo agrega
 * al contenedor utilizando createElement y appendChild.
 */
function agregarContenido() {
    const nuevoParrafo = document.createElement("p");

    nuevoParrafo.textContent =
        "Este contenido fue creado dinámicamente con JavaScript.";

    contenedor.appendChild(nuevoParrafo);
}


/**
 * Aumenta ligeramente el tamaño de la sección
 * cuando el usuario pasa el mouse sobre ella.
 */
function activarEfectoMouse() {
    bienvenida.style.transform = "scale(1.02)";
}


/**
 * Devuelve la sección a su tamaño original
 * cuando el usuario retira el mouse.
 */
function desactivarEfectoMouse() {
    bienvenida.style.transform = "scale(1)";
}


/**
 * Valida el formulario y muestra un mensaje
 * dependiendo de si el usuario ingresó su nombre.
 */
function enviarFormulario(event) {
    event.preventDefault();

    if (nombre.value.trim() === "") {
        resultado.textContent = "Por favor, escribe tu nombre.";
        return;
    }

    resultado.textContent =
        "¡Gracias por contactarnos, " + nombre.value + "!";
}


/**
 * Obtiene información de usuarios mediante Fetch API,
 * procesa la respuesta y muestra los datos dinámicamente.
 * Si ocurre un error, se informa al usuario.
 */
function cargarDatos() {
    datos.innerHTML = "<p>Cargando datos...</p>";

    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudieron obtener los datos.");
            }

            return response.json();
        })
        .then(usuarios => {
            datos.innerHTML = "";

            usuarios.forEach(usuario => {
                const elemento = document.createElement("p");

                elemento.textContent =
                    usuario.name + " - " + usuario.email;

                datos.appendChild(elemento);
            });
        })
        .catch(error => {
            datos.innerHTML =
                "<p>Error: " + error.message + "</p>";
        });
}


// ========================================
// EVENTOS
// ========================================

// Evento click para cambiar el mensaje.
btnCambiar.addEventListener("click", cambiarMensaje);

// Evento mouseover para aumentar ligeramente la sección.
bienvenida.addEventListener("mouseover", activarEfectoMouse);

// Evento mouseout para devolver la sección a su tamaño original.
bienvenida.addEventListener("mouseout", desactivarEfectoMouse);

// Evento submit para validar el formulario.
formulario.addEventListener("submit", enviarFormulario);

// Evento click para cargar datos externos.
btnCargar.addEventListener("click", cargarDatos);


// ========================================
// CONTENIDO INICIAL
// ========================================

// Agrega contenido dinámico al cargar la página.
agregarContenido();