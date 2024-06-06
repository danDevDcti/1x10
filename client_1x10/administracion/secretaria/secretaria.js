// script.js

// URL de la API
const apiUrl = 'http://localhost:3000/api/secretaria';
const apiUrls = 'http://localhost:3000/api/secretary';
const apiUrlp = 'http://localhost:3000/api/nivelorganizacion';
const token = localStorage.getItem("token");

// Función para obtener todos los roles
function obtenerSecretaria() {
    fetch(apiUrls, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
       .then(response => response.json())
       .then(data => {
            const tbody = $('#secretaria-tbody');
            tbody.html('');
            data.forEach(org => {
                tbody.append(`
                    <tr>
                        <td data-id="${org.id_secretaria}">${org.id_secretaria}</td>
                        <td data-org="${org.nombre_nivel}">${org.nombre_nivel}</td>
                        <td data-name="${org.nombre_secretaria}">${org.nombre_secretaria}</td>
                        <td>
                            <button class="secretaria-editar" data-id="${org.id_secretaria}">Editar</button>
                            <button class="secretaria-eliminar" data-id="${org.id_secretaria}">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        })
       .catch(error => console.error(error));
}

function agregarSecretaria(nivel, nombre) {
      const secretaria = {
        id_nivel: parseInt(nivel, 10),
        nombre: nombre
      };
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(secretaria)
    })
   .then(response => response.json())
   .then(data => {
      console.log('Nivel agregado con éxito:', data);
      obtenerSecretaria();
    })
   .catch(error => {
      console.error('Error al agregar rol:', error);
    });
  }

// Función para editar un rol
function editarSecretaria(id) {
  const method = 'PUT';  
  const nivel = $('#select-secretaria').val();
  const nombre = $('#nombre_secretaria').val();

  const secretaria = {
    id_nivel: nivel,
    nombre: nombre
  };
  fetch(`${apiUrl}/${id}`, {
      method,
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(secretaria)
  })
.then(response => response.json())
.then(data => {
      obtenerSecretaria();
      $('#modal-secretaria').modal('close'); // Cambia 'open' por'show'
  })
.catch(error => {
      console.error(`Error al editar Permiso: ${error}`);
  });
}

// Función para eliminar un rol
function eliminarSecretaria(id) {
  const method = 'DELETE';
  fetch(`${apiUrl}/${id}`, {
      method,
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
          obtenerSecretaria();
      })
  .catch(error => console.error(error));
}

function llenarSelectNivel() {
  const select = $('#select-secretaria');  

  fetch(apiUrlp, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
   .then(response => response.json())
   .then(data => {
      select.html('');
      data.forEach(org => {
        const option = `<option value="${org.id_nivel}">${org.nombre}</option>`;
        select.append(option);
      });
      select.formSelect();
    })
   .catch(error => console.error(error));
}


$(document).ready(() => {
  $('select').formSelect();
  obtenerSecretaria();
  llenarSelectNivel() 

$("#agregar_secretaria").click(function(){
    event.preventDefault();
    const nivel = $('#select-secretaria').val();
    const nombre = $('#nombre_secretaria').val();    
    agregarSecretaria(nivel, nombre);    
});

$(document).on('click', '.secretaria-editar', function() {
    const id = $(this).data('id');
    const fila = $(this).closest('tr');
    const id_nivel = fila.find('td:eq(1)').text();
    const nombre_secretaria = fila.find('td:eq(2)').text();    

    // Llena los campos de texto con los valores correspondientes
    $('#id_secretaria').val(id);
    $('#nombre_secretaria').val(nombre_secretaria);   

    // Abre el modal
    $('#modal-secretaria').modal('open');
});


  $('#editar_secretaria').on('click', () => {   
    const id = $('#id_secretaria').val();
    editarSecretaria(id);
    
  });

  $(document).on('click', '.secretaria-eliminar', (e) => {
      const id = $(e.target).data('id');
      eliminarSecretaria(id);
  });
});

    


