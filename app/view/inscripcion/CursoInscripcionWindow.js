Ext.define('Legion.view.inscripcion.CursoInscripcionWindow', {
	extend : 'Ext.window.Window',
	alias : 'widget.window_curso_inscripcion',
	itemId : 'window_curso_inscripcion',
	title : 'Cursos',
	width:1000,
	resizable : false,
	modal : true,

	listeners:{
		beforerender: function(){

			Ext.Ajax.request({
				url : 'php/negocios/usuarios/recuperarUsuario.php',
				method : 'POST',
				
	
				success : function(response) {
	
					var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
			
	
	
					if(response_aux.rol==2|| response_aux.rol==3){

				
						Ext.ComponentQuery.query('#sucursal_busqueda_curso_ins')[0]
						.hide();

						
					
	
					}else{
						
					}
					
				
	
				
				}
	
			}
	
			);
	

		}
	},
	items : [{
		
		
		items : [
				{

					xtype : 'container',
					itemId : 'container',

					items : [{
						xtype : 'fieldset',
						itemId : 'fieldset',

						title : 'Busqueda Cursos',

						defaultType : 'textfield',
						defaults : {
							anchor : '100%'
						},
						layout : 'hbox',
						items : [{
									fieldLabel : 'Nombre',
									itemId : 'nombre_busqueda_curso_ins',
									name : 'nombre_busqueda_curso'

								}, {
									fieldLabel : 'Sucursal',

									xtype : 'combo',

									name : 'id_fksucursal_curso',
									itemId : 'sucursal_busqueda_curso_ins',
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

									renderTo : Ext.getBody()
								}, {

									xtype : 'button',
									margin : '0 0 0 5',
									iconCls : 'x-fa  fa-search',
									itemId : 'boton_buscar_curso_ins',
									handler : function() {
										this.fireEvent('btnBuscarIns');
									}

								}, {

									xtype : 'button',
									margin : '0 0 0 5',
									iconCls : 'x-fa fa-eraser',
									itemId : 'boton_refresh_curso_ins',
									handler : function() {
										this.fireEvent('btnRefreshIns');
									}

								
								}]

					}

					]

				}, {

					alias : 'widget.CursoGrid',
					itemId : 'CursoGrid',
					xtype : 'grid',
					height : '100%',
					autoScroll : true,
					selType : 'rowmodel',
					selModel : {
						mode : 'SINGLE',
						
					},

					
					

					viewConfig : {
						stripeRows : true
					},
					store : 'Curso',

					autoLoad : true,
					

					columns : [{
								text : "Nombre",
								width : 150,
								dataIndex : 'nombre_curso',
								menuDisabled : true

							}, {
								text : "Estado",
								flex : 1,
								dataIndex : 'nombre_estado_curso',
								width : 100,
								menuDisabled : true,
								hidden:true

							}, {
								text : "Fecha Inicio",
								width : 100,
								dataIndex : 'fecha_inicio_curso',

								menuDisabled : true

							}, {
								text : "Fecha Finalizacion",
								width : 120,
								dataIndex : 'fecha_fin_curso',
								menuDisabled : true
								

							}, {
								text : "Iva",
								flex : 1,
								dataIndex : 'iva_curso',
								hidden : true,
								menuDisabled : true

							}, {
								text : "Instructor",
								width : 100,
								dataIndex : 'nombre_instructor',
								menuDisabled : true

							}, {
								text : "Sucursal",
								flex:1,
								dataIndex : 'nombre_sucursal',
								menuDisabled : true

							}, {
								text : "Duracion",
								width : 80,
								dataIndex : 'duracion_mes_curso',
								menuDisabled : true

							}, {
								text : "Entrada",
								width : 80,
								dataIndex : 'cuota_entrada_curso',
								menuDisabled : true,
								renderer: Ext.util.Format.usMoney

							},
							{
								text : "Mensualidad",
								width : 80,
								dataIndex : 'mensualidad_curso',
								menuDisabled : true,
								renderer: Ext.util.Format.usMoney

							}, {
								text : "Cupos",
							
								dataIndex : 'cupos_curso',
								menuDisabled : true,
								width : 60,
							}, {
								text : "Precio",
								renderer: Ext.util.Format.usMoney,
								
								dataIndex : 'precio_curso',
								menuDisabled : true,
								width : 60,

							},  {
								text : "Creado",
								flex : 1,
								dataIndex : 'created_at',
								menuDisabled : true,
								hidden:true

							},{
									text : "Sucursal_id",
								flex : 1,
								dataIndex : 'id_fksucursal_curso',
								menuDisabled : true,
								hidden:true
								
								
							},

							

							{
								xtype : 'actioncolumn',
								itemId : 'action_curso_inscripcion',
								menuDisabled : true,
								width : 20,
								items : [{

									tooltip : 'Editar',
									iconCls : 'x-fa fa-arrow-right',
									itemId : 'cargar_curso',
									handler : function(view, rowIndex,
											colIndex, item, e, record, row) {
												me = this;

												id_alumno_ = Ext.ComponentQuery.query('Inscripciones #id_fkalumno_inscripcion')[0]
												.getValue();
												console.log("datos",record.data.id_curso, "alumno",id_alumno_);

												nombre = Ext.ComponentQuery.query('Inscripciones #nombre_alumno_ins')[0]
												.getValue();

												apellido = Ext.ComponentQuery.query('Inscripciones #apellido_alumno_ins')[0]
												.getValue();
												
												Ext.Ajax.request({
													url : 'php/negocios/inscripciones/verificarAlumnoCurso.php',
													method : 'POST',
													params:{
														id_alumno :id_alumno_,
														id_curso: record.data.id_curso
													},
													
										
													success : function(response) {
										
														var response_aux = Ext.util.JSON
														.decode(response.responseText, true);
														console.log(response_aux.encontro)

														if(response_aux.encontro==1){

															Ext.MessageBox.show({
																title: 'Mensaje',
																msg: 'El Alumno  '+nombre+' '+apellido+' ya se encuentra en este curso. Por favor eliga otro',
																buttons: Ext.MessageBox.OK,
																icon: Ext.MessageBox.WARNING
					
															});

													


														}if(response_aux.encontro!=1){

																
															me.fireEvent('btnCargarCurso', view,
															rowIndex, colIndex, item, e,
															record, row);

															Ext.ComponentQuery.query('#window_curso_inscripcion')[0]
															.close()
														}
										
										
										
										
													
													}
										
												}
										
												);
									

									}

								}

								]
							}],

							
					bbar : [{
						xtype : 'pagingtoolbar',
						store : 'Curso',
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
				
	}]

});