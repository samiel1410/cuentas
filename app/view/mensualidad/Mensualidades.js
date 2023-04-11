Ext.define('Legion.view.mensualidad.Mensualidades', {
	extend : 'Ext.TabPanel',
	alias : 'widget.Mensualidades',
	autoScroll : true,
	autoHeight : true,

	items : [

	{
		title : 'Listado Mensualidades',
		
		items : [{
					xtype : 'component',
					html : 'Listado de Mensualidades',
					style : {
						'backgroundColor' : '#05723A',
						'color' : '#FFFFFF',
						'font-size' : '16px',
						'padding' : '15px'
						

					}

				}, {

					xtype : 'container',
					itemId : 'container',

					items : [{
						xtype : 'fieldset',
						itemId : 'fieldset',

						title : 'Busqueda Mensualidades',

						defaultType : 'textfield',
						defaults : {
							anchor : '100%'
						},
						layout : 'hbox',
						items : [{
									fieldLabel : 'Estado',

									xtype : 'combo',
							

									name : 'estado_mensualidad',
									itemId : 'estado_busqueda_mensualidad',
									enableKeyEvents : true,
									editable : false,
									allowBlank : false,
									typeAhead : true,
									mode : 'local',
									triggerAction : 'all',
									emptyText : 'Seleccionar',
									autoLoad : true,
									store : '',
									displayField : 'nombre_sucursal',
									valueField : 'id_sucursal',

									renderTo : Ext.getBody()
								}, {

									xtype : 'button',
									margin : '0 0 0 5',
									iconCls : 'x-fa  fa-search',
									itemId : 'boton_buscar_instructor',
									handler : function() {
										this.fireEvent('btnBuscar');
									}

								}, {

									xtype : 'button',
									margin : '0 0 0 5',
									iconCls : 'x-fa fa-eraser',
									itemId : 'boton_refresh_instructor',
									handler : function() {
										this.fireEvent('btnRefresh');
									}

								}, {
									xtype : 'combo',
									renderTo : document.body,
									itemId : 'mostrar_columnas_instructores',
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
															"name" : "Direccion",
															"id" : 1
														}, {
															"name" : "Titulo",
															"id" : 2

														}, {
															"name" : "Cedula",
															"id" : 3

														}, {
															"name" : "Creado",
															"id" : 4

														}

												]
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
								}]

					}

					]

				}, {

					alias : 'widget.MnesualidadGrid',
					itemId : 'MensualidadGrid',
					xtype : 'grid',
					height : 400,
					autoScroll : true,
					selType : 'rowmodel',
					selModel : {
						mode : 'SINGLE'
					},
					viewConfig : {
						stripeRows : true
					},
					store : 'Mensualidad',

					autoLoad : true,

					columns : [{
								text : "Id",
								
								dataIndex : 'id_mensualidad',
								menuDisabled : true

							},
							{
								text : "Concepto",
								flex : 1,
								dataIndex : 'concepto_mensualidad',
								menuDisabled : true

							},{
								text : "Inscripcion",
								flex : 1,
								dataIndex : 'id_fkinscripcion_mensualidad',
								menuDisabled : true

							}, {
								text : "Numero de Orden",
								flex : 1,
								dataIndex : 'id_fkorden_pedido_mensualidad',
								menuDisabled : true

							}, {
								text : "Numero de Cuota",
								flex : 1,
								dataIndex : 'numero_cuota_mensualidad',
								menuDisabled : true

							}, {
								text : "Fecha de Pago",
								flex : 1,
								dataIndex : 'fecha_pago_mensualidad',
								menuDisabled : true

							}, {
								text : "Estado",
								flex : 1,
								dataIndex : 'nombre_estado_mensualidad',
				
								menuDisabled : true

							}, {
								text : "Total",
								flex : 1,
								dataIndex : 'monto_mensualidad',
								hidden : true,
								menuDisabled : true

							}, {
								text : "Abonado",
								flex : 1,
								dataIndex : 'abonado_mensualidad',
								menuDisabled : true

							}, {
								text : "Saldo Pendiente",
								flex : 1,
								dataIndex : 'saldo_mensualidad',
								menuDisabled : true

							}, {
								text : "Creado",
								flex : 1,
								dataIndex : 'created_at'
								

							}, 
						

							{
								xtype : 'actioncolumn',
								itemId : 'action_mensualidad',
								width : 75,
								items : [{

									tooltip : 'Editar',
									iconCls : 'x-fa fa-pen',
									itemId : 'editar_mensualidad',
									handler : function(view, rowIndex,
											colIndex, item, e, record, row) {
										this.fireEvent('btnUpdate', view,
												rowIndex, colIndex, item, e,
												record, row);

									}

								}, {
									tooltip : 'Eliminar',
									iconCls : 'x-fa fa-times',
									itemId : 'eliminar_mensualidad',
									handler : function(grid, rowIndex, colIndex) {
										this.fireEvent('btnDelete', grid,
												rowIndex, colIndex);

									}
								}

								]
							}],
					bbar : [{
						xtype : 'pagingtoolbar',
						store : 'Mensualidad',
						displayInfo : true,
						displayMsg : 'Displaying {0} to {1} of {2} &nbsp;records ',
						emptyMsg : "No records to display&nbsp;",
						listeners : {
							beforechange : function(store) {
								this.fireEvent('pagination', store)

							}

						}
					}]

				}]

	}

	]
});
