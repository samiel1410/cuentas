const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/* Inicializamos la imagen */
const image = new Image();
var img = new Image();



$(document).ready(function(){
    var id_inscripcion = getUrlParameter('id_inscripcion');

    $.post("../inscripciones/verInscripcionAlumno.php", 
    { id_inscripcion : id_inscripcion
    ,inicio:0 , limite:25
 }, 
    function (data) {
        data = JSON.parse(data);
        console.log(data.data);

        /* Ruta de la Imagen */
        image.src=data.data[0].ruta_curso;
        /* Dimensionamos y seleccionamos imagen */
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        /* Definimos tamaño de la fuente */
       
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        var x = canvas.width / 2;

        $.post("../empresas/recuperarInstituto.php", 
        { id_sucursal : data.data[0].id_fksucursal_inscripcion
            
     }, 
        function (data) {
            data = JSON.parse(data);
           
            if(data.id==1){
                ctx.font = '800 20px Arial';
                ctx.fillText('INSTITUTO DE EDUCACIÓN CONTINUA Y CAPACITACIONES PROFESIONALES ', x, 230);
                ctx.font = '900 35px Arial';
                ctx.fillText('"LA LEGION GROUP" ', x, 275);
            }else{

                ctx.font = '800 20px Arial';
                ctx.fillText('ORGANISMO EVALUADOR Y CERTIFICADOR DE COMPETENCIAS LABORALES ', x, 230);
                ctx.font = '900 35px Arial';
                ctx.fillText('"GRUPO LA LEGIÓN ECUADOR"  ', x, 275);

            }


           

        }

      
    );

 
    ctx.font = 'italic 500 10px Arial';


    ctx.fillText('La Legion N° '+data.data[0].codigo_sucursal+"-0"+data.data[0].id_certificado, x+300, 150);


    ctx.font = 'italic 500 26px Arial';
    ctx.fillText('CONFIERE EL PRESENTE CERTIFICADO ', x, 320);
  


    /*
    ctx.font = ' 900 26px Arial';
    ctx.fillText(data.data[0].nombre_alumno, x-200, 380);


    //Cedula
    ctx.font = ' 900 26px Arial';
    var length2 = data.data[0].nombre_alumno.length;
    console.log(length2)
    ctx.fillText("-C.I"+" "+data.data[0].cedula_alumno, x-200+(length2*10)+30, 380);
       
       */

    var data3 = "<svg xmlns='http://www.w3.org/2000/svg' width='850' height='200'>" +
    "<foreignObject width='100%' height='100%'>" +
    "<div xmlns='http://www.w3.org/1999/xhtml' style='font-size:25px;text-align:left; font-family: Arial;'>" +
        "<table ><tr><td>A. <b>"+data.data[0].nombre_alumno+" </b></td>   <td> <b> -C.I " +data.data[0].cedula_alumno+" </b> </td></tr></table>" +
    "</div>" +
    "</foreignObject>" +
"</svg>";
var DOMURL = self.URL || self.webkitURL || self;
var img3 = new Image();
var svg = new Blob([data3], {type: "image/svg+xml;charset=utf-8"});
var url = DOMURL.createObjectURL(svg);
img3.onload = function() {
ctx.drawImage(img3, 138, 364);
DOMURL.revokeObjectURL(url);
};
img3.src = url;


    //Mensaje
   /* ctx.font = ' 500 22px Arial';
    ctx.fillText('Por haber aprobado el curso de: '+data.data[0].nombre_curso+', modalidad presencial, con una duración de', x, 430);
    ctx.fillText( data.data[0].horas_curso +" "+'horas clase. Realizado en la ciudad de '+data.data[0].ciudad_sucursal+' desde el '+data.data[0].dia_inicio +' de '+data.data[0].mes_inicio, x, 455);
    ctx.fillText('hasta el '+data.data[0].dia_fin +' de '+ data.data[0].mes_fin + ' del '+ data.data[0].anio_fin+' bajo el enfoque de Capacitación Continua.', x, 480);
*/

            var data2 = "<svg xmlns='http://www.w3.org/2000/svg' width='850' height='200'>" +
            "<foreignObject width='100%' height='100%'>" +
            "<div xmlns='http://www.w3.org/1999/xhtml' style='font-size:22px;text-align:left; font-family: Arial;'>" +
                "<table ><tr><td> Por haber aprobado el curso de: "+data.data[0].nombre_curso+", modalidad presencial, con una duración de "+data.data[0].horas_curso+" "+'horas clase. Realizado en la ciudad de '+data.data[0].ciudad_sucursal+" desde el "+data.data[0].dia_inicio+"  de "+data.data[0].mes_inicio+"  hasta el  "+data.data[0].dia_fin +" de "+ data.data[0].mes_fin + " del "+ data.data[0].anio_fin+" bajo el enfoque de Capacitación Continua. </td></tr></table>" +
            "</div>" +
            "</foreignObject>" +
        "</svg>";
        var DOMURL = self.URL || self.webkitURL || self;
        var img2 = new Image();
        var svg = new Blob([data2], {type: "image/svg+xml;charset=utf-8"});
        var url = DOMURL.createObjectURL(svg);
        img2.onload = function() {
        ctx.drawImage(img2, 40, 400);
        DOMURL.revokeObjectURL(url);
        };
        img2.src = url;




    //Firmas
    ctx.font = ' italic 800 14px Arial';
    ctx.letterSpacing = "-100px";
    ctx.fillText('DIRECTOR GENERAL DEL GRUPO', x-300, 610);
    ctx.fillText('"LA LEGIÓN ECUADOR" (OEC)', x-300, 625);


    ctx.fillText('DIRECTOR- OPERADORA', x, 610);
    ctx.fillText('DE CAPACITACIÓN (OC)', x, 625);

    ctx.fillText('DIRECTOR DE CERTIFICACIONES', x+280, 610);
    ctx.fillText('"DEL GRUPO LA LEGIÓN" N° '+data.data[0].codigo_sucursal, x+280, 625);
  

  
  
    });

});

/* Recarga por defecto solo 1 vez */
window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

$(document).on("click","#btnpng", function(){
    let lblpng = document.createElement('a');
    lblpng.download = "Certificado.png";
    lblpng.href = canvas.toDataURL();
    lblpng.click();
});

$(document).on("click","#btnpdf", function(){
    var imgData = canvas.toDataURL('image/png');
    var doc = new jsPDF('l', 'mm','a4');
    var width = doc.internal.pageSize.width;
var height = doc.internal.pageSize.height;
    doc.addImage(imgData, 'PNG', 0, 0,width,height);
    doc.save('Certificado.pdf');

    var id_inscripcion = getUrlParameter('id_inscripcion');
    $.post("../inscripciones/sumarDescargadas.php", 
    { id_inscripcion : id_inscripcion}, 
    function (data) {

        data = JSON.parse(data);
        console.log(data.data);





    });



});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};