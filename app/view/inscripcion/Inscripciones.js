Ext.define('Legion.view.inscripcion.Inscripciones', {
	extend: 'Ext.TabPanel',
	alias: 'widget.Inscripciones',
	itemId: 'inscripciones',

	autoScroll: true,
	autoHeight: true,
	listeners: {
		beforerender: function () {

			Ext.Ajax.request({
				url: 'php/negocios/usuarios/recuperarUsuario.php',
				method: 'POST',


				success: function (response) {

					var response_aux = Ext.util.JSON
						.decode(response.responseText, true);
					console.log(response_aux)


					if (response_aux.rol == 2 || response_aux.rol == 3) {
						Ext.ComponentQuery.query('#sucursal_busqueda_inscripcion')[0].hide();
						Ext.ComponentQuery.query('#busqueda_insitucion_inscripcion')[0].hide();


					

					} 

					




				}

			}

			);
		}
	},

	items: [{
		title: 'Listado de Inscripciones',


		items: [{
			xtype: 'component',
			html: 'Listado de Inscripciones',
			style: {
				'backgroundColor': '#05723A',
				'color': '#FFFFFF',
				'font-size': '16px',
				'padding': '15px'


			}
		},
		//Primer filtro
		{
			xtype: 'fieldset',
			itemId: 'fieldset1',

			title: 'Busqueda Inscripciones',

			defaultType: 'textfield',
			defaults: {
				anchor: '100%'
			},
			layout: 'column',
			items: [{
				columnWidth: 0.33,

				xtype: 'combo',
				fieldLabel: 'Institucion',


				itemId: 'busqueda_insitucion_inscripcion',
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
				flex: 1,

				listeners: {
					change: function () {
						store = Ext.getStore('Sucursal');
						value = Ext.ComponentQuery
							.query('#busqueda_insitucion_inscripcion')[0]
							.getValue();

						store.getProxy().extraParams = {
							id_empresa: value,
							nombre_busqueda: ""

						}
						store.load();


					}
				}


			}, {
				columnWidth: 0.33,
				fieldLabel: 'Sucursal',
				flex: 1,
				xtype: 'combo',
				margin: '0 0 0 5',
				itemId: 'sucursal_busqueda_inscripcion',
				enableKeyEvents: true,
				editable: false,

				typeAhead: true,
				mode: 'local',
				triggerAction: 'all',
				emptyText: 'Seleccionar',
				autoLoad: true,
				store: 'Sucursal',
				displayField: 'nombre_sucursal',
				valueField: 'id_sucursal',

				listeners: {
					change: function () {
						store = Ext.getStore('Curso');
						value = Ext.ComponentQuery
							.query('#busqueda_insitucion_inscripcion')[0]
							.getValue();

						store.getProxy().extraParams = {
							nombre_busqueda: "",
							sucursal_busqueda: value,
							mes: "",
							anio: "",
							fecha_start: "",
							fecha_end: "",
							estado: ""

						}
						store.load();


					}
				}


			},

			{
				columnWidth: 0.33,
				fieldLabel: 'Curso',
				flex: 1,
				xtype: 'combo',
				margin: '0 0 0 5',

				itemId: 'curso_busqueda_inscripcion',
				enableKeyEvents: true,
				editable: false,
				allowBlank: false,
				typeAhead: true,
				mode: 'local',
				triggerAction: 'all',
				emptyText: 'Seleccionar',
				autoLoad: true,
				store: 'Curso',
				displayField: 'nombre_curso',
				valueField: 'id_curso',
				listeners: {
					change: function () {

						Ext.ComponentQuery
							.query('#fieldset2')[0]
							.show();




					}
				}



			},



			]

		},
		{
			xtype: 'fieldset',
			itemId: 'fieldset2',

			hidden: true,
			title: 'Busqueda Inscripciones',

			defaultType: 'textfield',
			defaults: {
				anchor: '100%'
			},
			layout: 'column',
			items: [{
				columnWidth: 0.33,
				fieldLabel: 'Nombre',
				itemId: 'nombre_busqueda_inscripcion_alumno',
				name: 'nombre_busqueda_inscripcion_alumno',
				flex: 1


			},

				, {


				xtype: 'button',
				margin: '0 0 0 5',
				flex: 1,
				iconCls: 'x-fa  fa-search',
				itemId: 'boton_buscar_inscripcion',
				handler: function () {
					this.fireEvent('btnBuscar');
				}

			}, {

				xtype: 'button',
				margin: '0 0 0 5',
				flex: 1,
				iconCls: 'x-fa  fa-eraser',
				itemId: 'boton_refresh_inscripcion',
				handler: function () {
					this.fireEvent('btnRefresh');
				}

			},

			{
				columnWidth: 0.33,
				fieldLabel: 'Estado',
				flex: 1,
				xtype: 'combo',
				margin: '0 0 0 5',

				itemId: 'estado_busqueda_inscripcion',
				enableKeyEvents: true,
				editable: false,
				allowBlank: false,
				typeAhead: true,
				mode: 'local',
				triggerAction: 'all',
				emptyText: 'Seleccionar',
				autoLoad: true,
				valueField: 'id',
				displayField: 'estado',
				store: new Ext.data.SimpleStore({
					fields: ['id', 'estado'],
					data: [['1', 'Activo'], ['2', 'Finalizado'], ['0', 'Retirado']]
				}),

			}, {
				columnWidth: 0.33,
				xtype: 'combo',
				flex: 1,
				renderTo: document.body,
				itemId: 'mostrar_columnas_ins',
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
						"name": "Origen",
						"id": 1
					}, {
						"name": "Precio",
						"id": 2
					}]
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


			}, {
				columnWidth: 0.50,
				xtype: 'fieldcontainer',
				fieldLabel: 'Periodo',
				margin: '10 5 10 5',
				combineErrors: true,
				msgTarget: 'under',
				defaults: {
					hideLabel: true,
					enforceMaxLength: true
				},
				layout: 'column',
				items: [{
					columnWidth: 0.50,
					xtype: 'combo',
					name: 'comboMes',
					itemId: 'comboMes',
					enableKeyEvents: true,
					editable: false,
					valueField: 'id',
					displayField: 'nombre',
					allowBlank: false,
					typeAhead: true,
					mode: 'local',
					triggerAction: 'all',
					emptyText: 'Mes',
					store: new Ext.data.SimpleStore({
						fields: ['id', 'nombre'],
						data: [['0', 'Todos'], ['01', 'Enero'], ['02', 'Febrero'], ['03', 'Marzo'], ['04', 'Abril'], ['05', 'Mayo'], ['06', 'Junio'], ['07', 'Julio'], ['08', 'Agosto'], ['09', 'Septiembre'], ['10', 'Octubre'], ['11', 'Noviembre'], ['12', 'Diciembre']]
					}),
					value: 0
				}, {
					columnWidth: 0.50,
					xtype: 'combo',
					name: 'comboAnioFactura',
					itemId: 'comboAnioFactura',
					enableKeyEvents: true,
					editable: false,
					valueField: 'id',
					displayField: 'nombre',
					allowBlank: false,
					typeAhead: true,
					mode: 'local',
					triggerAction: 'all',
					emptyText: 'Año',
					store: new Ext.data.SimpleStore({
						fields: ['id', 'nombre'],
						data: [['0', 'Todos'], ['2019', '2019'], ['2020', '2020'], ['2021', '2021'], ['2022', '2022'], ['2023', '2023'], ['2024', '2024'], ['2025', '2025'], ['2026', '2026']]
					}),
					value: 0
				}]
			},
			{
				columnWidth: 0.50,
				xtype: 'fieldcontainer',
				margin: '10 5 10 5',
				fieldLabel: 'Rango',
				combineErrors: true,
				msgTarget: 'under',
				defaults: {
					hideLabel: true,
					enforceMaxLength: true
				},
				layout: 'column',
				items: [{
					columnWidth: 0.50,
					xtype: 'datefield',
					name: 'buscarPorFechaDesde',
					itemId: 'buscarPorFechaDesde',
					format: 'Y-m-d',
					enableKeyEvents: true,
					emptyText: "Desde",
					fieldLabel: 'Desde'
				}, {
					columnWidth: 0.50,
					xtype: 'datefield',
					name: 'buscarPorFechaHasta',
					itemId: 'buscarPorFechaHasta',
					format: 'Y-m-d',
					enableKeyEvents: true,
					emptyText: 'Hasta',
					fieldLabel: 'Hasta'
				}, {


					iconCls: 'fas fa-search',
					margin: '0 5 10 5',
					itemId: 'btnBuscarPorRangoFechaVenta',
					cls: 'botonNuevo',
					xtype: 'button',

				}]
			}
			]

		}

			,



		{

			alias: 'widget.InscripcionGrid',
			itemId: 'InscripcionGrid',
			xtype: 'grid',
			height: 300,
			selType: 'rowmodel',
			selModel: {
				mode: 'SINGLE'
			},
			viewConfig: {
				stripeRows: true
			},
			store: 'Inscripcion',

			autoLoad: true,

			columns: [{
				text: "Codigo",
				dataIndex: 'id_inscripcion',
				width: 50,
				menuDisabled: true

			},
			{
				text: "Cedula",
				dataIndex: 'cedula_alumno',
				width: 50,
				menuDisabled: true

			}, {
				text: "F.de Inscripcion",
				width: 100,
				dataIndex: 'fecha_inscripcion',
				menuDisabled: true

			}, {
				text: "Inicio del Curso",
				flex: 1,
				dataIndex: 'fecha_inicio_inscripcion',
				hidden: true

			}, {
				text: "Fin del Curso",
				flex: 1,
				dataIndex: 'fecha_fin_inscripcion',
				hidden: true

			}, {
				text: "Estado Id",
				flex: 1,
				dataIndex: 'estado_inscripcion',
				hidden: true

			},
			{
				text: "Nota",

				width: 50,
				dataIndex: 'calificacion_inscripcion',
				menuDisabled: true

			}, {
				text: "Origen",
				flex: 1,
				dataIndex: 'origen_inscripcion',
				hidden: true

			},
			{
				text: "Precio",
				flex: 1,
				dataIndex: 'precio_total_curso',
				hidden: true

			}, {
				text: "Foto",
				flex: 1,
				dataIndex: 'foto_inscripcion',
				hidden: true

			}, {
				text: "Alumno id",
				flex: 1,
				dataIndex: 'id_fkalumno_inscripcion',
				hidden: true

			},
			{
				text: "Alumno",
				flex: 1,
				dataIndex: 'nombre_alumno',
				menuDisabled: true

			}, {
				text: "Curso id",
				flex: 1,
				dataIndex: 'id_fkcurso_inscripcion',
				hidden: true

			},
			{
				text: "Curso",
				flex: 1,
				dataIndex: 'nombre_curso',
				menuDisabled: true

			}, {
				text: "Inicio del Curso",
				flex: 1,
				dataIndex: 'fecha_inicio_inscripcion',
				menuDisabled: true

			}, {
				text: "Usuario Id",
				flex: 1,
				dataIndex: 'id_fkusuario_inscripcion',
				hidden: true

			},
			{
				text: "Usuario",
				flex: 1,
				dataIndex: 'nombre_usuario',
				hidden: true

			}, {
				text: "Sucursal id",
				flex: 1,
				dataIndex: 'id_fksucursal_inscripcion',
				hidden: true

			},
			{
				text: "Sucursal",
				flex: 1,
				dataIndex: 'nombre_sucursal',
				menuDisabled: true

			},

			{
				text: "Uniforme Id",
				flex: 1,
				dataIndex: 'estado_uniforme_inscripcion',
				hidden: true

			},
			{
				text: "Uniforme",
				flex: 1,
				dataIndex: 'nombre_estado_uniforme',
				menuDisabled: true

			}, {
				text: "Condicion de Pago Id",
				flex: 1,
				dataIndex: 'condicion_pago_inscripcion',
				hidden: true

			},
			{
				text: "Condicion de Pago",
				flex: 1,
				dataIndex: 'condicion_pago',
				menuDisabled: true

			},
			{
				text: "Tipo de Inscripcion Id",
				flex: 1,
				dataIndex: 'curso_variable_inscripcion',
				hidden: true

			},
			{
				text: "Tipo de Inscripcion",
				flex: 1,
				dataIndex: 'curso_variable',
				menuDisabled: true

			}, {
				text: "Creado",
				flex: 1,
				dataIndex: 'created_at',
				hidden: true

			},
			{
				text: "Estado",
				flex: 1,
				dataIndex: 'nombre_estado_inscripcion',
				renderer: function (value, meta, record) {
					if (value == 'Activo') {
						return '<i   data-qtip="ESTADO ACTIVO" class="fas fa-circle " style="color:green;"></i>';
					} else if (value == 'Inactivo') {
						return '<i  data-qtip=" ESTADO RETIRADO" class="fas fa-circle " style="color:red;"></i>';
					}
					else if (value == 'Finalizado') {
						return '<i  data-qtip=" ESTADO FINALIZADO" class="fas fa-check" style="color:blue;"></i>';
					}

					else if (value == 'Anulada') {
						return '<i  data-qtip=" ESTADO FINALIZADO" class="fas fa-ban" style="color:red;"></i>';
					}
				}

			},

			{
				xtype: 'actioncolumn',
				itemId: 'action_inscripcion',
				width: 70,
				menuDisabled: true,
				items: [{

					tooltip: 'Editar',
					iconCls: 'x-fa fa-pen',
					itemId: 'editar_inscripcion',
					handler: function (view, rowIndex,
						colIndex, item, e, record, row) {
						this.fireEvent('btnUpdate', view,
							rowIndex, colIndex, item, e,
							record, row);

					},
					hidden: true

				}, {
					tooltip: 'Eliminar',
					iconCls: 'x-fa fa-times',
					itemId: 'editar_inscripcion',
					handler: function (grid, rowIndex, colIndex) {
						this.fireEvent('btnDelete', grid,
							rowIndex, colIndex);

					},
					hidden: true
				}, {

					tooltip: 'Anular',
					iconCls: 'x-fa  fa-ban',
					itemId: 'anular_Inscripcion',
					handler: function (view, rowIndex,
						colIndex, item, e, record, row) {
						console.log(record.data.estado_orden_pedido);
						var me = this;

						if (record.data.estado_inscripcion == 3) {
							Ext.MessageBox.show({
								title: 'Mensaje',
								msg: 'Esta Inscripción ya esta anulada',
								buttons: Ext.MessageBox.OK,
								icon: Ext.MessageBox.INFO,
							})

						}

						else {
							Ext.Ajax.request({
								url: 'php/negocios/inscripciones/recuperarInscripcionOrden.php',
								method: 'POST',
								params: {
									id_inscripcion: record.data.id_inscripcion

								},


								success: function (response) {

									var response_aux = Ext.util.JSON
										.decode(response.responseText, true);
									console.log(response_aux)


									if (response_aux.total > 0) {

										Ext.MessageBox.show({
											title: 'Advertencia',
											msg: 'Esta inscripción tiene Ordenes de Pedido Adjuntas. Desear anular?',
											buttons: Ext.MessageBox.OKCANCEL,
											icon: Ext.MessageBox.WARNING,
											fn: function (btn) {
												if (btn == 'ok') {


													Ext.Ajax.request({
														url: 'php/negocios/inscripciones/anularInscripcion.php',
														method: 'POST',
														params: {
															id_inscripcion: record.data.id_inscripcion
														},

														success: function (response) {
															var response_aux = Ext.util.JSON
																.decode(response.responseText, true);
															if (response_aux.success == true) {

																Ext.MessageBox.show({
																	title: 'Mensaje',
																	msg: 'Inscripcion Anulada',
																	buttons: Ext.MessageBox.OK,
																	icon: Ext.MessageBox.OK,
																})


																Ext.getStore('Inscripcion').load();

															}

															else {
																Ext.MessageBox.show({
																	title: 'Mensaje',
																	msg: 'Error al Anular',
																	buttons: Ext.MessageBox.OK,
																	icon: Ext.MessageBox.WARNING,
																})

															}


														}

													}

													);

												}
											}

										});
									}
									else {

										Ext.MessageBox.show({
											title: 'Advertencia',
											msg: 'Seguro que deseea Anular?',
											buttons: Ext.MessageBox.OKCANCEL,
											icon: Ext.MessageBox.QUESTION,
											fn: function (btn) {
												if (btn == 'ok') {


													Ext.Ajax.request({
														url: 'php/negocios/inscripciones/anularInscripcion.php',
														method: 'POST',
														params: {
															id_inscripcion: record.data.id_inscripcion
														},

														success: function (response) {
															var response_aux = Ext.util.JSON
																.decode(response.responseText, true);
															if (response_aux.success == true) {

																Ext.MessageBox.show({
																	title: 'Mensaje',
																	msg: 'Inscripcion Anulada',
																	buttons: Ext.MessageBox.OK,
																	icon: Ext.MessageBox.OK,
																})

																Ext.getStore('Inscripcion').load();

															}

															else {
																Ext.MessageBox.show({
																	title: 'Mensaje',
																	msg: 'Error al Anular',
																	buttons: Ext.MessageBox.OK,
																	icon: Ext.MessageBox.WARNING,
																})

															}

														}

													}

													);

												}
											}
										});


									}




								}

							}

							);
						}




					}


				},

				{

					tooltip: 'Menu',
					iconCls: 'x-fa fa-chevron-circle-down',
					itemId: 'menu_inscripciones',
					handler: function (grid, rowIndex,
						colIndex, item, e, record) {
						this.fireEvent('menu', grid, rowIndex, colIndex, item, e, record)
					}

				},

				{


					iconCls: 'fas fa-cog',
					itemId: 'rueda',
					name:'rueda2',
				
					handler: function (grid, rowIndex,
						colIndex, item, e, record) {
							this.fireEvent('verHistorialCertificados', grid, rowIndex, colIndex, item, e, record)

					}

				}

				],
		
			}],
			bbar: [{
				xtype: 'pagingtoolbar',
				store: 'Inscripcion',
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

	}

		, {
		title: 'Nueva Inscripcion',

		listeners: {

			deactivate: function () {
				if (Ext.ComponentQuery
					.query('#nombre_alumno_ins')[0]
					.getValue() != "" || Ext.ComponentQuery
						.query('#nombre_curso')[0]
						.getValue() != "" || Ext.ComponentQuery
							.query('#fecha_inscripcion')[0]
							.getValue() != null) {

					Ext.MessageBox.show({
						title: 'Advertencia',
						msg: '¿Seguro desea abandonar el formulario?',
						buttons: Ext.MessageBox.OKCANCEL,
						icon: Ext.MessageBox.QUESTION,
						fn: function (btn) {
							if (btn == 'ok') {

								Ext.ComponentQuery.query('#inscripcionForm')[0].getForm().reset();
								Ext.ComponentQuery
									.query('Inscripciones #id_fkcurso_inscripcion')[0]
									.reset()
								Ext.ComponentQuery.query('Inscripciones #nombre_curso')[0]
									.reset()

								Ext.ComponentQuery
									.query('Inscripciones #id_fkinstructor_inscripcion')[0]
									.reset()

								Ext.ComponentQuery
									.query('Inscripciones #nombre_curso_inscripcion')[0]
									.reset()
								Ext.ComponentQuery.query('Inscripciones #precio_curso')[0]
									.reset()
								Ext.ComponentQuery.query('Inscripciones #matricula_curso')[0]
									.reset()
								Ext.ComponentQuery
									.query('Inscripciones #mensualidad_curso')[0]
									.reset()
								Ext.ComponentQuery.query('Inscripciones #duracion_curso')[0]
									.reset()
								Ext.ComponentQuery.query('Inscripciones #instructor_curso')[0]
									.reset()

								Ext.ComponentQuery
									.query('Inscripciones #fecha_inicio_inscripcion')[0]
									.reset()
								Ext.ComponentQuery
									.query('Inscripciones #fecha_fin_inscripcion')[0]
									.reset()

								Ext.ComponentQuery
									.query('Inscripciones #nombre_sucursal_inscripcion')[0]
									.reset()
								Ext.ComponentQuery
									.query('Inscripciones #id_fksucursal_inscripcion')[0]
									.reset()

								Ext.ComponentQuery
									.query('Inscripciones #id_fkalumno_inscripcion')[0]
									.reset()

								Ext.ComponentQuery
									.query('Inscripciones #nombre_alumno_inscripcion')[0]
									.reset()
								Ext.ComponentQuery.query('Inscripciones #nombre_alumno_ins')[0]
									.reset()
								Ext.ComponentQuery.query('Inscripciones #apellido_alumno_ins')[0]
									.reset()
								Ext.ComponentQuery.query('Inscripciones #direccion_alumno_ins')[0]
									.reset()
								Ext.ComponentQuery.query('Inscripciones #cedula_alumno_ins')[0]
									.reset()
								Ext.ComponentQuery.query('Inscripciones #correo_alumno_ins')[0]
									.reset()
								Ext.ComponentQuery.query('Inscripciones #celular_alumno_ins')[0]
									.reset()



							} else {
								Ext.ComponentQuery.query('inscripciones')[0].setActiveTab(1);
							}
						}
					});



				}
			}
		},

		autoWidth: true,
		autoScroll: true,
		items: [{

			xtype: 'fieldset',
			itemId: 'fieldset_alumno',

			title: 'Datos Alumno',
			width: '100%',
			defaultType: 'textfield',

			items: [

				{
					xtype: 'fieldcontainer',
					layout: 'hbox',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					items: [{
						xtype: 'button',
						text: 'Listado Alumnos',
						margin: '0 0 0 5',
						iconCls: 'x-fa fa-users',
						itemId: 'boton_listado_alumnos',

						handler: function () {
							this.fireEvent('btnAlumno');
						}
					}, {

						xtype: 'button',
						margin: '0 0 0 5',
						hidden: true,
						text: 'Nuevo Alumno',
						iconCls: 'x-fa fa-plus',
						itemId: 'mostrar_formulario_alumno',
						handler: function () {
							this.fireEvent('btnWindow');
						},
						style: {
							'background-color': 'green'

						},

					}]
				}, {
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					items: [{

						fieldLabel: 'Nombre',
						itemId: 'nombre_alumno_ins',

						margin: '10 0 0 5',
						flex: 1,
						readOnly: true
					},

					{

						fieldLabel: 'Apellido',
						itemId: 'apellido_alumno_ins',

						margin: '10 0 0 5',
						flex: 1,
						readOnly: true
					}, {

						fieldLabel: 'Direccion',
						itemId: 'direccion_alumno_ins',

						margin: '10 0 0 5',
						flex: 1,
						readOnly: true

					}]
				}, {
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					items: [{

						fieldLabel: 'Celular',
						itemId: 'celular_alumno_ins',
						margin: '10 0 0 5',
						flex: 1,
						readOnly: true
					},

					{

						fieldLabel: 'Correo',
						itemId: 'correo_alumno_ins',
						margin: '10 0 0 5',
						flex: 1,
						readOnly: true
					}, {

						fieldLabel: 'Cedula',
						itemId: 'cedula_alumno_ins',
						margin: '10 0 0 5',
						flex: 1,
						readOnly: true

					}]
				}]

		}, {

			xtype: 'fieldset',
			itemId: 'fieldset_curso',

			title: 'Datos Curso',
			width: '100%',
			defaultType: 'textfield',

			items: [

				{
					xtype: 'fieldcontainer',
					layout: 'hbox',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					items: [{
						xtype: 'button',
						text: 'Listado Cursos',
						margin: '0 0 0 5',
						iconCls: 'fas fa-university',
						itemId: 'boton_listado_cursos',

						handler: function () {

							valor = Ext.ComponentQuery.query('#nombre_alumno_ins')[0].getValue();


							if (valor == "") {
								Ext.MessageBox.show({
									title: 'Advertencia',
									msg: 'Debe elegir primero un Alumno',
									buttons: Ext.MessageBox.OK,
									icon: Ext.MessageBox.WARNING,

								});

							} else {

								this.fireEvent('btnCurso');
							}



						}
					}, {

						xtype: 'button',
						margin: '0 0 0 5',
						text: 'Nuevo Curso',
						iconCls: 'x-fa fa-plus',
						itemId: 'mostrar_formulario_curso',
						handler: function () {
							this
								.fireEvent('btnWindowCurso');
						},
						hidden: true


					}]
				}, {
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					items: [{

						fieldLabel: 'Curso',
						itemId: 'nombre_curso',

						margin: '10 0 0 5',
						flex: 1,
						readOnly: true
					},

					{

						fieldLabel: 'Precio $',
						itemId: 'precio_curso',

						margin: '10 0 0 5',
						flex: 1,
						readOnly: true
					}, {

						fieldLabel: 'Matricula $',
						itemId: 'matricula_curso',

						margin: '10 0 0 5',
						flex: 1,
						readOnly: true

					}]
				}, {
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					items: [{

						fieldLabel: 'Mensualidad $',
						itemId: 'mensualidad_curso',
						margin: '10 0 0 5',
						flex: 1,
						readOnly: true
					},

					{

						fieldLabel: 'Duracion(meses)',
						itemId: 'duracion_curso',
						margin: '10 0 0 15',
						flex: 1,
						readOnly: true
					}, {

						fieldLabel: 'Instructor',
						itemId: 'instructor_curso',
						margin: '10 0 0 5',
						flex: 1,
						readOnly: true

					}]
				}]

		}, {

			xtype: 'fieldset',

			title: 'Datos de Inscripcion',

			defaults: {
				anchor: '100%',
				width: '100%'
			},
			style: {
				'backgroundColor': 'white'


			},

			items: [{
				xtype: 'form',
				itemId: 'inscripcionForm',
				alias: 'widget.InscripcionForm',
				margin: '10 10 0 5',
				name: 'InscripcionForm',
				buttonAlign: 'center',
				border: false,
				trackResetOnLoad: true,

				collapsible: false,
				layout: {
					type: 'vbox',
					align: 'stretch'
				},

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
						itemId: 'id_inscripcion',
						name: 'id_inscripcion',
						hidden: true,
						flex: 1

					}, {
						fieldLabel: 'Alumno',
						itemId: 'nombre_alumno_inscripcion',
						name: ' nombre_alumno_inscripcion',
						margin: '10 0 0 5',
						flex: 1,
						readOnly: true

					}, {
						fieldLabel: 'Id_alumno',
						itemId: 'id_fkalumno_inscripcion',
						name: ' id_fkalumno_inscripcion',
						margin: '10 10 0 5',
						flex: 1,
						hidden: true

					}, {

						fieldLabel: 'Sucursal',
						margin: '10 0 0 5',
						name: 'nombre_sucursal_inscripcion',
						itemId: 'nombre_sucursal_inscripcion',
						flex: 1,
						readOnly: true

					}, {

						fieldLabel: 'Sucursal',
						margin: '10 0 0 5',
						name: 'id_fksucursal_inscripcion',
						itemId: 'id_fksucursal_inscripcion',
						hidden: true,
						readOnly: true

					}, {

						fieldLabel: 'Curso',
						margin: '10 10 0 5',
						name: 'nombre_curso_inscripcion',
						itemId: 'nombre_curso_inscripcion',
						readOnly: true,
						flex: 1
					}, {

						fieldLabel: 'Curso',
						margin: '10 0 0 5',
						name: 'id_fkcurso_inscripcion',
						itemId: 'id_fkcurso_inscripcion',
						hidden: true,

						flex: 1
					}]
				},

				{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					items: [{
						xtype: 'datefield',
						fieldLabel: 'Fecha de Inscripcion',
						itemId: 'fecha_inscripcion',
						name: 'fecha_inscripcion',
						margin: '10 10 0 5',
						format: 'Y-m-d',
						allowBlank: false,
						editable: false,


						flex: 1
					}, {
						xtype: 'datefield',
						fieldLabel: 'Fecha de Inicio Inscripcion',
						itemId: 'fecha_inicio_inscripcion',
						name: 'fecha_inicio_inscripcion',
						format: 'Y-m-d',
						allowBlank: false,
						margin: '10 10 0 5',
						readOnly: true,
						flex: 1
					}, {
						xtype: 'datefield',
						fieldLabel: 'Fecha de Finalizacion',
						itemId: 'fecha_fin_inscripcion',
						name: 'fecha_fin_inscripcion',
						format: 'Y-m-d',
						allowBlank: false,
						margin: '10 10 0 5',
						readOnly: true,

						flex: 1

					}

					]
				}, {
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					items: [{

						fieldLabel: 'Estado',
						itemId: 'estado_inscripcion',
						name: 'estado_inscripcion',
						margin: '10 10 0 5',
						xtype: 'combo',
						dock: 'top',
						enableKeyEvents: true,
						editable: false,
						displayField: 'estado',
						valueField: 'estado_inscripcion',
						mode: 'local',
						allowBlank: false,
						triggerAction: 'all',
						emptyText: 'Seleccionar',
						store: new Ext.data.SimpleStore({
							fields: [
								'estado_inscripcion',
								'estado'],
							data: [['1', 'Activo'],
							['0', 'Inactivo']

							]
						}),
						queryMode: 'local',
						flex: 1,
						readOnly: true,
						value: 1

					}, {
						fieldLabel: 'Calificacion',
						itemId: 'calificacion_inscripcion',
						name: 'calificacion_inscripcion',
						margin: '10 10 0 5',
						flex: 1,
						maxLength: 2,
						minLength: 1,
						maskRe: /[0-9.]/,
						allowBlank: false,
					}, {
						fieldLabel: 'Instructor',
						itemId: 'id_fkinstructor_inscripcion',
						name: 'id_fkinstructor_inscripcion',
						margin: '10 10 0 5',
						flex: 1,
						hidden: true
					}, {

						fieldLabel: 'Origen',
						itemId: 'origen_inscripcion',
						name: 'origen_inscripcion',
						margin: '10 10 0 5',
						xtype: 'combo',
						dock: 'top',
						enableKeyEvents: true,
						editable: false,
						displayField: 'origen',
						valueField: 'origen_inscripcion',
						mode: 'local',
						allowBlank: false,
						triggerAction: 'all',
						emptyText: 'Seleccionar',
						store: new Ext.data.SimpleStore({
							fields: [
								'origen_inscripcion',
								'origen'],
							data: [['1', 'Plataforma'],
							['0', 'Web']

							]
						}),
						queryMode: 'local',
						flex: 1, value: 1

					}]
				}, {
					xtype: 'fieldcontainer',
					layout: 'hbox',
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					items: [{
						fieldLabel: 'Precio',
						itemId: 'precio_total_curso',
						name: 'precio_total_curso',
						margin: '10 10 0 5',
						readOnly: true,
						allowBlank: false,

					}, {
						fieldLabel: 'Uniforme',
						itemId: 'estado_uniforme_inscripcion',
						name: 'estado_uniforme_inscripcion',
						margin: '10 10 0 5',

						xtype: 'combo',
						dock: 'top',
						enableKeyEvents: true,
						editable: false,
						displayField: 'uniforme',
						valueField: 'estado_uniforme_inscripcion',
						mode: 'local',
						allowBlank: false,
						triggerAction: 'all',
						emptyText: 'Seleccionar',
						store: new Ext.data.SimpleStore(
							{
								fields: [
									'estado_uniforme_inscripcion',
									'uniforme'],
								data: [
									['1',
										'Entregado'],
									['0',
										'Pendiente'],
									['2',
										'Sin Uniforme'],

								]
							}),
						queryMode: 'local'

					}, {
						fieldLabel: 'Condicion de Pago',

						margin: '10 10 0 5',
						itemId: 'condicion_pago_inscripcion',
						name: 'condicion_pago_inscripcion',

						xtype: 'combo',
						dock: 'top',
						enableKeyEvents: true,
						editable: false,
						displayField: 'condicion',
						valueField: 'condicion_pago_inscripcion',
						mode: 'local',
						allowBlank: false,
						triggerAction: 'all',
						emptyText: 'Seleccionar',
						store: new Ext.data.SimpleStore(
							{
								fields: [
									'condicion_pago_inscripcion',
									'condicion'],
								data: [
									['1',
										'Totalidad'],
									['0',
										'Cuotas']

								]
							}),
						queryMode: 'local'

					}, {
						xtype: 'checkbox',

						fieldLabel: 'Curso Indefinido',
						margin: '10 10 0 5',
						itemId: 'curso_variable_inscripcion',
						name: 'curso_variable_inscripcion',
						inputValue: 1


					}]
				}],
				buttons: [{
					text: 'Guardar',
					iconCls: 'x-fa fa-save',
					itemId: 'guardar_inscripcion',

					style: {
						'background-color': 'green'

					},

					handler: function (record) {

						me = this;

						Ext.MessageBox.show({
							title: 'Mensaje',
							msg: 'Desea guardar  el registro?',
							buttons: Ext.MessageBox.OKCANCEL,
							icon: Ext.MessageBox.QUESTION,

							fn: function (btn) {
								if (btn == 'ok') {



									var window = me.up('window');
									var form = Ext.ComponentQuery.query('#inscripcionForm')[0].getForm();
									me.fireEvent('btnCreate', form, window,
										record);

								}
							}

						});


					}
				}, {

					iconCls: 'fas fa-sync-alt',
					text: 'Refrescar',
					style: {
						'background-color': 'red'

					},
					handler: function () {
						Ext.ComponentQuery.query('#inscripcionForm')[0]
							.getForm().reset();

						Ext.ComponentQuery.query('Inscripciones #nombre_alumno_ins')[0].reset();
						Ext.ComponentQuery.query('Inscripciones #apellido_alumno_ins')[0].reset();
						Ext.ComponentQuery.query('Inscripciones #direccion_alumno_ins')[0].reset();
						Ext.ComponentQuery.query('Inscripciones #celular_alumno_ins')[0].reset();
						Ext.ComponentQuery.query('Inscripciones #correo_alumno_ins')[0].reset();
						Ext.ComponentQuery.query('Inscripciones #cedula_alumno_ins')[0].reset();
						Ext.ComponentQuery.query('Inscripciones #nombre_curso')[0].reset();
						Ext.ComponentQuery.query('Inscripciones #precio_curso')[0].reset();
						Ext.ComponentQuery.query('Inscripciones #matricula_curso')[0].reset();

						Ext.ComponentQuery.query('Inscripciones #mensualidad_curso')[0].reset();
						Ext.ComponentQuery.query('Inscripciones #duracion_curso')[0].reset();
						Ext.ComponentQuery.query('Inscripciones #instructor_curso')[0].reset();


					}

				}



				]

			}]
		}

		]
	}]

});