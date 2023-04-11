Ext.define('Legion.view.ordenpedido.OrdenPedidos', {
	extend: 'Ext.TabPanel',
	alias: 'widget.OrdenPedidos',
	itemId:'OrdenPedidos',
	autoScroll: true,
	listeners: {
		beforerender: function () {
			
			Ext.Ajax.request({
				url : 'php/negocios/usuarios/recuperarUsuario.php',
				method : 'POST',
				
	
				success : function(response) {
	
					var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
					console.log(response_aux)
	
	
					if(response_aux.rol==2 || response_aux.rol==3){
						Ext.ComponentQuery.query('#sucursal_busqueda_orden')[0].hide();
						
						


						
					
	
					}
				
	
				
				}
	
			}
	
			);
		}
	},

	items: [{
		title: 'Listado Ordenes',
		itemId: 'usuarios_lista',
		items: [{
			xtype: 'component',
			html: 'Listado de Ordenes',
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

				title: 'Busqueda Ordenes',
				margin: '0 0 10 0',
				defaultType: 'textfield',
				defaults: {
					anchor: '100%'
				},
				layout: 'column',
				items: [{
					columnWidth : 0.43,
					fieldLabel: 'Nombre',
					margin : '0 5 10 5',
					itemId: 'nombre_busqueda_orden',
					name: 'nombre_busqueda_orden'

				}, {
					fieldLabel: 'Sucursal',
					columnWidth : 0.43,
					xtype: 'combo',
					fieldLabel: 'Sucursal',
					margin : '0 5 10 5',
					name: 'id_fksucursal_usuario',
					itemId: 'sucursal_busqueda_orden',
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


				}, {
					
					xtype: 'button',
					margin: '0 0 0 5',
					iconCls: 'x-fa  fa-search',
					itemId: 'boton_buscar_orden',
					handler: function () {
						this.fireEvent('btnBuscar');
					}

				}, {
					
					xtype: 'button',
					margin: '0 0 0 5',
					iconCls: 'x-fa  fa-eraser',
					itemId: 'boton_refresh_orden',
					handler: function () {
						this.fireEvent('btnRefresh');
					}

				},{
					columnWidth : 0.50,
					xtype : 'fieldcontainer',
					fieldLabel : 'Periodo',
					margin : '0 5 10 5',
					combineErrors : true,
					msgTarget : 'under',
					defaults : {
					  hideLabel : true,
					  enforceMaxLength : true
					},
					layout : 'column',
					items : [{
						  columnWidth : 0.50,
						  xtype : 'combo',
						  name : 'comboMesOrden',
						  itemId : 'comboMesOrden',
						  enableKeyEvents : true,
						  editable : false,
						  valueField : 'id',
						  displayField : 'nombre',
						  allowBlank : false,
						  typeAhead : true,
						  mode : 'local',
						  triggerAction : 'all',
						  emptyText : 'Mes',
						  store : new Ext.data.SimpleStore({
								fields : ['id', 'nombre'],
								data : [['0', 'Todos'], ['01', 'Enero'], ['02', 'Febrero'], ['03', 'Marzo'], ['04', 'Abril'], ['05', 'Mayo'], ['06', 'Junio'], ['07', 'Julio'], ['08', 'Agosto'], ['09', 'Septiembre'], ['10', 'Octubre'], ['11', 'Noviembre'], ['12', 'Diciembre']]
							  }),
						  value : 0
						}, {
						  columnWidth : 0.50,
						  xtype : 'combo',
						  name : 'comboAnioFacturaOrden',
						  itemId : 'comboAnioFacturaOrden',
						  enableKeyEvents : true,
						  editable : false,
						  valueField : 'id',
						  displayField : 'nombre',
						  allowBlank : false,
						  typeAhead : true,
						  mode : 'local',
						  triggerAction : 'all',
						  emptyText : 'Año',
						  store : new Ext.data.SimpleStore({
								fields : ['id', 'nombre'],
								data : [['0', 'Todos'], ['2019', '2019'], ['2020', '2020'], ['2021', '2021'], ['2022', '2022'], ['2023', '2023'], ['2024', '2024'], ['2025', '2025'], ['2026', '2026']]
							  }),
						  value : 0
						}]
				  },
				  {
					columnWidth : 0.50,
					xtype : 'fieldcontainer',
					margin : '0 5 10 5',
					fieldLabel : 'Rango',
					combineErrors : true,
					msgTarget : 'under',
					defaults : {
					  hideLabel : true,
					  enforceMaxLength : true
					},
					layout : 'column',
					items : [{
						  columnWidth : 0.45,
						  xtype : 'datefield',
						  name : 'buscarPorFechaDesdeOrden',
						  itemId : 'buscarPorFechaDesdeOrden',
						  format : 'Y-m-d',
						  enableKeyEvents : true,
						  emptyText : "Desde",
						  fieldLabel : 'Desde'
						}, {
						  columnWidth : 0.45,
						  xtype : 'datefield',
						  name : 'buscarPorFechaHastaOrden',
						  itemId : 'buscarPorFechaHastaOrden',
						  format : 'Y-m-d',
						  enableKeyEvents : true,
						  emptyText : 'Hasta',
						  fieldLabel : 'Hasta'
						}, {
						  
						
						  iconCls : 'fas fa-search',
						  margin : '0 5 10 5',
						  itemId : 'btnBuscarPorRangoFechaVentaOrden',
						  cls : 'botonNuevo',
						  xtype : 'button',
						 
						 
						}]
				  }]

			}

			]

		}, {

			alias: 'widget.OrdenGrid',
			height: 300,
			itemId: 'OrdenGrid',
			xtype: 'grid',
			selType: 'rowmodel',
			selModel: {
				mode: 'SINGLE'
			},
			viewConfig: {
				stripeRows: true
			},
			store: 'OrdenPedido',
			autoLoad: true,

			columns: [
				{
					text: "# Orden",
					width:50,
					dataIndex: 'id_orden_pedido',
					menuDisabled: true,
					hidden: false
				},

				{
					text: "F.Emision",
					width:100,
					dataIndex: 'fecha_emision_orden_pedido',
					menuDisabled: true

				}, 
				{
					text: "Codigo Inscripcion",
					width:100,
					dataIndex: 'id_fkinscripcion_orden_pedido',
					menuDisabled: true

				}, {
				
					text: "Alumno ID",
					flex: 2,
					dataIndex: 'id_fkalumno_orden_pedido',
					menuDisabled: true,

					width: 100,
					hidden: true

				},
				{
					text: "Alumno",
					flex: 1,
					dataIndex: 'nombre_alumno',
					menuDisabled: true,

		

				}, 
				
				{
					text: "Concepto",
					flex: 1,
					dataIndex: 'concepto',
					menuDisabled: true,
					height:30
				


		

				}, {
					text: "Sucursal",
					flex: 1,
					dataIndex: 'nombre_sucursal',
					menuDisabled: true

				}, {
					text: "Estado",
					flex: 1,
					dataIndex: 'nombre_estado_orden',
					menuDisabled: true,


				}, {
					text: "Por Cobrar",
					width:80,
					dataIndex: 'pagado',
					menuDisabled: true,
					renderer: Ext.util.Format.usMoney

				}, {
					text: "Total",
					
					width:80,
					dataIndex: 'total_orden_pedido',
					menuDisabled: true,
					renderer: Ext.util.Format.usMoney

				},

				{
					xtype: 'actioncolumn',
					itemId: 'action_orden_pedido_vista',
					menuDisabled: true,
					width: 75,
					items: [{

						tooltip: 'Pagar',
						itemId: 'pagar_orden',
						iconCls: 'x-fa fa-dollar-sign',
						handler: function (view, rowIndex,
							colIndex, item, e, record, row) {

							if (record.data.estado_orden_pedido == 2) {

								Ext.MessageBox.show({
									title: 'Advertencia',
									msg: 'No Puede realizar pagos a ordenes Anuladas',
									buttons: Ext.MessageBox.OK,
									icon: Ext.MessageBox.WARNING

								});


							} 
							
							else if(record.data.estado_orden_pedido == 1) {

								Ext.MessageBox.show({
									title: 'Advertencia',
									msg: 'No Puede realizar pagos a ordenes ya Cobradas',
									buttons: Ext.MessageBox.OK,
									icon: Ext.MessageBox.WARNING

								});


							} else {
								this.fireEvent('PagarOrden', view,
									rowIndex, colIndex, item, e,
									record, row);
							}




						}

					}, {
						tooltip: 'Anular',
						iconCls: 'x-fa  fa-ban',
						itemId: 'anular_orden',
						handler: function (view, rowIndex,
							colIndex, item, e, record, row) {
							console.log(record.data.estado_orden_pedido);
							var me= this;


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
											msg: 'No tiene Permisos para anular la Orden de Cobro',
											buttons: Ext.MessageBox.OK,
											icon: Ext.MessageBox.WARNING
		
										});
										
									
				
				
										
									
					
									}else{


										if (record.data.estado_orden_pedido == "2") {

											Ext.MessageBox.show({
												title: 'Advertencia',
												msg: 'Esta Orden ya se encuentra Anulada',
												buttons: Ext.MessageBox.OK,
												icon: Ext.MessageBox.WARNING
			
											});
			
										}
										else {
											Ext.Ajax.request({
												url: 'php/negocios/orden_pedido/verificarComprobantes.php',
												method: 'POST',
												params: {
													id_orden: record.data.id_orden_pedido
												},
			
												success: function (response) {
													var response_aux = Ext.util.JSON
													.decode(response.responseText, true);
													console.log(response);
													console.log(response_aux);
			
													if(response_aux.success == true){
														Ext.MessageBox.show({
															title: 'Advertencia',
															msg: 'Esta Orden Tiene Comprobantes Cobrados. ¿Desea Anular?',
															buttons: Ext.MessageBox.OKCANCEL,
															icon: Ext.MessageBox.WARNING,
				
															fn: function (btn) {
																if (btn == 'ok') {
																	me.fireEvent('anularOrden', view, rowIndex,
																		colIndex, item, e, record, row);
				
																	
				
				
				
				
																}
															}
				
														});
			
													}
													else{
														me.fireEvent('anularOrden', view, rowIndex,
																		colIndex, item, e, record, row);
			
													}
													
			
										
												
			
			
												},
											
			
											}
			
											);
			
			
			
										}

									}
								
					
								
								}
					
							}
					
							);


						




						}
					},
					{
						tooltip: 'Ver Comprobantes',
						iconCls: 'x-fa  fa-eye',
						itemId: 'ver_comprobantes',
						handler: function (view, rowIndex,
							colIndex, item, e, record, row) {


							this.fireEvent('verComprobantes', view, rowIndex,
								colIndex, item, e, record, row);

						}






					}

					]
				}],
			bbar: [{
				xtype: 'pagingtoolbar',
				store: 'OrdenPedido',
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
	}, {
		// FOmrulario Usuarios
		title: 'Nueva Orden',


		listeners:{
			
			deactivate: function(){
				if(Ext.ComponentQuery
					.query('#nombre_alumno_orden')[0]
				.getValue()!="" || Ext.ComponentQuery
				.query('#fecha_emision_orden_pedido')[0]
			.getValue()!=null 
			
			
			
			){

					Ext.MessageBox.show({
						title: 'Advertencia',
						msg: '¿Seguro desea abandonar el formulario?',
						buttons: Ext.MessageBox.OKCANCEL,
						icon: Ext.MessageBox.QUESTION,
						fn: function (btn) {
							if (btn == 'ok') {

								Ext.ComponentQuery.query('#ordenForm')[0].getForm().reset();
								Ext.getStore('DatosOrden').removeAll();
								Ext.getStore('DatosOrden').sync();

			
								
			
							}else{
								Ext.ComponentQuery.query('OrdenPedidos')[0].setActiveTab(1);
							}
						}
					});



				}
			}
		},
		autoScroll: true,
		items: [{

			header: {
				style: {
					backgroundColor: '#05723A' // Cambiar el color del nav
				}
			},

			title: 'Nueva Orden',

			defaultType: 'textfield',
			defaults: {

				width: '100%'
			},

			items: [{

				xtype: 'container',
				items: [{
					// Datos Alumno

					xtype: 'form',
					itemId: 'ordenForm',
					alias: 'widget.OrdenesForm',

					margin: '10 10 0 5',

					name: 'OrdenesForm',
					buttonAlign: 'center',
					border: false,
					trackResetOnLoad: true,
					collapsible: false,



					items: [{

						// Superiro

						layout: 'hbox',
						items: [{
							// Lado Izquiero
							margin: '0 0 0 0',

							defaults: {
								width: 700
							},

							items: [{

								layout: 'hbox',
								items: [{
									xtype: 'textfield',
									margin: '5',
									itemId: 'cedula_alumno',
									readOnly: true,

								}, {
									xtype: 'button',
									text: 'Listado de Inscripcion',
									margin: '5',
									iconCls: 'x-fa fa-users',
									itemId: 'mostrar_alumnos',
									
									handler: function () {
										this
											.fireEvent('btnWindowAlumno');
									}
								}]

							}, {
								margin: '0 0 10 0',
								layout: 'hbox',
								items: [

									{

										xtype: 'textfield',
										fieldLabel: 'Id',
										itemId: 'id_orden_pedido',
										name: 'id_orden_pedido',
										flex: 1,
										hidden: true

									}
									,
									{

										xtype: 'textfield',
										fieldLabel: 'Id',
										itemId: 'id_fkalumno_orden_pedido',
										name: 'id_fkalumno_orden_pedido',
										allowBlank: false,
										flex: 1,
										hidden: true

									}, {

										xtype: 'textfield',
										fieldLabel: 'Nombre',
										itemId: 'nombre_alumno_orden',
										allowBlank: false,
										flex: 1,
										readOnly: true,

									}, {
										xtype: 'textfield',
										margin: '0 0 0 5',
										fieldLabel: 'Apellido',
										itemId: 'apellido_alumno_orden',
										allowBlank: false,
										flex: 1,
										readOnly: true,
									}]

							}, {
								margin: '0 0 10 0',

								layout: 'hbox',
								items: [{
									xtype: 'textfield',
									fieldLabel: 'Celular',
									itemId: 'celular_alumno_orden',
									allowBlank: false,
									flex: 1,
									readOnly: true,

								}, {
									margin: '0 0 0 5',
									xtype: 'textfield',
									fieldLabel: 'Correo',
									itemId: 'correo_alumno_orden',
									allowBlank: false,
									flex: 1,
									readOnly: true,
								}]

							}, {

								margin: '0 0 10 0',
								layout: 'hbox',
								items: [{
									xtype: 'textfield',
									fieldLabel: 'Direccion',
									itemId: 'direccion_alumno_orden',
									allowBlank: false,
									flex: 1,
									readOnly: true,

								}, {
									margin: '0 0 0 5',
									xtype: 'textfield',
									fieldLabel: 'Cedula',
									itemId: 'cedula_alumno_orden',
									allowBlank: false,
									flex: 1,
									readOnly: true,

								},
								{
									margin: '0 0 0 5',
									xtype: 'textfield',
									fieldLabel: 'Iva Curso',
									itemId: 'iva_curso',
									readOnly: true,
									flex: 1,
									hidden: true

								}]
							}]

						}, {

							// Lado derecho
							// Informacion Adicionakl

							flex: 1,
							xtype: 'container',
							margin: '0 0 0 10',
							
							layout: {
								// Centers your inner panel with the HTML
								type: 'vbox',
								align: 'center',
								pack: 'center'
							},
							defaults: {
								width: '100%'
							},

							

							items: [{
								// Imagen Alumno
								xtype: 'image',
								itemId: 'imagen_alumno_orden',
								border: 1,
								

								src: 'https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
								height: 125,
								width: 100

							}, {
								// Informacion Adicional
								title: 'Informacion Adicional',
								flex: 1,
								header: {
									style: {
										backgroundColor: '#05723A' // Cambiar
										// el
										// color del nav
									}
								},

								items: [{


									margin: '10 0 0 0',
									items: [{
										xtype: 'textfield',
										fieldLabel: 'Inscripcion',
										itemId: 'id_inscripcion',
										flex: 1,
										hidden: true


									}, {
										xtype: 'datefield',
										fieldLabel: 'F.Emision',
										format: 'Y-m-d',
										itemId: 'fecha_emision_orden_pedido',
										name: 'fecha_emision_orden_pedido',
										flex: 1,
										allowBlank: false,
										editable:false,

									} /*{
										xtype: 'datefield',
										fieldLabel: 'F.VENCI',
										itemId: 'fecha_vencimiento_orden_pedido',
										name: 'fecha_vencimiento_orden_pedido',
										flex: 1,
										margin: '0 0 0 5',
										format: 'Y-m-d',
										hidden:true

									}*/]

								}, {


									margin: '0 0 10 0',
									items: [ {
										xtype: 'textfield',
										fieldLabel: 'Instructor',
										itemId: 'id_fkinscripcion_orden_pedido',
										name: 'id_fkinscripcion_orden_pedido',
										flex: 1,

										hidden: true

									}, {
										xtype: 'textfield',
										fieldLabel: 'Instructor',
										itemId: 'nombre_instructor',
										flex: 1,

										readOnly: true


									},
									{

										xtype: 'textfield',
										fieldLabel: 'IVA',
										itemId: 'iva_orden_pedido',
										name: 'iva_orden_pedido',
										flex: 1,
										margin: '0 0 0 5',
										readOnly: true,
										hidden: true



									}
									]
								}]

							}]

						}]
					}, {
						xtype: 'container',

						items: [{
							title: 'Datos Orden Pedido',
							items: [{
								// Boton agregar Menusalidades
								xtype: 'button',
								text: 'Agregar Pagos',
								itemId: 'mostrar_mensualidades_orden',
								margin: '8',
								iconCls: 'x-fa fa-plus',

								style: {
									'background-color': 'green'

								},
								handler: function () {
									this.fireEvent('btnMostrarMensualidades');
								}

							}, {

								alias: 'widget.MensualidadOrdennGrid',
								itemId: 'MensualidadOrdennGrid',
								xtype: 'grid',
								plugins: {
									ptype: 'cellediting',
									clicksToEdit: 1
								},

								selType: 'rowmodel',
								selModel: {
									mode: 'SINGLE'
								},
								viewConfig: {
									stripeRows: true
								},
								store: 'DatosOrden',

								autoLoad: true,

								columns: [{
									text: "CANT.",
									dataIndex: 'id_mensualidad',
									width: 60,
									hidden: true

								}, {
									text: "Cant.",
									dataIndex: 'cantidad_orden',
									width: 60,

								}, {
									text: "Descripcion",
									flex: 1,
									dataIndex: 'concepto_mensualidad'

								},
								{
									text: "Precio",
									flex: 1,
									dataIndex: 'monto_mensualidad',
									editor: {
										xtype: 'textfield',

									}

								},

								{

									text: "Cuota",
									flex: 1,
									dataIndex: 'numero_cuota_mensualidad',
									hidden: true

								},
								{

									text: "Estado",
									flex: 1,
									dataIndex: 'estado_mensualidad',
									hidden: true

								},
								{

									text: "Fecha",
									flex: 1,
									dataIndex: 'fecha_pago_mensualidad',
									hidden: true

								},
								{

									text: "Monto",
									flex: 1,
									dataIndex: 'monto_mensualidad',
									hidden: true

								},
								{

									text: "Abonado",
									flex: 1,
									dataIndex: 'abonado_mensualidad',
									hidden: true

								},
								{

									text: "Total",
									flex: 1,
									dataIndex: 'saldo_mensualidad',


								}
									, {
									xtype: 'actioncolumn',
									itemId: 'action_orden_pedido_grid_mensualidades',
									width: 75,
									items: [{

										tooltip: 'Eliminar',
										iconCls: 'x-fas fa-times',
										handler: function (grid, rowIndex, colIndex,
											item, e, record, row) {
											var rec = grid.getStore().getAt(rowIndex);
											grid.getStore().remove(rec);



											/*
											var store_mensua = Ext.getStore('MensualidadesAlumno');

											store_mensua.add({
												id_mensualidad: record.data.id_mensualidad,
												numero_cuota_mensualidad:record.data.numero_cuota_mensualidad,
												concepto_mensualidad: record.data.concepto_mensualidad,
												fecha_pago_mensualidad: record.data.fecha_pago_mensualidad,
												total_orden: record.data.total_orden,
												monto_mensualidad: record.data.monto_mensualidad,
												abonado_mensualidad: record.data.monto_mensualidad,
												monto_mensualidad:  record.data.monto_mensualidad,
								
											});

											*/




											this.fireEvent('recalcularDatos', record);



										}

									}

									]
								}

								]

							}, {
								//totales
								columnWidth: 0.6,
								dock: 'bottom',
								padding: '5 0 0 0',
								defaults: {
									style: {
										"text-align": "right",
										"margin-left": "auto"
									}
								},
								items: [{
									xtype: 'textfield',
									itemId: "subtotal",
									name: "subtotal_orden_pedido",
									fieldLabel: "SUBTOTAL",
									value: '0.00',
									readOnly: true,
									width: 180
								}, {
									xtype: 'textfield',
									itemId: "iva",
									name: "iva_orden_pedido",
									fieldLabel: "IVA 12%",
									value: '0.00',
									readOnly: true,
									width: 180
								}, {
									xtype: 'textfield',
									itemId: "total",
									name: "total_orden_pedido",
									fieldLabel: "TOTAL",
									value: '0.00',
									readOnly: true,
									width: 180
								}]

							}]

						}]
					}, {
						dockedItems: [{
							xtype: 'toolbar',
							dock: 'bottom',

							items: [{
								xtype: "textareafield",
								itemId: 'observacion_orden_pedido',
								name: 'observacion_orden_pedido',
								fieldLabel: "Observación",
								allowBlank: true,
								width: '48%'
							}]

						}]


					}, {

					}]

					, buttons: [

						{
							text: 'Guardar',
							iconCls: 'x-fa fa-save',

							style: {
								'background-color': 'green'
							},

							itemId: 'guardar_orden',
							handler: function () {


								me = this;

								Ext.MessageBox.show({
									title: 'Mensaje',
									msg: 'Desea guardar  el registro?',
									buttons: Ext.MessageBox.OKCANCEL,
									icon: Ext.MessageBox.QUESTION,
		
									fn : function(btn) {
										if (btn == 'ok') {
		
									
							
											var form = Ext.ComponentQuery.query('#ordenForm')[0]
									.getForm();
								var record = Ext.getStore('DatosOrden').getRange();
								me.fireEvent('btnCreateOrden', form, record);
										
						
										}
									}
			
								});

								

							}
						}


					]
				}]
			}

			]

		}]

	}]

});