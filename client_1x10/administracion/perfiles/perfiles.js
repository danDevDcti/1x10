// script.js

// URL de la API
const apiUrl = 'http://localhost:3000/api/rolespermisos';
const token = localStorage.getItem("token");

// Función para obtener todos los roles
function obtenerPerfiles() {
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
       .then(response => response.json())
       .then(data => {
            const tbody = $('#perfiles-tbody');
            tbody.html('');
            data.forEach(org => {
                tbody.append(`
                    <tr>
                        <td data-id="${org.id_config_rol}">${org.id_config_rol}</td>
                        <td data-name="${org.id_permisos}">${org.id_permisos}</td>
                        <td>
                            <button class="perfil-editar" data-id="${org.id_config_rol}">Editar</button>
                            <button class="perfil-eliminar" data-id="${org.id_config_rol}">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        })
       .catch(error => console.error(error));
}

function agregarPerfiles(id_rol, id_perfil) {
    const perfil = { id_rol, id_perfil };  
    fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(perfil)
    })
   .then(response => response.json())
   .then(data => {
      console.log('Rol agregado con éxito:', data);
      obtenerOrganizacion();
    })
   .catch(error => {
      console.error('Error al agregar rol:', error);
    });
  }

// Función para editar un rol
function editarPerfiles(id) {
  const method = 'PUT';
  const nombre = $('#nombre_perfiles').val();
  const descripcion = $('#descripcion_perfiles').val();
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
      obtenerPerfiles();
      $('#modal-perfiles').modal('close'); // Cambia 'open' por'show'
  })
.catch(error => {
      console.error(`Error al editar Perfiles: ${error}`);
  });
}

// Función para eliminar un rol
function eliminarPerfiles(id) {
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
          obtenerPerfiles();
      })
  .catch(error => console.error(error));
}


$(document).ready(() => {
  obtenerPerfiles();

$("#agregar_perfiles").click(function(){
    event.preventDefault();
    const nombre = $('#nombre_perfiles').val();
    const descripcion = $('#descripcion_perfiles').val();
    agregarPerfiles(nombre, descripcion);    
});

$(document).on('click', '.perfil-editar', function() {
    const id = $(this).data('id');
    const fila = $(this).closest('tr');
    const id_rol = fila.find('td:eq(1)').text();
    const id_perfil = fila.find('td:eq(2)').text();

    console.log(id_rol, id_perfil)

    // Llena los campos de texto con los valores correspondientes
    $('#id_perfiles').val(id);
    $('#nombre_perfiles').val(id_rol);
    $('#descripcion_perfiles').val(id_perfil);

    // Abre el modal
    $('#modal-perfiles').modal('open');
});
  $('#editar_perfiles').on('click', () => {   
    const id = $('#id_perfiles').val();
    editarOrganizacion(id);
    
  });

  $(document).on('click', '.perfil-eliminar', (e) => {
      const id = $(e.target).data('id');
      eliminarPerfiles(id);
  });
});

    


