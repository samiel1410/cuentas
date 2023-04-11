Ext.define('Legion.model.InscripcionesWeb', {
    extend : 'Ext.data.Model',
    idProperty : 'id_inscripcion_web',
    fields : [{
                name : 'id_inscripcion_web',
                type : 'int',
                defaultValue : 0
            }, 
            {
                name : 'id_institucion',
                type : 'int',
             
            }, 
            {
                name : 'id_curso',
                type : 'int',
                
            }, 
            {
                name : 'cedula',
                type : 'string',
              
            }, 
            {
                name : 'nombre',
                type : 'string',
             
            }, 
            {
                name : ' apellido ',
                type : 'string',
               
            }, 
            {
                name : 'tipo_sangre',
                type : 'string',
               
            }, 
            {
                name : 'dirreccion',
                type : 'string',
               
            }
            , 
            {
                name : 'id_provincia',
                type : 'int',
               
            }
            , 
            {
                name : 'id_ciudad',
                type : 'int',
               
            }
            , 
            {
                name : 'celular',
                type : 'string',
               
            }
            , 
            {
                name : 'representante',
                type : 'string',
               
            }
            , 
            {
                name : 'numero_repre',
                type : 'string',
               
            }
            , 
            {
                name : 'dirreccion',
                type : 'string',
               
            }
            , 
            {
                name : 'correo',
                type : 'string',
               
            }
            , 
            {
                name : 'estudios',
                type : 'string',
               
            }
            , 
            {
                name : 'talla_uniforme',
                type : 'string',
               
            }
            , 
            {
                name : 'numero_calzado',
                type : 'string',
               
            }
            , 
            {
                name : 'created_at',
                type : 'string',
               
            }




    ]

});