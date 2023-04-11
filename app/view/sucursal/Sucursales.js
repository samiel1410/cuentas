Ext.define('Legion.view.sucursal.Sucursales', {
	extend : 'Ext.TabPanel',
	alias : 'widget.Sucursales',
	autoScroll : true,
	autoHeight : true,

	items : [{

		title : 'Listado Sucursales',
		items : [{
					xtype : 'component',
					html : 'Listado de Sucursales',
					style : {
						'backgroundColor' : '#05723A',
						'color' : '#FFFFFF',
						'font-size' : '16px',
						'padding' : '15px'
						

					}

				},  {

					xtype : 'container',
					itemId : 'container',

					items : [{
						xtype : 'fieldset',
						itemId : 'fieldset',

						title : 'Busqueda Sucursales',

						defaultType : 'textfield',
						defaults : {
							anchor : '100%'
						},
						layout : 'hbox',
						items : [{
									fieldLabel : 'Nombre',
									itemId : 'nombre_busqueda_sucursal',
									name : 'nombre_busqueda_sucursal'

								}, {
									columnWidth : 0.33,
									xtype : 'combo',
					fieldLabel : 'Institucion',
					margin : '0 0 0 5',
					name : 'id_fkempresa_sucursal',
					itemId : 'id_fkempresa_sucursal_sucursal',
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
			.query('#id_fkempresa_sucursal_sucursal')[0]
			.getValue();

							store.getProxy().extraParams={
								id_empresa:value,
								nombre_busqueda:""

							}
							store.load();
							

						}
					}

								},{

									xtype : 'button',
									margin : '0 0 0 5',
									iconCls : 'x-fa  fa-search',
									itemId : 'boton_buscar_sucursal',
									handler : function() {
										this.fireEvent('btnBuscar');
									}

								}, {

									xtype : 'button',
									margin : '0 0 0 5',
									iconCls : 'x-fa fa-eraser',
									itemId : 'boton_refresh_sucursal',
									handler : function() {
										this.fireEvent('btnRefresh');
									}

								}, {
									xtype : 'combo',
									renderTo : document.body,
									itemId : 'mostrar_columnas_sucursales',
									fieldLabel : 'Columnas',
									labelAlign : 'right',
									displayField : 'name',
									multiSelect : true,
									tpl : new Ext.XTemplate('<tpl for=".">',
											'<div class="x-boundlist-item">',
											'<input type="checkbox" />',
											'{name}', '</div>', '</tpl>'),
									store : Ext.create('Ext.data.Store', {
												fields : [{
															type : 'string',
															name : 'name'
														}],
												data : [{
															"name" : "Creado",
															"id" : 1

														}

												]
											}),
									queryMode : 'local',
									listeners : {
										select : function(combo, records) {
											this.fireEvent(
													'ComboMostrarColumnas',
													combo, records);

										},
										beforedeselect : function(combo, rec) {

											this.fireEvent('OcultarColumnas',
													combo, rec);

										}
									}
								}]

					}

					]

				}, {

					alias : 'widget.SucursalGrid',
					itemId : 'SucursalGrid',
					xtype : 'grid',
		
					autoScroll : true,
					
					selType : 'rowmodel',
					selModel : {
						mode : 'SINGLE'
					},
					viewConfig : {
						stripeRows : true
					},
					store : 'Sucursal',
					height: 300,

					autoLoad : true,

					columns : [{
								text : "Codigo",
								dataIndex : 'codigo_sucursal',
								width : 70,
								menuDisabled : true
							}, {
								text : "Nombre",
								flex : 2,
								dataIndex : 'nombre_sucursal',
								menuDisabled : true,
								renderer: function(value, meta, record) {
									if(value) meta.tdAttr='data-qtip="'+value+'"';
									return value;
								}

							}, {
								text : "Nombre Comercial",
								flex : 2,
								dataIndex : 'nombre_comercial_sucursal',

								menuDisabled : true

							}, {
								text : "Direccion",
								flex : 1,
								dataIndex : 'direccion_sucursal',
								menuDisabled : true,
								renderer: function(value, meta, record) {
									if(value) meta.tdAttr='data-qtip="'+value+'"';
									return value;
								}

							}, {
								text : "Ciudad",
								flex : 1,
								dataIndex : 'ciudad_sucursal',
								menuDisabled : true

							}, {
								text : "Telefono",
								flex : 1,
								dataIndex : 'telefono_sucursal',
								menuDisabled : true

							}, {
								text : "Correo",
								flex : 1,
								dataIndex : 'email_sucursal',
								menuDisabled : true,
								renderer: function(value, meta, record) {
									if(value) meta.tdAttr='data-qtip="'+value+'"';
									return value;
								}

							},
							{
								text : "Institucion",
								flex : 1,
								dataIndex : 'nombre_empresa',
								menuDisabled : true,
								renderer: function(value, meta, record) {
									if(value) meta.tdAttr='data-qtip="'+value+'"';
									return value;
								}

							},
							{
								text : "id_empresa",
								flex : 1,
								dataIndex : 'id_fkempresa_sucursal',
								menuDisabled : true,
								hidden:true

							}, {
								text : "Usuario",
								flex : 1,
								dataIndex : 'nombre_usuario',
								menuDisabled : true,
								hidden:true

							}, {
								text : "Creado",
								flex : 1,
								dataIndex : 'created_at',
								hidden : true,
								menuDisabled : true

							},
							{
								text : "Estado",
								flex : 1,
								dataIndex : 'nombre_estado_sucursal',
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
								xtype : 'actioncolumn',
								itemId : 'action_sucursal',
								width : 75,
								items : [{

									tooltip : 'Editar',
									iconCls : 'x-fa fa-pen',
									itemId : 'editar_sucursal',
									handler : function(view, rowIndex,
											colIndex, item, e, record, row) {
										this.fireEvent('btnUpdate', view,
												rowIndex, colIndex, item, e,
												record, row);

									}

								}, {
									tooltip : 'Eliminar',
									iconCls : 'x-fa fa-times',
									itemId : 'eliminar_sucursal',
									handler : function(view, rowIndex, colIndex, item, e, record, row) {
										this.fireEvent('btnDelete', view, rowIndex, colIndex, item, e, record, row);

									}
								}, {
									tooltip : 'Ver Imagen',
									iconCls : 'x-fa fa-eye',
									itemId : 'ver_sucursal',
									handler : function(view, rowIndex,
											colIndex, item, e, record, row) {
										this.fireEvent('btnShowSucursal', view,
												rowIndex, colIndex, item, e,
												record, row);

									}
								}

								]
							}],
					bbar : [{
						xtype : 'pagingtoolbar',
						store : 'Sucursal',
						displayInfo : true,
						displayMsg : 'Displaying {0} to {1} of {2} &nbsp;records ',
						emptyMsg : "No records to display&nbsp;",
						listeners : {
							beforechange : function(store) {
								this.fireEvent('pagination', store)

							}

						}
					}]

				}]

	}, {
		title : 'Nueva Sucursal',

		xtype : 'fieldcontainer',

		listeners:{
			
			deactivate: function(){
				if(Ext.ComponentQuery
					.query('#codigo_sucursal')[0]
				.getValue()!="" || Ext.ComponentQuery
				.query('#nombre_sucursal')[0]
			.getValue()!="" || Ext.ComponentQuery
			.query('#nombre_comercial_sucursal')[0]
		.getValue()!=""){

					Ext.MessageBox.show({
						title: 'Advertencia',
						msg: '¿Seguro desea abandonar el formulario?',
						buttons: Ext.MessageBox.OKCANCEL,
						icon: Ext.MessageBox.QUESTION,
						fn: function (btn) {
							if (btn == 'ok') {

								Ext.ComponentQuery.query('#sucursalForm')[0].getForm().reset();
			
								
			
							}else{
								Ext.ComponentQuery.query('Sucursales')[0].setActiveTab(1);
							}
						}
					});



				}
			}
		},
		
		

		fieldDefaults : {

			labelStyle : 'font-weight:bold'
		},

		items : [{

			
				xtype : 'component',
				html : 'Nueva de Sucursal',
				style : {
					'backgroundColor' : '#05723A',
					'color' : '#FFFFFF',
					'font-size' : '16px',
					'padding' : '15px'
					

				}

			}, 
		,{

		
			itemId : 'fieldset',

			
			

			defaults : {
				anchor : '100%',
				width:'100%'
			},
			
			items : [
			
				
				
				
				{
				xtype : 'form',
				
				alias : 'widget.form_sucursal',
				itemId : 'sucursalForm',

				buttonAlign : 'center',
				border : false,
				trackResetOnLoad : true,

				collapsible : false,
				layout : {
					type : 'vbox',
					align : 'stretch'
				},

				fieldDefaults : {
					xtype : 'textfield',
					msgTarget : 'side',

					labelStyle : 'font-weight:bold'
				},
				defaultType : 'textfield',
				items : [
					
					{
						layout:'hbox',
						xtype : 'fieldcontainer',
						items:[{

							xtype : 'fieldcontainer',
							layout : {
								type : 'vbox',
								align : 'stretch'
							},
							width:850,
							items:[

								{
									xtype : 'fieldcontainer',
									layout : 'hbox',
									defaultType : 'textfield',
		
									fieldDefaults : {
		
										labelStyle : 'font-weight:bold'
									},
									items : [{
												fieldLabel : 'id',
												itemId : 'id_sucursal',
												name : 'id_sucursal',
												hidden : true,
												flex : 1
		
											},
											{
												fieldLabel : 'id',
												itemId : 'imagen_validar',
												name : 'imagen_validar',
												hidden : true,
												flex : 1
											},
											 {
												fieldLabel : 'Codigo Sucursal',
												itemId : 'codigo_sucursal',
												name : 'codigo_sucursal',
												margin : '10 10 0 5',
												flex : 1,
												allowBlank : false,
		
											}, {
												fieldLabel : 'Nombre',
												itemId : 'nombre_sucursal',
												name : 'nombre_sucursal',
												margin : '10 10 0 5',
												flex : 1,
												allowBlank : false,
		
											}
									]
								},
		
								{
									xtype : 'fieldcontainer',
									layout : 'hbox',
									defaultType : 'textfield',
		
									fieldDefaults : {
		
										labelStyle : 'font-weight:bold'
									},
									items : [{
		
												fieldLabel : 'Nombre Comercial',
												itemId : 'nombre_comercial_sucursal',
												name : 'nombre_comercial_sucursal',
												margin : '10 10 0 5',
												flex : 1,
												allowBlank : false,
		
											}, {
		
												fieldLabel : 'Direccion',
												itemId : 'direccion_sucursal',
												name : 'direccion_sucursal',
												margin : '10 10 0 5',
												flex : 1,
												allowBlank : false,
		
											}
		
									]
								}, {
									xtype : 'fieldcontainer',
									layout : 'hbox',
									defaultType : 'textfield',
		
									fieldDefaults : {
		
										labelStyle : 'font-weight:bold'
									},
									items : [
		
										{
											fieldLabel : 'Provincia',
											itemId : 'provincia_sucursal',
										
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
									.query('#provincia_sucursal')[0]
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
											itemId : 'ciudad_sucursal',
											name : 'ciudad_sucursal',
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
										
										}, {
												fieldLabel : 'Telefono',
		
												name : 'telefono_sucursal',
												itemId : 'telefono_sucursal',
												margin : '10 10 0 5',
												flex : 1,
												maxLength : 10,
												minLength : 1,
												maskRe : /[0-9.]/,
												flex: 1,
												allowBlank : false,
		
											}
		
									]
								}, {
									xtype : 'fieldcontainer',
									layout : 'hbox',
									defaultType : 'textfield',
		
									fieldDefaults : {
		
										labelStyle : 'font-weight:bold'
									},
									items : [{
												fieldLabel : 'Correo',
		
												name : 'email_sucursal',
												itemId : 'email_sucursal',
												margin : '10 10 0 5',
												vtype : 'email',
										allowBlank : false,

										vtypeText : 'Formato invalido. Ejm: user@domain.com',
										msgTarget : 'under',
												flex : 1
		
											}, {
												fieldLabel : 'Estado',
												itemId : 'estado_sucursal',
												name : 'estado_sucursal',
												margin : '10 10 0 5',
												xtype : 'combo',
												dock : 'top',
												allowBlank : false,
												enableKeyEvents : true,
												editable : false,
												displayField : 'estado',
												valueField : 'estado_sucursal',
												mode : 'local',
												triggerAction : 'all',
												emptyText : 'Seleccionar',
												store : new Ext.data.SimpleStore({
													fields : ['estado_sucursal', 'estado'],
													data : [['1', 'Activo'],
															['0', 'Inactivo']
		
													]
												}),
												queryMode : 'local',
												flex : 1,
												value:1,
												
		
											}
		
									]
		
								}, {
									xtype : 'fieldcontainer',
									layout : 'hbox',
									defaultType : 'textfield',
		
									fieldDefaults : {
		
										labelStyle : 'font-weight:bold'
									},
									items : [{
		
												fieldLabel : 'Imagen',
												xtype : 'filefield',
												name : 'imagen_sucursal',
												itemId : 'imagen_sucursal',
												margin : '10 10 0 5',
												flex : 1,
												allowBlank : false,
		
											}, {

												xtype : 'combo',
												fieldLabel : 'Institucion',
												margin : '10 10 0 5',
												name : 'id_fkempresa_sucursal',
												itemId : 'id_fkempresa_sucursal',
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

											},
											
											
											{
												fieldLabel : 'id_usuario',
												hidden : true,
												name : 'id_fkusuario_sucursal',
												itemId : 'id_fkusuario_sucursal'
		
											}]
								}
								
							]

					},{


						//Imagen

						xtype : 'fieldcontainer',
									
									
									
						fieldDefaults : {

							labelStyle : 'font-weight:bold'
						},
						margin:'10 0 0 30',

						items : [
							{
								
							
							
									xtype: 'image',
									itemId: 'imagen_sucursal_vista',
									border: 2,
									style: {
										borderColor: 'black',
										borderStyle: 'solid'
									},
	
									src: 'https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
									height: 200,
									width: 180
											
										}]



						
					}]

					},
				

				],
				buttons : [{
					text : 'Guardar',
					itemId : 'guardar_sucursal',
					style: {
						'background-color': 'green'
		
					},
					iconCls: 'x-fa fa-save',
					handler : function(record) {

						me = this;

						Ext.MessageBox.show({
							title: 'Mensaje',
							msg: 'Desea guardar el registro?',
							buttons: Ext.MessageBox.OKCANCEL,
							icon: Ext.MessageBox.QUESTION,

							fn : function(btn) {
								if (btn == 'ok') {

									var form = Ext.ComponentQuery.query('#sucursalForm')[0]
								.getForm();

						me.fireEvent('btnCreate', form);

							
					
								
				
								}
							}
	
						});

						

					}
				}

				, {
					style: {
						'background-color': 'red'
		
					},
					iconCls: 'fas fa-sync-alt',
					text : 'Refescar',
					handler : function() {
						Ext.ComponentQuery.query('#sucursalForm')[0]
						.getForm().reset();

					}
				}

				]
			}]
		}]

	}]

});