Ext.define('Legion.view.mensualidad.MensualidadWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.mensualidad',
	itemId: 'window_mensualidad',
	title: '',
	draggable: false,
	resizable: false,

	modal: true,
	items: [{

		xtype: 'form',
		itemId: 'mensualidadForm',
		alias: 'widget.MensualidadForm',

		name: 'MensualidadForm',
		buttonAlign: 'center',
		border: false,
		trackResetOnLoad: true,

		collapsible: false,
		layout: {
			type: 'vbox',
			align: 'stretch'
		},

		store: 'Mensualidad',

		defaultType: 'textfield',
		items: [{

			xtype: 'fieldcontainer',
			layout: 'hbox',
			defaultType: 'textfield',

			fieldDefaults: {

				labelStyle: 'font-weight:bold'
			},
			items: [{
				fieldLabel: 'Inscripcion',
				itemId: 'id_fkinscripcion_mensualidad',
				name: 'id_fkinscripcion_mensualidad',
				margin: '10 10 0 5',
				flex: 1,
				readOnly: true,
				hidden:false
			}, {
				fieldLabel: 'Orden de Pedido',
				itemId: 'id_fkorden_pedido_mensualidad',
				name: 'id_fkorden_pedido_mensualidad',
				margin: '10 10 0 5',
				flex: 1,
				readOnly: true,
				hidden:true
			}]

		}, {

			xtype: 'fieldcontainer',
			layout: 'hbox',
			defaultType: 'textfield',

			fieldDefaults: {

				labelStyle: 'font-weight:bold'
			},
			items: [{
				fieldLabel: 'Numero de Cuota',
				itemId: 'numero_cuota_mensualidad',
				name: 'numero_cuota_mensualidad',
				margin: '10 10 0 5',
				flex: 1,
				readOnly: true
			}, {
				xtype: 'datefield',
				fieldLabel: 'Fecha de Pago',
				format: 'Y-m-d',
				itemId: 'fecha_pago_mensualidad',
				name: 'fecha_pago_mensualidad',
				margin: '10 10 0 5',
				flex: 1,
				editable:false,
			}]
		}, {
			xtype: 'fieldcontainer',
			layout: 'hbox',
			defaultType: 'textfield',

			fieldDefaults: {

				labelStyle: 'font-weight:bold'
			},
			items: [{
				fieldLabel: 'Estado',

				itemId: 'estado_mensualidad',
				name: 'estado_mensualidad',
				margin: '10 0 0 5',
				xtype: 'combo',
				dock: 'top',
				enableKeyEvents: true,
				editable: false,
				displayField: 'estado',
				valueField: 'estado_mensualidad',
				mode: 'local',
				triggerAction: 'all',
				emptyText: 'Seleccionar',
				store: new Ext.data.SimpleStore({
					fields: ['estado_mensualidad', 'estado'],
					data: [['1', 'Pagado'],
					['0', 'Pendiente']

					]
				}),
				queryMode: 'local',
				flex: 1
			}, {
				fieldLabel: 'Monto',
				itemId: 'monto_mensualidad',
				name: 'monto_mensualidad',
				margin: '10 10 0 5',
				flex: 1,
				maskRe : /[0-9.]/,
				enforceMaxLength : true,
			}]
		}, {
			xtype: 'fieldcontainer',
			layout: 'hbox',
			defaultType: 'textfield',

			fieldDefaults: {

				labelStyle: 'font-weight:bold'
			},
			items: [{
				fieldLabel: 'id',
				itemId: 'id_mensualidad',
				name: 'id_mensualidad',
				hidden: true,
				flex: 1

			},
			{
				fieldLabel: 'Concepto',
				itemId: 'concepto_mensualidad',
				name: 'concepto_mensualidad',
				
				flex: 1

			},

			{
				fieldLabel: 'Abonado',
				itemId: 'abonado_mensualidad',
				name: 'abonado_mensualidad',
				margin: '10 10 0 5',
				flex: 1,
				hidden:true
			}, {
				fieldLabel: 'Saldo',
				itemId: 'saldo_mensualidad',
				name: 'saldo_mensualidad',
				margin: '10 10 0 5',
				flex: 1,
				hidden:true
			}]
		}],
		buttons: [{
			text: 'Guardar',
			itemId: 'actualizar_forma',
			handler: function (record) {
				var window = this.up('window');
				var form = Ext.ComponentQuery.query('#mensualidadForm')[0]
					.getForm();
					console.log(form.getValues())

					Ext.ComponentQuery.query('#saldo_mensualidad')[0]
				.setValue(form.getValues().monto_mensualidad);

				this.fireEvent('btnCreate', form, window);

			}
		}

			, {
			text: 'Cerrar',
			handler: function () {
				this.up('window').close()

			}
		}

		]

	}]

});