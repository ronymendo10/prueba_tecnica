var feat_layer;

require(["esri/layers/FeatureLayer"], function (FeatureLayer) {
    feat_layer = new FeatureLayer({
        url: "https://services9.arcgis.com/BzqtAtLTS5F9bi4l/ArcGIS/rest/services/MapaEncuestasIca_WFL1_3d2e26f978ee4e90afd7ef0b8999efbf/FeatureServer/0",
        outFields: ["*"]
    });
});

// https://services9.arcgis.com/BzqtAtLTS5F9bi4l/ArcGIS/rest/services/MapaEncuestasIca_WFL1_3d2e26f978ee4e90afd7ef0b8999efbf/FeatureServer/0
// esta es la url donde debe apuntar el dashboard

var c_total_encuestas = "1=1"

var total_encuestas = ''
feat_layer
    .queryFeatures({
        where: c_total_encuestas,
        outFields: ["*"],
        returnGeometry: true,
        returnQueryGeometry: true
    })
    .then(function (results) {
        console.log("Resultado");
        console.log(results);
        total_encuestas = results.features.length;
        console.log(total_encuestas);
        document.getElementById("txttotalencuesta").innerHTML = total_encuestas;
        let atentidas = results.features.filter(function (feature) {
            return feature.attributes.TIPO_DE_ENCUESTA === 'ATENDIDA';
        })
        // document.getElementById("txttotalencuesta_atendida").innerHTML = atentidas.length;
        // console.log(atentidas.length)
        let no_obligatoria = results.features.filter(function (feature) {
            return feature.attributes.TIPO_DE_ENCUESTA === 'NO OBLIGATORIA';
        })
        // console.log(no_obligatoria.length)
        // document.getElementById("txttotalencuesta_no_onligatoria").innerHTML = no_obligatoria.length;
        let no_efectiva = results.features.filter(function (feature) {
            return feature.attributes.TIPOLOGIA_DE_VISITA === 'NO ATENDIDA';
        })
        // console.log(no_efectiva.length)
        // document.getElementById("txtno_efectiva").innerHTML = no_efectiva.length;

        var recuperada_en_oficina = results.features.filter(function (feature) {
            return feature.attributes.TIPO_DE_ENCUESTA === 'RECUPERADA EN OFICINA';
        })
        console.log(recuperada_en_oficina.length)

        let establecimiento_cerrado = results.features.filter(function (feature) {
            return feature.attributes.TIPOLOGIA_DE_VISITA === 'ESTABLECIMIENTO CERRADO';
        })
        console.log(establecimiento_cerrado.length)
        // document.getElementById("txtestablecimiento_cerrado").innerHTML = establecimiento_cerrado.length;

      
        let no_brinda_informacion = results.features.filter(function (feature) {
            return feature.attributes.TIPOLOGIA_DE_VISITA === 'NO BRINDAN INFORMACIÓN';
        })
        console.log(no_brinda_informacion.length)
        // document.getElementById("txtno_brinda_informacion").innerHTML = no_brinda_informacion.length;

        let no_inscrito_dian = results.features.filter(function (feature) {
            return feature.attributes.TIPOLOGIA_DE_VISITA === 'DOCUMENTO NO INSCRITO EN DIAN';
        })
        console.log(no_inscrito_dian.length)
        // document.getElementById("txtno_inscrito_dian").innerHTML = no_inscrito_dian.length;

        let precenso_sin_comercio = results.features.filter(function (feature) {
            return feature.attributes.TIPOLOGIA_DE_VISITA === 'PRECENSO SIN COMERCIO';
        })
        console.log(precenso_sin_comercio.length)
        // document.getElementById("txtprecenso_sin_comercio").innerHTML = precenso_sin_comercio.length;

        let al_dia_2015 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_1 === 'AL DIA';
        })
      

        let no_constituido_2015 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_1 === 'NO CONSTITUIDO';
        })
        
        let omi_con_act_dif_2015 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_1 === 'OMISO CON ACTIVIDAD DIFERENTE';
        })

        let omi_con_act_igu_2015 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_1 === 'OMISO CON ACTIVIDAD IGUAL';
        })

        let omi_no_reg_2015 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_1 === 'OMISO NO REGISTRADO';
        })

        let omi_sin_ana_act_2015 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_1 === 'OMISO SIN ANALISIS DE ACTIVIDAD';
        })

        let pre_omi_con_act_dif_2015 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_1 === 'PRESUNTO OMISO CON ACTIVIDAD DIFERENTE';
        })

        let pre_omi_con_act_igu_2015 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_1 === 'PRESUNTO OMISO CON ACTIVIDAD IGUAL';
        })

        //

        let al_dia_2016 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_2 === 'AL DIA';
        })


        let no_constituido_2016 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_2 === 'NO CONSTITUIDO';
        })
        
        let omi_con_act_dif_2016 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_2 === 'OMISO CON ACTIVIDAD DIFERENTE';
        })

        let omi_con_act_igu_2016 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_2 === 'OMISO CON ACTIVIDAD IGUAL';
        })

        let omi_no_reg_2016 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_2 === 'OMISO NO REGISTRADO';
        })

        let omi_sin_ana_act_2016 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_2 === 'OMISO SIN ANALISIS DE ACTIVIDAD';
        })

        let pre_omi_con_act_dif_2016 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_2 === 'PRESUNTO OMISO CON ACTIVIDAD DIFERENTE';
        })

        let pre_omi_con_act_igu_2016 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_2 === 'PRESUNTO OMISO CON ACTIVIDAD IGUAL';
        })

        // 

        let al_dia_2017 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_3 === 'AL DIA';
        })
   

        let no_constituido_2017 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_3 === 'NO CONSTITUIDO';
        })
        
        let omi_con_act_dif_2017 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_3 === 'OMISO CON ACTIVIDAD DIFERENTE';
        })

        let omi_con_act_igu_2017 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_3 === 'OMISO CON ACTIVIDAD IGUAL';
        })

        let omi_no_reg_2017 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_3 === 'OMISO NO REGISTRADO';
        })

        let omi_sin_ana_act_2017 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_3 === 'OMISO SIN ANALISIS DE ACTIVIDAD';
        })

        let pre_omi_con_act_dif_2017 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_3 === 'PRESUNTO OMISO CON ACTIVIDAD DIFERENTE';
        })

        let pre_omi_con_act_igu_2017 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_3 === 'PRESUNTO OMISO CON ACTIVIDAD IGUAL';
        })

        // 

        let al_dia_2018 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_4 === 'AL DIA';
        })
       

        let no_constituido_2018 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_4 === 'NO CONSTITUIDO';
        })
        
        let omi_con_act_dif_2018= results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_4 === 'OMISO CON ACTIVIDAD DIFERENTE';
        })

        let omi_con_act_igu_2018 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_4 === 'OMISO CON ACTIVIDAD IGUAL';
        })

        let omi_no_reg_2018 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_4 === 'OMISO NO REGISTRADO';
        })

        let omi_sin_ana_act_2018 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_4 === 'OMISO SIN ANALISIS DE ACTIVIDAD';
        })

        let pre_omi_con_act_dif_2018 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_4 === 'PRESUNTO OMISO CON ACTIVIDAD DIFERENTE';
        })

        let pre_omi_con_act_igu_2018 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_4 === 'PRESUNTO OMISO CON ACTIVIDAD IGUAL';
        })

        // 

        let al_dia_2019 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_5 === 'AL DIA';
        })
        

        let no_constituido_2019 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_5 === 'NO CONSTITUIDO';
        })
        
        let omi_con_act_dif_2019= results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_5 === 'OMISO CON ACTIVIDAD DIFERENTE';
        })

        let omi_con_act_igu_2019 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_5 === 'OMISO CON ACTIVIDAD IGUAL';
        })

        let omi_no_reg_2019 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_5 === 'OMISO NO REGISTRADO';
        })

        let omi_sin_ana_act_2019 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_5 === 'OMISO SIN ANALISIS DE ACTIVIDAD';
        })

        let pre_omi_con_act_dif_2019 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_5 === 'PRESUNTO OMISO CON ACTIVIDAD DIFERENTE';
        })

        let pre_omi_con_act_igu_2019 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_5 === 'PRESUNTO OMISO CON ACTIVIDAD IGUAL';
        })

        //


        let al_dia_2020 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_6 === 'AL DIA';
        })
 

        let no_constituido_2020 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_6 === 'NO CONSTITUIDO';
        })
        
        let omi_con_act_dif_2020= results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_6 === 'OMISO CON ACTIVIDAD DIFERENTE';
        })

        let omi_con_act_igu_2020 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_6 === 'OMISO CON ACTIVIDAD IGUAL';
        })

        let omi_no_reg_2020 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_6 === 'OMISO NO REGISTRADO';
        })

        let omi_sin_ana_act_2020 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_6 === 'OMISO SIN ANALISIS DE ACTIVIDAD';
        })

        let pre_omi_con_act_dif_2020 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_6 === 'PRESUNTO OMISO CON ACTIVIDAD DIFERENTE';
        })

        let pre_omi_con_act_igu_2020 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_6 === 'PRESUNTO OMISO CON ACTIVIDAD IGUAL';
        })

        // 

        let filtro = results.features.filter(function (feature){
            return feature.attributes.ESTADO_DECLARACION_AÑO_1 === '---';
        })

        let ana_no_pos = filtro.filter(function (feature){
            return feature.attributes.NOVEDAD === 'ANALISIS NO POSIBLE';
        })

        let nue_pot_con = filtro.filter(function (feature){
            return feature.attributes.NOVEDAD === 'NUEVO POTENCIAL CONTRIBUYENTE';
        })

        let est_car_con_2015 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_CARTERA_AÑO_1 === 'CON MORA';
        })

        let est_car_sin_2015 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_CARTERA_AÑO_1 === 'SIN MORA';
        })

        let est_car_con_2016 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_CARTERA_AÑO_2 === 'CON MORA';
        })

        let est_car_sin_2016 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_CARTERA_AÑO_2 === 'SIN MORA';
        })

        let est_car_con_2017 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_CARTERA_AÑO_3 === 'CON MORA';
        })

        let est_car_sin_2017 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_CARTERA_AÑO_3 === 'SIN MORA';
        })

        let est_car_con_2018 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_CARTERA_AÑO_4 === 'CON MORA';
        })

        let est_car_sin_2018 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_CARTERA_AÑO_4 === 'SIN MORA';
        })

        let est_car_con_2019 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_CARTERA_AÑO_5 === 'CON MORA';
        })

        let est_car_sin_2019 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_CARTERA_AÑO_5 === 'SIN MORA';
        })

        let est_car_con_2020 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_CARTERA_AÑO_6 === 'CON MORA';
        })

        let est_car_sin_2020 = results.features.filter(function (feature){
            return feature.attributes.ESTADO_CARTERA_AÑO_6 === 'SIN MORA';
        })

        var porceatendidas = ((atentidas.length / total_encuestas) * 100).toFixed(0);
        // console.log(porceatendidas)
        // document.getElementById("porceatendidas").innerHTML = porceatendidas + "%";

        var porceno_obligatoria = ((no_obligatoria.length / total_encuestas) * 100).toFixed(0);
        // console.log(porceno_obligatoria)
        // document.getElementById("porceno_obligatoria").innerHTML = porceno_obligatoria + "%";

        var porceno_efectiva = ((no_efectiva.length / total_encuestas) * 100).toFixed(0);
        // console.log(porceno_obligatoria)
        // document.getElementById("porceno_efectiva").innerHTML = porceno_efectiva + "%";

        var porceno_recuperada = ((recuperada_en_oficina.length / total_encuestas) * 100).toFixed(0);
        // console.log(porceno_obligatoria)
        // document.getElementById("porceno_efectiva").innerHTML = porceno_efectiva + "%";

        var porce_establecimiento_cerrado = ((establecimiento_cerrado.length / total_encuestas) * 100).toFixed(0);
        // console.log(porce_establecimiento_cerrado)
        // document.getElementById("porce_establecimiento_cerrado").innerHTML = porce_establecimiento_cerrado + "%";

        var porce_no_informacion = ((no_brinda_informacion.length / total_encuestas) * 100).toFixed(0);
        // console.log(porce_establecimiento_cerrado)
        // document.getElementById("porce_no_informacion").innerHTML = porce_no_informacion + "%";

        var porce_no_inscrito_dian = ((no_inscrito_dian.length / total_encuestas) * 100).toFixed(0);
        // console.log(porce_no_inscrito_dian)
        // document.getElementById("porce_no_inscrito_dian").innerHTML = porce_no_inscrito_dian + "%";

        var porce_precenso_sin_comercio = ((precenso_sin_comercio.length / total_encuestas) * 100).toFixed(0);
        // console.log(porce_precenso_sin_comercio)
        // document.getElementById("porce_precenso_sin_comercio").innerHTML = porce_precenso_sin_comercio + "%";



        "use strict";

        $(document).ready(function () {

            //Donut chart
            google.charts.load('current', { 'packages': ['bar'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {

                var data = google.visualization.arrayToDataTable([
                    ['Tipo de Encuesta', 'Efectivas (' + atentidas.length + ')', 'No Obligatorias (' + no_obligatoria.length + ')', 'Recuperadas en Oficina (' + recuperada_en_oficina.length + ')', 'No Atendidas (' + no_efectiva.length + ')'],
                    ['Encuesta', atentidas.length, no_obligatoria.length, recuperada_en_oficina.length, no_efectiva.length],
                ]);

                var options = {
                    bars: 'horizontal',
                }
                var chart = new google.charts.Bar(document.getElementById('chart_div'));
                chart.draw(data, options);

                //

                var data = google.visualization.arrayToDataTable([
                    ['Tipo de Encuesta', 'Establecimiento Cerrado (' + establecimiento_cerrado.length + ')', 'No Brindaron Información (' + no_brinda_informacion.length + ')'],
                    ['Encuesta', establecimiento_cerrado.length, no_brinda_informacion.length],

                ]);

                var options = {
                    bars: 'vertical'
                }
                var chart = new google.charts.Bar(document.getElementById('chart_div2'));
                chart.draw(data, options);

                //

                // var data = google.visualization.arrayToDataTable([
                //     ['Task', 'Tipología de Visitas'],
                //     ['Atendidas (' + atentidas.length + ')', atentidas.length],
                //     ['No Obligatorias (' + no_obligatoria.length + ')', no_obligatoria.length],
                //     ['No Atendidas (' + no_efectiva.length + ')', no_efectiva.length]
                // ])

                // var options = {
                //     bars: 'hotizontal',
                //     vAxis: {format: 'decimal'},
                // }

                // var chart = new google.visualization.PieChart(document.getElementById('chart_Ttipologia_Visita'));
                // chart.draw(data, options);

                //

                data = google.visualization.arrayToDataTable([
                    ['Task', 'Tipos de Encuestas'],
                    ['Atendidas (' + atentidas.length + ')', atentidas.length],
                    ['Establecimiento Cerrado (' + establecimiento_cerrado.length + ')', establecimiento_cerrado.length],
                    ['No brindaron Información (' + no_brinda_informacion.length + ')', no_brinda_informacion.length],
                    ['No Obligatoria (' + no_obligatoria.length + ')', no_obligatoria.length],
                    ['Recuperada en Oficina (' + recuperada_en_oficina.length + ')', recuperada_en_oficina.length],
                    ['Documento no inscrito en DIAN (' + no_inscrito_dian.length + ')', no_inscrito_dian.length]
                ]);

                options = {
                    title: '',
                    pieHole: 0.4,
                }

                // var chart = new google.visualization.PieChart(document.getElementById('chart_Tipo_Encuesta'));
                // chart.draw(data, options);

                //

                data = google.visualization.arrayToDataTable([
                    ['Task', 'Estado Tributario'],
                    ['Omiso Registrado (1,835)', 1835],
                    ['Omiso No Registrado (2,302)', 2302],
                    ['Con Pagos Parciales (2016 al 2019) (721)', 721],
                    ['Paz y Salvo (2016 al 2019) (911)', 911]
                ]);

                options = {
                    
                };

                var chart = new google.visualization.PieChart(document.getElementById('chart_Estado'));
                chart.draw(data, options);
            }

            


            var data = google.visualization.arrayToDataTable([
                ['Años', 'Al Dia', 'No Constituido', 'Omiso Con Actividad Diferente', 'Omiso Con Actividad Igual', 'Omiso No Registrado', 
                'Omiso Sin Analisis De Actividad', 'Presunto Omiso Con Actividad Diferente', 'Presunto Omiso Con Actividad Igual','Analisis No Posible',
                'Nuevo Potencial Contribuyente'],
                ['2015', al_dia_2015.length, no_constituido_2015.length, omi_con_act_dif_2015.length, omi_con_act_igu_2015.length, 
                        omi_no_reg_2015.length, omi_sin_ana_act_2015.length, pre_omi_con_act_dif_2015.length, pre_omi_con_act_igu_2015.length, ana_no_pos.length, 
                        nue_pot_con.length],
                ['2016', al_dia_2016.length, no_constituido_2016.length, omi_con_act_dif_2016.length, omi_con_act_igu_2016.length, 
                         omi_no_reg_2016.length, omi_sin_ana_act_2016.length, pre_omi_con_act_dif_2016.length, pre_omi_con_act_igu_2016.length, ana_no_pos.length, 
                        nue_pot_con.length],
                ['2017', al_dia_2017.length, no_constituido_2017.length, omi_con_act_dif_2017.length, omi_con_act_igu_2017.length, 
                        omi_no_reg_2017.length, omi_sin_ana_act_2017.length, pre_omi_con_act_dif_2017.length, pre_omi_con_act_igu_2017.length, ana_no_pos.length, 
                nue_pot_con.length],
                ['2018', al_dia_2018.length, no_constituido_2018.length, omi_con_act_dif_2018.length, omi_con_act_igu_2018.length, 
                        omi_no_reg_2018.length, omi_sin_ana_act_2018.length, pre_omi_con_act_dif_2018.length, pre_omi_con_act_igu_2018.length, ana_no_pos.length, 
                        nue_pot_con.length],
                ['2019', al_dia_2019.length, no_constituido_2019.length, omi_con_act_dif_2019.length, omi_con_act_igu_2019.length, 
                        omi_no_reg_2019.length, omi_sin_ana_act_2019.length, pre_omi_con_act_dif_2019.length, pre_omi_con_act_igu_2019.length, ana_no_pos.length, 
                         nue_pot_con.length],
                ['2020', al_dia_2020.length, no_constituido_2020.length, omi_con_act_dif_2020.length, omi_con_act_igu_2020.length, 
                        omi_no_reg_2020.length, omi_sin_ana_act_2020.length, pre_omi_con_act_dif_2020.length, pre_omi_con_act_igu_2020.length, ana_no_pos.length, 
                        nue_pot_con.length]
            ]);

            var options = {
                bars: 'vertical',
                vAxis: {format: 'decimal'},
            };

            var chart = new google.charts.Bar(document.getElementById('columna_declaracion'));
            chart.draw(data, google.charts.Bar.convertOptions(options));


            var data = google.visualization.arrayToDataTable([
                ['Años', 'Con Mora', 'Sin Mora'],
                ['2015', est_car_con_2015.length, est_car_sin_2015.length],
                ['2016', est_car_con_2016.length, est_car_sin_2016.length],
                ['2017', est_car_con_2017.length, est_car_sin_2017.length],
                ['2018', est_car_con_2018.length, est_car_sin_2018.length],
                ['2019', est_car_con_2019.length, est_car_sin_2019.length],
                ['2020', est_car_con_2020.length, est_car_sin_2020.length]
            ]);

            var options = {
                    bars: 'vertical',
                    vAxis: {format: 'decimal'},
            };

            var chart = new google.charts.Bar(document.getElementById('columna_cartera'));
            chart.draw(data, google.charts.Bar.convertOptions(options));
        });
    });