Ext.define('Legion.controller.OrdenPedidoController', {
	extend: 'Ext.app.Controller',
	refs: [{
		ref: 'formaMasterForm'

	}],

	init: function () {
		this.control({

			'#mostrar_alumnos': {
				btnWindowAlumno: this.onMostrarAlumnos

			},
			'#action_alumno_orden': {
				btnCargarAlumnoOrden: this.onCargarAlumno
			},
			'#mostrar_mensualidades_orden': {
				btnMostrarMensualidades: this.onMostraMensualidad
			},
			'#cargar_mensualidad_orden': {
				btnCargarMensualidadesOrden: this.onCargarMensualidad,
				ocultarMensualidad: this.ocultarMensualidad
			},
			'#guardar_orden': {
				btnCreateOrden: this.onCreateOrdenPedido

			},
			'#action_orden_pedido_grid_mensualidades': {
				recalcularDatos: this.onRecalcularDatos
			},
			'#action_orden_pedido_vista': {
				PagarOrden: this.onPagarOrden,
				anularOrden: this.onAnularComprbante,
				verComprobantes: this.onverComporbantes
			},
			"#btnReporteOrden" : {
				click : this.onbtnReporteOrden
			  },

		
			  '#boton_buscar_orden': {
				btnBuscar: this.onBuscar
			},
			
			'#boton_refresh_orden' : {
				btnRefresh : this.onRefresh

			},
			'#sucursal_busqueda_orden' : {
				change : this.onBusquedaSucursal
			},
			'#boton_buscar_inscripcion':{
				btnBuscarOrd: this.	onBuscarNumeroInsc


			},
			'#boton_refresh_alumno':{
				btnRefreshOrd: this.onRefreshOrd
			},
			'#comboMesOrden': {
				change: this.onRangoMesAnio
			},
			'#comboAnioFacturaOrden': {
				change: this.onRangoMesAnio
			},
			'#btnBuscarPorRangoFechaVentaOrden': {
				click: this.onRangoFecha

			}




		});
	},

	onRefresh: function () {
		var store = Ext.getStore('OrdenPedido');
		Ext.ComponentQuery.query('#nombre_busqueda_orden')[0].reset();

		Ext.ComponentQuery.query('#sucursal_busqueda_orden')[0].reset();
		Ext.Ajax.request({
			url : 'php/negocios/usuarios/recuperarUsuario.php',
			method : 'POST',
			

			success : function(response) {

				var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
				console.log(response_aux)


				if(response_aux.rol==2 || response_aux.rol==3){
					
					store.getProxy().extraParams = {
						nombre_busqueda: "",
						sucursal_busqueda: response_aux.sucursal,
						mes:"",
						anio:"",
						fecha_start:"",
						fecha_end:""
					
			
					};
			
					store.loadPage(1);


					
				

				}else{

								
					store.getProxy().extraParams = {
						nombre_busqueda: "",
						sucursal_busqueda: "",
						mes:"",
						anio:"",
						fecha_start:"",
						fecha_end:""
					
			
					};
			
					store.loadPage(1);

				}
			

			
			}

		}

		);

	},

	
	onRefreshOrd: function () {
		var store = Ext.getStore('AlumnoInscripto');
		Ext.ComponentQuery.query('#numero_inscripcion')[0].reset();

	

					store.getProxy().extraParams = {
						id_inscripcion: "",
						
					
			
					};
			
					store.loadPage(1);


					
				

				
			

			
			

		

		

	},
	onBusquedaSucursal : function() {
		var sucursal = Ext.ComponentQuery.query('#sucursal_busqueda_orden')[0]
				.getValue();
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_orden')[0]
				.getValue();
		var store = Ext.getStore('OrdenPedido');
		if (nombre != "") {
			
			store.getProxy().extraParams = {

				sucursal_busqueda : sucursal,
				nombre_busqueda : nombre,
				mes:"",
				anio:"",
				fecha_start:"",
				fecha_end:""

			}
		}

		else {

			store.getProxy().extraParams = {
				sucursal_busqueda : sucursal,
				nombre_busqueda : nombre,
				mes:"",
				anio:"",
				fecha_start:"",
				fecha_end:""

			}

		}

		store.loadPage(1);
	},

	onBusquedaNombre: function (field, e) {

		var sucursal = Ext.ComponentQuery.query('#sucursal_busqueda_orden')[0]
				.getValue();
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_orden')[0]
				.getValue();
		var store = Ext.getStore('OrdenPedido');
		Ext.Ajax.request({
			url : 'php/negocios/usuarios/recuperarUsuario.php',
			method : 'POST',
			

			success : function(response) {

				var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
				console.log(response_aux)

			
				if(response_aux.rol==2|| response_aux.rol==3){
				
					
					

					if (nombre != "") {
					
						store.getProxy().extraParams = {
			
							sucursal_busqueda : response_aux.sucursal,
							nombre_busqueda : nombre,
							mes:"",
							anio:"",
							fecha_start:"",
							fecha_end:""
						
			
						}
					}
			
					else {
						
						store.getProxy().extraParams = {
							sucursal_busqueda : response_aux.sucursal,
							nombre_busqueda : "",
							mes:"",
							anio:"",
							fecha_start:"",
							fecha_end:""
							
			
						}
			
					}
			
					store.loadPage(1);


					
				

				}else{


					if (nombre != "") {
						
						store.getProxy().extraParams = {
			
							sucursal_busqueda : sucursal,
							nombre_busqueda : nombre,
							mes:"",
							anio:"",
							fecha_start:"",
							fecha_end:""
						
			
						}
					}
			
					else {
			
						store.getProxy().extraParams = {
							sucursal_busqueda : sucursal,
							nombre_busqueda : "",
							mes:"",
							anio:"",
							fecha_start:"",
							fecha_end:""
						
			
						}
			
					}
			
					store.loadPage(1);

				}
			

			
			}

		}

		);

	},


	onBuscar: function () {
		var store = Ext.getStore('OrdenPedido');

					var nombre = Ext.ComponentQuery.query('#nombre_busqueda_orden')[0]
						.getValue();
					var sucursal = Ext.ComponentQuery.query('#sucursal_busqueda_orden')[0]
						.getValue();

		Ext.Ajax.request({
			url : 'php/negocios/usuarios/recuperarUsuario.php',
			method : 'POST',
			

			success : function(response) {

				var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
				console.log(response_aux)


				if(response_aux.rol==2 || response_aux.rol==3){
					
			
					store.getProxy().extraParams = {
						nombre_busqueda: nombre,
						sucursal_busqueda: response_aux.sucursal,
						mes:"",
						anio:"",
						fecha_start:"",
						fecha_end:""
						
			
					};
			
					store.loadPage(1);


					
				

				}else{
					store.getProxy().extraParams = {
						nombre_busqueda: nombre,
						sucursal_busqueda: sucursal,
						mes:"",
						anio:"",
						fecha_start:"",
						fecha_end:""
						
			
					};
			
					store.loadPage(1);
					

				}
			

			
			}

		}

		);
		

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

		var window = Ext.create('Legion.view.forma_pago.FormaPagoWindow');
		window.setTitle("Actualizar Forma Pago:" + nombre + " ", true);
		window.show();

		Ext.ComponentQuery.query('#window_forma #formaForm #id_forma')[0]
			.setValue(id);
		Ext.ComponentQuery.query('#window_forma #formaForm #nombre_forma')[0]
			.setValue(nombre);

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
		var id_fkusuario_forma = 1

		Ext.Ajax.request({
			url: 'php/negocios/forma_pagos/ingresar_actualizarFormaPago.php',
			method: 'POST',
			params: {
				id_forma: id,
				nombre_forma: nombre,
				id_fkusuario_forma: id_fkusuario_forma

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

	},

	onBuscarNumeroInsc:function () {

			var numero = Ext.ComponentQuery.query('#numero_inscripcion')[0]
			.getValue();



			var store = Ext.getStore('AlumnoInscripto');


				


				store.getProxy().extraParams={

					
					id_inscripcion : numero

				};

				store.load();


				
			

	

		
		},

		
	



		

	

	onMostrarAlumnos: function () {
	


			
			
					var window = Ext.create('Legion.view.ordenpedido.AlumnoOrdenPedido');
					window.show();
				

					
				

				

			
			

		

		


		


	},

	onCargarAlumno: function (view, rowIndex, colIndex, item, e, record, row) {

		Ext.getStore('DatosOrden').removeAll();
		Ext.getStore('DatosOrden').sync();
		Ext.ComponentQuery.query('#subtotal')[0]
			.reset()

		Ext.ComponentQuery.query('#iva')[0]
			.reset()

		Ext.ComponentQuery.query('#total')[0]
			.reset()

		var id_alumno = record.data.id_alumno;
		var id_inscripcion = record.data.id_inscripcion;
		var nombre_alumno = record.data.nombre_alumno;
		var apellido_alumno = record.data.apellido_alumno;
		var cedula_alumno = record.data.cedula_alumno;
		var celular_alumno = record.data.celular_alumno;
		var correo_alumno = record.data.correo_alumno;
		var direccion_alumno = record.data.direccion_alumno;
		var nombre_instructor = record.data.nombre_instructor;
		var id_instructor = record.data.id_instructor;
		var imagen_alumno = record.data.imagen_src;
		var iva = record.data.iva_curso;

		

		Ext.ComponentQuery.query('#ordenForm #id_inscripcion')[0]
			.setValue(id_inscripcion);

		Ext.ComponentQuery.query('#ordenForm #id_fkalumno_orden_pedido')[0]
			.setValue(id_alumno);

		Ext.ComponentQuery.query('#ordenForm #nombre_alumno_orden')[0]
			.setValue(nombre_alumno);

		Ext.ComponentQuery.query('#ordenForm #apellido_alumno_orden')[0]
			.setValue(apellido_alumno);

		Ext.ComponentQuery.query('#ordenForm #celular_alumno_orden')[0]
			.setValue(celular_alumno);

		Ext.ComponentQuery.query('#ordenForm #correo_alumno_orden')[0]
			.setValue(correo_alumno);

		Ext.ComponentQuery.query('#ordenForm #cedula_alumno_orden')[0]
			.setValue(cedula_alumno);

		Ext.ComponentQuery.query('#ordenForm #direccion_alumno_orden')[0]
			.setValue(direccion_alumno);

		Ext.ComponentQuery.query('#ordenForm #nombre_instructor')[0]
			.setValue(nombre_instructor);

		Ext.ComponentQuery.query('#ordenForm #id_fkinscripcion_orden_pedido')[0]
			.setValue(id_inscripcion);

		Ext.ComponentQuery.query('#ordenForm #imagen_alumno_orden')[0]
			.setSrc(imagen_alumno);

		Ext.ComponentQuery.query('#ordenForm #iva_curso')[0]
			.setValue(iva);


		Ext.ComponentQuery.query('#cedula_alumno')[0]
			.setValue(cedula_alumno);

		Ext.ComponentQuery.query('#ordenForm #iva_orden_pedido')[0]
			.setValue(iva);

	},

	onMostraMensualidad: function () {

		//Sstore grid -> Los de la grid
		var store_orden = Ext.getStore('DatosOrden').getRange();
		var id_inscripcion = Ext.ComponentQuery
			.query('#ordenForm #id_inscripcion')[0].getValue();

		//store window mensualidades -> Todos
		var store_mensua = Ext.getStore('MensualidadesAlumno');
		store_mensua.getProxy().extraParams = {
			inscripcion: id_inscripcion,
			start: 0,
			limit: 25

		};


		console.log("MEnse", store_mensua.getRange());



		var window = Ext
			.create('Legion.view.ordenpedido.MensualidadOrdenPedido');
		window.show();








	},

	ocultarMensualidad: function (record) {
		console.log("ocultra");
		var store = Ext.getStore('MensualidadesAlumno');




	},


	onCargarMensualidad: function (record, window) {

		console.log("sada", record[0]);
		var tamanio = record.length;
		var store_orden = Ext.getStore('DatosOrden');
		var iva = Ext.ComponentQuery.query('#ordenForm #iva_curso')[0]
			.getValue();


		var subtotal = 0;
		for (i = 0; i < tamanio; i++) {


			console.log("1", record[i].data);

			subtotal = subtotal + record[i].data.monto_mensualidad
			store_orden.add({
				id_mensualidad: record[i].data.id_mensualidad,
				cantidad_orden: '1',
				concepto_mensualidad: record[i].data.concepto_mensualidad,
				fecha_pago_mensualidad: record[i].data.fecha_pago_mensualidad,
				numero_cuota_mensualidad: record[i].data.numero_cuota_mensualidad,
				estado_mensualidad: record[i].data.estado_mensualidad,
				monto_mensualidad: record[i].data.monto_mensualidad,
				abonado_mensualidad: record[i].data.abonado_mensualidad,
				saldo_mensualidad: record[i].data.saldo_mensualidad,

			});


		};

		var iva_aux = (iva / 100) * subtotal;
		Ext.ComponentQuery.query('#ordenForm #iva')[0]
			.setValue(iva_aux);

		Ext.ComponentQuery.query('#ordenForm #subtotal')[0]
			.setValue(subtotal);

		var total = iva_aux + subtotal

		Ext.ComponentQuery.query('#ordenForm #total')[0]
			.setValue(total);





		window.close();

	},


	onRecalcularDatos: function () {
		console.log("ssss");
		var iva = Ext.ComponentQuery.query('#ordenForm #iva_curso')[0]
			.getValue();

		var store_orden = Ext.getStore('DatosOrden');

		console.log(store_orden.getRange());

		var tamanio = store_orden.getRange().length;

		var record = store_orden.getRange();


		var subtotal = 0;
		for (i = 0; i < tamanio; i++) {


			console.log("1", record[i].data);

			subtotal = subtotal + record[i].data.monto_mensualidad


		}


		var iva_aux = (iva / 100) * subtotal;
		Ext.ComponentQuery.query('#ordenForm #iva')[0]
			.setValue(iva_aux);

		Ext.ComponentQuery.query('#ordenForm #subtotal')[0]
			.setValue(subtotal);

		var total = iva_aux + subtotal

		Ext.ComponentQuery.query('#ordenForm #total')[0]
			.setValue(total);



	},


	onPagarOrden: function (view, rowIndex,
		colIndex, item, e, record, row) {
			me = this;


			
		


		Ext.create('Ext.window.Window', {
			title:  'Orden #:' + record.data.id_orden_pedido +' -'+ ' Por Cobrar :'+record.data.pagado+"$",

			layout: 'fit',
			itemId: 'window_pagos',
			modal: true,
			width:350,
			items: [
				{
					xtype: 'form',
					itemId: 'PagosOrdenForm',
					alias: 'widget.PagosOrdenForm',



					name: 'PagosOrdenForm',
					buttonAlign: 'center',
					border: false,
					trackResetOnLoad: true,
					collapsible: false,

					items: [
						{
							margin: '10 10 0 5',
							xtype: 'textfield',
							fieldLabel: 'Id',
							name: 'id_comprobante',
							hidden: true

						},

						{
							margin: '10 10 0 5',
							fieldLabel: 'Monto',
							xtype: 'textfield',
							name: 'abono_comprobante',
							itemId: 'abono_comprobante',
							
							maskRe : /[0-9.]/,
							
							listeners: {
								change: function(field, newValue, oldValue) {
									var value = newValue.toString().replace(/,/g, '.');
									field.setValue(value);
								}
							}
							
							

						},

						{
							margin: '10 10 0 5',
							xtype: 'textfield',
							fieldLabel: 'Concepto',
							name: 'concepto_comprobante'

						},

						{

							margin: '10 10 0 5',
							fieldLabel: 'Forma de Pago',
							flex: 1,

							xtype: 'combo',

							name: 'id_fkforma_pago_comprobante',
							itemId: 'id_fkforma_pago_comprobante',
							enableKeyEvents: true,
							editable: false,
							allowBlank: false,
							typeAhead: true,
							mode: 'local',
							triggerAction: 'all',
							emptyText: 'Seleccionar',
							autoLoad: true,
							store: 'FormaPago',
							displayField: 'nombre_forma',
							valueField: 'id_forma'

						}], buttons: [

							{
								text: 'Guardar',

								itemId: 'guardar_comprobante',
								handler: function () {
									var form = Ext.ComponentQuery.query('#PagosOrdenForm')[0]
										.getForm();
									console.log("s", record.data.pagado);
									console.log("p", form.getValues().abono_comprobante);
									var valor=record.data.pagado - form.getValues().abono_comprobante;


									if(form.getValues().abono_comprobante> record.data.pagado){
										console.log("ENTRO");

										Ext.MessageBox.show({
											title: 'Mensaje',
											msg: 'Monto Mayor al Total a Pagar',
											buttons: Ext.MessageBox.OK,
											icon: Ext.MessageBox.WARNING

										});
										
										



									}



									console.log(valor)

									if(valor==0){

										Ext.Ajax.request({
											url: 'php/negocios/orden_pedido/actualizarEstadoOrden.php',
											method: 'POST',
											params: {
												id_orden: record.data.id_orden_pedido,
												tipo:1,
												estado:'Cobrada'

											}
										});


										Ext.Ajax.request({
											url: 'php/negocios/mensualidades/actualizarEstadoMensualidades.php',
											method: 'POST',
											params: {
												id_orden: record.data.id_orden_pedido,
												tipo:1,
												estado:'Pagada'

											}
										});

									}



									








									form.submit({
										url: 'php/negocios/comprobantes/ingresar_actualizarComprobante.php',
										waitMsg: 'Creando Nueva Comprobante...',
										params: {
											id_fkorden_pedido_comprobante: record.data.id_orden_pedido

										},
										success: function (data, response) {
											var tipo = response.result.tipo;


											if (tipo == 0) {

												Ext.MessageBox.show({
													title: 'Mensaje',
													msg: 'Nuevo Comprobante Creado',
													buttons: Ext.MessageBox.OK,
													icon: Ext.MessageBox.QUESTION

												});

									Ext.Ajax.request({
										url: 'php/negocios/correos/enviarComprobantes.php',
										method: 'POST',
										params: {
											id_orden: record.data.id_orden_pedido,
											id_inscripcion :  record.data.id_fkinscripcion_orden_pedido,
											
				
										},
				
										success: function (response) {
											var response_aux = Ext.util.JSON
												.decode(response.responseText, true);
											console.log(response_aux);


				
										},
				
										
				
									});


												form.reset();
												var window = Ext.ComponentQuery.query('#window_pagos')[0];
												window.close();
												Ext.getStore('OrdenPedido').load();
										
											}

											if (tipo == 5) {

												Ext.MessageBox.show({
													title: 'Mensaje',
													msg: 'Comprobante no ingresado , monto fue superior al total a pagar',
													buttons: Ext.MessageBox.OK,
													icon: Ext.MessageBox.WARNING

												});



											}


										},
										failure: function () {
											console.log("Error");
										}
									});







								}
							}


						]



				}
			]

		}).show();





	},


	onAnularComprbante: function (view, rowIndex,
		colIndex, item, e, record, row) {
		console.log(record.data.id_orden_pedido);


		Ext.MessageBox.show({
			title: 'Advertencia',
			msg: 'Seguro desea anular esta Orden',
			buttons: Ext.MessageBox.OKCANCEL,
			icon: Ext.MessageBox.WARNING,
			fn: function (btn) {
				if (btn == 'ok') {



					Ext.Ajax.request({
						url: 'php/negocios/orden_pedido/anularOrden.php',
						method: 'POST',
						params: {
							id_orden: record.data.id_orden_pedido

						},

						success: function (response) {
							var response_aux = Ext.util.JSON
								.decode(response.responseText, true);
							console.log(response_aux);

							Ext.MessageBox.show({
								title: 'Advertencia',
								msg: 'Orden Anulada',
								buttons: Ext.MessageBox.OK,
								icon: Ext.MessageBox.WARNING

							});
							Ext.getStore('OrdenPedido').load();


							Ext.Ajax.request({
								url: 'php/negocios/comprobantes/anularComprobantes.php',
								method: 'POST',
								params: {
									id_orden: response_aux.id_orden

								},

								success: function (response) {
									console.log("Anuladad");

								},

								failure: function (response) {

									console.log("No Anulads");
								}


							});


						},

						failure: function (response) {
							Ext.MessageBox.show({
								title: 'Error ',
								msg: 'Error al anular ',
								buttons: Ext.MessageBox.OK,
								icon: Ext.MessageBox.WARNING

							});
						}

					});

				}
			}
		});







	},


	onverComporbantes: function (view, rowIndex,
		colIndex, item, e, record, row) {
		console.log(record);
		

		var store = Ext.getStore('Comprobante');

		store.getProxy().extraParams = {
			id_orden: record.data.id_orden_pedido,

		};
		var id_orden =record.data.id_orden_pedido;
		alumno =record.data.nombre_alumno;
		concepto = record.data.concepto;


	

		Ext.create('Ext.window.Window', {
			title: 'Comprobantes',
			height: 350,
			width: 700,
			layout: 'fit',
			modal: true,
			items: [{

				alias: 'widget.ComprobantesGrid',
				width: '100%',
				itemId: 'ComprobantesGrid',
				xtype: 'grid',
				selType: 'rowmodel',
				selModel: {
					mode: 'SINGLE'
				},
				viewConfig: {
					stripeRows: true
				},
				store: 'Comprobante',
				autoLoad: true,

				columns: [
					{
						text: "Id",

						dataIndex: 'id_comprobante',
						menuDisabled: true,
						hidden: true
					},
					{
						text: "Id Orden",

						dataIndex: 'id_fkorden_pedido_comprobante',
						menuDisabled: true,
						hidden: true
					},
					{
						text: "#",
						dataIndex: 'numero_comprobante',
						menuDisabled: true,
						width:30,

					},

					{
						text: "Forma de Pago Id",

						dataIndex: 'id_fkforma_pago_comprobante',
						menuDisabled: true,
						hidden:true

					}, 
					
					{
						text: "Forma de Pago",

						dataIndex: 'nombre_forma',
						menuDisabled: true

					},
					
					
					{
						text: "id",

						dataIndex: 'id_fkforma_pago_comprobante',
						menuDisabled: true

					},{
						text: "Concepto",
						flex: 2,
						dataIndex: 'concepto_comprobante',
						menuDisabled: true,



					}, {
						text: "Fecha de Creacion",
						flex: 1,
						dataIndex: 'fecha_creacion_comprobante',
						menuDisabled: true,
						hidden:true

					}, {
						text: "Fecha Cobrado",
						flex: 1,
						dataIndex: 'fecha_cobro_comprobante',
						menuDisabled: true

					}, 
					{
						text: "Estado",
						flex: 1,
						dataIndex: 'estado_comprobante',
						menuDisabled: true,
						hidden:true,

					},
					
					{
						text: "Estado",
						flex: 1,
						dataIndex: 'nombre_estado_comprobante',
						menuDisabled: true

					},{
						text: "Abono",
						flex: 1,
						dataIndex: 'abono_comprobante',
						menuDisabled: true

					},
				


					{
						xtype: 'actioncolumn',
						itemId: 'action_orden_comprobantes',
						width: 75,
						items: [{
							tooltip: 'Anular',
							iconCls: 'x-fa  fa-ban',
							itemId: 'anular_comprobante',
							handler: function (view, rowIndex,
								colIndex, item, e, record, row) {
								console.log(record.data.id_comprobante);


								Ext.Ajax.request({
									url : 'php/negocios/usuarios/recuperarUsuario.php',
									method : 'POST',
									
						
									success : function(response) {
						
										var response_aux = Ext.util.JSON
										.decode(response.responseText, true);
										console.log(response_aux)
						
						
										if(response_aux.rol==2 || response_aux.rol==3){
											
											
											Ext.MessageBox.show({
												title: 'Mensaje',
												msg: 'No tiene permiso para anular comprobantes',
												buttons: Ext.MessageBox.OK,
												icon: Ext.MessageBox.WARNING

											});
					
					
											
										
						
										}else{


											if(record.data.estado_comprobante ==1){

												Ext.MessageBox.show({
													title: 'Mensaje',
													msg: 'Este Comprobante ya se encuentra anulado',
													buttons: Ext.MessageBox.OK,
													icon: Ext.MessageBox.WARNING
			
												});
			
											}
											else{
			
			
												Ext.MessageBox.show({
													title: 'Advertencia',
													msg: 'Seguro que deseea Anular este comprobante?',
													buttons: Ext.MessageBox.OKCANCEL,
													icon: Ext.MessageBox.WARNING,
													fn: function (btn) {
														if (btn == 'ok') {
				
				
															Ext.Ajax.request({
																url: 'php/negocios/comprobantes/anularUnComprobante.php',
																method: 'POST',
																params: {
																	id_comprobante: record.data.id_comprobante
																	
				
																},
				
																success: function (response) {
																
			
																	Ext.Ajax.request({
																		url: 'php/negocios/orden_pedido/actualizarEstadoOrden.php',
																		method: 'POST',
																		params: {
																			id_orden: record.data.id_fkorden_pedido_comprobante,
																			tipo:0,
																			estado:'Por Cobrar'
						
																		}
																	})
				
				
																	Ext.MessageBox.show({
																		title: 'Mensaje',
																		msg: 'Comprobante anulado',
																		buttons: Ext.MessageBox.OK,
																		icon: Ext.MessageBox.WARNING
				
																	});
																
																	//Cambiar estado de mensualidades al anular comprobante
																	Ext.Ajax.request({
																		url: 'php/negocios/orden_pedido/activarMensualidades.php',
																		method: 'POST',
																		params: {
																			id_orden: record.data.id_fkorden_pedido_comprobante,
																			
						
																		}
																		
																	})
			
																	
				
			
			
			
			
																	Ext.getStore('Comprobante').load();
																	Ext.getStore('OrdenPedido').load();
				
																},
				
																failure: function (response) {
				
				
																	Ext.MessageBox.show({
																		title: 'Mensaje',
																		msg: 'Error al anular comprobante',
																		buttons: Ext.MessageBox.OK,
																		icon: Ext.MessageBox.WARNING
				
																	});
				
																	console.log("No Anulads");
																}
				
				
															});
				
														}
													}
												});
			
											}
			
										}
									
						
									
									}
						
								}
						
								);

							

							







							}
						}

						,{

							tooltip: 'PDF',
							iconCls: 'fas fa-file-pdf',
							itemId: 'pdf_comprobantes',
							handler: function(view, rowIndex,
								colIndex, item, e, record, row){

									fecha = record.data.fecha_creacion_comprobante;
									
									estado = record.data.nombre_estado_comprobante;
									numero = record.data.numero_comprobante;
									monto =record.data.abono_comprobante;
									forma_pago = record.data.nombre_forma;
									id_forma = record.data.id_fkforma_pago_comprobante;
									
									
									

									var window2= Ext.create('Ext.window.Window', {
										title : 'Comprobante'+" #"+numero,
										layout: {
											align: 'middle',
											pack: 'center',
											type: 'hbox'
										},
										height:500,
										width:600,
										modal : true,
										listeners: {
											show: function() {
											  var myFrame = Ext.create('Ext.Component', {
												height:600,
										width:600,
												autoEl: {
												  tag: 'iframe',
												  src: 'php/negocios/reportes/comprobante.php?fecha='+fecha+'&concepto='+concepto+'&estado='+estado+'&numero='+numero+'&monto='+monto+'&forma='+forma_pago+'&nombre_alumno='+alumno+'&orden='+id_orden+'&id_forma='+id_forma
												}
											  });
											  this.add(myFrame);
											}
										  }
										
							
								});
								window2.show();
				

									


									
									

									


							}
						},
					
						
					]
					}],
				bbar: [{
					xtype: 'pagingtoolbar',
					store: 'Comprobante',
					displayInfo: true,
					displayMsg: 'Displaying {0} to {1} of {2} &nbsp;records ',
					emptyMsg: "No records to display&nbsp;",
					listeners: {
						beforechange: function (store) {
							this.fireEvent('pagination', store)

						}

					}
				}]
			}]

		}).show();



	},

	onCreateOrdenPedido: function (form2, record) {

		var records_detalles = [];
		console.log(record[0].data);

		for (i = 0; i < record.length; i++) {
			records_detalles.push(record[i].data);
		}


		console.log(records_detalles);






		form2.submit({
			url: 'php/negocios/orden_pedido/ingresar_actualizarOrdenPedido.php',
			
			params: {
				record: Ext.encode(records_detalles)

			},
			success: function (data, response) {
				var tipo = response.result.tipo;
				console.log(tipo);

				if (tipo == 0) {

					Ext.MessageBox.show({
						title: 'Mensaje',
						msg: 'Nueva Orden Creada',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.QUESTION

					});

					Ext.MessageBox.show({
						title: 'Mensaje',
						msg: 'Desea Cobrar la Orden?',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.QUESTION,
						fn : function(btn) {
							if (btn == 'ok') {

								Ext.Ajax.request({
									url: 'php/negocios/orden_pedido/verUltimaOrden.php',
									method: 'POST',
								
									
										success : function(response) {
											var response_aux = Ext.util.JSON
											.decode(response.responseText, true);
											console.log("response_aux")

											console.log(response_aux)

											 const id_orden= response_aux.orden;
											 const	pagado=response_aux.pagado;
											 

											var window =Ext.create('Ext.window.Window', {
												title:  '',
									
												layout: 'fit',
												itemId: 'window_pagos2',
												modal: true,
												width:350,
												items: [
													{
														xtype: 'form',
														itemId: 'PagosOrdenForm',
														alias: 'widget.PagosOrdenForm',
									
									
									
														name: 'PagosOrdenForm',
														buttonAlign: 'center',
														border: false,
														trackResetOnLoad: true,
														collapsible: false,
									
														items: [
															{
																margin: '10 10 0 5',
																xtype: 'textfield',
																fieldLabel: 'Id',
																name: 'id_comprobante',
																hidden: true,
																itemId:'id_comprobante'
									
															},
									
															{
																margin: '10 10 0 5',
																fieldLabel: 'Monto',
																xtype: 'textfield',
																name: 'abono_comprobante',
																itemId: 'abono_comprobante2',
																
																maskRe : /[0-9.]/,
																
																listeners: {
																	change: function(field, newValue, oldValue) {
																		var value = newValue.toString().replace(/,/g, '.');
																		field.setValue(value);
																	}
																}
																
																
									
															},
									
															{
																margin: '10 10 0 5',
																xtype: 'textfield',
																fieldLabel: 'Concepto',
																name: 'concepto_comprobante'
									
															},
									
															{
									
																margin: '10 10 0 5',
																fieldLabel: 'Forma de Pago',
																flex: 1,
									
																xtype: 'combo',
									
																name: 'id_fkforma_pago_comprobante',
																itemId: 'id_fkforma_pago_comprobante',
																enableKeyEvents: true,
																editable: false,
																allowBlank: false,
																typeAhead: true,
																mode: 'local',
																triggerAction: 'all',
																emptyText: 'Seleccionar',
																autoLoad: true,
																store: 'FormaPago',
																displayField: 'nombre_forma',
																valueField: 'id_forma'
									
															}], buttons: [
									
																{
																	text: 'Guardar',
									
																	itemId: 'guardar_comprobante',
																	handler: function () {
																		var form = Ext.ComponentQuery.query('#PagosOrdenForm')[0]
																			.getForm();
																		
																		var valor=pagado - form.getValues().abono_comprobante;
									
									
																		if(form.getValues().abono_comprobante> pagado){
																			console.log("ENTRO");
									
																			Ext.MessageBox.show({
																				title: 'Mensaje',
																				msg: 'Monto Mayor al Total a Pagar',
																				buttons: Ext.MessageBox.OK,
																				icon: Ext.MessageBox.WARNING
									
																			});
																			
																			
									
									
									
																		}
									
					
									
																		if(valor==0){
									
																			Ext.Ajax.request({
																				url: 'php/negocios/orden_pedido/actualizarEstadoOrden.php',
																				method: 'POST',
																				params: {
																					id_orden: id_orden,
																					tipo:1,
																					estado:'Cobrada'
									
																				}
																			});
									
									
																			Ext.Ajax.request({
																				url: 'php/negocios/mensualidades/actualizarEstadoMensualidades.php',
																				method: 'POST',
																				params: {
																					id_orden: id_orden,
																					tipo:1,
																					estado:'Pagada'
									
																				}
																			});
									
																		}
									
									
									
																		
									
									
									
									
									
									
									
									
																		form.submit({
																			url: 'php/negocios/comprobantes/ingresar_actualizarComprobante.php',
																			waitMsg: 'Creando Nueva Comprobante...',
																			params: {
																				id_fkorden_pedido_comprobante: id_orden
									
																			},
																			success: function (data, response) {
																				var tipo = response.result.tipo;
									
									
																				if (tipo == 0) {
									
																					Ext.MessageBox.show({
																						title: 'Mensaje',
																						msg: 'Nuevo Comporbante Creado',
																						buttons: Ext.MessageBox.OK,
																						icon: Ext.MessageBox.WARNING
									
																					});

																				
																					form.reset();
																					var window = Ext.ComponentQuery.query('#window_pagos2')[0];
																					window.close();
																					Ext.getStore('OrdenPedido').load();
																			
																				}
									
																				if (tipo == 5) {
									
																					Ext.MessageBox.show({
																						title: 'Mensaje',
																						msg: 'Comprobante no ingresado , monto fue superior al total a pagar',
																						buttons: Ext.MessageBox.OK,
																						icon: Ext.MessageBox.WARNING
									
																					});
									
									
									
																				}
									
									
																			},
																			failure: function () {
																				console.log("Error");
																			}
																		});
									
									
									
									
									
									
									
																	}
																}
									
									
															]
									
									
									
													}
												]
									
											})

											

										
											

										 
											
											 window.setTitle('Orden #:' + id_orden +' -'+ ' Por Cobrar :'+pagado+'$');
											
											 
											 window.show();

											 Ext.ComponentQuery.query('#window_pagos2 #PagosOrdenForm #abono_comprobante2')[0].setValue(pagado);

											
											
										}
									
								});



							
						
			
								
			
							}
						}

					});


					form2.reset();
					Ext.getStore('DatosOrden').removeAll();
					Ext.getStore('DatosOrden').sync();

					Ext.ComponentQuery.query('OrdenPedidos')[0].setActiveTab(0);
					Ext.getStore('OrdenPedido').load();
					
					

					Ext.ComponentQuery.query('Inscripciones #nombre_alumno')[0].reset();
					Ext.ComponentQuery.query('Inscripciones #apellido_alumno')[0].reset();
					Ext.ComponentQuery.query('Inscripciones #direccion_alumno')[0].reset();
					Ext.ComponentQuery.query('Inscripciones #celular_alumno')[0].reset();
					Ext.ComponentQuery.query('Inscripciones #correo_alumno')[0].reset();
					Ext.ComponentQuery.query('Inscripciones #cedula_alumno')[0].reset();
					Ext.ComponentQuery.query('Inscripciones #nombre_curso')[0].reset();
					Ext.ComponentQuery.query('Inscripciones #precio_curso')[0].reset();
					Ext.ComponentQuery.query('Inscripciones #matricula_curso')[0].reset();

					Ext.ComponentQuery.query('Inscripciones #mensualidad_curso')[0].reset();
					Ext.ComponentQuery.query('Inscripciones #duracion_curso')[0].reset();
					Ext.ComponentQuery.query('Inscripciones #instructor_curso')[0].reset();
					Ext.ComponentQuery.query('Inscripciones #inscripcionForm')[0].getForm(0).reset();


					



				}
				if (tipo == 1) {

					var window2 = Ext.ComponentQuery.query('#window_curso')[0];

					Ext.MessageBox.show({
						title: 'Mensaje',
						msg: 'Orden Actualizada Actualizado',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING

					});
					window2.close();
				}
				Ext.getStore('OrdenPedido').load();

			},
			failure: function () {
				console.log("Error");
			}
		});


	},
	onbtnReporteOrden : function() {


		Ext.Ajax.request({
			url : 'php/negocios/usuarios/recuperarUsuario.php',
			method : 'POST',
			

			success : function(response) {

				var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
				console.log(response_aux.rol)
				var sucursal_otro=  response_aux.sucursal;

				if(response_aux.rol==1){
					var window2= Ext.create('Ext.window.Window', {
						title : 'Reporte Ordenes',
						layout: {
							align: 'middle',
							pack: 'center',
							
						},
						height:320,
						width:300,
						modal : true,
						items:[
							{
								xtype : 'combo',
				fieldLabel : 'Institucion',
				margin : '10',
	
				itemId : 'id_fkempresa_sucursal_reporte_orden',
				enableKeyEvents : true,
				editable : false,
			
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
		.query('#id_fkempresa_sucursal_reporte_orden')[0]
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
									xtype : 'combo',
									fieldLabel : 'Sucursal',
									margin : '10',
									name : 'id_fksucursal_usuario',
									itemId : 'id_fksucursal_usuario_reporte',
									enableKeyEvents : true,
									editable : false,
									allowBlank : false,
									typeAhead : true,
									mode : 'local',
									triggerAction : 'all',
									emptyText : 'Seleccionar',
									autoLoad : true,
									store : 'Sucursal',
									displayField : 'nombre_sucursal',
									valueField : 'id_sucursal',
								
								},
								{
									fieldLabel : 'Estado',
									itemId : 'estado_orden',
									name : 'estado_orden',
									margin : '10',
									xtype : 'combo',
									allowBlank : false,
									dock : 'top',
									enableKeyEvents : true,
									editable : false,
									displayField : 'estado',
									valueField : 'estado_orden',
									mode : 'local',
									triggerAction : 'all',
									emptyText : 'Seleccionar',
									store : new Ext.data.SimpleStore({
												fields : ['estado_orden',
														'estado'],
												data : [['2', 'ANULADAS'],
														['1', 'COBRADAS'],
														['0', 'POR COBRAR']
	
												]
											}),
									queryMode : 'local',
									flex : 1
								},
								{


									fieldLabel: 'Desde:',
									margin: '10',
									xtype: 'datefield',
									name: 'buscarPorFechaDesdeReportOrden',
									itemId: 'buscarPorFechaDesdeReportOrden',
									format: 'Y-m-d',
									enableKeyEvents: true,
									emptyText: "Desde",
									fieldLabel: 'Desde',
									value:""
								}, {
									margin: '10',
									xtype: 'datefield',
									fieldLabel: 'Hasta:',
									name: 'buscarPorFechaHastaReportOrden',
									itemId: 'buscarPorFechaHastaReportOrden',
									format: 'Y-m-d',
									enableKeyEvents: true,
									emptyText: 'Hasta',
									fieldLabel: 'Hasta',
									value:""
	
								},
								
								{
									xtype : 'button',
									text:'Generar Reporte',
									margin : '10',
									iconCls: 'x-fa  fa-download',
														itemId : 'boton_refresh',
														handler : function() {
															sucursal =Ext.ComponentQuery
							.query('#id_fksucursal_usuario_reporte')[0]
							.getValue();

							estado =Ext.ComponentQuery
							.query('#estado_orden')[0]
							.getValue();

							
							inicio = Ext.ComponentQuery
							.query('#buscarPorFechaDesdeReportOrden')[0]
							.getValue();

						fin = Ext.ComponentQuery
							.query('#buscarPorFechaHastaReportOrden')[0]
							.getValue();

							combo=Ext.ComponentQuery
							.query('#id_fkempresa_sucursal_reporte_orden')[0]
							
							var value = combo.getValue();
	var valueField = combo.valueField;
	var record;
	combo.getStore().each(function(r){
		if(r.data[valueField] == value){
			record = r;
			return false;
		}
	});

	 instituto=record.get(combo.displayField);			
							
							window.open('php/negocios/reportes/reporteOrdenes.php?id_sucursal='+sucursal +"&id_estado="+estado+"&fecha_start="+inicio+"&fecha_end="+fin+'&instituto='+instituto, '_blank');
							
														}
			
								}
			
							
						]
			
				});
				window2.show();

				}

				else{
					
			

										
					var window2= Ext.create('Ext.window.Window', {
						title : 'Reporte Inscripciones',
						layout: {
							align: 'middle',
							pack: 'center',

						},
						height:250,
						width:300,
						modal : true,
						items:[
								{
									fieldLabel : 'Estado',
									itemId : 'estado_orden',
									name : 'estado_orden',
									margin: '10',
									xtype : 'combo',
									allowBlank : false,
									dock : 'top',
									enableKeyEvents : true,
									editable : false,
									displayField : 'estado',
									valueField : 'estado_orden',
									mode : 'local',
									triggerAction : 'all',
									emptyText : 'Seleccionar',
									store : new Ext.data.SimpleStore({
												fields : ['estado_orden',
														'estado'],
												data : [['2', 'ANULADAS'],
														['1', 'COBRADAS'],
														['0', 'POR COBRAR']
	
												]
											}),
									queryMode : 'local',
									flex : 1
								},{


									fieldLabel: 'Desde:',
									margin: '10',
									xtype: 'datefield',
									name: 'buscarPorFechaDesdeReportOrden',
									itemId: 'buscarPorFechaDesdeReportOrden',
									format: 'Y-m-d',
									enableKeyEvents: true,
									emptyText: "Desde",
									fieldLabel: 'Desde',
									value:""
								}, {
									margin: '10',
									xtype: 'datefield',
									fieldLabel: 'Hasta:',
									name: 'buscarPorFechaHastaReportOrden',
									itemId: 'buscarPorFechaHastaReportOrden',
									format: 'Y-m-d',
									enableKeyEvents: true,
									emptyText: 'Hasta',
									fieldLabel: 'Hasta',
									value:""
	
								},
								
								{
									xtype : 'button',
									text:'Generar Reporte',
														margin : '0 0 0 10',
														iconCls: 'x-fa  fa-download',
														itemId : 'boton_refresh',
														handler : function() {
												
							estado =Ext.ComponentQuery
							.query('#estado_orden')[0]
							.getValue();
															
											
							inicio = Ext.ComponentQuery
							.query('#buscarPorFechaDesdeReportOrden')[0]
							.getValue();

						fin = Ext.ComponentQuery
							.query('#buscarPorFechaHastaReportOrden')[0]
							.getValue();

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
								
								
		
								var instituto=response_aux.nombre_empresa;

								window.open('php/negocios/reportes/reporteOrdenes.php?id_estado='+estado+"&fecha_start="+inicio+"&fecha_end="+fin+'&instituto='+instituto, '_blank');
								}

							});
						
							
							
														}
			
								}
			
							
						]
			
				});
				window2.show();

					
				}
			}

		}

		);


		
		
	
	
	  },
	  onRangoMesAnio: function () {

		

		sucursal = Ext.ComponentQuery
			.query('#sucursal_busqueda_orden')[0]
			.getValue();



		mes = Ext.ComponentQuery
			.query('#comboMesOrden')[0]
			.getValue();

		anio = Ext.ComponentQuery
			.query('#comboAnioFacturaOrden')[0]
			.getValue();

		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux)


				if (response_aux.rol == 2 || response_aux.rol == 3) {


					store = Ext.getStore("OrdenPedido");

					store.getProxy().extraParams = {

						sucursal_busqueda: response_aux.sucursal,
						nombre_busqueda: "",
					
						mes: mes,
						anio: anio,
						fecha_start: "",
						fecha_end: ""

					};

					store.load();

				} else {


					store = Ext.getStore("OrdenPedido");

					store.getProxy().extraParams = {

						sucursal_busqueda: sucursal,
						nombre_busqueda: "",
					
						mes: mes,
						anio: anio,
						fecha_start: "",
						fecha_end: ""

					};

					store.load();


				}


			}
		});



	},


	onRangoFecha: function () {



		sucursal = Ext.ComponentQuery
			.query('#sucursal_busqueda_orden')[0]
			.getValue();



		inicio = Ext.ComponentQuery
			.query('#buscarPorFechaDesdeOrden')[0]
			.getValue();

		fin = Ext.ComponentQuery
			.query('#buscarPorFechaHastaOrden')[0]
			.getValue();

		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux)


				if (response_aux.rol == 2 || response_aux.rol == 3) {


					store = Ext.getStore("OrdenPedido");

					store.getProxy().extraParams = {

						sucursal_busqueda: response_aux.sucursal,
						nombre_busqueda: "",
					
						mes: "",
						anio: "",
						fecha_start: inicio,
						fecha_end: fin

					};

					store.load();

				} else {


					store = Ext.getStore("OrdenPedido");

					store.getProxy().extraParams = {

						sucursal_busqueda: sucursal,
						nombre_busqueda: "",
					
						mes: "",
						anio: "",
						fecha_start: inicio,
						fecha_end: fin

					};

					store.load();


				}


			}
		});



	}



	  

});