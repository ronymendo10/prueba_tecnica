var view, encuestasLayer, resultadosLayer, seleccionLayer, token_app;
var tip_efe_ate, tip_efe_no_obl, tip_efe_rec_ofi, tip_no_ate, tip_no_ins_dian, tip_no_est_cerr, tip_no_bri_inf;
var estd_aldia, estd_no_cons, estd_omiso_act_dif, estd_omiso_act_igu, estd_omiso_no_reg, estd_omiso_sin_ana;
var com1, com2, com3, com4, com5, com6, com7, com9, nuev_pot_con, ana_no_pos, estc_con_mora, estc_sin_mora;
var a_2015, a_2016, a_2017, a_2018, a_2019, a_2020;
var estd_pre_omiso_act_dif, estd_pre_omiso_act_igu, año, consulta;


load_webmap();

load_webmap();
document.getElementById("styleSelector").classList.add("open")

function consultas_estados_tribu(){
  var aldia = 'AL DIA'
  var omi_act_dif = 'OMISO CON ACTIVIDAD DIFERENTE'
  var no_con = 'NO CONSTITUIDO'
  var omi_act_igu = 'OMISO CON ACTIVIDAD IGUAL'
  var omi_no_reg = 'OMISO NO REGISTRADO'
  var omi_sin_ana = 'OMISO SIN ANALISIS DE ACTIVIDAD'
  var pre_omiso_act_igu = 'PRESUNTO OMISO CON ACTIVIDAD IGUAL'
  var pre_omiso_act_dif = 'PRESUNTO OMISO CON ACTIVIDAD DIFERENTE'

  if (estd_omiso_act_igu) {                 
    consulta += "(ESTADO_DECLARACION_" + año + " IN ('" + omi_act_igu + "'";
  }
  if (estd_aldia) {
    if(estd_omiso_act_igu){
      consulta += ","
    }else{
      consulta += "(ESTADO_DECLARACION_" + año + " IN ("
    }
    consulta += "'" + aldia + "'";
  }
  if (estd_no_cons) {
    if(estd_aldia || estd_omiso_act_igu){
      consulta += ","
    }else{
      consulta += "(ESTADO_DECLARACION_" + año + " IN ("
    }
    consulta += "'" + no_con + "'";
  }
  if (estd_omiso_act_dif) {
    if(estd_aldia || estd_omiso_act_igu || estd_no_cons){
      consulta += ","
    }else{
      consulta += "(ESTADO_DECLARACION_" + año + " IN ("
    }
    consulta += "'" + omi_act_dif + "'";
  }

  if (estd_omiso_no_reg) {
    if(estd_aldia || estd_omiso_act_igu || estd_no_cons || estd_omiso_act_dif){
      consulta += ","
    }else{
      consulta += "(ESTADO_DECLARACION_" + año + " IN ("
    }
    consulta += "'" + omi_no_reg + "'";
  }

  if (estd_omiso_sin_ana) {
    if(estd_aldia || estd_omiso_act_igu || estd_no_cons || estd_omiso_act_dif || estd_omiso_no_reg){
      consulta += ","
    }else{
      consulta += "(ESTADO_DECLARACION_" + año + " IN ("
    }
    consulta += "'" + omi_sin_ana + "'";
  }

  if (estd_pre_omiso_act_dif) {
    if(estd_aldia || estd_omiso_act_igu || estd_no_cons || estd_omiso_act_dif || estd_omiso_no_reg || estd_omiso_sin_ana){
      consulta += ","
    }else{
      consulta += "(ESTADO_DECLARACION_" + año + " IN ("
    }
    consulta += "'" + pre_omiso_act_dif + "'";
  }

  if (estd_pre_omiso_act_igu) {
    if(estd_aldia || estd_omiso_act_igu || estd_no_cons || estd_omiso_act_dif || estd_omiso_no_reg || estd_omiso_sin_ana ||estd_pre_omiso_act_dif){
      consulta += ","
    }else{
      consulta += "(ESTADO_DECLARACION_" + año + " IN ("
    }
    consulta += "'" + pre_omiso_act_igu + "'";
  }

  if(estd_aldia || estd_omiso_act_igu || estd_no_cons || estd_omiso_act_dif || estd_omiso_no_reg || estd_omiso_sin_ana ||estd_pre_omiso_act_dif||estd_pre_omiso_act_igu){
    consulta += ")) or "
  }


  if (estc_con_mora) {
    consulta += "(ESTADO_CARTERA_" + año + " IN ('CON MORA'";
  }

  if (estc_sin_mora) {
    if(estc_con_mora){
      consulta += ","
    }else{
      consulta += "(ESTADO_CARTERA_" + año + " IN ("
    }
    consulta += "'SIN MORA'";
  }

  if(estc_sin_mora || estc_con_mora){
    consulta += ")) or "
  }
  año = ''
}

function load_ini() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://www.arcgis.com/sharing/rest/oauth2/token",
    "method": "POST",
    "headers": {
      "content-type": "application/x-www-form-urlencoded",
      "accept": "application/json"
    },
    "data": {
      "client_id": "rCQje2PuqT0gSCpL",
      "client_secret": "b70fe506195e49f29f9818b8ac92f826",
      "grant_type": "client_credentials"
    }
  }
  $.ajax(settings).done(function (response) {
    var respons = JSON.parse(response);
    token_app = respons.access_token;

    console.log('token_app: ', token_app);

    load_webmap();
  });
}

/**
 * 
 */
function load_webmap() {
  require(["esri/views/MapView", "esri/WebMap", "esri/layers/GraphicsLayer", "esri/identity/IdentityManager", "esri/layers/FeatureLayer", "esri/Graphic"], function (
    MapView, WebMap, GraphicsLayer, esriId, FeatureLayer, Graphic
  ) {

    /*esriId.registerToken({
      'server': 'https://www.arcgis.com/sharing/rest',
      'token': token_app
    });*/

    resultadosLayer = new GraphicsLayer();
    seleccionLayer = new GraphicsLayer();

    /************************************************************
     * WebMap
     ************************************************************/
    var webmap = new WebMap({
      portalItem: {
        // autocasts as new PortalItem() valle: e84bdca0ef3b4385806597cd26b4f137 since:9bb5c493317244028fbda489e62cad0a
        id: "d137653c1c0f4c46b5de51c9bcf550e3"
      }
    });

    /************************************************************
     * MapView
     ************************************************************/
    view = new MapView({
      map: webmap,
      container: "viewDiv"
    });

    view.when(function () {
      console.log(webmap);
      webmap.addMany([resultadosLayer, seleccionLayer]);

      //////////////////////////
      //   var feat_layer_usuarios = new FeatureLayer({
      //     url: "https://services9.arcgis.com/BzqtAtLTS5F9bi4l/ArcGIS/rest/services/USUARIOS_CALI/FeatureServer/0",
      //     outFields: ["*"]
      //   });

      //   const data = [
      //     { PRIMER_NOMBRE : "jaime"}
      // ]

      //   var feat_nuevo_usuario = new Graphic({
      //     attributes: data[0]
      //   });

      //   var edits = {
      //     addFeatures: [feat_nuevo_usuario]
      // };

      // feat_layer_usuarios
      //         .applyEdits(edits)
      //         .then(function (editsResult) {
      //             console.log('editsResult');
      //             console.log(editsResult);

      //         });
      //////////////////////////////

      document.getElementById("spTotalResultados").innerHTML = "No hay resultados para mostrar";

      encuestasLayer = webmap.allLayers.find(function (layer) {
        return layer.title === "ENCUESTAS";
      });
      $("#check_ana_no_pos").change(function () {
        ana_no_pos = $(this).is(':checked');
      });
      $("#check_nuev_pot_con").change(function () {
        nuev_pot_con = $(this).is(':checked');
      });
      $("#check_efe_atendidas").change(function () {
        tip_efe_ate = $(this).is(':checked');
      });
      $("#check_efe_no_obl").change(function () {
        tip_efe_no_obl = $(this).is(':checked');
      });
      $("#check_efe_rec_ofi").change(function () {
        tip_efe_rec_ofi = $(this).is(':checked');
      });
      $("#check_efe_no_ate").change(function () {
        tip_no_ate = $(this).is(':checked');
      });
      $("#check_no_ins_dian").change(function () {
        tip_no_ins_dian = $(this).is(':checked');
      });
      $("#check_no_est_cerr").change(function () {
        tip_no_est_cerr = $(this).is(':checked');
      });
      $("#check_no_bri_inf").change(function () {
        tip_no_bri_inf = $(this).is(':checked');
      });



      $("#check_aldia").change(function () {
        estd_aldia = $(this).is(':checked');
      });
      $("#check_no_cons").change(function () {
        estd_no_cons = $(this).is(':checked');
      });
      $("#check_omiso_act_dif").change(function () {
        estd_omiso_act_dif = $(this).is(':checked');
      });
      $("#check_omiso_act_igu").change(function () {
        estd_omiso_act_igu = $(this).is(':checked')
      })
      $("#check_omiso_no_reg").change(function () {
        estd_omiso_no_reg = $(this).is(':checked');
      });
      $("#check_omiso_sin_ana").change(function () {
        estd_omiso_sin_ana = $(this).is(':checked');
      });
      $("#check_pre_omiso_act_dif").change(function () {
        estd_pre_omiso_act_dif = $(this).is(':checked');
      });
      $("#check_pre_omiso_act_igu").change(function () {
        estd_pre_omiso_act_igu = $(this).is(':checked');
      });



      $("#check_con_mora").change(function () {
        estc_con_mora = $(this).is(':checked');
      });
      $("#check_sin_mora").change(function () {
        estc_sin_mora = $(this).is(':checked');
      });



      $("#check_2015").change(function () {
        a_2015 = $(this).is(':checked');
      });
      $("#check_2016").change(function () {
        a_2016 = $(this).is(':checked');
      });
      $("#check_2017").change(function () {
        a_2017 = $(this).is(':checked');
      });
      $("#check_2018").change(function () {
        a_2018 = $(this).is(':checked');
      });
      $("#check_2019").change(function () {
        a_2019 = $(this).is(':checked');
      });
      $("#check_2020").change(function () {
        a_2020 = $(this).is(':checked');
      });



      $("#check_com1").change(function () {
        com1 = $(this).is(':checked');
      });
      $("#check_com2").change(function () {
        com2 = $(this).is(':checked');
      });
      $("#check_com3").change(function () {
        com3 = $(this).is(':checked');
      });
      $("#check_com4").change(function () {
        com4 = $(this).is(':checked');
      });
      $("#check_com5").change(function () {
        com5 = $(this).is(':checked');
      });
      $("#check_com6").change(function () {
        com6 = $(this).is(':checked');
      });
      $("#check_com7").change(function () {
        com7 = $(this).is(':checked');
      });
      $("#check_com9").change(function () {
        com9 = $(this).is(':checked');
      });
    });
  });
}



/**
 * 
 */
function consultar_encuestas(criterio) {
  var valor = "";
  consulta = "";
  var valida = true;

  view.popup.close();

  if (criterio == 'NDO') { //Número Documento
    valor = document.getElementById("txtNumeroDocumento").value;
    consulta = "NUMERO_DOCUMENTO like '%" + valor + "%'";

    document.getElementById("txtNumeroDocumento").value = "";
  }
  else {
    if (criterio == 'RSO') { //Razón Social
      valor = document.getElementById("txtRazonSocial").value;
      consulta = "RAZON_SOCIAL like '%" + valor + "%'";

      document.getElementById("txtRazonSocial").value = "";
    }
    else {
      if (criterio == 'NCO') { //Nombre Comercial
        valor = document.getElementById("txtNombreComercial").value;
        consulta = "NOMBRE_COMERCIAL like '%" + valor + "%'";

        document.getElementById("txtNombreComercial").value = "";
      }
      else {
        if (criterio == 'DIR') { //Dirección
          valor = document.getElementById("txtDireccion").value;
          consulta = "DIRECCION_COMPLETA like '%" + valor + "%'";

          document.getElementById("txtDireccion").value = "";
        }
        else {
          if (criterio == 'TIP') { //Tipología de Visita

            if (!tip_efe_ate && !tip_efe_no_obl && !tip_efe_rec_ofi && !tip_no_ate && !tip_no_ins_dian && !tip_no_est_cerr && !tip_no_bri_inf) {
              consulta = "1=1";
             
            }
            else {
              if (tip_efe_ate) {
                consulta += "(TIPO_DE_ENCUESTA = 'ATENDIDA') or ";
              }
              if (tip_efe_no_obl) {
                consulta += "(TIPO_DE_ENCUESTA = 'NO OBLIGATORIA') or ";
              }
              if (tip_efe_rec_ofi) {
                consulta += "(TIPO_DE_ENCUESTA = 'RECUPERADA EN OFICINA') or ";
              }
              if (tip_no_ate) {
                consulta += "(TIPOLOGIA_DE_VISITA = 'NO ATENDIDA') or ";
              }
              if (tip_no_ins_dian) {
                consulta += "(TIPO_DE_ENCUESTA = 'DOCUMENTO NO INSCRITO EN DIAN') or ";
              }
              if (tip_no_est_cerr) {
                consulta += "(TIPO_DE_ENCUESTA = 'ESTABLECIMIENTO CERRADO') or ";
              }
              if (tip_no_bri_inf) {
                consulta += "(TIPO_DE_ENCUESTA  = 'NO BRINDAN INFORMACIÓN') or ";
              }

              consulta += "OBJECTID = -1";
            }

          }
          else {

            if (criterio == 'EST') { //Estado Tributario
              // document.getElementById("cont_estado").style.display = "none";
              // document.getElementById("loader_estado").style.display = "block";
              // año = document.getElementById("selAñoTri").value
              // if ((!estd_aldia && !estd_no_cons && !estd_omiso_act_dif && !estd_omiso_act_igu && !estd_omiso_no_reg && !estd_omiso_sin_ana && !estc_con_mora && !estc_sin_mora)) {
              //   consulta = "1=1";
              // }
              if (!a_2015 && !a_2016 && !a_2017 && !a_2018 && !a_2019 && !a_2020) {
                msgAdvertencia("Debe seleccionar por lo menos un año");
                valida = false
             
              }
              else {
              
                if (a_2015) {
                  año = 'AÑO_1'
                  consultas_estados_tribu()
                }
                if (a_2016) {
                  año = 'AÑO_2'
                  consultas_estados_tribu()
                }
                if (a_2017) {
                  año = 'AÑO_3'
                  consultas_estados_tribu()
                }
                if (a_2018) {
                  año = 'AÑO_4'
                  consultas_estados_tribu()
                }
                if (a_2019) {
                  año = 'AÑO_5'
                  consultas_estados_tribu()
                }
                if (a_2020) {
                  año = 'AÑO_6'
                  consultas_estados_tribu()
                }

                consulta += "OBJECTID = -1";
              }

            }
            else {
              if (criterio == 'ACT') { //Actividad Económica
                valor = document.getElementById("txtActividad").value;

                if (valor.length < 4) {
                  msgAdvertencia("La Actividad Económica debe tener 4 dígitos");
                  valida = false;
                }
                else {
                  consulta = "ACT_ECONOMICA_PRIMARIA like '%" + valor + "%'";
                  document.getElementById("txtActividad").value = "";
                }
              }
              else {
                if (criterio == 'NOV') {
          
                  if (!nuev_pot_con && !ana_no_pos) {
                    consulta = "1=1";
              
                  } else {
                    if (nuev_pot_con) {
                      consulta += "(NOVEDAD = 'NUEVO POTENCIAL CONTRIBUYENTE') or "
                    }
                    if (ana_no_pos) {
                      consulta += "(NOVEDAD = 'ANALISIS NO POSIBLE') or "
                    }
                    consulta += "OBJECTID = -1";
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  console.log(consulta);

  const listNode = document.getElementById("res_encuestas");
  const fragment = document.createDocumentFragment();
  let graphics;

  if (valida) {
    encuestasLayer
      .queryFeatures({
        where: consulta,
        returnGeometry: true,
        outFields: ["*"],
        orderByFields: ["NOMBRE_COMERCIAL"]
      })
      .then(function (results) {
        if (results.features.length == 0) {
          msgAdvertencia("No se encontraron resultados");
        }
        else {
          graphics = results.features;
          resultadosLayer.removeAll();
          seleccionLayer.removeAll();

          encuestasLayer.definitionExpression = consulta;
          document.getElementById("spTotalResultados").innerHTML = "Total resultados: " + results.features.length;
          $('#tabsConsulta a[href="#sel-resultados"]').tab('show');

          var resultados = results.features.map(function (feature, index) {
            // Sets the symbol of each resulting feature to a cone with a
            // fixed color and width. The height is based on the mountain's elevation
            const attributes = feature.attributes;
            const ndoc = attributes.NUMERO_DOCUMENTO;
            const rsoc = attributes.RAZON_SOCIAL;
            const ncom = attributes.NOMBRE_COMERCIAL;
            const dir = attributes.DIRECCION_COMPLETA;
            const tipo = attributes.TIPO_ENCUESTA;
            const obs = attributes.MOTIVO_NO_ENCUESTA;
            const est = '';

            var estado = "";

            if (est == 'OMISO NO REGISTRADO') {
              estado = "<span class='label label-danger'>" + est + "</span>";
            }
            else {
              if (est == 'OMISO REGISTRADO') {
                estado = "<span class='label label-warning'>" + est + "</span>";
              }
              else {
                if (est == 'CON PAGOS PARCIALES (2016 AL 2019)') {
                  estado = "<span class='label label-primary'>" + est + "</span>";
                }
                else {
                  if (est == 'PAZ Y SALVO (2016 AL 2019)') {
                    estado = "<span class='label label-success'>" + est + "</span>";
                  }
                }
              }
            }

            var titulo = "<span><i class='icofont icofont-map-pins text-primary f-20'></i> <b>" + ncom + "</b></span>";
            var item = "" +
              "" + titulo +
              "<br><br>" +
              "<span><b>Razón Social: </b></span>" + rsoc +
              "<br>" +
              "<span><b>Número de Documento: </b></span>" + Number(ndoc).toLocaleString() +
              "<br>" +
              "<span><b>Dirección: </b></span>" + dir +
              "<br>" + estado +
              "<hr>";

            if (tipo == 'EFE' || tipo == 'NOB') {
              titulo = "<span><i class='icofont icofont-map-pins text-info f-20'></i> <span class='text-info'><b>" + ncom + "</b></span></span>";
            }
            else {
              if (tipo == 'NEF') {
                titulo = "<span><i class='icofont icofont-map-pins text-danger f-20'></i> <span class='text-danger'><b>" + ncom + "</b></span></span>";
                item = "" +
                  "" + titulo +
                  "<br><br>" +
                  "<span><b>Dirección: </b></span>" + dir +
                  "<br>" +
                  "<span><b>Observación: </b></span>" + obs +
                  "<hr>";
              }
            }

            // Create a list zip codes in NY
            const li = document.createElement("li");
            li.classList.add("panel-result");
            li.tabIndex = 0;
            li.setAttribute("data-result-id", index);
            li.innerHTML = item;

            fragment.appendChild(li);

            var color
            if (tipo == 'EFE') {
              color = [78, 222, 193]
            }else if( tipo == 'NOB'){
              color = [233, 240, 14]
            }
            else if (tipo == 'NEF') {
              console.log(tipo)
              color = [226, 40, 43]
            }

            feature.symbol = {
              type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
              color: color,
              outline: {
                // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 2
              }
            };

            return feature;
          });

          listNode.innerHTML = "";
          listNode.appendChild(fragment);

          resultadosLayer.addMany(resultados);

          view
            .goTo(resultados)
            .then(function () {
            })
            .catch(function (error) {
              if (error.name != "AbortError") {
                console.error(error);
              }
            });

          console.log(results.features.length);
        }
      })
      .catch(function (error) {
        console.error("query failed: ", error);
      });

    // document.getElementById("loader_estado").style.display = "none";

    // document.getElementById("cont_estado").style.display = "block";

    listNode.addEventListener("click", onListClickHandler);

    function onListClickHandler(event) {
      const target = event.target;
      const resultId = target.getAttribute("data-result-id");
      console.log(resultId);
      seleccionLayer.removeAll();

      // get the graphic corresponding to the clicked zip code
      const result =
        resultId && graphics && graphics[parseInt(resultId, 10)];

      if (result) {
        // open the popup at the centroid of zip code polygon
        // and set the popup's features which will populate popup content and title.
        result.symbol = {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          color: [36, 52, 129],
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 2
          }
        };

        view
          .goTo({ geometry: result.geometry, zoom: 17 })
          .then(function () {
            seleccionLayer.add(result);

            view.popup.open({
              features: [result],
              location: result.geometry.centroid
            });
          })
          .catch(function (error) {
            if (error.name != "AbortError") {
              console.error(error);
            }
          });
      }
    }
  }

}

/**
 * 
 * @param {*} msg 
 */
function msgAdvertencia(msg) {
  const warningDiv = document.getElementById("mensaje");
  warningDiv.innerHTML = msg;
  warningDiv.style.opacity = 1;

  $('#modalAdvertencia').modal('show');
}
function cerrar() {
  var element = document.getElementById("styleSelector");
  element.classList.remove("open");
  element.classList.add("0");
}

function abrir() {
  var element = document.getElementById("styleSelector");
  element.classList.remove("0");
  element.classList.add("open");
}

function ambas() {
  var element = document.getElementById("styleSelector");
  if (element.classList.contains("0")) {
    element.classList.remove("0");
    element.classList.add("open");
  } else {
    element.classList.remove("open");
    element.classList.add("0");
  }
}

