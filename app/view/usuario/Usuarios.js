Ext.define('Legion.view.usuario.Usuarios', {
	extend: 'Ext.TabPanel',
	alias: 'widget.Usuarios',
	cls: 'myCls',
	autoScroll: true,
	width: '100%',
	height: '100%',
	layout: 'fit',

	items: [{
		title: 'Listado Usuarios',
		cls: 'myCls',

		itemId: 'usuarios_lista',
		items: [{
			xtype: 'component',
			html: '*Esta pantalla contiene la lista de todos los  usuarios , cuenta con diferentes tipos de filtros',
			style: {
				'backgroundColor': '#05723A',
				'color': '#FFFFFF',
				'font-size': '12px',
				'padding': '15px'


			}

		}, {

			xtype: 'container',
			itemId: 'container',

			items: [{
				xtype: 'fieldset',
				itemId: 'fieldset',

				title: 'Busqueda Usuarios',
				margin: '0 0 10 0',
				defaultType: 'textfield',
				defaults: {
					anchor: '100%'
				},
				layout: 'column',
				items: [
				{
					columnWidth: 0.50,
					xtype : 'combo',
					fieldLabel : 'Institucion',
					margin: '5',
					name : 'id_fkempresa_sucursal',
					itemId : 'id_fkempresa_sucursal_bus',
					enableKeyEvents : true,
					editable : false,
					
					typeAhead : true,
					mode : 'local',
					triggerAction : 'all',
					emptyText : 'TODAS',
					autoLoad : true,
					store : 'Empresa',
					displayField : 'alias_empresa',
					valueField : 'id_empresa',
					flex : 1,
					listeners:{
						change: function(){
						   
	
							store = Ext.getStore('Sucursal');
							value=Ext.ComponentQuery
			.query('#id_fkempresa_sucursal_bus')[0]
			.getValue();
			
	
							store.getProxy().extraParams={
								id_empresa:value,
								nombre_busqueda:""
	
							}
							store.load();
	
						
							
	
						}
					}
	
	
	
	
	
				},
				
				
				
				{
					columnWidth: 0.50,
					fieldLabel: 'Sucursal',

					xtype: 'combo',
					fieldLabel: 'Sucursal',
					margin: '5',
					name: 'id_fksucursal_usuario',
					itemId: 'sucursal_busqueda',
					enableKeyEvents: true,
					editable: false,
					allowBlank: false,
					typeAhead: true,
					mode: 'local',
					triggerAction: 'all',
					emptyText: 'TODAS',
					autoLoad: true,
					store: 'Sucursal',
					displayField: 'nombre_sucursal',
					valueField: 'id_sucursal',


				}, 
				{
					columnWidth: 0.50,
					fieldLabel: 'Nombre',
					itemId: 'nombre_busqueda',
					name: 'nombre_busqueda',
					margin: '5',

				}, 
				{
					columnWidth: 0.40,
					fieldLabel: 'Estado',
						itemId: 'estado_usuario_bus',
						name: 'estado_usuario',
						margin: '5',
						xtype: 'combo',
						dock: 'top',
						allowBlank: false,
						enableKeyEvents: true,
						editable: false,
						displayField: 'estado',
						valueField: 'estado_usuario',
						mode: 'local',
						triggerAction: 'all',
						emptyText: 'Seleccionar',
						store: new Ext.data.SimpleStore({
							fields: ['estado_usuario',
								'estado'],
							data: [['1', 'Activo'],
							['0', 'Inactivo'],
							['', 'Todos']

							]
						}),
						queryMode: 'local',
						flex: 1,
						value: ''

					}

				,
				{

					xtype: 'button',
					margin: '5',
					iconCls: 'x-fa  fa-search',
					itemId: 'boton_buscar',
					handler: function () {
						this.fireEvent('btnBuscar');
					}

				}, {

					xtype: 'button',
					margin: '5',
					iconCls: 'x-fa  fa-eraser',
					itemId: 'boton_refresh',
					handler: function () {
						this.fireEvent('btnRefresh');
					}

				},

					/*{
																xtype : 'button',
																text:'Generar Reporte',
																margin : '0 0 0 5',
																iconCls : 'x-fa  fa-eraser',
																itemId : 'boton_reporte_usuario',
																handler : function() {
																	this.fireEvent('btnReporte');
																}
															}*/
				]

			}

			,{}]

		}, {

			alias: 'widget.UsuarioGrid',

			itemId: 'UsuarioGrid',
			xtype: 'grid',
			selType: 'rowmodel',
			selModel: {
				mode: 'SINGLE'
			},
			viewConfig: {
				stripeRows: true
			},
			store: 'Usuario',
			autoLoad: true,
			height: 300,
			width: '100%',

			layout: 'fit',

			columns: [{
				text: "Codigo",
				width:100,
				dataIndex: 'id_usuario',
				menuDisabled: true

			}, {
				text: "Nombres",
				flex: 2,
				dataIndex: 'nombre_usuario',
				menuDisabled: true

			}, {
				text: "Apellidos",
				flex: 2,
				dataIndex: 'apellido_usuario',
				menuDisabled: true,

				width: 100

			}, {
				text: "Rol",
				flex: 1,
				dataIndex: 'nombre_rol_usuario',
				menuDisabled: true

			},  {
				text: "Sucursal",
				flex: 1,
				dataIndex: 'nombre_sucursal',
				menuDisabled: true,
				renderer: function(value, meta, record) {
					if(value) meta.tdAttr='data-qtip="'+value+'"';
					return value;
				}

			}, {
				text: "Correo",
				flex: 1,
				dataIndex: 'correo_usuario',
				menuDisabled: true,
				

			}, {
				text: "Creado",
				flex: 1,
				dataIndex: 'created_at',
				menuDisabled: true,
				hidden: true

			},
			{
				text: "Estado",
		
				dataIndex: 'nombre_estado_usuario',
				menuDisabled: true,
				renderer: function(value, meta, record) {
					if (value == 'Activo') {
						return '<i   data-qtip="ESTADO ACTIVO" class="fas fa-circle " style="color:green;"></i>';
					  } else if (value == 'Inactivo') {
						return '<i  data-qtip=" ESTADO INACTIVO" class="fas fa-circle " style="color:red;"></i>';
					  }
				}

			},

			{
				xtype: 'actioncolumn',
				menuDisabled: true,
				itemId: 'action_usuario',
				width: 50,
				items: [{

					tooltip: 'Editar',
					itemId: 'editar_usuario',
					iconCls: 'x-fa fa-pen',
					handler: function (view, rowIndex,
						colIndex, item, e, record, row) {




						this.fireEvent('btnUpdate', view,
							rowIndex, colIndex, item, e,
							record, row);

					}

				}, {
					tooltip: 'Eliminar',
					iconCls: 'x-fa  fa-times',
					itemId: 'eliminar_usuario',
					handler: function (grid, rowIndex, colIndex) {
						this.fireEvent('btnDelete', grid,
							rowIndex, colIndex);

					}
				}

				]
			}],
			bbar: [{
				xtype: 'pagingtoolbar',
				store: 'Usuario',
				displayInfo: true,
				displayMsg: 'Mostrando {0} a {1} de {2} &nbsp;registros ',
				emptyMsg: "No records to display&nbsp;",
				listeners: {
					beforechange: function (store) {
						this.fireEvent('pagination', store)

					}

				}
			}]
		}]
	}, {
		// FOmrulario Usuarios
		title: 'Nuevo Usuario',
		listeners: {

			deactivate: function () {
				if (Ext.ComponentQuery
					.query('#nombre_usuario')[0]
					.getValue() != "" || Ext.ComponentQuery
						.query('#apellido_usuario')[0]
						.getValue() != "" || Ext.ComponentQuery
							.query('#clave_usuario')[0]
							.getValue() != "") {

					Ext.MessageBox.show({
						title: 'Advertencia',
						msg: '¿Seguro desea abandonar el formulario?',
						buttons: Ext.MessageBox.OKCANCEL,
						icon: Ext.MessageBox.QUESTION,
						fn: function (btn) {
							if (btn == 'ok') {

								Ext.ComponentQuery.query('#usuarioForm')[0].getForm().reset();



							} else {
								Ext.ComponentQuery.query('Usuarios')[0].setActiveTab(1);
							}
						}
					});



				}
			}
		},
		items: [{
			header: {
				
					xtype: 'component',
					html: '*Este formulario crea nuevos usuarios , asignar correctamente la sucursal en donde van a estar',
					style: {
						'backgroundColor': '#05723A',
						'color': '#FFFFFF',
						'font-size': '12px',
						'padding': '15px'
		
		
					}
		
				
			},

			title: '*Creacion de un nuevo Usuario',
			

			defaultType: 'textfield',
			defaults: {
				anchor: '100%',
				width: '100%'
			},
			layout: 'hbox',
			items: [{

				xtype: 'form',
				itemId: 'usuarioForm',
				alias: 'widget.UsuariosForm',

				margin: '10 10 0 5',

				name: 'UsuariosForm',
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
					layout: 'hbox',
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					items: [{
						fieldLabel: 'id',
						itemId: 'id_usuario',
						name: 'id_usuario',
						margin: '10 0 0 5',
						hidden: true,

						flex: 1

					}, {
						fieldLabel: 'Nombres',
						itemId: 'nombre_usuario',
						name: 'nombre_usuario',
						margin: '10 0 0 5',
						allowBlank: false,
						flex: 1

					}, {
						fieldLabel: 'Apellidos',
						itemId: 'apellido_usuario',
						name: 'apellido_usuario',
						margin: '10 10 0 5',
						allowBlank: false,


						flex: 1
					}]
				},

				{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					items: [{
						
						fieldLabel: 'Contraseña',
						name: 'clave_usuario',
						itemId: 'clave_usuario',
						allowBlank: false,
						margin: '10 0 0 5',
						flex: 1,

						regex: new RegExp('^[a-zA-Z0-9]+$'),
						
						allowBlank: false,
						
					
					

					}, {
						fieldLabel: 'Correo',

						name: 'correo_usuario',
						itemId: 'correo_usuario',
						margin: '10 10 0 5',
						vtype: 'email',
						allowBlank: false,

						vtypeText: 'Formato invalido. Ejm: user@domain.com',
						msgTarget: 'under',
						flex: 1,
						

					}]
				}, {
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					items: [{

						fieldLabel: 'Rol',
						name: 'rol_usuario',
						itemId: 'rol_usuario',
						margin: '10 0 0 5',
						xtype: 'combo',
						dock: 'top',
						allowBlank: false,
						enableKeyEvents: true,
						editable: false,
						displayField: 'rol',
						valueField: 'rol_usuario',
						mode: 'local',
						triggerAction: 'all',
						emptyText: 'Seleccionar',
						store: new Ext.data.SimpleStore({
							fields: ['rol_usuario', 'rol'],
							data: [['1', 'Comando'],
							['2', 'Director'], ['3', 'Secretaria']]
						}),
						queryMode: 'local',
						flex: 1

					}, {
						fieldLabel: 'Estado',
						itemId: 'estado_usuario',
						name: 'estado_usuario',
						margin: '10 10 0 5',
						xtype: 'combo',
						dock: 'top',
						allowBlank: false,
						enableKeyEvents: true,
						editable: false,
						displayField: 'estado',
						valueField: 'estado_usuario',
						mode: 'local',
						triggerAction: 'all',
						emptyText: 'Seleccionar',
						store: new Ext.data.SimpleStore({
							fields: ['estado_usuario',
								'estado'],
							data: [['1', 'Activo'],
							['0', 'Inactivo']

							]
						}),
						queryMode: 'local',
						flex: 1,
						value: 1,
						readOnly:true,

					}]
				}, {

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
						itemId : 'id_fkempresa_sucursal_usuario',
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
								store = Ext.getStore('Sucursal');
								value=Ext.ComponentQuery
				.query('#id_fkempresa_sucursal_usuario')[0]
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
				buttons: [{
					text: 'Guardar',
					itemId: 'guardar_usuario',
					iconCls: 'x-fa fa-save',

					style: {
						'background-color': '#4E7228'

					},
					handler: function () {
						me = this;

						Ext.MessageBox.show({
							title: 'Mensaje',
							msg: 'Desea guardar el registro?',
							buttons: Ext.MessageBox.OKCANCEL,
							icon: Ext.MessageBox.QUESTION,

							fn: function (btn) {
								if (btn == 'ok') {



									var form = Ext.ComponentQuery.query('#usuarioForm')[0]
										.getForm();
									me.fireEvent('btnCreate', form);


								}
							}

						});


					}
				}

					, {

					iconCls: 'fas fa-sync-alt',
					text: 'Refrescar',
					style: {
						'background-color': '#A31C2E'

					},
					handler: function () {



						Ext.ComponentQuery.query('#usuarioForm')[0]
							.getForm().reset();

					}
				}

				]

			}]

		}]

	}]
});