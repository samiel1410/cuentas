Ext.define('Legion.model.DatosOrden', {
    extend : 'Ext.data.Model',
    fields : [{
                name : 'cantidad_orden',
                type:'int'               
                
            }, {
                name : 'concepto_mensualidad',
                type : 'string'
            }, 
            {
                name : 'fecha_pago_mensualidad',
                type : 'string'
            },{
                name : 'monto_mensualidad',
                type : 'float'

            }, 
            {
                name : 'numero_cuota_mensualidad',
                type : 'float'

            }, {
                name : 'descuento_dolar_orden',
                type : 'float'
            },
            {
                name : 'estado_mensualidad',
                type : 'int'
            },
            {
                name : 'monto_mensualidad',
                type : 'float'
            },
            {
                
                name : 'abonado_mensualidad',
                type : 'float'
            },{
                name : 'id_mensualidad',
                type : 'int'
            },
            {
                name : 'saldo_mensualidad',
                type : 'float'
            }


    ]

});