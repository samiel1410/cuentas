Ext.define('Legion.controller.StudentMaster', {
	extend: 'Ext.app.Controller',
	models: ['Legion.model.Student'],
	views: ['Legion.view.StudentGrid'],

	refs: [{
		ref: 'studentMasterForm',
		selector: 'viewport > StudentGrid'
	}],

	init: function () {
		this.control({


			'actioncolumn': {
				btnUpdate: this.onUpdateClick,
				btnDelete: this.onDeleteClick
			},
			'combo': {
				combo_estado: this.onEstadoClick,
				combo_encontraste: this.onEncontrasteClick

			},
			'button': {
				date: this.OnDateClick,
				reset: this.onResetClick

			},
			'pagingtoolbar': {
				pagination: this.onPaginationClick
			}


		});
	},

	onUpdateClick: function (grid, rowIndex, colIndex) {
		var rec = grid.getStore().getAt(rowIndex);
		var formulario = new Ext.form.Panel({
			width: 275,
			height: 100,
			title: 'Editar - ' + rec.get('nombre_usuario_demo'),
			floating: true,
			closable: true,
			items: [

				{
					xtype: 'combo',
					enableKeyEvents: true,
					editable: false,
					displayField: 'estado',
					allowBlank: false,
					typeAhead: true,
					mode: 'local',
					triggerAction: 'all',
					emptyText: 'Seleccionar',
					store: new Ext.data.SimpleStore({
						fields: ['id', 'estado'],
						data: [['1', 'Por Contactar'], ['2', 'Contactado']]
					}),
					queryMode: 'local',
					name: 'combo',
					fieldLabel: 'Estado',
					value: rec.get('estado_usuario_demo'),
					renderTo: Ext.getBody()
				}],

			buttons: [{
				text: 'Guardar',
				itemId: 'btnGuardar',
				handler: function (btn) {

					var data = this.up('form');
					var datC = data.getForm().getValues();

					var dt = JSON.stringify(datC['combo']);

					Ext.Ajax.request({
						url: 'http://localhost/resgistro_demo/php/clases/update.php',
						method: 'POST',
						params: {
							combo: dt,
							id: rec.get('Id')

						},

						success: function (form, action) {
							formulario.close();
							Ext.getStore('School.store.Student').load();
						}

					});
					Ext.MessageBox.show({
						title: 'Actualizado',
						msg: 'Dato Actualizado',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING

					});
				}

			}

			]

		}

		).show();

	},
	onEstadoClick: function (field, value) {

		var store = Ext.getStore('School.store.Student');
		var inicio = Ext.getCmp('fecha_inicial');
		var finall = Ext.getCmp('fecha_final')
		var encontraste = Ext
			.getCmp('como_encontraste')
			.getValue();
		var fecha_inicio = Ext.Date.format(inicio
			.getValue(), 'Y-m-d');

		var fecha_final = Ext.Date.format(finall
			.getValue(), 'Y-m-d');
		store.getProxy().extraParams = {


			estado: value,
			encontraste: encontraste,
			fecha_inicio: fecha_inicio,
			fecha_final: fecha_final


		};
		store.loadPage(1);

	},

	onEncontrasteClick: function (field, value) {
		var store = Ext.getStore('School.store.Student');
		var inicio = Ext.getCmp('fecha_inicial');
		var finall = Ext.getCmp('fecha_final')

		var estado = Ext.getCmp('estado_usuario')
			.getValue();
		var fecha_inicio = Ext.Date.format(inicio
			.getValue(), 'Y-m-d');

		var fecha_final = Ext.Date.format(finall
			.getValue(), 'Y-m-d');


		store.getProxy().extraParams = {

			estado: estado,
			encontraste: value,
			fecha_inicio: fecha_inicio,
			fecha_final: fecha_final


		};

		store.loadPage(1);


	},
	OnDateClick: function () {

		var inicio = Ext.getCmp('fecha_inicial');
		var finall = Ext.getCmp('fecha_final')
		var estado = Ext.getCmp('estado_usuario')
			.getValue();
		var encontraste = Ext
			.getCmp('como_encontraste').getValue();

		var fecha_inicio = Ext.Date.format(inicio
			.getValue(), 'Y-m-d');

		var fecha_final = Ext.Date.format(finall
			.getValue(), 'Y-m-d');
		var store = Ext.getCmp('studentsGrid')
			.getStore();
		store.loadPage(1, {
			params: {
				estado: estado,
				encontraste: encontraste,
				fecha_inicio: fecha_inicio,
				fecha_final: fecha_final
			}
		});


	},

	onPaginationClick: function (store) {

		var inicio = Ext.getCmp('fecha_inicial');
		var finall = Ext.getCmp('fecha_final')

		var estado = Ext.getCmp('estado_usuario').getValue();
		var encontraste = Ext.getCmp('como_encontraste')
			.getValue();
		var fecha_inicio = Ext.Date.format(inicio.getValue(),
			'Y-m-d');

		var fecha_final = Ext.Date.format(finall.getValue(),
			'Y-m-d');

		store.getStore('School.store.Student').load(extraParams = {
			estado: estado,
			encontraste: encontraste,
			fecha_inicio: fecha_inicio,
			fecha_final: fecha_final
		});




	},
	onResetClick: function () {

		Ext.getCmp('estado_usuario').reset();
		Ext.getCmp('como_encontraste').reset();
		Ext.getCmp('fecha_final').reset();
		Ext.getCmp('fecha_inicial').reset();
		Ext.getCmp('studentsGrid').getStore().load();

	},

	onDeleteClick: function (grid, rowIndex, colIndex, action) {

		var rec = grid.getStore().getAt(rowIndex);
		Ext.MessageBox.show({
			title: 'Advertencia',
			msg: 'Seguro que deseea Borrar a: ' + rec.get('nombre_usuario_demo') + '?',
			buttons: Ext.MessageBox.OKCANCEL,
			icon: Ext.MessageBox.WARNING,

			fn: function (btn) {
				if (btn == 'ok') {
					Ext.Ajax.request({
						url: 'http://localhost/resgistro_demo/php/clases/delete.php',
						method: 'POST',
						params: {
							id: rec.get('Id')
						},

						success: function (form, action) {

							Ext.getStore('School.store.Student').load();

						}

					});

				}
			}
		});
	}

});