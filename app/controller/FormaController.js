Ext.define('Legion.controller.FormaController', {
	extend: 'Ext.app.Controller',
	models: ['Legion.model.FormaPago'],
	views: ['Legion.view.forma_pago.FormaPagoWindow'],
	stores: ['FormaPago'],
	refs: [{
		ref: 'formaMasterForm'

	}],

	init: function () {
		this.control({

			'#mostrar_formulario_forma': {
				btnWindow: this.onWindow

			},
			'#guardar_forma': {
				btnCreate: this.onCreateClick

			},
			'#action_forma': {
				btnUpdate: this.onUpdateClick,
				btnDelete: this.onDeleteClick
			},

			'#nombre_busqueda_forma_pago': {
				specialkey: this.onBusquedaNombre
			},

			'#boton_refresh_forma': {
				btnRefresh: this.onRefresh

			},
			'#btnReporteForma': {
				click: this.onReporte
			}

		});
	},

	onRefresh: function () {

		var store = Ext.getStore('FormaPago');
		Ext.ComponentQuery.query('#nombre_busqueda_forma_pago')[0].reset();


		store.getProxy().extraParams = {
			nombre_busqueda: ""

		};
		store.load();

	},


	onBusquedaNombre: function (field, e) {

		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_forma_pago')[0]
			.getValue();
		var store = Ext.getStore('FormaPago');
		if (e.getKey() == e.ENTER) {



			store.getProxy().extraParams = {
				nombre_busqueda: nombre

			};
			store.loadPage(1);
			console.log(nombre);

		}

		if (e.getKey() == e.ENTER && nombre == '""') {
			nombre = ""

			store.getProxy().extraParams = {
				nombre_busqueda: nombre,
				sucursal_busqueda: sucursal

			};
			store.load();

		}

	},

	onWindow: function () {
		var window = Ext.create('Legion.view.forma_pago.FormaPagoWindow');
		window.show();

	},
	onDeleteClick: function (grid, rowIndex, colIndex) {

		Ext.MessageBox.show({
			title: 'Advertencia',
			msg: 'Seguro que deseea Borrar?',
			buttons: Ext.MessageBox.OKCANCEL,
			icon: Ext.MessageBox.WARNING,
			fn: function (btn) {
				if (btn == 'ok') {
					var rec = grid.getStore().getAt(rowIndex);

					Ext.Ajax.request({
						url: 'php/negocios/forma_pagos/eliminarFormaPago.php',
						method: 'POST',
						params: {
							id_forma: rec.data.id_forma
						},

						success: function () {

							Ext.getStore('FormaPago').load();
						}

					}

					);

				}
			}
		});

	},

	onUpdateClick: function (view, rowIndex, colIndex, item, e, record, row) {

		var id = record.data.id_forma;
		var nombre = record.data.nombre_forma;
		var cuenta = record.data.numero_cuenta;


		var window = Ext.create('Legion.view.forma_pago.FormaPagoWindow');
		window.setTitle("Actualizar Forma Pago:" + nombre + " ", true);
		window.show();

		Ext.ComponentQuery.query('#window_forma #formaForm #id_forma')[0]
			.setValue(id);
		Ext.ComponentQuery.query('#window_forma #formaForm #nombre_forma')[0]
			.setValue(nombre);



		if (cuenta != "") {
			Ext.ComponentQuery.query('#window_forma #formaForm #es_trasnferencia')[0]
				.setValue(true);

			Ext.ComponentQuery.query('#window_forma #formaForm #nombre_forma')[0]
				.setValue(cuenta);
		}




		Ext.ComponentQuery.query('#window_forma #formaForm  #guardar_forma')[0]
			.setText("Editar", true);

	},

	onCreateClick: function (form, window) {


		var values;

		if (!form || !form.isValid()) {
			alert('Verifica los datos Ingresados!!');
			return;
		}
		values = form.getValues();

		var id = values['id_forma'];
		var nombre = '"' + values['nombre_forma'] + '"';
		var id_fkusuario_forma = 1;
		var numero_cuenta = '"' + values['numero_cuenta'] + '"';

		me = this;

		Ext.MessageBox.show({
			title: 'Mensaje',
			msg: 'Desea guardar  el registro?',
			buttons: Ext.MessageBox.OKCANCEL,
			icon: Ext.MessageBox.QUESTION,

			fn: function (btn) {
				if (btn == 'ok') {


					Ext.Ajax.request({
						url: 'php/negocios/forma_pagos/ingresar_actualizarFormaPago.php',
						method: 'POST',
						params: {
							id_forma: id,
							nombre_forma: nombre,
							id_fkusuario_forma: id_fkusuario_forma,
							numero_cuenta: numero_cuenta


						},

						success: function (response) {
							console.log(response);

							console.log(Ext.util.JSON.decode(response.responseText, true))
							Ext.MessageBox.show({
								title: 'Forma de Pago',
								msg: 'Nueva Forma de Pago',
								buttons: Ext.MessageBox.OK,
								icon: Ext.MessageBox.WARNING

							});

							window.close();
							Ext.getStore('FormaPago').load();
						}

					});


				}
			}

		});





	},
	onReporte: function () {


		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux.rol)
				sucursal_otro =  response_aux.sucursal

				if (response_aux.rol == 1) {

					var window2 = Ext.create('Ext.window.Window', {
						title: 'Reporte de Formas Pago',
						layout: {

							pack: 'center',
							type: 'vbox'
						},
						height: 260,
						width: 300,
						modal: true,
						items: [
							{
								xtype: 'combo',
								fieldLabel: 'Institucion',
								margin: '5',
								itemId: 'forma_institucion',
								enableKeyEvents: true,
								editable: false,
								allowBlank: false,
								typeAhead: true,
								mode: 'local',
								triggerAction: 'all',
								emptyText: 'Seleccionar',
								autoLoad: true,
								store: 'Empresa',
								displayField: 'alias_empresa',
								valueField: 'id_empresa',
								listeners: {
									change: function () {
										store = Ext.getStore('Sucursal');
										value = Ext.ComponentQuery
											.query('#forma_institucion')[0]
											.getValue();

										store.getProxy().extraParams = {
											id_empresa: value,
											nombre_busqueda: ""

										}
										store.load();


									}
								}

							},

							{
								xtype: 'combo',
								fieldLabel: 'Sucursal',
								margin: '5',
								itemId: 'forma_sucursal',
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
							},

							{


								fieldLabel: 'Desde',
								margin: '5',
								xtype: 'datefield',
								name:'buscarPorFechaDesdeForma',
								itemId: 'buscarPorFechaDesdeForma',
								format : 'Y-m-d',
												editable:false,
								emptyText: "Desde",
								fieldLabel: 'Desde'
							}, {
								fieldLabel: 'Hasta',
								margin: '5',
								xtype: 'datefield',
								itemId: 'buscarPorFechaHastaForma',
								format : 'Y-m-d',
								editable:false,
								emptyText: 'Hasta',
								fieldLabel: 'Hasta'
							}, {
								xtype: 'button',
								text: 'Generar Reporte',
								margin: '5',
								iconCls: 'fas fa-clipboard',
								itemId: 'boton_refresh',
								handler: function () {


									combo = Ext.ComponentQuery
										.query('#forma_institucion')[0];

									sucursal = Ext.ComponentQuery
										.query('#forma_sucursal')[0]
										.getValue();
									
										
										desde = Ext.ComponentQuery
										.query('#buscarPorFechaDesdeForma')[0]
										.getValue();



										const dia_desde = desde.getDate();
										const mes_desde = desde.getMonth() + 1; // Los meses van de 0 a 11, sumamos 1 para obtener el número de mes correcto
										const anio_desde = desde.getFullYear();

										// Formatear la fecha como "DD/MM/YYYY"
										
										const desde_fecha = `${anio_desde.toString()}-${mes_desde.toString().padStart(2, '0')}-${dia_desde.toString().padStart(2, '0')}`;


										hasta = Ext.ComponentQuery
										.query('#buscarPorFechaHastaForma')[0]
										.getValue();


								
										const dia_hasta = hasta.getDate();
										const mes_hasta = hasta.getMonth() + 1; // Los meses van de 0 a 11, sumamos 1 para obtener el número de mes correcto
										const anio_hasta= hasta.getFullYear();

										// Formatear la fecha como "DD/MM/YYYY"
										
										const hasta_fecha = `${anio_hasta.toString()}-${mes_hasta.toString().padStart(2, '0')}-${dia_hasta.toString().padStart(2, '0')}`;



									var value = combo.getValue();
									var valueField = combo.valueField;
									var record;
									combo.getStore().each(function (r) {
										if (r.data[valueField] == value) {
											record = r;
											return false;
										}
									});
									nombre_institucion = record.get(combo.displayField);

									window.open('php/negocios/reportes/formasPago.php?id_sucursal=' + sucursal + '&nombre_institucion=' + nombre_institucion+'&desde='+desde+'&hasta='+hasta, '_blank');

								}

							}


						]

					});
					window2.show();

				}
				

				else{


					Ext.Ajax.request({
						url : 'php/negocios/empresas/recuperarInstituto.php',
						method : 'POST',
						params:{
							id_sucursal :sucursal_otro
			
						},
						
			
						success : function(response) {
			
							var response_aux = Ext.util.JSON
							.decode(response.responseText, true);
							console.log(response_aux)



							

						
						
												
					
													
					

							
						
						}
			
					}
			
					);
					var window2 = Ext.create('Ext.window.Window', {
						title: 'Reporte de Formas Pago',
						layout: {

							pack: 'center',
							type: 'vbox'
						},
						height: 260,
						width: 300,
						modal: true,
						items: [
							{
								xtype: 'combo',
								fieldLabel: 'Institucion',
								margin: '5',
								itemId: 'forma_institucion',
								enableKeyEvents: true,
								editable: false,
								allowBlank: false,
								typeAhead: true,
								mode: 'local',
								triggerAction: 'all',
								emptyText: 'Seleccionar',
								autoLoad: true,
								store: 'Empresa',
								displayField: 'alias_empresa',
								valueField: 'id_empresa',
								listeners: {
									change: function () {
										store = Ext.getStore('Sucursal');
										value = Ext.ComponentQuery
											.query('#forma_institucion')[0]
											.getValue();

										store.getProxy().extraParams = {
											id_empresa: value,
											nombre_busqueda: ""

										}
										store.load();


									}
								}

							},

							

							{


								fieldLabel: 'Desde',
								margin: '5',
								xtype: 'datefield',
								name:'buscarPorFechaDesdeForma',
								itemId: 'buscarPorFechaDesdeForma',
								format : 'Y-m-d',
												editable:false,
								emptyText: "Desde",
								fieldLabel: 'Desde'
							}, {
								fieldLabel: 'Hasta',
								margin: '5',
								xtype: 'datefield',
								itemId: 'buscarPorFechaHastaForma',
								format : 'Y-m-d',
								editable:false,
								emptyText: 'Hasta',
								fieldLabel: 'Hasta'
							}, {
								xtype: 'button',
								text: 'Generar Reporte',
								margin: '5',
								iconCls: 'fas fa-clipboard',
								itemId: 'boton_refresh',
								handler: function () {


									combo = Ext.ComponentQuery
										.query('#forma_institucion')[0];

								
									
										
										desde = Ext.ComponentQuery
										.query('#buscarPorFechaDesdeForma')[0]
										.getValue();



										const dia_desde = desde.getDate();
										const mes_desde = desde.getMonth() + 1; // Los meses van de 0 a 11, sumamos 1 para obtener el número de mes correcto
										const anio_desde = desde.getFullYear();

										// Formatear la fecha como "DD/MM/YYYY"
										
										const desde_fecha = `${anio_desde.toString()}-${mes_desde.toString().padStart(2, '0')}-${dia_desde.toString().padStart(2, '0')}`;


										hasta = Ext.ComponentQuery
										.query('#buscarPorFechaHastaForma')[0]
										.getValue();


								
										const dia_hasta = hasta.getDate();
										const mes_hasta = hasta.getMonth() + 1; // Los meses van de 0 a 11, sumamos 1 para obtener el número de mes correcto
										const anio_hasta= hasta.getFullYear();

										// Formatear la fecha como "DD/MM/YYYY"
										
										const hasta_fecha = `${anio_hasta.toString()}-${mes_hasta.toString().padStart(2, '0')}-${dia_hasta.toString().padStart(2, '0')}`;



									var value = combo.getValue();
									var valueField = combo.valueField;
									var record;
									combo.getStore().each(function (r) {
										if (r.data[valueField] == value) {
											record = r;
											return false;
										}
									});
									nombre_institucion = record.get(combo.displayField);

									window.open('php/negocios/reportes/formasPago.php?id_sucursal=' + sucursal_otro + '&nombre_institucion=' + nombre_institucion+'&desde='+desde+'&hasta='+hasta, '_blank');

								}

							}


						]

					});
					window2.show();
				}

			}

		});







	}

});