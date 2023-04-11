Ext.define('Legion.view.instructor.InstructorWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.window_instructor_editar',
	itemId: 'window_instructor_editar',
	title: 'Nuevo Instructor',
	draggable: false,
	resizable: false,

	modal: true,
	items: [{

		xtype: 'form',
		itemId: 'instructorFormEditar',
		alias: 'widget.InstructoresForm',

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
				flex: 1,
				

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
					fieldLabel: 'Ciudad',
					itemId: 'ciudad_instructor',
					name: 'ciudad_instructor',
					margin: '10 10 0 5',
					flex: 1,
					allowBlank: false,

				},

				{
					fieldLabel: 'Telefono',
					itemId: 'telefono_instructor',
					name: 'telefono_instructor',
					margin: '10 0 0 5',
					flex: 1,
					allowBlank: false,

				},]
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
					vtype: 'email',
					allowBlank: false,

					vtypeText: 'Invalid email format.  Email must be of the form user@domain.com',
					msgTarget: 'under',
					margin: '10 0 0 5',
					flex: 1,
					

				}, {
					fieldLabel: 'Cedula',

					name: 'cedula_instructor',
					itemId: 'cedula_instructor',
					margin: '10 10 0 5',
					maxLength : 15,
					enforceMaxLength : true,
					flex: 1,
					allowBlank: false,

				},]
		}, {

			xtype: 'fieldcontainer',
			layout: 'hbox',
			defaultType: 'textfield',

			fieldDefaults: {

				labelStyle: 'font-weight:bold'
			},
			items: [
				{
					fieldLabel: 'Celular',
					itemId: 'celular_instructor',
					name: 'celular_instructor',
					margin: '10 0 0 5',
					flex: 1,
					allowBlank: false,

				}, {
					fieldLabel: 'Direccion',

					name: 'direccion_instructor',
					itemId: 'direccion_instructor',
					margin: '10 0 0 5',
					flex: 1,
					allowBlank: false,

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
					fieldLabel: 'Categoria',
					itemId: 'categoria_instructor_edit',
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
					fieldLabel: 'Estado',
					itemId: 'estado_instructor',
					name: 'estado_instructor',
					margin: '10 10 0 5',
					xtype: 'combo',
					allowBlank: false,
					dock: 'top',
					enableKeyEvents: true,
					editable: false,
					displayField: 'estado',
					valueField: 'estado_instructor',
					mode: 'local',
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
					flex: 1

				}
			]

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
					fieldLabel: 'Titulo',

					name: 'titulo_instructor',
					itemId: 'titulo_instructor',
					margin: '10 10 0 5',
					flex: 1,
					allowBlank: false,

				}
			]

		}
		],
		buttons: [{
			text: 'Guardar',
			itemId: 'guardar_instructor',
			style: {
				'background-color': 'green'

			},
			iconCls: 'x-fa fa-edit',
			handler: function (record) {
				var window = Ext.ComponentQuery.query('#window_instructor_editar')[0]

				var form = Ext.ComponentQuery.query('#instructorFormEditar')[0]
					.getForm();
				this.fireEvent('btnCreate', form, window, record);

			}
		}

			, {
				style: {
					'background-color': 'red'
	
				},
				iconCls: 'x-fa fa-window-close',
			text: 'Cerrar',
			handler: function () {
			 Ext.ComponentQuery.query('#window_instructor_editar')[0].close();

				

			}
		}

		]

	}]

});