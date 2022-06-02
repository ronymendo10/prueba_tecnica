var feat_layer_usuarios;

require(["esri/layers/FeatureLayer"], function (FeatureLayer) {
    feat_layer_usuarios = new FeatureLayer({
        url: "https://services9.arcgis.com/BzqtAtLTS5F9bi4l/ArcGIS/rest/services/USUARIOS_CALI/FeatureServer/0",
        outFields: ["*"]
    });

});

function fn_consulta_usuario(event) {

    event.preventDefault()

    var val_usuario = document.getElementById("txtUsuario").value.toUpperCase();
    var val_password = document.getElementById("txtPassword").value;

    console.log(val_password);

    var msg = '';
    var error_valida = false;

    if (val_usuario == '' || val_password == '') {
        msg += '<i class="bx bx-x"></i>' + ' Debe digilenciar los campos de Usuario y Contraseña. ' + '<br>';
        error_valida = true;
    }
    if (error_valida) {
        document.getElementById("txtErrorValidaUsuario").innerHTML = msg;
        document.getElementById("cont_error_valida_Usuario").style.display = "block";

    }
    else {
        var consulta = "USUARIO = '" + val_usuario + "' AND CONTRASENIA = '" + val_password + "'AND ROL IN ('ADMIN', 'EDICION', 'CONSULTA')";
        console.log(consulta);

        feat_layer_usuarios
            .queryFeatures({
                where: consulta,
                outFields: ["*"]
            })
            .then(function (results) {
                console.log(results.features);

                if (results.features.length == 0) {
                    document.getElementById("txtErrorValidaUsuario").innerHTML = '<i class="bx bx-x"></i>' + ' Credenciales Inválidas. ' + '<br>';
                    document.getElementById("cont_error_valida_Usuario").style.display = "block";

                } else if (results.features[0].attributes.ESTADO == 'I') {
                    document.getElementById("txtErrorValidaUsuario").innerHTML = '<i class="bx bx-x"></i>' + ' Usuario Inactivo' + '<br>';
                    document.getElementById("cont_error_valida_Usuario").style.display = "block";
                }
                else {
                    localStorage.setItem('usuario', results.features[0].attributes.USUARIO);
                    // localStorage.setItem('ciudad', results.features[0].attributes.CIUDAD);
                    localStorage.setItem('rol', results.features[0].attributes.ROL);

                    if (results.features[0].attributes.ROL == ROL_ADMIN) {
                        // document.getElementById("op_asigna_enc").style.display = "block";
                        // document.getElementById("op_asigna_val").style.display = "block";
                        ir();
                    }
                    else if (results.features[0].attributes.ROL == ROL_EDICION_CONSULTA) {
                        // document.getElementById("op_asigna_val").style.display = "none";
                        // document.getElementById("op_asigna_enc").style.display = "block";
                        ir();
                        // window.location.href='visor_enc.html';
                    }

                    document.getElementById("txtUsuario").value = "";
                    document.getElementById("txtPassword").value = "";

                }

            })
            .catch(function (error) {
                console.error("Error en consulta: ", error);
            });
    }
    return false;
}

function fn_salir() {
    // document.getElementById("op_asigna_enc").style.display = "none";
    // document.getElementById("op_asigna_val").style.display = "none";

    localStorage.clear();
    // document.getElementById("usuario").innerHTML = "";
    // document.getElementById("cont_usuario").style.display = "none";

    window.location.href = 'index.html';
    // fn_init_login();
}

function ir() {
    window.location.href = 'visor.html';
    //     console.log(results.features[0].attributes.USUARIO)
    //     console.log(localStorage.getItem('usuario'))
    // document.getElementById("cont_usuario").style.display = "block";
}