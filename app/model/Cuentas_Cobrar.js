Ext.define('Legion.model.Cuentas_Cobrar', {
    extend : 'Ext.data.Model',
    idProperty : 'id_otra_cuenta_cobrar',
    fields : [{
                name : 'id_otra_cuenta_cobrar',
                type : 'int',
                defaultValue : 0
            }, {
                name : 'numero_otra_cuenta_cobrar',
                type : 'string'
            }, {
                name : 'fecha_emision_otra_cuenta_cobrar',
                type : 'string'
            }, {
                name : 'numero_documento_otra_cuenta_cobrar',
                type : 'string'
            }, {
                name : 'fecha_cobro_comprobante',
                type : 'string'

            }, {
                name : 'monto_otra_cuenta_cobrar',
                type : 'float'
            }, {
                name : 'obs_otra_cuenta_cobrar',
                type : 'string'
            }, {
                name : 'estado_otra_cuenta_cobrar',
                type : 'string'
            }, {
                name : 'id_fkusuario_otra_cuenta_cobrar',
                type : 'int'

            }, {
                name : 'id_fkempleado_emisor_otra_cuenta_cobrar',
                type : 'int'
            }, 
            {
                name : 'id_fkcliente_otra_cuenta_cobrar',
                type : 'int'
            },
            {
                name : 'id_fktipo_documento_otra_cuenta_cobrar',
                type : 'int'
            },
            {
                name : 'id_fksucursal_otra_cuenta_cobrar',
                type : 'int'
            },{
                name : 'fecha_creacion_otra_cuenta_por_cobrar',
                type : 'string'

            },
            {
                name : 'id_fkcentro_costo_otra_cuenta_cobrar',
                type : 'string'

            },
            {
                name : 'fecha_vcto_otra_cuenta_cobrar',
                type : 'string'

            }
            
            
            

    ]

});