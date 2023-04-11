Ext.define('Legion.view.forma_pago.FormaPagos', {
	extend : 'Ext.container.Container',
	alias : 'widget.FormaPagos',
	autoScroll : true,
	autoHeight : true,

	items : [{
				xtype : 'component',
				html : 'Listado de Formas de Pagos',
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

							title : 'Busqueda Formas de Pagos',

							defaultType : 'textfield',
							defaults : {
								anchor : '100%'
							},
							layout : 'hbox',
							items : [{
										fieldLabel : 'Nombre',
										itemId : 'nombre_busqueda_forma_pago',
										name : 'nombre_busqueda_forma_pago'
										,

									}, {

										xtype : 'button',

										iconCls : 'x-fa fa-sync-alt',
										itemId : 'boton_refresh_forma',
										handler : function() {
											this.fireEvent('btnRefresh');
										}

									}, {

										xtype : 'button',
										margin : '0 0 0 10',
										name : 'nuevo_forma_pago',
										text : 'Nueva Forma de Pago',
										itemId : 'mostrar_formulario_forma',
										handler : function() {
											this.fireEvent('btnWindow');
										}

									},]

						}

				]

			}, {

				alias : 'widget.FormaGrid',
				itemId : 'FormaGrid',
				xtype : 'grid',
				selType : 'rowmodel',
				selModel : {
					mode : 'SINGLE'
				},
				viewConfig : {
					stripeRows : true
				},
				store : 'FormaPago',
				height: 300,

				autoLoad : true,

				columns : [{
							text : "Id",
							dataIndex : 'id_forma',
							width : 50
						}, {
							text : "Nombre",
							flex : 1,
							dataIndex : 'nombre_forma'

						}, {
							text : "Creado",
							flex : 1,
							dataIndex : 'created_at'

						},

						{
							xtype : 'actioncolumn',
							itemId : 'action_forma',
							width : 75,
							items : [{

								tooltip : 'Editar',
								iconCls : 'x-fa fa-pen',
								itemId : 'editar_forma',
								handler : function(view, rowIndex, colIndex,
										item, e, record, row) {
									this.fireEvent('btnUpdate', view, rowIndex,
											colIndex, item, e, record, row);

								}

							}, {
								tooltip : 'Eliminar',
								iconCls : 'x-fa fa-times',
								itemId : 'eliminar_forma',
								handler : function(grid, rowIndex, colIndex) {
									this.fireEvent('btnDelete', grid, rowIndex,
											colIndex);

								}
							}

							]
						}],
				bbar : [{
							xtype : 'pagingtoolbar',
							store : 'FormaPago',
							displayInfo : true,
							displayMsg : 'Displaying {0} to {1} of {2} &nbsp;records ',
							emptyMsg : "No records to display&nbsp;",
							listeners : {
								beforechange : function(store) {
									this.fireEvent('pagination', store)

								}

							}
						}]

			}

	]
});