$('.btn[name="enviar"]').click(function() {
    var nombre = $('input[name="nombre"]').val();
    var empresa = $('input[name="empresa"]').val();
    var email = $('input[name="email"]').val();
    var celular = $('input[name="celular"]').val();
    
    if(nombre == "") {
        toast({title : 'Alerta', type : 'custom',description:'Debe completar el campo Nombre',timeout : 3000,icon:null,border_color: '#fc0'})
        console.log("Debe completar el campo Nombre")
        return false;
    } else if(/\d/.test(nombre)) {
        toast({title : 'Alerta', type : 'custom',description:'Campo Nombre solo debe contener letras',timeout : 3000,icon:null,border_color: '#fc0'})
        console.log("Campo Nombre solo debe contener letras")
        return false;
    } else if(empresa == "") {
        toast({title : 'Alerta', type : 'custom',description:'Debe completar el campo Empresa',timeout : 3000,icon:null,border_color: '#fc0'})
        console.log("Debe completar el campo Empresa")
        return false;
    } else if(email == "") {
        toast({title : 'Alerta', type : 'custom',description:'Debe completar el campo Correo Electronico',timeout : 3000,icon:null,border_color: '#fc0'})
        console.log("Debe completar el campo Correo Electronico")
        return false;
    } else if(!IsEmail(email)) {
        toast({title : 'Alerta', type : 'custom',description:'El campo Correo Electronico no es valido',timeout : 3000,icon:null,border_color: '#fc0'})
        console.log("El campo Correo Electronico no es valido")
        return false;
    } else if(celular == "") {
        toast({title : 'Alerta', type : 'custom',description:'Debe completar el campo Celular',timeout : 3000,icon:null,border_color: '#fc0'})
        console.log("Debe completar el campo Celular")
        return false;
    } else if(/[a-zA-Z]/g.test(celular)) {
        toast({title : 'Alerta', type : 'custom',description:'El campo Celular solo puede contener numeros',timeout : 3000,icon:null,border_color: '#fc0'})
        console.log("El campo Celular solo puede contener numeros")
        return false;
    } else if(celular.length != 9) {
        toast({title : 'Alerta', type : 'custom',description:'El campo Celular debe contener 9 caracteres',timeout : 3000,icon:null,border_color: '#fc0'})
        console.log("El campo Celular debe contener 9 caracteres")
        return false;
    }
    
    enviarCorreo(nombre,empresa,email,celular);
});

function enviarCorreo(nombre,empresa,email,celular) {
    
    $("#contactoNuevo").prop("disabled", true);
    var contacto = {
        nombre:nombre,
        empresa:empresa,
        email:email,
        celular:celular
    };
    
    $.ajax({
        url:'https://facturacion.beepro.cl/api/facturacion/contacto-web',
        method:'POST',
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(contacto),
        beforeSend:function(){
            
        },success:function(res) {
            $('input').val('');
            toast({title : 'Exito', type : 'custom',description:'Contacto enviado correctamente',timeout : 3000,icon:null,border_color: '#43d569'})
            console.log("correo enviado");
             $("#contactoNuevo").prop("disabled", false);
        },
        fail: function(res){
           $("#contactoNuevo").prop("disabled", false);
        }
    })
}

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    }
    else {
        return true;
    }
}

