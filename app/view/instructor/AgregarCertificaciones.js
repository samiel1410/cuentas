Ext.define('Legion.view.instructor.AgregarCertificaciones', {
	extend: 'Ext.window.Window',
	alias: 'widget.window_instructor_agregar_certificaciones',
	itemId: 'window_instructor_agregar_certificaciones',
	title: 'Agregar Certificaciones',
	
	resizable: false,
    width:500,

    listeners:
    {
        beforerender:function(){
                     
   
        valor = Ext.getStore('CertificacionesEdit').getRange();

      
        Ext.ComponentQuery
        .query('#id_fkinstructor_certificaciones_militar_edit')[0]
       .setValue(valor[0].data.id_fkinstructor_certificaciones_militar);




        },

    },

	modal: true,
	items: [

        {

            xtype: 'form',
            itemId: 'certificadosform',
            alias: 'widget.certificadosform',
            margin: '0 10 0 10',

            name: 'certificadosform',
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
                layout: 'hbox',
                defaultType: 'textfield',

                fieldDefaults: {

                    labelStyle: 'font-weight:bold'
                },
                items: [{
                    fieldLabel: 'id',
                    itemId: 'id_fkinstructor_certificaciones_militar_edit',
                    name: 'id_fkinstructor_certificaciones_militar',
                    hidden: true,
                    flex: 1

                }, {
                    fieldLabel: 'Nombre',
                    itemId: 'nombre_certificaciones_militar',
                    name: 'nombre_certificaciones_militar',
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
                itemId: 'guardar_instructor_certificados_edit',
                handler: function () {

                    me = this;

                    Ext.MessageBox.show({
                        title: 'Mensaje',
                        msg: 'Desea guardar el registro?',
                        buttons: Ext.MessageBox.OKCANCEL,
                        icon: Ext.MessageBox.QUESTION,

                        fn : function(btn) {
                            if (btn == 'ok') {

                        
                                var window = me.up('window');
                                var form = Ext.ComponentQuery.query('#certificadosform')[0]
                                    .getForm();
                                me.fireEvent('btnCreateCerticadosInstructor', form, window);
                            
            
                            }
                        }

                    });

                
                    

                }
            }
        
            
            ]

        }

        
       ]
        

});