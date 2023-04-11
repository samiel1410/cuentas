Ext.define('Legion.model.Certificaciones', {
    extend : 'Ext.data.Model',
    idProperty : 'id',
    fields : [{
                name : 'id_certificaciones_militar ',
                type : 'int',
                defaultValue : 0
            }, {
                name : 'nombre_certificaciones_militarcursos_militar',
                type : 'string'
            }, 
            {
                name : 'id_fkinstructor_certificaciones_militar',
                type : 'int'
            }, 

            {
                name : 'certificado_pdf',
                type : 'string'
            }, 


    ]

});