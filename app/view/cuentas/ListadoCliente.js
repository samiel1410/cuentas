Ext.define('Legion.view.cuentas.ListadoCliente', {
    extend : 'Ext.window.Window',
    itemId : 'window_cliente',
    title : 'Listado de Clientes',
    draggable : false,
    resizable : false,

    modal : true,
    items : [

        {
            xtype : 'fieldset',
            itemId : 'fieldset',
            style: {
                'background-color': 'white'

            },
            margin:'5',
            title : 'Búsqueda de Clientes',

            defaultType : 'textfield',

            layout : 'hbox',
            items : [{
                        fieldLabel : 'Nombre',
                        itemId : 'nombre_provedor',
                        margin:'5'
                      

                    }, 

                    {
                        fieldLabel : 'Identificación',
                        itemId : 'identificacion_provedor',
                        margin:'5'
                       

                    }, 
                    
                   /* {

                        xtype : 'button',
                        margin : '0 0 0 5',
                    
                        iconCls: 'x-fa  fa-search',
                        itemId : 'boton_buscar_inscripcion',
                        handler : function() {
                            this.fireEvent('btnBuscarOrd');
                        }

                    },*/
                   ]

        },
    {

    xtype : 'grid',
    itemId : 'alumnoFormEditar',
    alias : 'widget.AlumnosForm',
    width:700,
    height:400,
    autoScroll : true,
    autoload:true,
    store : new Ext.data.SimpleStore({
        fields : ['id_cliente', 'identificacion_cliente','nombre_cliente','direccion_cliente','telefono_cliente','email_cliente','observacion_cliente'],
        data : [[1,'055020380001', 'CONECTA SERRVICES','AMABTO','0155055','coecta@gmail.com',''], [2, '055020380001','ALAMO','QUITO','0155055','cquito@gmail.com',''], ]
      }),
    columns : [{
        text : "Id",
        dataIndex : 'id_cliente',
      
       flex:1,
        hidden:false
    }, 
    {
        text : "RUC/CEDULA",
       width:120,
        dataIndex : 'identificacion_cliente'

    }, {
        text : "NOMBRE",
        flex : 1,
        dataIndex : 'nombre_cliente',

        width : 100

    }, 
    {
        text : "DIRECCIÓN",
        flex : 1,
        dataIndex : 'direccion_cliente',


    },
    {
        text : "TELÉFONO.",
        flex : 1,
        dataIndex : 'telefono_cliente'

    },
    {
        text : "EMAIL",
        width:120,
        dataIndex : 'email_cliente'

    },
    {
        text : "OBS.",
        flex : 1,
        dataIndex : 'observacion_cliente',
       


    },
     
   

   





    {
        xtype : 'actioncolumn',
        itemId : 'action_cuenta_cliente',
        
        width : 100,
        items : [
       {
            tooltip : 'Seleccionar',
            iconCls : 'fas fa-arrow-alt-circle-right ',
   
            handler : function(view, rowIndex,
                    colIndex, item, e, record, row) {
                this.fireEvent('btnCargarCliente', view,
                        rowIndex, colIndex, item, e,
                        record, row);

            }
        }]
    }],
   
 

    
   
    
   

}]


});