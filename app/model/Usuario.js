Ext.define('Legion.model.Usuario', 
{
    extend : 'Ext.data.Model',
    idProperty : 'id_usuario',
    fields: [
        { name: 'id_usuario', type: 'int', defaultValue: 0 },
        { name: 'nombre_usuario',  type:'string' },
        { name: 'apellido_usuario', type: 'string' },
         { name: 'clave_usuario', type: 'string' },
         { name: 'rol_usuario', type: 'string' },
         { name: 'estado_usuario', type: 'string'  },
          { name: 'correo_usuario', type: 'string' },
         { name: 'id_fksucursal_usuario', type: 'int' },
         { name: 'created_at', type: 'string' }
      
    ]


});