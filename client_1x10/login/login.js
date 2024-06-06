import { login } from './controller/loginController.js';

$(document).ready(function() {
    $("#ingresar").click(function(){
        event.preventDefault();
        const cedula = $('#user').val();
        const contrasena = $('#password').val();
        login(cedula, contrasena);
    });
});