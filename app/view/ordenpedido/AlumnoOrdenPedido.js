Ext.define('Legion.view.ordenpedido.AlumnoOrdenPedido', {
	extend : 'Ext.window.Window',
	alias : 'widget.window_alumno_orden',
	itemId : 'window_alumno_orden',
	title : 'Inscripciones Activas',
	width : 700,

	modal : true,
	items : [{
				xtype : 'fieldset',
				itemId : 'fieldset',

				title : 'Busqueda de Inscripciones',

				defaultType : 'textfield',

				layout : 'hbox',
				items : [{
							fieldLabel : '# de Inscripcion',
							itemId : 'numero_inscripcion',
							itemId : 'numero_inscripcion',

						}, 
						
						{

							xtype : 'button',
							margin : '0 0 0 5',
						
							iconCls: 'x-fa  fa-search',
							itemId : 'boton_buscar_inscripcion',
							handler : function() {
								this.fireEvent('btnBuscarOrd');
							}

						},
						{

							xtype : 'button',
							margin : '0 0 0 5',
							iconCls : 'x-fa fa-sync-alt',
							itemId : 'boton_refresh_alumno',
							handler : function() {
								this.fireEvent('btnRefreshOrd');
							}

						}]

			}, {

				alias : 'widget.AlumnoInscriGrid',
				itemId : 'AlumnoInscriGrid',
				xtype : 'grid',
				selType : 'rowmodel',
				selModel : {
					mode : 'SINGLE'
				},
				viewConfig : {
					stripeRows : true
				},
				store : 'AlumnoInscripto',
				height : 400,
				autoLoad : true,

				columns : [{
							text : "Id",
							dataIndex : 'id_alumno',
							width : 50,
							hidden:true
						},
						{
							text : "Codigo",
							dataIndex : 'id_inscripcion',
							width : 100
						},  {
							text : "Nombre",
							flex : 1,
							dataIndex : 'nombre_alumno'

						}, {
							text : "Apellido",
							flex : 1,
							dataIndex : 'apellido_alumno',

							width : 100

						}, {
							text : "Direccion",
							flex : 1,
							dataIndex : 'direccion_alumno',
							hidden:true

						}, {
							text : "Celular",
							flex : 1,
							dataIndex : 'celular_alumno',
							hidden:true
						}, {
							text : "Correo",
							flex : 1,
							dataIndex : 'correo_alumno'

						}, {
							text : "Cedula",
							flex : 1,
							dataIndex : 'cedula_alumno'

						},

						{
							text : "Sucursal",
							flex : 1,
							dataIndex : 'nombre_sucursal',
							hidden:true

						},
						{
							text : "Curso",
							flex : 1,
							dataIndex : 'nombre_curso'

						},
						{
							text:'IVA',
							dataIndex:'iva_curso',
							
						}
						

						,
						{
							text:'Instructor',
							dataIndex:'nombre_instructor',
							hidden:true
							
						},

						{
							xtype : 'actioncolumn',
							itemId : 'action_alumno_orden',
							width : 75,
							items : [{

								tooltip : 'Agregar',
								iconCls : 'x-fa fa-arrow-right',
								handler : function(view, rowIndex, colIndex,
										item, e, record, row) {
									this.fireEvent('btnCargarAlumnoOrden', view,
											rowIndex, colIndex, item, e,
											record, row);

								}

							}

							]
						}],
				bbar : [{
							xtype : 'pagingtoolbar',
							store : 'AlumnoInscripto',
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

});