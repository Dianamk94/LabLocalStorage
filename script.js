const AgregarBtn = document.getElementById("AgregarBtn");
const inputTarea = document.getElementById("inputTarea");
const listaTarea = document.getElementById("listaTarea");
const vacio = document.getElementById("vacio");
const borrarTodoBtn = document.getElementById("BorrarTodoBtn"); // El nuevo boton borrar todo

// Cargar tareas desde localStorage al cargar la página
document.addEventListener("DOMContentLoaded", cargarTareasDesdeLocalStorage); // DOMContentLoaded, recarga las tareas guardas / funcion cargarTareasDesdeLocalStorage creada más abajo


// Borrar todas las tareas función y evento
function borrarTodasLasTareas() {
  listaTarea.innerHTML = "";          // innerHTML se borran todas las tareas de la vista del usuario.
  localStorage.removeItem("tareas");  // removeItem -->elimina el ítem guardado bajo la clave "tareas" del localStorage.
}
borrarTodoBtn.addEventListener("click", borrarTodasLasTareas);   // Cuando este botón sea clickeado, ejecuta la función borrarTodasLasTareas.


// Agregar tareas
AgregarBtn.addEventListener("click", () => {
  const textoTarea = inputTarea.value.trim();

  if (textoTarea === "") {
    vacio.textContent = "Por favor escribe una tarea.";
    return;
  }

  vacio.textContent = "";
  agregarTarea(textoTarea);
  inputTarea.value = ""; // limpia input cuando se agrega
});

function agregarTarea(texto) { // Función crear la tarea
  const li = document.createElement("li");
  li.textContent = texto;

  li.addEventListener("click", function (e) { //Eventop para poder marcar como completada
    if (e.target.tagName !== "BUTTON") {      //if verifica primero si el clik que se da no es sobre el boton de eliminar
      li.classList.toggle("completado");      //toggle elimina un elemento
    }
  });

  //Crear el boton de eliminar

  const deleteBtn = document.createElement("button"); //Crear elemento
  deleteBtn.textContent = "x"; //El texto que aparecera
  deleteBtn.className = "deleteBtn"; //clase para poder darle estilo en mi css
  deleteBtn.addEventListener("click", () => { //Evento para eliminar tarea lista
    listaTarea.removeChild(li);

    eliminarTareaDeLocalStorage(texto); //para eliminar tarea de mi LocalStorage
  });

  li.appendChild(deleteBtn); //Añade boton de eliminar como hijo del elemento de li
  listaTarea.appendChild(li); //Añade la tarea (con su botón de eliminar ya incluido) a la lista de tareas (listaTarea).

  guardarTareaEnLocalStorage(texto); //Guarda tarea en localStorage.
}

// Guardar en localStorage
function guardarTareaEnLocalStorage(tarea) {                       // Esta función será utilizada para guardar una nueva tarea en el almacenamiento local del navegador.
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];   // JSON.parse(...) convierte esa cadena (que está en formato JSON) en un array de JavaScript. / Si no existe nada guardado aún, entonces se utiliza el operador || para asignar un array vacío [].
  tareas.push(tarea);    // Esto agrega la nueva tarea recibida como parámetro al final del array tareas.
  localStorage.setItem("tareas", JSON.stringify(tareas));  // JSON.stringify(tareas) convierte el array actualizado en una cadena JSON, para que pueda guardarse en el localStorage.
}                                                          // localStorage.setItem("tareas", ...) guarda esa cadena con la clave "tareas".

// Cargar tareas al inicio
function cargarTareasDesdeLocalStorage() {
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.forEach(t => agregarTarea(t));     // tareas.forEach(t => ...) recorre cada elemento del array tareas (cada tarea que haya guardado previamente).                    
}                                           // agregarTarea(t) llama a la función agregarTarea pasando cada tarea t como argumento.


// Eliminar tarea individual de localStorage
function eliminarTareaDeLocalStorage(tarea) {
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas = tareas.filter(t => t !== tarea);   // tareas.filter(...) crea un nuevo array excluyendo la tarea que queremos eliminar.
  localStorage.setItem("tareas", JSON.stringify(tareas)); // guarda esa cadena JSON en el localStorage bajo la clave.
}


