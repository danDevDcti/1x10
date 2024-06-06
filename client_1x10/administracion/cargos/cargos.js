// script.js

// URL de la API
const apiUrl = 'http://localhost:3000/api/cargo';

const token = localStorage.getItem("token");

// Función para obtener todos los roles
function obtenerCargo() {
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
       .then(response => response.json())
       .then(data => {
            const tbody = $('#cargo-tbody');
            tbody.html('');
            data.forEach(org => {
                tbody.append(`
                    <tr>
                        <td data-id="${org.id_cargo}">${org.id_cargo}</td>
                        <td data-org="${org.nombre}">${org.nombre}</td>
                        <td data-name="${org.descripcion}">${org.descripcion}</td>
                        <td>
                            <button class="cargo-editar" data-id="${org.id_cargo}">Editar</button>
                            <button class="cargo-eliminar" data-id="${org.id_cargo}">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        })
       .catch(error => console.error(error));
}

function agregarCargo(nombre, descripcion) {
      const cargo = {      
        nombre: nombre,
        descripcion: descripcion
      };
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(cargo)
    })
   .then(response => response.json())
   .then(data => {
      console.log('Nivel agregado con éxito:', data);
      obtenerCargo();
    })
   .catch(error => {
      console.error('Error al agregar rol:', error);
    });
  }

// Función para editar un rol
function editarCargo(id) {
  const method = 'PUT';  
  const nombre = $('#nombre_cargo').val();
  const descripcion = $('#descripcion_cargo').val();

  const cargo = {
      nombre: nombre,
      descripcion: descripcion
  };
  fetch(`${apiUrl}/${id}`, {
      method,
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(cargo)
  })
.then(response => response.json())
.then(data => {
      obtenerCargo();
      $('#modal-cargo').modal('close'); // Cambia 'open' por'show'
  })
.catch(error => {
      console.error(`Error al editar Permiso: ${error}`);
  });
}

// Función para eliminar un rol
function eliminarCargo(id) {
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
          obtenerCargo();
      })
  .catch(error => console.error(error));
}

/* ---------------------------------------------------------------------------------------------------*/

$(document).ready(() => {
  
  obtenerCargo();
  

$("#agregar_cargo").click(function(){
    event.preventDefault();
    const nombre = $('#nombre_cargo').val();
    const descripcion = $('#descripcion_cargo').val();       
    agregarCargo(nombre, descripcion)    
});

$(document).on('click', '.cargo-editar', function() {
    const id = $(this).data('id');
    const fila = $(this).closest('tr');
    const nombre = fila.find('td:eq(1)').text();
    const descripcion = fila.find('td:eq(2)').text();    

    // Llena los campos de texto con los valores correspondientes
    $('#id_cargo').val(id);
    $('#nombre_cargo').val(nombre);
    $('#descripcion_cargo').val(descripcion);   

    // Abre el modal
    $('#modal-cargo').modal('open');
});


  $('#editar_cargo').on('click', () => {   
    const id = $('#id_cargo').val();
    editarCargo(id);
    
  });

  $(document).on('click', '.cargo-eliminar', (e) => {
      const id = $(e.target).data('id');
      eliminarCargo(id);
  });
});

    


