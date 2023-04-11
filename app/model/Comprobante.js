Ext.define('Legion.model.Comprobante', {
    extend : 'Ext.data.Model',
    idProperty : 'id_comprobante',
    fields : [{
                name : 'id_comprobante',
                type : 'int',
                defaultValue : 0
            }, {
                name : 'id_fkforma_pago_comprobante',
                type : 'int'
            }, {
                name : 'concepto_comprobante',
                type : 'string'
            }, {
                name : 'fecha_creacion_comprobante',
                type : 'string'
            }, {
                name : 'fecha_cobro_comprobante',
                type : 'string'

            }, {
                name : 'id_fkusuario_comprobante',
                type : 'int'
            }, {
                name : 'id_fksucursal_comprobante',
                type : 'int'
            }, {
                name : 'abono_comprobante',
                type : 'float'
            }, {
                name : 'id_fkorden_pedido_comprobante',
                type : 'int'

            }, {
                name : 'estado_comprobante',
                type : 'int'
            }, {
                name : 'numero_comprobante',
                type : 'string'

            }
            
            
            

    ]

});