Ext.define('Legion.view.curso.Cursos', {
	extend: 'Ext.TabPanel',
	alias: 'widget.Cursos',
	autoScroll: true,

	listeners: {
		render: function () {

			Ext.Ajax.request({
				url: 'php/negocios/usuarios/recuperarUsuario.php',
				method: 'POST',


				success: function (response) {

					var response_aux = Ext.util.JSON
						.decode(response.responseText, true);
					console.log(response_aux)


					if (response_aux.rol == 2 || response_aux.rol == 3) {
						Ext.ComponentQuery.query('#sucursal_busqueda_curso')[0].hide();
						Ext.ComponentQuery.query('#id_fkempresa_sucursal_curso')[0].hide();
						Ext.ComponentQuery.query('#id_fkempresa_sucursal_curso_bus')[0].hide();


						Ext.ComponentQuery.query('#id_fksucursal_curso')[0].setValue(response_aux.sucursal);
						Ext.ComponentQuery.query('#id_fksucursal_curso')[0].setReadOnly(true);





					}



				}

			}

			);
		}
	},


	items: [

		{
			title: 'Listado Curso',
			items: [{
				xtype: 'component',
				html: 'Listado de Cursos',

				style: {
					'backgroundColor': '#05723A',
					'color': '#FFFFFF',
					'font-size': '16px',
					'padding': '15px'


				}

			},

			{

				xtype: 'container',
				itemId: 'container',

				items: [{
					xtype: 'fieldset',
					itemId: 'fieldset',

					title: 'Busqueda Cursos',

					defaultType: 'textfield',
					defaults: {
						anchor: '100%'
					},
					layout: 'column',
					items: [{
						columnWidth: 0.33,
						fieldLabel: 'Nombre',
						itemId: 'nombre_busqueda_curso',
						name: 'nombre_busqueda_curso',
						margin: '0 0 0 5',

					},
					{
						columnWidth: 0.33,
						xtype: 'combo',
						fieldLabel: 'Institucion',
						margin: '0 0 0 5',
						name: 'id_fkempresa_sucursal',
						itemId: 'id_fkempresa_sucursal_curso_bus',
						enableKeyEvents: true,
						editable: false,

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
									.query('#id_fkempresa_sucursal_curso_bus')[0]
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

						xtype: 'combo',
						margin: '0 0 0 5',
						name: 'id_fksucursal_curso',
						itemId: 'sucursal_busqueda_curso',
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
						itemId: 'boton_buscar_curso',
						handler: function () {
							this.fireEvent('btnBuscar');
						}

					}, {

						xtype: 'button',
						margin: '0 0 0 5',
						iconCls: 'x-fa fa-eraser',
						itemId: 'boton_refresh_curso',
						handler: function () {
							this.fireEvent('btnRefresh');
						}

					},


					{
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
							itemId: 'comboMes_curso',
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
							itemId: 'comboAnioFactura_curso',
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
							itemId: 'buscarPorFechaDesde_curso',
							format: 'Y-m-d',
							enableKeyEvents: true,
							emptyText: "Desde",
							fieldLabel: 'Desde'
						}, {
							columnWidth: 0.50,
							xtype: 'datefield',
							name: 'buscarPorFechaHasta',
							itemId: 'buscarPorFechaHasta_curso',
							format: 'Y-m-d',
							enableKeyEvents: true,
							emptyText: 'Hasta',
							fieldLabel: 'Hasta'
						}, {


							iconCls: 'fas fa-search',
							margin: '0 5 10 5',
							itemId: 'btnBuscarPorRangoFechaVenta_curso',
							cls: 'botonNuevo',
							xtype: 'button',

						}]
					}/*{
									xtype : 'combo',
									renderTo : document.body,
									itemId : 'mostrar_columnas',
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
															"name" : "Iva",
															"id" : 1
														}, {
															"name" : "Direccion",
															"id" : 2

														}]
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
								}
							*/]

				}

				]

			}, {

				alias: 'widget.CursoGrid',
				itemId: 'CursoGrid',
				xtype: 'grid',
				height: '100%',
				autoScroll: true,
				selType: 'rowmodel',
				selModel: {
					mode: 'SINGLE'
				},
				viewConfig: {
					stripeRows: true
				},
				store: 'Curso',
				height: 300,

				autoLoad: true,

				columns: [{
					text: "Nombre",
					flex: 2,
					dataIndex: 'nombre_curso',
					menuDisabled: true,

					renderer: function (value, meta, record) {
						if (value) meta.tdAttr = 'data-qtip="' + value + '"';
						return value;
					}

				}, {
					text: "F.Inicio",
					flex: 1,
					dataIndex: 'fecha_inicio_curso',

					menuDisabled: true

				}, {
					text: "F.Finalizacion",
					flex: 1,
					dataIndex: 'fecha_fin_curso',

					menuDisabled: true

				}, {
					text: "Iva",
					flex: 1,
					dataIndex: 'iva_curso',
					hidden: true,
					menuDisabled: true

				}, {
					text: "Instructor",
					flex: 1,
					dataIndex: 'nombre_instructor',
					menuDisabled: true,
					renderer: function (value, meta, record) {
						if (value) meta.tdAttr = 'data-qtip="' + value + '"';
						return value;
					}

				}, {
					text: "Sucursal",
					flex: 1,
					dataIndex: 'nombre_sucursal',
					menuDisabled: true,
					renderer: function (value, meta, record) {
						if (value) meta.tdAttr = 'data-qtip="' + value + '"';
						return value;
					}

				}, {
					text: "Duracion del Curso",
					flex: 1,
					dataIndex: 'duracion_mes_curso',
					menuDisabled: true,

					listeners: {
						render: function (c) {
							new Ext.ToolTip({
								target: c.getEl(),
								html: 'La duración esta en meses'
							});
						}
					},

				},
				{
					text: "Mensualidad",
					flex: 1,
					dataIndex: 'mensualidad_curso',
					menuDisabled: true,
					renderer: Ext.util.Format.usMoney

				}, {
					text: "Cuota de Entrada",
					flex: 1,
					dataIndex: 'cuota_entrada_curso',
					menuDisabled: true,
					renderer: Ext.util.Format.usMoney

				}, {
					text: "Cupos",
					flex: 1,
					dataIndex: 'cupos_curso',
					menuDisabled: true,
					hidden: true

				}, {
					text: "Precio",
					flex: 1,
					dataIndex: 'precio_curso',
					menuDisabled: true,
					renderer: Ext.util.Format.usMoney

				}, {
					text: "Usuario",
					flex: 1,
					dataIndex: 'nombre_usuario',
					menuDisabled: true,
					hidden: true

				}, {
					text: "Creado",
					flex: 1,
					dataIndex: 'created_at',
					menuDisabled: true,
					hidden: true

				},
				{
					text: "Estado",
					flex: 1,
					dataIndex: 'nombre_estado_curso',
					width: 100,
					menuDisabled: true,
					renderer: function (value, meta, record) {
						if (value == 'Activo') {
							return '<i   data-qtip="ESTADO ACTIVO" class="fas fa-circle " style="color:green;"></i>';
						} else if (value == 'Inactivo') {
							return '<i  data-qtip=" ESTADO INACTIVO" class="fas fa-circle " style="color:red;"></i>';
						}
					}

				},

				{
					text: "Horas",
					flex: 1,
					dataIndex: 'horas_curso',
					width: 70,

				},

				{
					text: "imagen_src",
					flex: 1,
					dataIndex: 'imagen_src',
					hidden: true


				},

				{
					xtype: 'actioncolumn',
					menuDisabled: true,
					width: 100,
					itemId: 'action_curso',

					items: [{

						tooltip: 'Editar',
						iconCls: 'x-fa fa-pen',
						itemId: 'editar_curso',
						handler: function (view, rowIndex,
							colIndex, item, e, record, row) {
							this.fireEvent('btnUpdate', view,
								rowIndex, colIndex, item, e,
								record, row);

						}

					}, {
						tooltip: 'Eliminar',
						iconCls: 'x-fa  fa-times',
						itemId: 'eliminar_curso',
						handler: function (grid, rowIndex, colIndex) {
							this.fireEvent('btnDelete', grid,
								rowIndex, colIndex);

						},

					}, {

						tooltip: 'Ver Imagen',
						iconCls: 'x-fa fa-eye',
						itemId: 'ver_curso',
						handler: function (view, rowIndex,
							colIndex, item, e, record, row) {
							this.fireEvent('btnShowCurso', view,
								rowIndex, colIndex, item, e,
								record, row);

						}
					},
					{

						tooltip: 'Menu',
						iconCls: 'x-fa fa-chevron-circle-down',
						itemId: 'menu_cursos',
						handler: function (grid, rowIndex,
							colIndex, item, e, record) {
							this.fireEvent('menu_cursos', grid, rowIndex, colIndex, item, e, record)
						}

					}


					]
				}],
				bbar: [{
					xtype: 'pagingtoolbar',
					store: 'Curso',
					displayInfo: true,
					displayMsg: 'Monstrando {0} a {1} de {2} &nbsp;registros ',
					emptyMsg: "No records to display&nbsp;",

				}]

			}]
		}, {
			title: 'Nuevo Curso',


			listeners: {

				deactivate: function () {


					if (Ext.ComponentQuery
						.query('#nombre_curso')[0]
						.getValue() != "" || Ext.ComponentQuery
							.query('#cupos_curso')[0]
							.getValue() != "" || Ext.ComponentQuery
								.query('#fecha_inicio_curso')[0]
								.getValue() != null) {

						Ext.MessageBox.show({
							title: 'Advertencia',
							msg: '¿Seguro desea abandonar el formulario?',
							buttons: Ext.MessageBox.OKCANCEL,
							icon: Ext.MessageBox.QUESTION,
							fn: function (btn) {
								if (btn == 'ok') {

									Ext.ComponentQuery.query('#usuarioForm')[0].getForm().reset();



								} else {
									Ext.ComponentQuery.query('Usuarios')[0].setActiveTab(1);
								}
							}
						});



					}
				}
			},

			items: [{

				itemId: 'fieldset',
				title: 'Nuevo Curso',
				header: {
					style: {
						backgroundColor: '#05723A' // Cambiar el color del nav
					}
				},
				defaultType: 'textfield',
				defaults: {
					anchor: '100%',
					width: '100%'

				},
				layout: 'hbox',
				items: [{

					xtype: 'form',
					itemId: 'cursoForm',
					margin: '10 10 0 5',
					alias: 'widget.CursosForm',
					name: 'CursosForm',
					buttonAlign: 'center',
					border: false,
					trackResetOnLoad: true,
					collapsible: false,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},

					store: 'Curso',
					fieldDefaults: {
						xtype: 'textfield',
						msgTarget: 'side',

						labelStyle: 'font-weight:bold'
					},
					listeners: {
						render: function () {
							store = Ext.getStore('Instructor');

							store.getProxy().extraParams = {
								nombre_busqueda: "",
								cedula_busqueda: "",
								estado: 1

							}

						}
					},
					defaultType: 'textfield',
					items: [


						{
							layout: 'hbox',
							xtype: 'fieldcontainer',
							items: [{

								xtype: 'fieldcontainer',
								layout: {
									type: 'vbox',
									align: 'stretch'
								},
								width: 850,
								items: [
									{
										xtype: 'fieldcontainer',
										layout: 'hbox',
										defaultType: 'textfield',

										fieldDefaults: {

											labelStyle: 'font-weight:bold'
										},
										items: [{
											fieldLabel: 'id',
											itemId: 'id_curso',
											name: 'id_curso',
											hidden: true,
											flex: 1

										}, {
											fieldLabel: 'Nombre del Curso',
											itemId: 'nombre_curso',
											allowBlank: false,
											name: 'nombre_curso',
											margin: '10 0 0 5',
											flex: 1

										}, {
											fieldLabel: 'Cupos',

											name: 'cupos_curso',
											itemId: 'cupos_curso',
											margin: '10 0 0 5',

											allowBlank: false,
											flex: 1,
											enableKeyEvents: true,
											maxLength: 2,
											minLength: 1,
											maskRe: /[0-9.]/,
											enforceMaxLength: true


										},
										{
											fieldLabel: 'id',
											itemId: 'imagen_validar_curso',
											name: 'imagen_validar_curso',
											hidden: true,
											flex: 1
										},

										]
									}, {

										xtype: 'fieldcontainer',
										layout: 'hbox',
										defaultType: 'textfield',

										fieldDefaults: {

											labelStyle: 'font-weight:bold'
										},
										items: [{

											fieldLabel: 'Fecha Inicio',
											xtype: 'datefield',
											margin: '10 0 0 5',
											allowBlank: false,
											itemId: 'fecha_inicio_curso',
											name: 'fecha_inicio_curso',
											format: 'Y-m-d',
											editable: false,
											flex: 1

										},
										{

											fieldLabel: 'Duracion(meses)',

											name: 'duracion_mes_curso',
											itemId: 'duracion_mes_curso',
											margin: '10 0 0 5',

											xtype: 'combo',
											listConfig: {
												listeners: {
													select: function () {
														console.log("sss");
														fecha_inici = Ext.ComponentQuery
															.query('#fecha_inicio_curso')[0]
															.getValue();

														duracion = Ext.ComponentQuery
															.query('#duracion_mes_curso')[0]
															.getValue();
														fecha = fecha_inici;
														dia = fecha.getDate();
														mes = fecha.getMonth() + 1 + parseInt(duracion);
														anio = fecha.getFullYear();

														if (parseInt(mes) < 10) {
															mes = "0" + mes;

														}

														if (parseInt(mes) > 12) {
															dato = parseInt(mes) - 12;

															anio = fecha.getFullYear() + 1;




															mes_nuevo = fecha.getMonth() - fecha.getMonth() + dato
															if (parseInt(mes_nuevo) < 10) {
																mes = "0" + mes_nuevo
															} else {
																mes = mes_nuevo;
															}



														}
														if(dia<10)
														{
															dia = "0"+dia;
														}
														else{
															dia= dia;
														}
														fecha_final =anio + "-" + mes + "-" + dia;
console.log(fecha_final);
													Ext.ComponentQuery
															.query('#fecha_fin_curso')[0]
															.setValue(fecha_final);



													}
												}
											},
											allowBlank: false,

											editable: false,
											displayField: 'meses',
											valueField: 'duracion',

											emptyText: 'Seleccionar',
											store: new Ext.data.SimpleStore({
												fields: ['duracion', 'meses'],
												data: [['1', '1'],
												['2', '2'],
												['3', '3'],
												['4', '4'],
												['5', '5'],
												['6', '6'],
												['7', '7'],
												['8', '8'],
												['9', '9'],
												['10', '10'],
												['11', '11'],
												['12', '12']

												]
											}),


											flex: 1
										}],


									}, {
										xtype: 'fieldcontainer',
										layout: 'hbox',
										defaultType: 'textfield',

										fieldDefaults: {

											labelStyle: 'font-weight:bold'
										},
										items: [{
											fieldLabel: 'Fecha Finalizacion',
											xtype: 'datefield',
											margin: '10 0 0 5',
											allowBlank: false,
											itemId: 'fecha_fin_curso',
											name: 'fecha_fin_curso',
											format: 'Y-m-d',
											
											flex: 1,
											
										}, {
											xtype: 'combo',
											fieldLabel: 'Instructor',
											margin: '10 0 0 5',
											name: 'id_fkinstructor_curso',
											itemId: 'id_fkinstructor_curso',
											allowBlank: false,
											editable: false,
											emptyText: 'Seleccionar',
											autoLoad: true,
											store: 'Instructor',
											displayField: 'nombre_instructor',
											valueField: 'id_instructor',
											flex: 1,





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

												fieldLabel: 'Mensualidad $',

												allowBlank: false,
												itemId: 'mensualidad_curso',
												name: 'mensualidad_curso',
												margin: '10 0 0 5',

												maskRe: /[0-9.]/,

												flex: 1,
												listeners: {
													change: function () {
														store = Ext.getStore('Sucursal');
														mes = Ext.ComponentQuery
															.query('#mensualidad_curso')[0]
															.getValue();

														duracionn = Ext.ComponentQuery
															.query('#duracion_mes_curso')[0]
															.getValue();


														precio = duracion * mes;
														Ext.ComponentQuery
															.query('#precio_curso')[0]
															.setValue(precio);



													}
												}

											}, {

												fieldLabel: 'Uniforme $',

												name: 'cuota_entrada_curso',
												itemId: 'cuota_entrada_curso',
												margin: '10 0 0 5',
												maskRe: /[0-9.]/,
												allowBlank: false,
												flex: 1


											}, {
												fieldLabel: 'Precio $',
												maskRe: /[0-9.]/,
												name: 'precio_curso',
												itemId: 'precio_curso',
												margin: '10 0 0 5',
												allowBlank: false,
												flex: 1,
												readOnly: true,
											},
											{
												fieldLabel: 'Horas',
												maskRe: /[0-9.]/,
												name: 'horas_curso',
												itemId: 'horas_curso',
												margin: '10 0 0 5',
												allowBlank: false,
												flex: 1,

											},

										]
									}, {
										xtype: 'fieldcontainer',
										layout: 'hbox',
										defaultType: 'textfield',

										fieldDefaults: {

											labelStyle: 'font-weight:bold'
										},

										items: [{
											fieldLabel: 'IVA %',
											itemId: 'iva_curso',
											name: 'iva_curso',
											margin: '10 0 0 5',
											xtype: 'combo',
											dock: 'top',
											allowBlank: false,
											enableKeyEvents: true,
											editable: false,
											displayField: 'iva',
											valueField: 'iva_curso',
											mode: 'local',
											triggerAction: 'all',
											emptyText: 'Seleccionar',
											store: new Ext.data.SimpleStore({
												fields: ['iva_curso',
													'iva'],
												data: [['12', '12%'],
												['0', '0%']

												]
											}),
											queryMode: 'local',

											flex: 1
										}, {
											xtype: 'combo',
											fieldLabel: 'Institucion',
											margin: '10 0 0 5',
											name: 'id_fkempresa_sucursal',
											itemId: 'id_fkempresa_sucursal_curso',
											enableKeyEvents: true,
											editable: false,

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
														.query('#id_fkempresa_sucursal_curso')[0]
														.getValue();

													store.getProxy().extraParams = {
														id_empresa: value,
														nombre_busqueda: ""

													}
													store.load();


												}
											}

										},]

									}, {
										xtype: 'fieldcontainer',
										layout: 'hbox',
										defaultType: 'textfield',

										fieldDefaults: {

											labelStyle: 'font-weight:bold'
										},

										items: [{
											xtype: 'combo',
											fieldLabel: 'Sucursal',
											margin: '10 0 0 5',
											name: 'id_fksucursal_curso',
											itemId: 'id_fksucursal_curso',
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
											flex: 1,


										}, {
											fieldLabel: 'Usuario',

											name: 'id_fkusuario_curso',
											itemId: 'id_fkusuario_curso',
											margin: '10 0 0 5',
											hidden: true,
											flex: 1

										},
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
											itemId: 'estado_curso',
											name: 'estado_curso',
											margin: '10 0 0 5',
											xtype: 'combo',
											allowBlank: false,
											dock: 'top',
											enableKeyEvents: true,
											editable: false,
											displayField: 'estado',
											valueField: 'estado_curso',
											mode: 'local',
											triggerAction: 'all',
											emptyText: 'Seleccionar',
											store: new Ext.data.SimpleStore({
												fields: ['estado_curso',
													'estado'],
												data: [['1', 'Activo'],
												['0', 'Inactivo']

												]
											}),
											queryMode: 'local',
											flex: 1,
											value: 1,
											readOnly: true,

										}, {
											fieldLabel: 'Imagen',
											xtype: 'filefield',
											name: 'imagen_curso',
											itemId: 'imagen_curso',
											margin: '10 0 0 5',
											allowBlank: false,
											flex: 1
										}]
									}

								]
							},
							{

								xtype: 'fieldcontainer',



								fieldDefaults: {

									labelStyle: 'font-weight:bold'
								},
								margin: '0 0 0 30',

								items: [
									{



										xtype: 'image',
										itemId: 'imagen_vista_curso',
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
					buttons: [{
						text: 'Guardar',
						itemId: 'guardar_curso',
						iconCls: 'x-fa fa-save',

						style: {
							'background-color': 'green'

						},
						handler: function () {

							me = this;

							Ext.MessageBox.show({
								title: 'Mensaje',
								msg: 'Desea guardar  el registro?',
								buttons: Ext.MessageBox.OKCANCEL,
								icon: Ext.MessageBox.QUESTION,

								fn: function (btn) {
									if (btn == 'ok') {



										var form = Ext.ComponentQuery.query('#cursoForm')[0]
											.getForm();
										me.fireEvent('btnCreate', form);


									}
								}

							});


						}
					},
					{

						iconCls: 'fas fa-sync-alt',
						text: 'Refrescar',
						style: {
							'background-color': 'red'

						},
						handler: function () {
							Ext.ComponentQuery.query('#cursoForm')[0]
								.getForm().reset();

						}
					}



					]

				}]

			}]
		}

	]
});