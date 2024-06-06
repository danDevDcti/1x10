// URL de la API
const apiUrl = 'http://localhost:3000/api/politica';
const apiIns = 'http://localhost:3000/api/institucion';
const apiObrero = 'http://localhost:3000/api/funcionary';
const api = 'http://localhost:3000/api/funcionarios';
const apiCargo = 'http://localhost:3000/api/cargo';
const apiPolitica = 'http://localhost:3000/api/politica';
const apiEstado = 'http://localhost:3000/api/estado';
const apiMunicipio = 'http://localhost:3000/api/municipio';
const apiParroquia = 'http://localhost:3000/api/parroquia';
const apiCiudad = 'http://localhost:3000/api/ciudad';

const token = localStorage.getItem("token");

// Función para obtener todos los roles
function getInstitucion() {
    fetch(apiIns, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
       .then(response => response.json())
       .then(data => {
            const tbody = $('#card-institucion');
            tbody.html('');
            data.forEach(org => {
                tbody.append(`
                    <div class="col s12 m6" >
                        <div class="card red accent-4">
                            <div class="card-content white-text">
                                <span class="card-title" data-id="${org.id_institucion}">${org.nombre}</span>
                                
                            </div>
                            <div class="card-action">
                                <a href="#" class="get-funcionario" data-id="${org.id_institucion}">FUNCIONARIOS</a>
                                <a href="#">0000000</a>
                            </div>
                        </div>
                    </div>
                `);
            });
        })
       .catch(error => console.error(error));
}

function getFuncionario(id) {
    fetch(`${apiObrero}/${id}`, {
      method: 'GET',
      headers: {
        //'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
       .then(response => response.json())
       .then(data1 => {
            const tbody = $('#funcionario-tbody');
            tbody.html('');
            console.log(data1);
            data1.forEach(org1 => {
                tbody.append(`
                    <tr>
                        <td data-id="${org1.id_funcionario}">${org1.id_funcionario}</td>
                        <td data-org="${org1.cedula}">${org1.cedula}</td>
                        <td data-carg="${org1.nombre_cargo}">${org1.nombre_cargo}</td>
                        <td data-nome="${org1.primer_nombre}">${org1.primer_nombre}</td>
                        <td data-apellido="${org1.primer_apellido}">${org1.primer_apellido}</td>
                        <td data-phone="${org1.telefono_mobil}">${org1.telefono_mobil}</td>
                        <td>
                            <button class="politica-editar" data-id="${org1.id_funcionario}">Editar</button>
                            <button class="politica-eliminar" data-id="${org1.id_funcionario}">Eliminar</button>
                        </td>
                    </tr>
                `);
            });
        })
       .catch(error => console.error(error));
}

function agregarFuncionario(
    cedula,
    id_institucion,
    id_cargo,
    id_politica,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    email,
    telefono_mobil,
    whatsapp,
    telegram,
    id_estado,
    id_municipio,
    id_ciudad,
    id_parroquia,
    edificio,
    piso,
    apartamento,
    urbanismo,
    calle,
    casa,
    punto_referencia
  ) {
    const funcionario = {
      cedula: parseInt(cedula, 10),
      id_institucion: parseInt(id_institucion, 10),
      id_cargo: parseInt(id_cargo, 10),
      id_politica: parseInt(id_politica, 10),
      primer_nombre: primer_nombre,
      segundo_nombre: segundo_nombre,
      primer_apellido: primer_apellido,
      segundo_apellido: segundo_apellido,
      email: email,
      telefono_mobil: telefono_mobil,
      whatsapp: whatsapp,
      telegram: telegram,
      id_estado: parseInt(id_estado, 10),
      id_municipio: parseInt(id_municipio, 10),
      id_ciudad: parseInt(id_ciudad, 10),
      id_parroquia: parseInt(id_parroquia, 10),
      edificio: edificio,
      piso: piso,
      apartamento: apartamento,
      urbanismo: urbanismo,
      calle: calle,
      casa: casa,
      punto_referencia: punto_referencia
    };
  
    fetch(api, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(funcionario)
    })
   .then(response => response.json())
   .then(data => {
      console.log('Funcionario agregado con éxito:', data);
      getFuncionario(id_institucion); // supongo que tienes una función para obtener los funcionarios
    })
   .catch(error => {
      console.error('Error al agregar funcionario:', error);
    });
  }

// Función para editar un rol
function editarFuncionario(id) {
    const method = 'PUT';
    const id_funcionario = $('#id_funcionario2').val();
    const cedula = $('#cedula2').val();
    const id_institucion = $('#id_institucion1').val();
    const id_cargo = $('#id_cargo1').val();
    const id_politica = $('#id_politica1').val();
    const primer_nombre = $('#primer_nombre2').val();
    const segundo_nombre = $('#segundo_nombre2').val();
    const primer_apellido = $('#primer_apellido2').val();
    const segundo_apellido = $('#segundo_apellido2').val();
    const email = $('#email2').val();
    const telefono_mobil = $('#telefono_mobil2').val();
    const whatsapp = $('#whatsapp2').val();
    const telegram = $('#telegram2').val();
    const id_estado = $('#id_estado1').val();
    const id_municipio = $('#id_municipio1').val();
    const id_ciudad = $('#id_ciudad1').val();
    const id_parroquia = $('#id_parroquia1').val();
    const edificio = $('#edificio2').val();
    const piso = $('#piso2').val();
    const apartamento = $('#apartamento2').val();
    const urbanismo = $('#urbanismo2').val();
    const calle = $('#calle2').val();
    const casa = $('#casa2').val();
    const punto_referencia = $('#punto_referencia2').val();
  
    const funcionario = {
      id_funcionario: id_funcionario,
      cedula: cedula,
      id_institucion: id_institucion,
      id_cargo: id_cargo,
      id_politica: id_politica,
      primer_nombre: primer_nombre,
      segundo_nombre: segundo_nombre,
      primer_apellido: primer_apellido,
      segundo_apellido: segundo_apellido,
      email: email,
      telefono_mobil: telefono_mobil,
      whatsapp: whatsapp,
      telegram: telegram,
      id_estado: id_estado,
      id_municipio: id_municipio,
      id_ciudad: id_ciudad,
      id_parroquia: id_parroquia,
      edificio: edificio,
      piso: piso,
      apartamento: apartamento,
      urbanismo: urbanismo,
      calle: calle,
      casa: casa,
      punto_referencia: punto_referencia
    };
  
    fetch(`${api}/${id}`, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(funcionario)
    })
   .then(response => response.json())
   .then(data => {
      getFuncionario(id_institucion); // supongo que tienes una función para obtener los funcionarios
      $('#modal-funcionario').modal('close'); // Cambia 'open' por'show'
    })
   .catch(error => {
      console.error(`Error al editar Funcionario: ${error}`);
    });
  }
// Función para eliminar un rol
function eliminarFuncionario(id) {
  const method = 'DELETE';
  fetch(`${api}/${id}`, {
      method,
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
          //obtenerPolitica();
      })
  .catch(error => console.error(error));
}

function SelectInstitucion() {
    const select = $('#id_institucion2');  
  
    fetch(apiIns, {
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
          const option = `<option value="${org.id_institucion}">${org.nombre}</option>`;
          select.append(option);
        });
        select.formSelect();
      })
     .catch(error => console.error(error));
  }

  function SelectCargo() {
    const select = $('#id_cargo2');  
  
    fetch(apiCargo, {
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
          const option = `<option value="${org.id_cargo}">${org.nombre}</option>`;
          select.append(option);
        });
        select.formSelect();
      })
     .catch(error => console.error(error));
  }


  function SelectPolitica() {
    const select = $('#id_politica2');  
  
    fetch(apiPolitica, {
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
          const option = `<option value="${org.id_politica}">${org.nombre}</option>`;
          select.append(option);
        });
        select.formSelect();
      })
     .catch(error => console.error(error));
  }

  function SelectEstado() {
    const select = $('#id_estado1');  
  
    fetch(apiEstado, {
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
          const option = `<option value="${org.id_estado}">${org.estado}</option>`;
          select.append(option);
        });
        select.formSelect();
      })
     .catch(error => console.error(error));
  }

  function SelectMunicipio(id) {
    const select = $('#id_municipio1');  
  console.log(id);
    fetch(`${apiMunicipio}/${id}`, {
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
          const option = `<option value="${org.id_municipio}">${org.municipio}</option>`;
          select.append(option);
        });
        select.formSelect();
      })
     .catch(error => console.error(error));
  }

  function SelectCiudad(id) {
    const select = $('#id_ciudad1');  
  
    fetch(`${apiCiudad}/${id}`, {
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
          const option = `<option value="${org.id_ciudad}">${org.ciudad}</option>`;
          select.append(option);
        });
        select.formSelect();
      })
     .catch(error => console.error(error));
  }

  function SelectParroquia(id) {
    const select = $('#id_parroquia1');  
  
    fetch(`${apiParroquia}/${id}`, {
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
          const option = `<option value="${org.id_parroquia}">${org.parroquia}</option>`;
          select.append(option);
        });
        select.formSelect();
      })
     .catch(error => console.error(error));
  }

export { getInstitucion, getFuncionario, agregarFuncionario, editarFuncionario, eliminarFuncionario, SelectInstitucion, SelectCargo, SelectPolitica, SelectEstado, SelectMunicipio, SelectParroquia, SelectCiudad };