Ext.define('Legion.view.cuentas.ListadoProvedor', {
    extend : 'Ext.window.Window',
    itemId : 'window_provedores',
    title : 'Listado de Provedores',
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
            title : 'Busqueda de Provedores',

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
        fields : ['id_proveedor', 'identificacion_proveedor','nombre_proveedor','direccion_proveedor','telefono_proveedor','email_proveedor','observacion_proveedor'],
        data : [[1,'055020380001', 'CONECTA SERRVICES','AMABTO','0155055','coecta@gmail.com',''], [2, '055020380001','ALAMO','QUITO','0155055','cquito@gmail.com',''], ]
      }),
    columns : [{
        text : "Id",
        dataIndex : 'id_proveedor',
      
       flex:1,
        hidden:false
    }, 
    {
        text : "RUC/CEDULA",
       width:120,
        dataIndex : 'identificacion_proveedor'

    }, {
        text : "NOMBRE",
        flex : 1,
        dataIndex : 'nombre_proveedor',

        width : 100

    }, 
    {
        text : "DIRECCIÓN",
        flex : 1,
        dataIndex : 'direccion_proveedor',


    },
    {
        text : "TELÉFONO.",
        flex : 1,
        dataIndex : 'telefono_proveedor'

    },
    {
        text : "EMAIL",
        width:120,
        dataIndex : 'email_proveedor'

    },
    {
        text : "OBS.",
        flex : 1,
        dataIndex : 'observacion_proveedor',
       


    },
     
   

   





    {
        xtype : 'actioncolumn',
        itemId : 'action_cuenta_provedor',
        
        width : 100,
        items : [
       {
            tooltip : 'Seleccionar',
            iconCls : 'fas fa-arrow-alt-circle-right ',
            itemId : 'ver_alumno',
            handler : function(view, rowIndex,
                    colIndex, item, e, record, row) {
                this.fireEvent('btnCargarProvedor', view,
                        rowIndex, colIndex, item, e,
                        record, row);

            }
        }]
    }],
   
 

    
   
    
   

}]


});