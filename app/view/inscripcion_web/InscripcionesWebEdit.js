Ext.define('Legion.view.inscripcion_web.InscripcionesWebEdit', {
	extend : 'Ext.window.Window',
	alias : 'widget.edit_web',
	itemId : 'edit_web',
	title : 'Editar',

	draggable : false,
	resizable : false,

	modal : true,
	items : [{

		xtype : 'form',
		itemId : 'WebForm',
		alias : 'widget.WebForm',

		name : 'WebForm',
		buttonAlign : 'center',
		border : false,
		trackResetOnLoad : true,

		collapsible : false,
		
	
	
		fieldDefaults : {
			xtype : 'textfield',
			msgTarget : 'side',

			labelStyle : 'font-weight:bold'
		},
		defaultType : 'textfield',
		items : [{
			
					xtype : 'fieldcontainer',
					layout : 'hbox',
					defaultType : 'textfield',

					fieldDefaults : {

						labelStyle : 'font-weight:bold'
					},
					items : [{
								fieldLabel : 'id',
								itemId : 'id_inscripcion_web',
								name : 'id_inscripcion_web',
								margin : '10 0 0 5',
								hidden : true,
								flex:1

							}, {
                                xtype : 'combo',
                                fieldLabel : 'Institucion',
                                margin : '10 10 0 5',
                                name : 'id_institucion',
                                itemId : 'id_institucion',
                                enableKeyEvents : true,
                                editable : false,
                                allowBlank : false,
                                typeAhead : true,
                                mode : 'local',
                                triggerAction : 'all',
                                emptyText : 'Seleccionar',
                                autoLoad : true,
                                store : 'Empresa',
                                displayField : 'alias_empresa',
                                valueField : 'id_empresa',
                                flex : 1,
                                listeners:{
                                    change: function(){
                                    
        
                                     
        
                                    
                                        
        
                                    }
                                }

							}, {
                                xtype : 'combo',
                                fieldLabel : 'Curso',
                                margin : '10 10 0 5',
                                name : 'id_curso',
                                itemId : 'id_curso',
                                enableKeyEvents : true,
                                editable : false,
                                allowBlank : false,
                                typeAhead : true,
                                mode : 'local',
                                triggerAction : 'all',
                                emptyText : 'Seleccionar',
                                autoLoad : true,
                                store : 'Curso',
                                displayField : 'nombre_curso',
                                valueField : 'id_curso',
                                flex : 1,
                                
							}]
				},

				{
					xtype : 'fieldcontainer',
					layout : 'hbox',
					defaultType : 'textfield',

					fieldDefaults : {

						labelStyle : 'font-weight:bold'
					},
					items : [{

								fieldLabel : 'Cedula',
								name : 'cedula',
								itemId : 'cedula',
                                margin : '10 10 0 5',
								flex:1,

							

							}, {
								fieldLabel : 'Nombre',

								name : 'nombre',
								itemId : 'nombre',
								margin : '10 10 0 5',
								

							}]
				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					defaultType : 'textfield',

					fieldDefaults : {

						labelStyle : 'font-weight:bold'
					},
					items : [{
                        fieldLabel : 'Apellido',

                        name : 'apellido',
                        itemId : 'apellido',
                        margin : '10 10 0 5',
                        

                    }, {
                        fieldLabel : 'Tipo de Sangre',

                        name : 'tipo_sangre',
                        itemId : 'tipo_sangre',
                        margin : '10 10 0 5',
                        

                    }]
				},
				{

					xtype: 'fieldcontainer',
				
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					layout: 'hbox',
					items: [
                        {
                            xtype : 'combo',
                            fieldLabel : 'Provincia',
                            margin : '10 10 0 5',
                            name : 'id_provincia',
                            itemId : 'id_provincia',
                            enableKeyEvents : true,
                            editable : false,
                            allowBlank : false,
                            typeAhead : true,
                            mode : 'local',
                            triggerAction : 'all',
                            emptyText : 'Seleccionar',
                            autoLoad : true,
                            store : 'Provincia',
                            displayField : 'provincia',
                            valueField : 'id',
                            flex : 1,
                            
                        },
                        {
                            xtype : 'combo',
                            fieldLabel : 'Ciudad',
                            margin : '10 10 0 5',
                            name : 'id_ciudad',
                            itemId : 'id_ciudad',
                            enableKeyEvents : true,
                            editable : false,
                            allowBlank : false,
                            typeAhead : true,
                            mode : 'local',
                            triggerAction : 'all',
                            emptyText : 'Seleccionar',
                            autoLoad : true,
                            store : 'Canton',
                            displayField : 'canton',
                            valueField : 'id',
                            flex : 1,
                            
                        }
                        
                    ]
				},
                {

					xtype: 'fieldcontainer',
				
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					layout: 'hbox',
					items: [
                        {
                            fieldLabel : 'Celular',
    
                            name : 'celular',
                            itemId : 'celular',
                            margin : '10 10 0 5',
                            
    
                        },
                        {
                            fieldLabel : 'Representante',
    
                            name : 'representante',
                            itemId : 'representante',
                            margin : '10 10 0 5',
                            
    
                        }
                        
                    ]
				},
                {

					xtype: 'fieldcontainer',
				
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					layout: 'hbox',
					items: [
                        {
                            fieldLabel : 'Numero Representante',
    
                            name : 'numero_repre',
                            itemId : 'numero_repre',
                            margin : '10 10 0 5',
                            
    
                        },
                        {
                            fieldLabel : 'Correo',
    
                            name : 'correo',
                            itemId : 'correo',
                            margin : '10 10 0 5',
                            
    
                        }
                        
                    ]
				},
                {

					xtype: 'fieldcontainer',
				
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					layout: 'hbox',
					items: [
                        {
                            fieldLabel : 'Unidad Educativa',
    
                            name : 'estudios',
                            itemId : 'estudios',
                            margin : '10 10 0 5',
                            
    
                        },
                        {
                            fieldLabel : 'Talla Uniforme',
    
                            name : 'talla_uniforme',
                            itemId : 'talla_uniforme',
                            margin : '10 10 0 5',
                            
    
                        }
                        
                    ]
				},
                {

					xtype: 'fieldcontainer',
				
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					layout: 'hbox',
					items: [
                        {
                            fieldLabel : 'Numero de Calzado',
    
                            name : 'numero_calzado',
                            itemId : 'numero_calzado',
                            margin : '10 10 0 5',
                            
    
                        },
                        {
                            fieldLabel : 'Dirreccion',
    
                            name : 'dirrecion',
                            itemId : 'dirrecion',
                            margin : '10 10 0 5',
                            
    
                        },
                       
                        
                    ]
				}
				
				
				],
		buttons : [{
			text : 'Guardar',
			itemId : 'guardar_web',
			iconCls: 'x-fa fa-save',

			style: {
				'background-color': 'green'

			},
			handler : function() {
				
				var form = Ext.ComponentQuery.query('#WebForm')[0]
						.getForm();

                        var window =this.up('window');
				this.fireEvent('btnUpdateGuardar', form,window);


			}
		}

		, {
			style: {
                'background-color': 'red'

            },
            iconCls: 'x-fa fa-window-close',
			text : 'Cerrar',
			handler : function() {
				this.up('window').close()

			}
		}

		]

	}]

});