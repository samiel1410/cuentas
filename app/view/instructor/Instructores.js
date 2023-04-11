Ext.define('Legion.view.instructor.Instructores', {
	extend: 'Ext.TabPanel',
	alias: 'widget.Instructores',
	autoScroll: true,
	autoHeight: true,


	items: [

		{
			title: 'Listado Instructores',
			items: [{
				xtype: 'component',
				html: 'Listado de Instructores',
				style: {
					'backgroundColor': '#05723A',
					'color': '#FFFFFF',
					'font-size': '16px',
					'padding': '15px'


				}

			}, {

				xtype: 'container',
				itemId: 'container',

				items: [{
					xtype: 'fieldset',
					itemId: 'fieldset',

					title: 'Busqueda Instructores',

					defaultType: 'textfield',
					defaults: {
						anchor: '100%'
					},
					layout: 'hbox',
					items: [{
						fieldLabel: 'Cedula',
						itemId: 'busqueda_cedula_instructor',
						name: 'busqueda_cedula_instructor',
						margin: '0 0 0 5',
						maxLength : 10,
							minLength : 1,
							maskRe : /[0-9.]/,
							
							enforceMaxLength : true,

					}, {
						fieldLabel: 'Nombre',
						itemId: 'nombre_busqueda_instructor',
						name: 'nombre_busqueda_instructor',
						margin: '0 0 0 5',

					}, 
					 {


						xtype: 'button',
						margin: '0 0 0 5',
						iconCls: 'x-fa  fa-search',
						itemId: 'boton_buscar_instructor',
						handler: function () {
							this.fireEvent('btnBuscar');
						}

					}, {

						xtype: 'button',
						margin: '0 0 0 5',
						iconCls: 'x-fa fa-eraser',
						itemId: 'boton_refresh_instructor',
						handler: function () {
							this.fireEvent('btnRefresh');
						}

					}, {
						xtype: 'combo',
						renderTo: document.body,
						itemId: 'mostrar_columnas_instructores',
						fieldLabel: 'Columnas',
						labelAlign: 'right',
						displayField: 'name',
						multiSelect: true,
						tpl: new Ext.XTemplate('<tpl for=".">',
							'<div class="x-boundlist-item">',
							'<input type="checkbox" />',
							'{name}', '</div>', '</tpl>'),
						store: Ext.create('Ext.data.Store', {
							fields: [{
								type: 'string',
								name: 'name'
							}],
							data: [{
								"name": "Direccion",
								"id": 1
							}, {
								"name": "Titulo",
								"id": 2

							}, {
								"name": "Creado",
								"id": 3

							}
							]
						}),
						queryMode: 'local',
						listeners: {
							select: function (combo, records) {
								this.fireEvent(
									'ComboMostrarColumnas',
									combo, records);

							},
							beforedeselect: function (combo, rec) {

								this.fireEvent('OcultarColumnas',
									combo, rec);

							}
						}
					}]

				}

				]

			}, {

				alias: 'widget.InstructorGrid',
				itemId: 'InstructorGrid',
				xtype: 'grid',
				
				autoScroll: true,
				selType: 'rowmodel',
				selModel: {
					mode: 'SINGLE'
				},
				viewConfig: {
					stripeRows: true
				},
				store: 'Instructor',

				autoLoad: true,
				height: 300,

				columns: [
					{
						text: "Cedula",
						flex: 1,
						dataIndex: 'cedula_instructor',
						
						menuDisabled: true
	
					},{
					text: "Nombre ",
					flex: 2,
					dataIndex: 'nombre_instructor',
					menuDisabled: true

				}, {
					text: "Apellido",
					flex: 2,
					dataIndex: 'apellido_instructor',
					menuDisabled: true

				}, {
					text: "Ciudad",
					flex: 1,
					dataIndex: 'ciudad_instructor',
					menuDisabled: true

				}, {
					text: "Telefono",
					flex: 1,
					dataIndex: 'telefono_instructor',
					menuDisabled: true

				}, {
					text: "Celular",
					flex: 1,
					dataIndex: 'celular_instructor',
					menuDisabled: true

				}, {
					text: "Direccion",
					flex: 1,
					dataIndex: 'direccion_instructor',
					hidden: true,
					menuDisabled: true

				}, {
					text: "Titulo",
					flex: 1,
					dataIndex: 'titulo_instructor',
					hidden: true,
					menuDisabled: true

				},   {
					text: "Usuario",
					flex: 1,
					dataIndex: 'nombre_usuario',
					menuDisabled: true,
					hidden:true

				}, 
				{
					text: "Creado",
					flex: 1,
					dataIndex: 'created_at',
					hidden: true,
					menuDisabled: true

				},

				{
					text: "Categoria Id",
					flex: 1,
					dataIndex: 'categoria_instructor',
					hidden:true,
					menuDisabled: true

				},

				{
					text: "Categoria",
					flex: 1,
					dataIndex: 'nombre_categoria_instructor',

					menuDisabled: true

				},
				{
					text: "Estado",
					flex: 1,
					dataIndex: 'nombre_estado_instructor',
					menuDisabled: true,
					menuDisabled : true,
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
					itemId: 'action_instructor',
					menuDisabled: true,
					width: 75,
					items: [{

						tooltip: 'Editar',
						iconCls: 'x-fa fa-pen',
						itemId: 'editar_instructor',
						handler: function (view, rowIndex,
							colIndex, item, e, record, row) {
							this.fireEvent('btnUpdate', view,
								rowIndex, colIndex, item, e,
								record, row);

						}

					}, {
						tooltip: 'Eliminar',
						iconCls: 'x-fa fa-times',
						itemId: 'eliminar_instructor',
						handler: function (grid, rowIndex, colIndex) {
							this.fireEvent('btnDelete', grid,
								rowIndex, colIndex);

						}
					},
					{
						tooltip: 'Ver Certificados',
						iconCls: 'x-fa fa-eye',
					
						handler: function (view, rowIndex,
							colIndex, item, e, record, row) {

								if(record.data.categoria_instructor==0){
									console.log(Ext.ComponentQuery.query('#id_instructor_edit')[0])
							this.fireEvent('btnVerCertificados',view, rowIndex,
							colIndex, item, e, record, row);
								}else{

									Ext.MessageBox.show({
										title : 'Mensaje',
										msg : 'Este personal es Docente , no contiene certificaciones',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.QUESTION
			
									});

								}

								

						}
					}

					]
				}],
				bbar: [{
					xtype: 'pagingtoolbar',
					store: 'Instructor',
					displayInfo: true,
					displayMsg: 'Monstrando {0} a {1} de {2} &nbsp;registros ',
					emptyMsg: "No records to display&nbsp;",
					listeners: {
						beforechange: function (store) {
							this.fireEvent('pagination', store)

						}

					}
				}]

			}]

		}, {
			title: 'Nuevo Instructor',

			listeners:{
			
				deactivate: function(){
					if(Ext.ComponentQuery
						.query('#nombre_instructor')[0]
					.getValue()!="" || Ext.ComponentQuery
					.query('#apellido_instructor')[0]
				.getValue()!="" || Ext.ComponentQuery
				.query('#ciudad_instructor')[0]
			.getValue()!=null){
	
						Ext.MessageBox.show({
							title: 'Advertencia',
							msg: '¿Seguro desea abandonar el formulario?',
							buttons: Ext.MessageBox.OKCANCEL,
							icon: Ext.MessageBox.QUESTION,
							fn: function (btn) {
								if (btn == 'ok') {
	
									Ext.ComponentQuery.query('#instructorForm')[0].getForm().reset();
				
									
				
								}else{
									Ext.ComponentQuery.query('Instructores')[0].setActiveTab(1);
								}
							}
						});
	
	
	
					}
				}
			},

			
			items: [{

				itemId: 'fieldset',

				title: 'Nuevo Instructor',
				header : {
					style: {
					 backgroundColor: '#05723A' //Cambiar el color del nav 
				 }},

				defaultType: 'textfield',
				defaults: {
					anchor: '100%',
					width: '100%'
				},
				layout: 'hbox',
				items: [
					{

					xtype: 'form',
					itemId: 'instructorForm',
					alias: 'widget.InstructoresForm',
					margin: '0 10 0 10',

					name: 'InstructoresForm',
					buttonAlign: 'center',
					border: false,
					trackResetOnLoad: true,

					collapsible: false,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},

					store: 'Instrctor',
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
							itemId: 'id_instructor',
							name: 'id_instructor',
							hidden: true,
							flex: 1

						}, {
							fieldLabel: 'Nombres',
							itemId: 'nombre_instructor',
							name: 'nombre_instructor',
							margin: '10 0 0 5',
							flex: 1,
							allowBlank: false,

						},

						{
							fieldLabel: 'Apellidos',
							itemId: 'apellido_instructor',
							name: 'apellido_instructor',
							margin: '10 0 0 5',
							flex: 1,
							allowBlank: false,

						}]
					},

					{
						xtype: 'fieldcontainer',
						layout: 'hbox',
						defaultType: 'textfield',

						fieldDefaults: {

							labelStyle: 'font-weight:bold'
						},
						items: [

							{
								fieldLabel : 'Provincia',
								itemId : 'id_fkprovincia_alumno_form',
								name : 'id_fkprovincia_alumno',
								margin : '10 20 0 5',
								xtype : 'combo',
								dock : 'top',
								enableKeyEvents : true,
								editable : false,
								displayField : 'provincia',
								valueField : 'id',
								mode : 'local',
								triggerAction : 'all',
								emptyText : 'Seleccionar',
								store : 'Provincia',
								queryMode : 'local',
								flex : 1,
								allowBlank : false,
								listeners:{
									change: function(){
										store = Ext.getStore('Canton');
										value=Ext.ComponentQuery
						.query('#id_fkprovincia_alumno_form')[0]
						.getValue();
			
										store.getProxy().extraParams={
											id_provincia:value,
											
			
										}
										store.load();
										
			
									}
								}
								
							},

							{
								fieldLabel : 'Ciudad',
								itemId : 'ciudad_instructor',
								name : 'ciudad_instructor',
								margin : '10 20 0 5',
								xtype : 'combo',
								dock : 'top',
								enableKeyEvents : true,
								editable : false,
								displayField : 'canton',
								valueField : 'canton',
								mode : 'local',
								triggerAction : 'all',
								emptyText : 'Seleccionar',
								store : 'Canton',
								queryMode : 'local',
								flex : 1,
								allowBlank : false,
							
							},
						
							
							{
								fieldLabel: 'Estado',
								itemId: 'estado_instructor',
								name: 'estado_instructor',
								margin: '10 10 0 5',
								xtype: 'combo',
								dock: 'top',
								enableKeyEvents: true,
								editable: false,
								displayField: 'estado',
								valueField: 'estado_instructor',
								mode: 'local',
								allowBlank: false,
								triggerAction: 'all',
								emptyText: 'Seleccionar',
								store: new Ext.data.SimpleStore({
									fields: ['estado_instructor',
										'estado'],
									data: [['1', 'Activo'],
									['0', 'Inactivo']

									]
								}),
								queryMode: 'local',
								flex: 1,
								value:1

							},

							]
					}, {
						xtype: 'fieldcontainer',
						layout: 'hbox',
						defaultType: 'textfield',

						fieldDefaults: {

							labelStyle: 'font-weight:bold'
						},
						items: [
							  {

								fieldLabel: 'Correo',

								name: 'correo_instructor',
								itemId: 'correo_instructor',
								vtype : 'email',
										allowBlank : false,

										vtypeText : 'Formato Invalid.  Ejm.user@domain.com',
										msgTarget : 'under',
										margin: '10 0 0 5',
								flex: 1

							},  {
								fieldLabel: 'Direccion',
	
								name: 'direccion_instructor',
								itemId: 'direccion_instructor',
								margin: '10 0 0 5',
								flex: 1,
								allowBlank: false,
	
							},]
					},{

						xtype : 'fieldcontainer',
					layout : 'column',
					defaultType : 'textfield',

					fieldDefaults : {

						labelStyle : 'font-weight:bold'
					},
					items:[
						{
							columnWidth: 0.33,
							fieldLabel: 'Celular',
							itemId: 'celular_instructor',
							name: 'celular_instructor',
							margin: '10 0 0 5',
							maxLength : 10,
							minLength : 1,
							maskRe : /[0-9.]/,
							flex: 1,
							enforceMaxLength : true,
							
							allowBlank: false,

						}, 
						{
							fieldLabel: 'Cedula',
							columnWidth: 0.33,
							name: 'cedula_instructor',
							itemId: 'cedula_instructor',
							margin: '10 0 0 5',
							flex: 1,
							maxLength : 15,
							enforceMaxLength : true,

							minLength : 1,
						
							
							enforceMaxLength : true,
							maskRe : /[0-9.]/,
							flex: 1,
						
							allowBlank: false,

						},{
							columnWidth: 0.33,
							fieldLabel: 'Telefono',
							itemId: 'telefono_instructor',
							name: 'telefono_instructor',
							margin: '10 0 0 5',
							maxLength : 10,
							minLength : 1,
							
							enforceMaxLength : true,
							maskRe : /[0-9.]/,
							flex: 1,
							allowBlank: false,

						},
					]
					},{

						xtype : 'fieldcontainer',
						layout : 'hbox',
						defaultType : 'textfield',
	
						fieldDefaults : {
	
							labelStyle : 'font-weight:bold'
						},
						items:[

							{
								fieldLabel: 'Categoria',
								itemId: 'categoria_instructor',
								name: 'categoria_instructor',
								margin: '10 10 0 5',
								xtype: 'combo',
								dock: 'top',
								enableKeyEvents: true,
								editable: false,
								displayField: 'categoria',
								valueField: 'categoria_instructor',
								mode: 'local',
								allowBlank: false,
								triggerAction: 'all',
								emptyText: 'Seleccionar',
								store: new Ext.data.SimpleStore({
									fields: ['categoria_instructor','categoria'],
									data: [['1', 'Docente'],
									['0', 'Instructor']

									]
								}),
								queryMode: 'local',
								flex: 1,

							
						

							},

							{
								fieldLabel: 'Titulo',

								name: 'titulo_instructor',
								itemId: 'titulo_instructor',
								margin: '10 10 0 5',
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
						itemId: 'guardar_instructor',
						handler: function (record) {

							me = this;

							Ext.MessageBox.show({
								title: 'Mensaje',
								msg: 'Desea guardar el registro?',
								buttons: Ext.MessageBox.OKCANCEL,
								icon: Ext.MessageBox.QUESTION,
	
								fn : function(btn) {
									if (btn == 'ok') {
	
								
										var window = me.up('window');
										var form = Ext.ComponentQuery.query('#instructorForm')[0]
											.getForm();
										me.fireEvent('btnCreate', form, window, record);
									
					
									}
								}
		
							});
							

						}
					}
					,
,
					{
				
						iconCls: 'fas fa-sync-alt',
						text : 'Refrescar',
						style: {
							'background-color': 'red'
	
						},
						handler : function() {
						Ext.ComponentQuery.query('#instructorForm')[0]
									.getForm().reset();
	
						}
					},
					
					]

				}]

			}]
		}

	]
});
