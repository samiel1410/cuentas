Ext.define('Legion.view.inscripcion.AlumnoInscripcionWindow', {
	extend : 'Ext.window.Window',
	alias : 'widget.window_alumno_inscripcion',
	itemId : 'window_alumno_inscripcion',
	title : 'Alumnos',
	width : 700,
	resizable : false,
	listeners:{
		beforerender: function(){

			Ext.Ajax.request({
				url : 'php/negocios/usuarios/recuperarUsuario.php',
				method : 'POST',
				
	
				success : function(response) {
	
					var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
			
	
	
					if(response_aux.rol==2|| response_aux.rol==3){

				
						Ext.ComponentQuery.query('#sucursal_busqueda_inscripcion_ins')[0]
						.hide();

						
					
	
					}
					
				
	
				
				}
	
			}
	
			);
	

		}
	},

	

	modal : true,
	items : [{
				xtype : 'fieldset',
				itemId : 'fieldset',

				title : 'Busqueda Alumnos',

				defaultType : 'textfield',

				layout : 'hbox',
				items : [{
							fieldLabel : 'Nombre',
							itemId : 'nombre_busqueda_alumno_ins',
							name : 'nombre_busqueda_alumno'

						},  {
							fieldLabel : 'Sucursal',

							xtype : 'combo',

							name : 'id_fksucursal_curso',
							itemId : 'sucursal_busqueda_inscripcion_ins',
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

							xtype : 'button',
							margin : '0 0 0 5',
							iconCls : 'x-fa  fa-search',
							itemId : 'boton_buscar_alumno_ins',
							handler : function() {
								this.fireEvent('btnBuscarIns');
							}

						},
						{

							xtype : 'button',
							margin : '0 0 0 5',
							iconCls : 'x-fa fa-sync-alt',
							itemId : 'boton_refresh_alumno_ins',
							handler : function() {
								this.fireEvent('btnRefreshIns');
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
				store : 'Alumno',
				height : 400,
				autoLoad : true,

				columns : [{
							text : "Id",
							dataIndex : 'id_alumno',
							width : 50
						}, {
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
							dataIndex : 'direccion_alumno'

						}, {
							text : "Celular",
							flex : 1,
							dataIndex : 'celular_alumno'
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
							xtype : 'actioncolumn',
							itemId : 'action_alumno_inscripcion',
							width : 75,
							items : [{
								
								tooltip : 'Editar',
								iconCls : 'x-fa fa-arrow-right',
								handler : function(view, rowIndex, colIndex,
										item, e, record, row) {
									

											me = this;

											id_curso_ = Ext.ComponentQuery.query('Inscripciones #id_fkcurso_inscripcion')[0]
											.getValue();
											

		
											console.log("SAA", record.data.id_alumno,id_curso_)

											if(id_curso_!=""){
												Ext.Ajax.request({
													url : 'php/negocios/inscripciones/verificarAlumnoCurso.php',
													method : 'POST',
													params:{
														id_alumno : record.data.id_alumno,
														id_curso: id_curso_
													},
													
										
													success : function(response) {
										
														var response_aux = Ext.util.JSON
														.decode(response.responseText, true);
														console.log(response_aux.encontro)
	
														if(response_aux.encontro==1){
	
															Ext.MessageBox.show({
																title: 'Mensaje',
																msg: 'El Alumno  '+record.data.nombre_alumno+' ya se encuentra en el curso elegido . Eliga otro Curso',
																buttons: Ext.MessageBox.OK,
																icon: Ext.MessageBox.WARNING
					
															});
	
															Ext.ComponentQuery.query('Inscripciones #id_fkcurso_inscripcion')[0]
															.reset();
														Ext.ComponentQuery.query('Inscripciones #nombre_curso')[0]
														.reset();
												
														Ext.ComponentQuery.query('Inscripciones #id_fkinstructor_inscripcion')[0]
														.reset();
												
														Ext.ComponentQuery.query('Inscripciones #nombre_curso_inscripcion')[0]
														.reset();
														Ext.ComponentQuery.query('Inscripciones #precio_curso')[0]
														.reset();
														Ext.ComponentQuery.query('Inscripciones #matricula_curso')[0]
														.reset();
														Ext.ComponentQuery.query('Inscripciones #mensualidad_curso')[0]
														.reset();
														Ext.ComponentQuery.query('Inscripciones #duracion_curso')[0]
														.reset();
														Ext.ComponentQuery.query('Inscripciones #instructor_curso')[0]
														.reset();
												
														Ext.ComponentQuery.query('Inscripciones #fecha_inicio_inscripcion')[0]
														.reset();
														Ext.ComponentQuery.query('Inscripciones #fecha_fin_inscripcion')[0]
														.reset();
												
														Ext.ComponentQuery.query('Inscripciones #nombre_sucursal_inscripcion')[0]
														.reset();
												
														Ext.ComponentQuery.query('Inscripciones #precio_total_curso')[0]
														.reset();
														Ext.ComponentQuery.query('Inscripciones #id_fksucursal_inscripcion')[0]
														.reset();
	
	
														}else{
	
																
															me.fireEvent('btnCargarAlumno', view,
												rowIndex, colIndex, item, e,
												record, row);
												Ext.ComponentQuery.query('#window_alumno_inscripcion')[0]
												.close()
														}
										
										
										
										
													
													}
										
												}
										
												);
												
											}
											else{

												me.fireEvent('btnCargarAlumno', view,
												rowIndex, colIndex, item, e,
												record, row);
												Ext.ComponentQuery.query('#window_alumno_inscripcion')[0]
												.close()


											}


											

								}

							}

							]
						}],
				bbar : [{
							xtype : 'pagingtoolbar',
							store : 'Alumno',
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