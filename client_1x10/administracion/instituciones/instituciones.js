// script.js

// URL de la API
const apiOrg = 'http://localhost:3000/api/organizacion';
const apiOrgNivel = 'http://localhost:3000/api/nivelorganizacion';
const apiSecre = 'http://localhost:3000/api/secretaria';
const apiInt = 'http://localhost:3000/api/institucion';
const apiInts = 'http://localhost:3000/api/institution';

const token = localStorage.getItem("token");

// Función para obtener todos los roles
function obtenerInstitucion() {
    fetch(apiInts, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
       .then(response => response.json())
       .then(data => {
            const tbody = $('#institucion-tbody');
            tbody.html('');
            data.forEach(org => {
                tbody.append(`
                    <tr>
                        <td data-id="${org.id_institucion}">${org.id_institucion}</td>
                        <td data-org="${org.nombre_organizacion}">${org.nombre_organizacion}</td>
                        <td data-name="${org.nombre_nivel}">${org.nombre_nivel}</td>
                        <td data-name="${org.nombre_secretaria}">${org.nombre_secretaria}</td>
                        <td data-name="${org.nombre_institucion}">${org.nombre_institucion}</td>
                        <td>
                            <button class="institucion-editar" data-id="${org.id_institucion}">Editar</button>
                            <button class="institucion-eliminar" data-id="${org.id_institucion}">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        })
       .catch(error => console.error(error));
}

function agregarInstitucion(org, nivel, secre, nombre) {
      const institucion = {
        id_organizacion: parseInt(org, 10),
        id_nivel: parseInt(nivel, 10),
        id_secretaria: parseInt(secre, 10),
        nombre: nombre
      };
      fetch(apiInt, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(institucion)
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
function editarInstitucion(id) {
  const method = 'PUT';  
  const org = $('#select-organizacion').val();
  const nivel = $('#select-nivel').val();
  const secre = $('#select-secretaria').val();
  const nombre = $('#nombre_institucion').val();  

  const institucion = {
    id_organizacion: org,
    id_nivel: nivel,    
    id_secretaria: secre,
    nombre: nombre
  };
  fetch(`${apiInt}/${id}`, {
      method,
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(institucion)
  })
.then(response => response.json())
.then(data => {
      obtenerInstitucion();
      $('#modal-institucion').modal('close'); // Cambia 'open' por'show'
  })
.catch(error => {
      console.error(`Error al editar Permiso: ${error}`);
  });
}

// Función para eliminar un rol
function eliminarInstitucion(id) {
  const method = 'DELETE';
  fetch(`${apiInt}/${id}`, {
      method,
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
          obtenerInstitucion();
      })
  .catch(error => console.error(error));
}

function llenarSelectOrganizacion() {
  const select = $('#select-organizacion1');  

  fetch(apiOrg, {
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
        const option = `<option value="${org.id_organizacion}">${org.nombre}</option>`;
        select.append(option);
      });
      select.formSelect();
    })
   .catch(error => console.error(error));
}
function llenarSelectNivel() {
  const select = $('#select-nivel');  

  fetch(apiOrgNivel, {
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
function llenarSelectSecretaria() {
  const select = $('#select-secretaria1');  

  fetch(apiSecre, {
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
        const option = `<option value="${org.id_secretaria}">${org.nombre}</option>`;
        select.append(option);
      });
      select.formSelect();
    })
   .catch(error => console.error(error));
}

/* ---------------------------------------------------------------------------------------------------*/

$(document).ready(() => {
  $('select').formSelect();
  obtenerInstitucion();
  llenarSelectOrganizacion();
  llenarSelectNivel();
  llenarSelectSecretaria(); 

$("#agregar_institucion").click(function(){
    event.preventDefault();
    const org = $('#select-organizacion').val();
    const nivel = $('#select-nivel').val();
    const secre = $('#select-secretaria').val();
    const nombre = $('#nombre_institucion').val();    
    agregarInstitucion(org, nivel, secre, nombre)    
});

$(document).on('click', '.institucion-editar', function() {
    const id = $(this).data('id');
    const fila = $(this).closest('tr');
    const id_nivel = fila.find('td:eq(1)').text();
    const nombre_institucion = fila.find('td:eq(2)').text();    

    // Llena los campos de texto con los valores correspondientes
    $('#id_institucion').val(id);
    $('#nombre_institucion').val(nombre_institucion);   

    // Abre el modal
    $('#modal-institucion').modal('open');
});


  $('#editar_institucion').on('click', () => {   
    const id = $('#id_institucion').val();
    editarInstitucion(id);
    
  });

  $(document).on('click', '.institucion-eliminar', (e) => {
      const id = $(e.target).data('id');
      eliminarInstitucion(id);
  });
});

    


