$(document).ready(function(){
    $('.sidenav').sidenav();
	$('#sidebar-1').sidenav({ edge: 'left' });
	$('.fixed-action-btn').floatingActionButton();
    var user = localStorage.getItem("email");
    $("#users").text(user);
	$('.modal').modal();    
	$("#main-roles").hide();
    $("#main-permisos").hide();
    $("#main-perfiles").hide();
    $("#main-organizacion").hide();
    $("#main-orgnivel").hide();
    $("#main-secretaria").hide();
    $("#main-institucion").hide();
    $("#main-cargo").hide();
    $("#main-politica").hide();
    $("#main-funcionario").hide();


	$("#menu-roles").click(function(){
        $("#main").hide(); 
        $("#main-roles").show();
    });

    // Manejar el clic en el botón para mostrar el elemento
    $("#menu-permisos").click(function(){
        $("#main, #main-roles").hide();
        $("#main-permisos").show();     
    });

    $("#menu-perfiles").click(function(){
        $("#main, #main-roles, #main-permisos").hide();
        $("#main-perfiles").show();    
    });

    $("#menu-organizacion").click(function(){
        $("#main, #main-roles, #main-permisos, #main-perfiles").hide();
        $("#main-organizacion").show();     
    });

    $("#menu-orgnivel").click(function(){
        $("#main, #main-roles, #main-permisos, #main-perfiles, #main-organizacion").hide();
        $("#main-orgnivel").show();    
    });

    $("#menu-secretaria").click(function(){
        $("#main, #main-roles, #main-permisos, #main-perfiles, #main-organizacion, #menu-orgnivel").hide();
        $("#main-secretaria").show();       
    });

    $("#menu-institucion").click(function(){
        $("#main, #main-roles, #main-permisos, #main-perfiles, #main-organizacion, #menu-orgnivel, #menu-secretaria").hide();
        $("#main-institucion").show();       
    });

    $("#menu-cargo").click(function(){
        $("#main, #main-roles, #main-permisos, #main-perfiles, #main-organizacion, #menu-orgnivel, #menu-secretaria, #menu-institucion").hide();
        $("#main-cargo").show();       
    });

    $("#menu-politica").click(function(){
        $("#main, #main-roles, #main-permisos, #main-perfiles, #main-organizacion, #menu-orgnivel, #menu-secretaria, #menu-institucion, #main-cargo").hide();
        $("#main-politica").show();       
    });

    $("#menu-funcionario").click(function(){
        $("#main, #main-roles, #main-permisos, #main-perfiles, #main-organizacion, #menu-orgnivel, #menu-secretaria, #menu-institucion, #main-cargo, #menu-politica").hide();
        $("#main-funcionario").show();       
    });


});

