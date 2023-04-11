Ext.define('Legion.view.sucursal.WindowSucursal', {
	extend : 'Ext.window.Window',
	alias : 'widget.window_sucursal',
	itemId : 'window_sucursal',
	draggable : false,
	resizable : false,

	modal : true,

	items : [{
		xtype : 'form',
		width : 900,
		alias : 'widget.form_sucursal_editar',
		itemId : 'form_sucursal_editar',
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
		items : [{
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

							}, {
								fieldLabel : 'Codigo Sucursal',
								itemId : 'codigo_sucursal',
								name : 'codigo_sucursal',
								margin : '10 0 0 5',
								flex : 1

							},

							{
								fieldLabel : 'Nombre',
								itemId : 'nombre_sucursal',
								name : 'nombre_sucursal',
								margin : '10 0 0 5',
								flex : 1

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

								fieldLabel : 'Nombre Comercial',
								itemId : 'nombre_comercial_sucursal',
								name : 'nombre_comercial_sucursal',
								margin : '10 10 0 5',
								flex : 1

							},
							{
								fieldLabel : 'Imagen',
								itemId : 'imagen_validar_sucursal',
								name : 'imagen_validar_sucursal',
								hidden : true,
								flex : 1

							},

							{

								fieldLabel : 'Direccion',
								itemId : 'direccion_sucursal',
								name : 'direccion_sucursal',
								margin : '10 0 0 5',
								flex : 1

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
								fieldLabel : 'Ciudad',
								itemId : 'ciudad_sucursal',
								name : 'ciudad_sucursal',
								margin : '10 0 0 5',
								flex : 1

							}, {
								fieldLabel : 'Telefono',

								name : 'telefono_sucursal',
								itemId : 'telefono_sucursal',
								margin : '10 10 0 5',
								flex : 1

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
								margin : '10 0 0 5',
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
									

								

							}, {
								fieldLabel : 'id_usuario',
								hidden : true,
								name : 'id_fkusuario_sucursal',
								itemId : 'id_fkusuario_sucursal'

							}]
				},{
					xtype : 'fieldcontainer',
					layout : 'hbox',
					defaultType : 'textfield',

					fieldDefaults : {

						labelStyle : 'font-weight:bold'
					},
					items : [{

						
							columnWidth : 0.33,
							xtype : 'combo',
			fieldLabel : 'Institucion',
			margin : '0 0 0 5',
			name : 'id_fkempresa_sucursal',
			itemId : 'id_fkempresa_sucursal_sucursal_edit',
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
								name : 'imagen_sucursal_editar',
								itemId : 'imagen_sucursal_editar',
								margin : '10 100 0 5',
								flex : 1

							}, {

								xtype : 'image',
								itemId : 'imagen_vista_sucursal_editar',
								margin : '0 100',
								src : 'https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen-800x419.jpg',
								height : 180,
								width : 180,
								style : {
									'border' : '1px solid #000'

								}

							}]
				}

		],
		buttons : [{
			text : 'Guardar',
			itemId : 'guardar_sucursal',
			style: {
				'background-color': 'green'

			},
			iconCls: 'x-fa fa-edit',
			handler : function() {

				var form = Ext.ComponentQuery.query('#form_sucursal_editar')[0]
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