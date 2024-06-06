// script.js

// URL de la API
const apiUrl = 'http://localhost:3000/api/roles';
const token = localStorage.getItem("token");

// Función para obtener todos los roles
function obtenerRoles() {
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
       .then(response => response.json())
       .then(data => {
            const tbody = $('#roles-tbody');
            tbody.html('');
            data.forEach(rol => {
                tbody.append(`
                    <tr>
                        <td data-id="${rol.id_config_rol}">${rol.id_config_rol}</td>
                        <td data-name="${rol.nombre}">${rol.nombre}</td>
                        <td data-description="${rol.descripcion}">${rol.descripcion}</td>
                        <td>
                            <button class="btn-editar" data-id="${rol.id_config_rol}">Editar</button>
                            <button class="btn-eliminar" data-id="${rol.id_config_rol}">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        })
       .catch(error => console.error(error));
}

function agregarRoles(nombre, descripcion) {
    const roles = { nombre, descripcion };
    const apiUrl = 'http://localhost:3000/api/roles';
    const token = localStorage.getItem("token");
    fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(roles)
    })
   .then(response => response.json())
   .then(data => {
      console.log('Rol agregado con éxito:', data);
      obtenerRoles();
    })
   .catch(error => {
      console.error('Error al agregar rol:', error);
    });
  }

// Función para editar un rol
function editarRol(id) {
  const method = 'PUT';
  const nombre = $('#nombre_roles').val();
  const descripcion = $('#descripcion_roles').val();
  fetch(`${apiUrl}/${id}`, {
      method,
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          nombre,
          descripcion
      })
  })
.then(response => response.json())
.then(data => {
      obtenerRoles();
      $('#modal-roles').modal('close'); // Cambia 'open' por'show'
  })
.catch(error => {
      console.error(`Error al editar rol: ${error}`);
  });
}

// Función para eliminar un rol
function eliminarRol(id) {
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
          obtenerRoles();
      })
  .catch(error => console.error(error));
}


$(document).ready(() => {
  obtenerRoles();

  $("#agregar_roles").click(function(){
    event.preventDefault();
    const nombre = $('#nombre_roles').val();
    const descripcion = $('#descripcion_roles').val();
    agregarRoles(nombre, descripcion);    
});

  
  $(document).on('click', '.btn-editar', function() {
    const id = $(this).data('id');
    const fila = $(this).closest('tr');
    const nombre = fila.find('td:eq(1)').text();
    const descripcion = fila.find('td:eq(2)').text();

    console.log(id, nombre, descripcion)

    // Llena los campos de texto con los valores correspondientes
    $('#id_roles').val(id);
    $('#nombre_roles').val(nombre);
    $('#descripcion_roles').val(descripcion);

    // Abre el modal
    $('#modal-roles').modal('open');
});
  $('#editar_roles').on('click', () => {   
    const id = $('#id_roles').val();
    editarRol(id);
    
  });

  $(document).on('click', '.btn-eliminar', (e) => {
      const id = $(e.target).data('id');
      eliminarRol(id);
  });
});

    


