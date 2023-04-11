Ext.define('Legion.model.HistorialCertificados', {
    extend : 'Ext.data.Model',
    idProperty : 'id_certificado ',
    fields : [{
                name : 'id_forma',
                type : 'int',
                defaultValue : 0
            }, 
            {
                name : 'id_fkinscripcion_certificado',
                type : 'int',
             
            }, 
            {
                name : 'descargadas_certificado',
                type : 'string',
                
            }, 
            {
                name : 'subidas_certificado',
                type : 'string',
              
            }, 
            {
                name : 'fecha_descargada',
                type : 'string',
             
            }, 
            {
                name : 'fecha_subida',
                type : 'string',
               
            }, 
            {
                name : 'id_fkusuario_subida_certificado',
                type : 'int',
               
            }, 
            {
                name : 'id_fkusuario_descarga_certificado',
                type : 'int',
               
            }

    ]

});