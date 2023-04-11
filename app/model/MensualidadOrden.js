Ext.define('Legion.model.MensualidadOrden', {
    extend : 'Ext.data.Model',
    idProperty : 'id_mensualidad',
    fields : [{
                name : 'id_mensualidad',
                type : 'int',
              
            }, {
                name : 'concepto_mensualidad',
                type : 'string'
            }, {
                name : 'monto_mensualidad',
                type : 'float'
            }, 
            {
                name : 'saldo_mensualidad',
                type : 'float'
            },
            
    ]

});