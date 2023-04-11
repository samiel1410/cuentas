Ext.define('Legion.view.usuario.UsuarioWindow', {
	extend : 'Ext.window.Window',
	alias : 'widget.window2',
	itemId : 'window2',
	title : 'Nuevo Usuario',

	draggable : false,
	resizable : false,

	modal : true,
	items : [{

		xtype : 'form',
		itemId : 'usuarioFormEditar',
		alias : 'widget.UsuariosFormEditar',

		name : 'UsuariosForm',
		buttonAlign : 'center',
		border : false,
		trackResetOnLoad : true,

		collapsible : false,
		
	
		store : 'Usuario',
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
								itemId : 'id_usuario',
								name : 'id_usuario',
								margin : '10 0 0 5',
								hidden : true,
								flex:1

							}, {
								fieldLabel : 'Nombres',
								itemId : 'nombre_usuario',
								name : 'nombre_usuario',
								margin : '10 0 0 5',
								flex:1

							}, {
								fieldLabel : 'Apellidos',
								itemId : 'apellido_usuario',
								name : 'apellido_usuario',
								margin : '10 10 0 5',
								allowBlank : false,
								flex:1
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

								fieldLabel : 'Contraseña',
								name : 'clave_usuario',
								itemId : 'clave_usuario',
								margin : '10 0 0 5',
								flex:1,

								regex : new RegExp('^[a-zA-Z0-9]+$'),
								regexText : 'You must enter letters and numbers only',
								emptyText : 'Use Letters and Numbers',
								msgTarget : 'under'

							}, {
								fieldLabel : 'Correo',

								name : 'correo_usuario',
								itemId : 'correo_usuario',
								margin : '10 10 0 5',
								vtype : 'email',
								vtypeText : 'Invalid email format.  Email must be of the form user@domain.com',
								msgTarget : 'under',
								flex:1

							}]
				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					defaultType : 'textfield',

					fieldDefaults : {

						labelStyle : 'font-weight:bold'
					},
					items : [{

						fieldLabel : 'Rol',
						name : 'rol_usuario',
						itemId : 'rol_usuario',
						margin : '10 0 0 5',
						xtype : 'combo',
						dock : 'top',
						enableKeyEvents : true,
						editable : false,
						displayField : 'rol',
						valueField : 'rol_usuario',
						mode : 'local',
						triggerAction : 'all',
						emptyText : 'Seleccionar',
						store : new Ext.data.SimpleStore({
									fields : ['rol_usuario', 'rol'],
									data : [['1', 'Comando'],
											['2', 'Director'], ['3', 'Secretaria']]
								}),
						queryMode : 'local',
						flex:1

					}, {
						fieldLabel : 'Estado',
						itemId : 'estado_usuario',
						name : 'estado_usuario',
						margin : '10 10 0 5',
						xtype : 'combo',
						dock : 'top',
						enableKeyEvents : true,
						editable : false,
						displayField : 'estado',
						valueField : 'estado_usuario',
						mode : 'local',
						triggerAction : 'all',
						emptyText : 'Seleccionar',
						store : new Ext.data.SimpleStore({
									fields : ['estado_usuario', 'estado'],
									data : [['1', 'Activo'], ['0', 'Inactivo']

									]
								}),
						queryMode : 'local',
						flex:1

					}]
				},
				{

					xtype: 'fieldcontainer',
				
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					layout: 'hbox',
					items: [{
						xtype : 'combo',
						fieldLabel : 'Institucion',
						margin: '10 0 0 5',
						name : 'id_fkempresa_sucursal',
						itemId : 'id_fkempresa_sucursal_edi',
						enableKeyEvents : true,
						editable : false,
						allowBlank : false,
						typeAhead : true,
						mode : 'local',
						triggerAction : 'all',
						emptyText : 'Seleccionar',
						autoLoad : true,
						store : 'Empresa',
						displayField : 'nombre_empresa',
						valueField : 'id_empresa',
						flex : 1,
						listeners:{
							change: function(){
							

								store = Ext.getStore('Sucursal');
								value=Ext.ComponentQuery
				.query('#id_fkempresa_sucursal_edi')[0]
				.getValue();
				

								store.getProxy().extraParams={
									id_empresa:value,
									nombre_busqueda:""

								}
								store.load();

							
								

							}
						}





					},{
						xtype: 'combo',
						fieldLabel: 'Sucursal',
						margin: '10 10 0 5',
						name: 'id_fksucursal_usuario',
						itemId: 'id_fksucursal_usuario',
						enableKeyEvents: true,
						editable: false,
						allowBlank: false,
						typeAhead: true,
						mode: 'local',
						triggerAction: 'all',
						emptyText: 'Seleccionar',
						autoLoad: true,
						store: 'Sucursal',
						displayField: 'nombre_sucursal',
						valueField: 'id_sucursal',
						flex:1,
						


					}]
				}
				
				],
		buttons : [{
			text : 'Guardar',
			itemId : 'guardar_usuario',
			iconCls: 'x-fa fa-save',

			style: {
				'background-color': 'green'

			},
			handler : function() {
				
				var form = Ext.ComponentQuery.query('#usuarioFormEditar')[0]
						.getForm();
				this.fireEvent('btnCreate', form);

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