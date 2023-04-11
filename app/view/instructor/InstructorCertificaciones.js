Ext.define('Legion.view.instructor.InstructorCertificaciones', {
	extend: 'Ext.window.Window',
	alias: 'widget.window_instructor_certi',
	itemId: 'window_instructor_certi',
	title: 'Agregar Certificaciones',
	
	resizable: false,
    width:500,

	modal: true,
	items: [
        
        {

        
            itemId: 'CertificacionesGrid',
            xtype: 'grid',
            
            autoScroll: true,
            selType: 'rowmodel',
            selModel: {
                mode: 'SINGLE'
            },
            viewConfig: {
                stripeRows: true
            },
            store: 'Certificaciones',
            plugins: {
                ptype: 'cellediting',
                clicksToEdit: 1
            },
           
            height: 300,
          
            buttons:[{
                itemId:'gurdar_certificaciones',
                text:'Guardar',
                handler: function(){
                    Ext.ComponentQuery.query('#window_instructor_certi')[0]
				.close();
             



                }
            
            },{
                xtype: 'button',
                iconCls: 'fa fa-plus-circle',
                tooltip: 'Add New Record',
                handler: function () {
                    var window = Ext.create('Legion.view.instructor.AgregarCerti');
                    window.show();
 
                   
                }

            }],
            renderTo: Ext.getBody(),
 
            
            columns: [
                 {
                text: "Numero",
               width:120,
                dataIndex: 'id_certificaciones_militar',
                hidden:true
               
               

            }, 
            {
                text: "Nombre del Curso",
                flex: 1,
                dataIndex: 'nombre_certificaciones_militar',
                editor: {
                    xtype: 'textfield',

                },
                menuDisabled: true

            },

            {
                text: "PDF",
                flex: 1,
                dataIndex: 'certificado_pdf',
               
                menuDisabled: true

            },
            {
                text: "Nombre del Curso",
                flex: 1,
                dataIndex: 'id_fkinstructor_certificaciones_militar',
             
                menuDisabled: true,
                hidden:true
       

            },

            
				{
					xtype: 'actioncolumn',
					itemId: 'action_instructor_certificaciones',
					menuDisabled: true,
					width: 50,
					items: [{

						tooltip: 'Eliminar Curso',
						iconCls: 'x-fa fa-ban',
						
						handler: function (view, rowIndex,
							colIndex, item, e, record, row) {
							this.fireEvent('btnEliminarCertificaciones', view,
								rowIndex, colIndex, item, e,
								record, row);

						}

					}

					]
				}
         

            
        
        ],
       
        

        }]
        

});