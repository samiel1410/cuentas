Ext.define('Legion.view.alumno.VerMensualidades', {
    extend : 'Ext.window.Window',
    alias : 'widget.window_ver_mensualidades',
    itemId : 'window_ver_mensualidades',
    title : 'Mensualides',
    draggable : false,
    xtype:'subgrid',
    resizable : false,
    width:600,


    modal : true,
        items : [
            {

                alias : 'widget.MensualidadesAlumnoGrid',
                itemId : 'MensualidadesAlumnoGrid',
                xtype : 'grid',
              
                height:300,
                autoScroll : true,
                selType : 'rowmodel',
                selModel : {
                    mode : 'SINGLE'
                },
                viewConfig : {
                    stripeRows : true
                },
                store : 'Mensualidad',

                autoLoad : true,

                columns : [{
                            text : "Id",
                            dataIndex : 'id_mensualidad',
                            itemId : 'id_mensualidad ',
                            width : 50
                        }, {
                            text : "Inscripcion",
                            flex : 1,
                            dataIndex : 'id_fkinscripcion_mensualidad'

                        }, {
                            text : "Orden Pedido",
                            flex : 1,
                            dataIndex : 'id_fkorden_pedido_mensualidad',

                            width : 100

                        }, {
                            text : "Concepto",
                            flex : 1,
                            dataIndex : 'concepto_mensualidad',
                            

                        }, {
                            text : "Cuota",
                            flex : 1,
                            dataIndex : 'numero_cuota_mensualidad',
                            hidden : true

                        }, {
                            text : "Fecha Pago",
                            flex : 1,
                            dataIndex : 'fecha_pago_mensualidad',
                            hidden : true

                        }, {
                            text : "Estado",
                            flex : 1,
                            dataIndex : 'estado_mensualidad'

                        }, 
                        {
                            text : "Total",
                            flex : 1,
                            dataIndex : 'saldo_mensualidad'
                        }
                          

                      

                    ],
                bbar : [{
                    xtype : 'pagingtoolbar',
                    store : 'Mensualidad',
                    displayInfo : true,
                    displayMsg : 'Displaying {0} to {1} of {2} &nbsp;records ',
                    emptyMsg : "No records to display&nbsp;",
                    
                }]

            }
   ]


});