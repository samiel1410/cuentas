Ext.define('Legion.view.inscripcion_web.InscripcionesWeb', {
	extend : 'Ext.container.Container',
	alias : 'widget.InscripcionesWeb',
	autoScroll : true,
	autoHeight : true,

	items : [{
				xtype : 'component',
				html : 'Listado de Inscripciones por la Web',
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

							title : 'Busqueda Inscripciones Web',

							defaultType : 'textfield',
							defaults : {
								anchor : '100%'
							},
							layout : 'hbox',
							items : [{
										fieldLabel : 'Cedula',
										itemId : 'cedula_web',
										

										

									}, {

										xtype : 'button',
										margin:'0 10',

										iconCls : 'x-fa  fa-eraser',
										itemId : 'boton_refresh_cedula',
										handler : function() {
											this.fireEvent('btnRefresh');
										}

									}]

						}

				]

			}, {

				alias : 'widget.WebGrid',
				itemId : 'WebGrid',
				xtype : 'grid',
				selType : 'rowmodel',
				selModel : {
					mode : 'SINGLE'
				},
				viewConfig : {
					stripeRows : true
				},
				store : 'InscripcionesWeb',
				height: 300,

				autoLoad : true,

				columns : [{
							text : "Id",
							dataIndex : 'id_inscripcion_web',
							width : 50,
							hidden:true
						},  {
							text : "Cedula",
							flex : 1,
							dataIndex : 'cedula'

						}, 
						
						
						{
							text : "Nombre",
							flex : 1,
							dataIndex : 'id_institucion',
                            hidden:true

						}, 
                        {
							text : "Institucion",
							flex : 1,
							dataIndex : 'alias_empresa'

						}, 
                        {
							text : "Curso",
							flex : 1,
							dataIndex : 'nombre_curso'

						}, 
                       
                        {
							text : "Nombre",
							flex : 1,
							dataIndex : 'nombre'

						}, 
                        {
							text : "Apellido",
							flex : 1,
							dataIndex : 'apellido'

						}, 
						{
							text : "Celular",
							flex : 1,
							dataIndex : 'celular'

						}, 
						
                        {
							text : "Tipo de Sangre",
							flex : 1,
							dataIndex : 'tipo_sangre',
							hidden:true

						}, 
                        {
							text : "Direccion",
							flex : 1,
							dataIndex : 'dirreccion'

						}, 
                        {
							text : "Nombre",
							flex : 1,
							dataIndex : 'id_provincia',
                            hidden:true

						}, 
                        {
							text : "Provincia",
							flex : 1,
							dataIndex : 'provincia'

						}, 
						
                       
                        {
							text : "Ciudad",
							flex : 1,
							dataIndex : 'canton'

						}, 
                        {
							text : "Representante",
							flex : 1,
							dataIndex : 'representante',
							hidden:true

						}, 
                        {
							text : "Numero Representante",
							flex : 1,
							dataIndex : 'numero_repre',
							hidden:true

						}, 
                        {
							text : "Correo",
							flex : 1,
							dataIndex : 'correo'

						}, 
						{
							text : "Estado",
							flex : 1,
							dataIndex : 'nombre_estado',
						

						}, 
						{
							text : "Estado",
							flex : 1,
							dataIndex : 'estado',
							hidden:true

						}, 
                        {
							text : "Unidad Educativa",
							flex : 1,
							dataIndex : 'estudios',
							hidden:true

						}, 
                        {
							text : "Talla Uniforme",
							flex : 1,
							dataIndex : 'talla_uniforme',
							hidden:true

						}, 
                        {
							text : "Calzado",
							flex : 1,
							dataIndex : 'numero_calzado',
							hidden:true

						}, 
                        {
							text : "Creado",
							flex : 1,
							dataIndex : 'created_at',
							hidden:true
							

						}, 


						{
							xtype : 'actioncolumn',
							itemId : 'action_web',
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
								itemId : 'eliminar_web',
								handler : function(view, rowIndex, colIndex, item, e, record, row) {
									this.fireEvent('btnDelete', view, rowIndex, colIndex, item, e, record, row);

								}
							},
							{
								tooltip : 'Procesar',
								iconCls : 'fas fa-graduation-cap',
								itemId : 'procesar_web',
								handler : function(view, rowIndex, colIndex,
									item, e, record, row) {
									this.fireEvent('btnProcesarWeb', view, rowIndex, colIndex,
									item, e, record, row);

								}
							}

							]
						}],
				bbar : [{
							xtype : 'pagingtoolbar',
							store : 'InscripcionesWeb',
							displayInfo : true,
							displayMsg : 'Displaying {0} to {1} of {2} &nbsp;records ',
							emptyMsg : "No records to display&nbsp;",
						
						}]

			}

	]
});