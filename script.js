
//Constantes con mis elementos de HTML para obtenerlos
const AgregarBtn = document.getElementById("AgregarBtn");
const inputTarea = document.getElementById("inputTarea");
const listaTarea = document.getElementById("listaTarea");
const vacio = document.getElementById("vacio");

//Evento para agregar tarea
AgregarBtn.addEventListener("click", () => {
  const textoTarea = inputTarea.value.trim(); // inputTarea.value Toma el texto que escribo / Trim elimina espacios al principio y final

  if (textoTarea === "") {
    vacio.textContent = "Por favor escribe una tarea."; // textContent para traer el mensaje que esta de momento de manera invisible si no agregaron nada en el input.
    return;
  }

  vacio.textContent = "";

  //Crear un nuevo elemento

  const li = document.createElement("li");
  li.textContent = textoTarea;

  li.addEventListener("click", function (e) { //Eventop para poder marcar como completada
    if (e.target.tagName !== "BUTTON") { //if verifica primero si el clik que se da no es sobre el boton de eliminar
      li.classList.toggle("completado"); //toggle elimina un elemento
    }
  });

    //Crear el boton de eliminar

  const deleteBtn = document.createElement("button"); //Crear elemento
  deleteBtn.textContent = "x"; //El texto que aparecera
  deleteBtn.className = "deleteBtn"; //clase para poder darle estilo en mi css
  deleteBtn.addEventListener("click", () => { //Evento para eliminar tarea lista
    listaTarea.removeChild(li);
  });

  li.appendChild(deleteBtn); //Añade boton de eliminar como hijo del elemento de li
  listaTarea.appendChild(li); //Añade la tarea (con su botón de eliminar ya incluido) a la lista de tareas (listaTarea).

  inputTarea.value = ""; //Limpia el campo del input una vez agregada la tarea
});