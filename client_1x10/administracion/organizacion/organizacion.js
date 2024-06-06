// script.js

// URL de la API
const apiUrl = 'http://localhost:3000/api/organizacion';
const token = localStorage.getItem("token");

// Función para obtener todos los roles
function obtenerOrganizacion() {
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
       .then(response => response.json())
       .then(data => {
            const tbody = $('#organizacion-tbody');
            tbody.html('');
            data.forEach(org => {
                tbody.append(`
                    <tr>
                        <td data-id="${org.id_organizacion}">${org.id_organizacion}</td>
                        <td data-name="${org.nombre}">${org.nombre}</td>
                        <td>
                            <button class="org-editar" data-id="${org.id_organizacion}">Editar</button>
                            <button class="org-eliminar" data-id="${org.id_organizacion}">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        })
       .catch(error => console.error(error));
}

function agregarOrganizacion(nombre, descripcion) {
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
      obtenerOrganizacion();
    })
   .catch(error => {
      console.error('Error al agregar rol:', error);
    });
  }

// Función para editar un rol
function editarOrganizacion(id) {
  const method = 'PUT';
  const nombre = $('#nombre_organizacion').val();
  const descripcion = $('#descripcion_organizacion').val();
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
      $('#modal-organizacion').modal('close'); // Cambia 'open' por'show'
  })
.catch(error => {
      console.error(`Error al editar Permiso: ${error}`);
  });
}

// Función para eliminar un rol
function eliminarOrganizacion(id) {
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
          obtenerOrganizacion();
      })
  .catch(error => console.error(error));
}


$(document).ready(() => {
  obtenerOrganizacion();

$("#agregar_organizacion").click(function(){
    event.preventDefault();
    const nombre = $('#nombre_organizacion').val();
    const descripcion = $('#descripcion_organizacion').val();
    agregarPermiso(nombre, descripcion);    
});

$(document).on('click', '.org-editar', function() {
    const id = $(this).data('id');
    const fila = $(this).closest('tr');
    const nombre = fila.find('td:eq(1)').text();
    const descripcion = fila.find('td:eq(2)').text();

    console.log(id, nombre, descripcion)

    // Llena los campos de texto con los valores correspondientes
    $('#id_organizacion').val(id);
    $('#nombre_organizacion').val(nombre);
    $('#descripcion_organizacion').val(descripcion);

    // Abre el modal
    $('#modal-organizacion').modal('open');
});
  $('#editar_organizacion').on('click', () => {   
    const id = $('#id_organizacion').val();
    editarOrganizacion(id);
    
  });

  $(document).on('click', '.org-eliminar', (e) => {
      const id = $(e.target).data('id');
      eliminarOrganizacion(id);
  });
});

    


