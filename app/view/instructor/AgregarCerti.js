Ext.define('Legion.view.instructor.AgregarCerti', {
	extend: 'Ext.window.Window',
	alias: 'widget.window_instructor_agregar_certi',
	itemId: 'window_instructor_agregar_certi',
	title: 'Agregar Certificaciones',
	
	resizable: false,
    width:500,

   

	modal: true,
	items: [

        {

            xtype: 'form',
            itemId: 'certificadosformA',
            alias: 'widget.certificadosformA',
            margin: '0 10 0 10',

            name: 'certificadosformA',
            buttonAlign: 'center',
            border: false,
            trackResetOnLoad: true,

            collapsible: false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
         
           
 
            fieldDefaults: {
                xtype: 'textfield',
                msgTarget: 'side',

                labelStyle: 'font-weight:bold'
            },
            defaultType: 'textfield',
            items: [{
                xtype: 'fieldcontainer',
                layout: 'vbox',
                defaultType: 'textfield',

                fieldDefaults: {

                    labelStyle: 'font-weight:bold'
                },
                items: [{
                    fieldLabel: 'Nombre',
                    itemId: 'nombre_certificaciones_militar',
                    name: 'nombre_certificaciones_militar',
                    margin: '10 0 0 5',
                    flex: 1,
                    allowBlank: false,

                },
                {
                    xtype:'filefield',
                    fieldLabel: 'Documento',
                    itemId: 'certificado_pdf',
                    name: 'certificado_pdf',
                    margin: '10 0 0 5',
                    flex: 1,
                    allowBlank: false,

                },
                

              ]
            },

          
            ],
            buttons: [{
                text: 'Guardar',

                iconCls: 'x-fa fa-save',

            style: {
                'background-color': 'green'

            },
                itemId: 'guardar_certi',
                handler: function () {

                
                
                
                    store =Ext.getStore("Certificaciones");


                   nombre = Ext.ComponentQuery
                    .query('#nombre_certificaciones_militar')[0]
                    .getValue();

                    pdf = Ext.ComponentQuery
                    .query('#certificado_pdf')[0]
                    .getValue();

                     store.insert(0, {
                    nombre_certificaciones_militar: nombre,
                    certificado_pdf: pdf,
                   
                });
        

                }
            }
        
            
            ]

        }

        
       ]
        

});