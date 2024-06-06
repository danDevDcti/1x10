// script.js

// URL de la API
const apiUrl = 'http://localhost:3000/api/permisos';
const token = localStorage.getItem("token");

// Función para obtener todos los roles
function obtenerPermisos() {
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
       .then(response => response.json())
       .then(data => {
            const tbody = $('#permisos-tbody');
            tbody.html('');
            data.forEach(permiso => {
                tbody.append(`
                    <tr>
                        <td data-id="${permiso.id_permisos}">${permiso.id_permisos}</td>
                        <td data-name="${permiso.nombre}">${permiso.nombre}</td>
                        <td data-description="${permiso.descripcion}">${permiso.descripcion}</td>
                        <td>
                            <button class="permisos-editar" data-id="${permiso.id_permisos}">Editar</button>
                            <button class="permisos-eliminar" data-id="${permiso.id_permisos}">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        })
       .catch(error => console.error(error));
}

function agregarPermiso(nombre, descripcion) {
    const permiso = { nombre, descripcion };
    const apiUrl = 'http://localhost:3000/api/roles';
    const token = localStorage.getItem("token");
    fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(permiso)
    })
   .then(response => response.json())
   .then(data => {
      console.log('Rol agregado con éxito:', data);
      obtenerPermisos();
    })
   .catch(error => {
      console.error('Error al agregar rol:', error);
    });
  }

// Función para editar un rol
function editarPermiso(id) {
  const method = 'PUT';
  const nombre = $('#nombre_permiso').val();
  const descripcion = $('#descripcion_permiso').val();
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
      obtenerPermisos();
      $('#modal-permiso').modal('close'); // Cambia 'open' por'show'
  })
.catch(error => {
      console.error(`Error al editar Permiso: ${error}`);
  });
}

// Función para eliminar un rol
function eliminarPermiso(id) {
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
          obtenerPermiso();
      })
  .catch(error => console.error(error));
}


$(document).ready(() => {
  obtenerPermisos();

$("#agregar_permiso").click(function(){
    event.preventDefault();
    const nombre = $('#nombre_permiso').val();
    const descripcion = $('#descripcion_permiso').val();
    agregarPermiso(nombre, descripcion);    
});

$(document).on('click', '.permisos-editar', function() {
    const id = $(this).data('id');
    const fila = $(this).closest('tr');
    const nombre = fila.find('td:eq(1)').text();
    const descripcion = fila.find('td:eq(2)').text();

    console.log(id, nombre, descripcion)

    // Llena los campos de texto con los valores correspondientes
    $('#id_permiso').val(id);
    $('#nombre_permiso').val(nombre);
    $('#descripcion_permiso').val(descripcion);

    // Abre el modal
    $('#modal-permiso').modal('open');
});
  $('#editar_permiso').on('click', () => {   
    const id = $('#id_permiso').val();
    editarPermiso(id);
    
  });

  $(document).on('click', '.permisos-eliminar', (e) => {
      const id = $(e.target).data('id');
      eliminarPermiso(id);
  });
});

    


