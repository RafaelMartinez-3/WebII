function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}


async function getAllTodos(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      }
    });
    
    const data = await response.json(); 
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";

    (data.context).forEach(todo => {
      const todoHTMLElement = `
        <li>
          <p>Task: ${todo.task}</p>
          <p>Completed?: ${todo.completed}</p>
        </li>`;
      todoList.innerHTML += todoHTMLElement;
    });
  } catch (error) {
    console.error('Error al obtener todos:', error);
  }
}

async function addTodo(url, payload) {
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({ payload: payload })
    });

    const data = await response.json(); 
    console.log(data);
  } catch (error) {
    console.error('Error al añadir todo:', error);
  }
}


async function updateTodo(url, payload) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({ payload: payload })
    });

    const data = await response.json(); 
    console.log(data);
  } catch (error) {
    console.error('Error al actualizar todo:', error);
  }
}

// Eliminar un todo usando async/await
async function deleteTodo(url) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": getCookie("csrftoken"),
      }
    });

    const data = await response.json(); 
    console.log(data);
  } catch (error) {
    console.error('Error al eliminar todo:', error);
  }
}
