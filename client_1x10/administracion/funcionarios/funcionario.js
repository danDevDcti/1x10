import { getInstitucion, getFuncionario, agregarFuncionario, editarFuncionario, eliminarFuncionario, SelectInstitucion, SelectCargo, SelectPolitica, SelectEstado, SelectMunicipio, SelectParroquia, SelectCiudad} from './funcionarios.controller.js';

$(document).ready(() => {
  $("#crud-funcionario").hide();
  getInstitucion();
  SelectInstitucion();
  SelectCargo();
  SelectPolitica();
  SelectEstado();

  $('#id_estado1').on('change', function() {
      var id = $(this).val();
      console.log(id);
      SelectMunicipio(id);
    SelectCiudad(id);
  });

  $('#id_municipio1').on('change', function() {
    var id = $(this).val();
    console.log(id);
    SelectParroquia(id);
});
  

  $("#agregar_funcionario").click(function(event){
    event.preventDefault();
    const id_funcionario = $('#id_funcionario2').val();
    const cedula = $('#cedula2').val();
    const id_institucion = $('#id_institucion2').val();
    const id_cargo = $('#id_cargo2').val();
    const id_politica = $('#id_politica2').val();
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
  
    agregarFuncionario(
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
    );
  });

$(document).on('click', '.get-funcionario', function() {
    const id = $(this).data('id');
    $("#card-institucion").hide();
    $("#crud-funcionario").show();
    getFuncionario(id);   
});


$('#editar_funcionario').on('click', () => {   
  const id = $('#id_funcionario2').val();
  editarFuncionario(id);
});

  $(document).on('click', '.funcionario-eliminar', (e) => {
      const id = $(e.target).data('id');
      eliminarFunicionario(id);
  });
});

    


