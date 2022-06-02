var tabla
$(document).ready(function () {
     tabla = $('#dataTable').DataTable({
        "pageLength": 10,
        "lengthChange": false,
        "language": {
            "sSearch": "Buscar <i class='icofont-search'></i>",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "infoEmpty": "No hay registros",
            "zeroRecords": "No hay registros",
            "oPaginate": {
                "sFirst": "Primera página", // This is the link to the first page
                "sPrevious": "Anterior", // This is the link to the previous page
                "sNext": "Siguiente", // This is the link to the next page
                "sLast": "Anterior" // This is the link to the last page
            }
    
        },
    
        //data: dataSet,
        columns: [
            { title: "ID" },
            { title: "HORA DE CONSULTA" },
            { title: "NOMBRE PAIS" },
            { title: "CODIGO ISO" },
            { title: "IP" }
        ],
        "columnDefs": [{
            "targets": 5,
            "data": null
        }]
    });
})

async function registraIp(){
    
        let datos = {};
        datos.ip = document.getElementById('idIp').value;
       
        const request = await fetch('api/registro/ip', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datos)
        });
        console.log(request);
        if(request.status == 200) {
            alert("LA IP FUE REGISTRADA");
        }else{
            alert("LA IP DIGITADA NO ES VALIDA")
        }
     
      
}

async function cargarTabla() {

    let nombre_pais =  document.getElementById('idNombrePais').value
    const request = await fetch('api/consulta/'+nombre_pais, {
        method: 'GET',
        headers: getHeaders()
    });
    const data = await request.json();
   
   if(data.length > 0) {
    let listadoHtml = '';
    for (var i = 0; i < data.length; i++) {
      let ipHtml = '<tr><td>'+data[i].id+'</td><td>' + data[i].hora_consulta + '</td><td> ' + data[i].nombre_pais + '</td><td>'
                      + data[i].cod_iso+'</td><td>' + data[i].ip + '</td></tr>';
      listadoHtml += ipHtml;
    } 
  
  document.querySelector('#tableip tbody').outerHTML = listadoHtml;
   }else{
       alert('NO SE ENCONTRARON REGISTROS DE '+nombre_pais)
   }

}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}
