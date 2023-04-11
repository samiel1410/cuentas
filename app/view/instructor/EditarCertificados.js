Ext.define('Legion.view.instructor.EditarCertificados', {
	extend: 'Ext.window.Window',
	alias: 'widget.window_instructor_editar_certificaciones',
	itemId: 'window_instructor_editar_certificaciones',
	title: 'Editar Cursos del Instructor',
	
	resizable: false,
   

	modal: true,
	items: [

        {

            xtype: 'form',
            itemId: 'certificadosformEdit',
            alias: 'widget.certificadosformEdit',
           width:300,
            name: 'certificadosform',
            buttonAlign: 'center',
            border: false,
            trackResetOnLoad: true,

            collapsible: false,
           
 
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
                    fieldLabel: 'id',
                    itemId:'id_certi_edit',
                    name:'id_certificaciones_militar',
                    hidden: true,
                    flex: 2

                }, {
                    fieldLabel: 'Nombre del Certificado',
                    itemId:'nombre_certificaciones_militar_edit',
                    name:'nombre_certificaciones_militar',
                    margin: '5',
                    flex: 2,
                    allowBlank: false,

                },
                {
                    xtype:'filefield',
                    fieldLabel: 'Documento',
                    itemId:'certificado_pdf_edit',
                    name:'certificado_pdf',
                    margin: '5',
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

                    var window = this.up('window');
                    var form = Ext.ComponentQuery.query('#certificadosformEdit')[0]
                        .getForm();
                    this.fireEvent('btnEditarCertificados', form, window);
                

                
                    

                }
            }
        
            
            ]

        }

        
       ]
        

});