Ext.define('Legion.controller.MensualidadController', {
	extend : 'Ext.app.Controller',
	models : ['Legion.model.Mensualidad'],

	stores : ['Mensualidad'],
	refs : [{
				ref : 'mensualidadMasterForm'

			}],

	init : function() {
		this.control({

					'#action_mensualidad' : {
						btnUpdate : this.onUpdateClick,
						btnDelete : this.onDeleteClick
					},

					'#nombre_busqueda_forma_pago' : {
						specialkey : this.onBusquedaNombre
					},

					'#boton_refresh_forma' : {
						btnRefresh : this.onRefresh

					},
					
					'#actualizar_forma' :{
						btnCreate :this.onUpdate
					}

				});
	},

	onRefresh : function() {
		var store = Ext.getStore('Mensualidad');
		Ext.ComponentQuery.query('#estado_busqueda_mensualidad')[0].reset();

		store.getProxy().extraParams = {
			estado_busqueda : ""

		};
		store.load();

	},

	onDeleteClick : function(grid, rowIndex, colIndex) {

		Ext.MessageBox.show({
			title : 'Advertencia',
			msg : 'Seguro que deseea Borrar?',
			buttons : Ext.MessageBox.OKCANCEL,
			icon : Ext.MessageBox.WARNING,
			fn : function(btn) {
				if (btn == 'ok') {
					var rec = grid.getStore().getAt(rowIndex);

					Ext.Ajax.request({
						url : 'php/negocios/mensualidades/eliminarMensualidad.php',
						method : 'POST',
						params : {
							id_mensualidad : rec.data.id_mensualidad
						},

						success : function() {

							Ext.getStore('Mensualidad').load();
						}

					}

					);

				}
			}
		});

	},

	onUpdateClick : function(view, rowIndex, colIndex, item, e, record, row) {

		var id = record.data.id_mensualidad;
		var id_inscripcion = record.data.id_fkinscripcion_mensualidad;
		var id_orden = record.data.id_fkorden_pedido_mensualidad;
		var cuota = record.data.numero_cuota_mensualidad;
		var fecha = record.data.fecha_pago_mensualidad;
		var estado = record.data.estado_mensualidad;
		var monto = record.data.monto_mensualidad;
		var abonado = record.data.abonado_mensualidad;
		var saldo = record.data.saldo_mensualidad;

		var window = Ext.create('Legion.view.mensualidad.MensualidadWindow');
		window.setTitle("Actualizar Mensualidad:" + id + " ", true);
		window.show();

		Ext.ComponentQuery
				.query('#window_mensualidad #mensualidadForm #id_mensualidad')[0]
				.setValue(id);

		Ext.ComponentQuery
				.query('#window_mensualidad #mensualidadForm #id_fkinscripcion_mensualidad')[0]
				.setValue(id_inscripcion);

		Ext.ComponentQuery
				.query('#window_mensualidad #mensualidadForm #id_fkorden_pedido_mensualidad')[0]
				.setValue(id_orden);

		Ext.ComponentQuery
				.query('#window_mensualidad #mensualidadForm #numero_cuota_mensualidad')[0]
				.setValue(cuota);

		Ext.ComponentQuery
				.query('#window_mensualidad #mensualidadForm #fecha_pago_mensualidad')[0]
				.setValue(fecha);

		Ext.ComponentQuery
				.query('#window_mensualidad #mensualidadForm #estado_mensualidad')[0]
				.setValue(estado);

		Ext.ComponentQuery
				.query('#window_mensualidad #mensualidadForm #monto_mensualidad')[0]
				.setValue(monto);

		Ext.ComponentQuery
				.query('#window_mensualidad #mensualidadForm #abonado_mensualidad')[0]
				.setValue(abonado);

		Ext.ComponentQuery
				.query('#window_mensualidad #mensualidadForm #saldo_mensualidad')[0]
				.setValue(saldo);

		Ext.ComponentQuery
				.query('#window_mensualidad #mensualidadForm  #actualizar_forma')[0]
				.setText("Editar", true);
				
				
				
				

	},
	onUpdate : function(form, window) {
		

		var values;

		if (!form || !form.isValid()) {
			alert('Check your form please!');
			return;
		}
	

		form.submit({
			url : 'php/negocios/mensualidades/actualizar_ingresarMensualidad.php',
			waitMsg : 'Espere..',

			success : function(data, response) {
				
				console.log(response.result.success);

				if (response.result.success==true) {

					var window2 = Ext.ComponentQuery.query('#window_mensualidad')[0];

					Ext.MessageBox.show({
								title : 'Mensaje',
								msg : 'Mensualidad Creada',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.WARNING

							});
					window2.close();
				}
				Ext.getStore('Mensualidad').load();
				Ext.getStore('InscripcionMensualidades').load();

			},
			failure : function() {
				console.log("Error");
			}
		});
		



	}

});