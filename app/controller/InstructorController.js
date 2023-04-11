Ext.define('Legion.controller.InstructorController', {
	extend : 'Ext.app.Controller',
	models : ['Legion.model.Instructor'],
	views : ['Legion.view.instructor.InstructorWindow','Legion.view.instructor.EditarCertificados'],
	stores : ['Instructor'],
	refs : [{
				ref : 'instructorMasterForm'

			}],

	init : function() {
		this.control({

					'#mostar_formulario_instructor' : {
						btnWindow : this.onWindow

					},
					'#guardar_instructor' : {
						btnCreate : this.onCreateClick

					},
					'#action_instructor' : {
						btnUpdate : this.onUpdateClick,
						btnDelete : this.onDeleteClick,
						btnVerCertificados:this.onVerCertificados

						
					},

					'#nombre_busqueda_instructor' : {
						specialkey : this.onBusquedaNombre
					},

					
					'#busqueda_cedula_instructor' : {
						specialkey : this.onBusquedaCedula
					},
					
					

					'#boton_refresh_instructor' : {
						btnRefresh : this.onRefresh

					},
					'#boton_buscar_instructor' : {
						btnBuscar : this.onBuscar
					},
					'#mostrar_columnas_instructores':{
							ComboMostrarColumnas: this.onMostrarColumnas,
				OcultarColumnas: this.onOcultarColumnas
					},
					"#btnReporteInstructor" : {
						click : this.onbtnReporteInstructor
					  },

					  
					  '#action_instructor_certificaciones':{
						btnEliminarCertificaciones: this.onEliminarCertificaciones
					  },

					  '#action_instructor_certificaciones_edit':{
						btnEliminarCertificacionesEdit : this.onEliminarCertificadosEdit,
						btnEditarCertificado: this.onEditarCerticados,
						verCertificadoInstructor: this.onVerCertificadosInstructor
					  },
					  '#guardar_instructor_certificados':{
						btnCreateCerticadosInstructor: this.onGuardarNuevoCertificado
					  },
					  '#guardar_instructor_certificados_edit':{
						btnEditarCertificados:this.onGuardarEditarCertificaciones
					  }

					  
					  

				});
	},

	onRefresh : function() {
		var store = Ext.getStore('Instructor');
		Ext.ComponentQuery.query('#nombre_busqueda_instructor')[0].reset();
		Ext.ComponentQuery.query('#busqueda_cedula_instructor')[0].reset();
		

		
					
				

					store.getProxy().extraParams = {
						nombre_busqueda: "",
						cedula_busqueda:"",
						estado:""
						
						
					
			
					};
					store.load();


	},

	
	onBusquedaNombre : function(field, e) {
		
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_instructor')[0]
				.getValue();



			
								
		if (e.getKey() == e.ENTER) {

			var store = Ext.getStore('Instructor');

			store.getProxy().extraParams = {
				nombre_busqueda : nombre,
				cedula_busqueda:"",
				estado:""
				

			};
			store.loadPage(1);
		

		}

		if (e.getKey() == e.ENTER && nombre == '""') {
			nombre = ""

			store.getProxy().extraParams = {
				nombre_busqueda : nombre,
				cedula_busqueda:"",
				

			};
			store.loadPage(1);

		}
	

	},



	onBusquedaCedula : function(field, e) {
		
		var cedula = Ext.ComponentQuery.query('#busqueda_cedula_instructor')[0]
				.getValue();



			
					
								
		if (e.getKey() == e.ENTER) {

			var store = Ext.getStore('Instructor');

			store.getProxy().extraParams = {
				nombre_busqueda : "",
				cedula_busqueda:cedula,
				estado:""
				

			};
			store.loadPage(1);
			

		}

		
				

			
	

	},










	onBuscar : function() {
		var store = Ext.getStore('Instructor');

		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_instructor')[0]
				.getValue();
		
		var cedula = Ext.ComponentQuery.query('#busqueda_cedula_instructor')[0]
				.getValue();
	

							store.getProxy().extraParams = {
								nombre_busqueda: nombre,
								cedula_busqueda :cedula,
								estado:""

							
							
					
							};
							store.load();
		
		
							
						
		
						
					
		
					
					
		
				
		
				

	},

	onWindow : function() {
		var window = Ext.create('Legion.view.instructor.InstructorWindow');
		window.show();

	},
	onDeleteClick : function(grid, rowIndex, colIndex) {

		var rec = grid.getStore().getAt(rowIndex);
		Ext.Ajax.request({
			url: 'php/negocios/instructores/verificarInstructorCurso.php',
			method: 'POST',
			params: {
				id_instructor: rec.data.id_instructor
			},

			success: function (response) {
				console.log(response)
				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				if (response_aux.total > 0) {

					Ext.MessageBox.show({
						title: 'Advertencia',
						msg: 'Este Instructor no puede ser borrado por que tiene un Curso Adjunto',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING,

					});
				}
				else{
					
		Ext.MessageBox.show({
			title : 'Advertencia',
			msg : 'Seguro que deseea Borrar?',
			buttons : Ext.MessageBox.OKCANCEL,
			icon : Ext.MessageBox.QUESTION,
			fn : function(btn) {
				if (btn == 'ok') {
			

					Ext.Ajax.request({
						url : 'php/negocios/instructores/eliminarInstructor.php',
						method : 'POST',
						params : {
							id_instructor: rec.data.id_instructor
						},

						success : function() {

							Ext.getStore('Instructor').load();
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





	},

	onUpdateClick : function(view, rowIndex, colIndex, item, e, record, row) {

		var id = record.data.id_instructor;
		var nombre = record.data.nombre_instructor;
		var apellido = record.data.apellido_instructor;
		var ciudad = record.data.ciudad_instructor;
		var telefono = record.data.telefono_instructor;
		var celular = record.data.celular_instructor;
		var estado = record.data.estado_instructor;
		var usuario = 1;
		var direccion = record.data.direccion_instructor;
		var titulo = record.data.titulo_instructor;
		var estado = record.data.estado_instructor;
		var correo = record.data.correo_instructor;
		var cedula = record.data.cedula_instructor;
		var categoria = record.data.categoria_instructor;
		

		var window = Ext.create('Legion.view.instructor.InstructorWindow');
		window.setTitle("Actualizar Instructor:" + nombre + " ", true);
		window.show();

		Ext.ComponentQuery
				.query('#window_instructor_editar #instructorFormEditar #id_instructor')[0]
				.setValue(id);

		Ext.ComponentQuery
				.query('#window_instructor_editar #instructorFormEditar #nombre_instructor')[0]
				.setValue(nombre);

		Ext.ComponentQuery
				.query('#window_instructor_editar #instructorFormEditar #apellido_instructor')[0]
				.setValue(apellido);

		Ext.ComponentQuery
				.query('#window_instructor_editar #instructorFormEditar #ciudad_instructor')[0]
				.setValue(ciudad);


		Ext.ComponentQuery
				.query('#window_instructor_editar #instructorFormEditar #categoria_instructor_edit')[0]
				.setValue(categoria);			

		Ext.ComponentQuery
				.query('#window_instructor_editar #instructorFormEditar #telefono_instructor')[0]
				.setValue(telefono);

		Ext.ComponentQuery
				.query('#window_instructor_editar #instructorFormEditar #celular_instructor')[0]
				.setValue(celular);

		Ext.ComponentQuery
				.query('#window_instructor_editar #instructorFormEditar #estado_instructor')[0]
				.setValue(estado);

		Ext.ComponentQuery
				.query('#window_instructor_editar #instructorFormEditar #direccion_instructor')[0]
				.setValue(direccion);

		Ext.ComponentQuery
				.query('#window_instructor_editar #instructorFormEditar #titulo_instructor')[0]
				.setValue(titulo);

		Ext.ComponentQuery
				.query('#window_instructor_editar #instructorFormEditar #estado_instructor')[0]
				.setValue(estado);

		Ext.ComponentQuery
				.query('#window_instructor_editar #instructorFormEditar #correo_instructor')[0]
				.setValue(correo);

		Ext.ComponentQuery
				.query('#window_instructor_editar #instructorFormEditar #cedula_instructor')[0]
				.setValue(cedula);
		

		Ext.ComponentQuery
				.query('#window_instructor_editar #instructorFormEditar #guardar_instructor ')[0]
				.setText("Editar", true);

	},

	onCreateClick : function(form, window) {



		//Guardadr instrcuotres
		if (!form || !form.isValid()) {
			alert('Verifica los datos Ingresados!!');
			return;
		}
	

		

				form.submit({
					url: 'php/negocios/instructores/actualizar_ingresarInstructor.php',
					
		
					success: function (data, response) {
						var tipo = response.result.tipo;
						console.log(tipo);
		
						if (tipo == 0) {
		
							Ext.MessageBox.show({
								title: 'Mensaje',
								msg: 'Nuevo Instructor Creado',
								buttons: Ext.MessageBox.OK,
								icon: Ext.MessageBox.WARNING
		
							});
							form.reset();

							setTimeout(Ext.ComponentQuery.query('Instructores')[0].setActiveTab(0),1000);


							
		
						}
						if (tipo == 1) {
		
							var window2 = Ext.ComponentQuery.query('#window_instructor_editar')[0];
		
							Ext.MessageBox.show({
								title: 'Mensaje',
								msg: 'Instructor Actualizado',
								buttons: Ext.MessageBox.OK,
								icon: Ext.MessageBox.WARNING
		
							});
							window2.close();
						}
						Ext.getStore('Instructor').load();
		
					},
					failure: function () {
						console.log("Error");
					}
				});



				///Guardar certificados

		if(Ext.ComponentQuery.query('#categoria_instructor')[0].getValue()==0){



			datos= Ext.getStore('Certificaciones').getRange();
				
		var records_detalles = [];



		console.log(datos[0].data);

		for (i = 0; i < datos.length; i++) {
			records_detalles.push(datos[i].data);
		}

		console.log("datos",records_detalles);


		Ext.Ajax.request({
			url : 'php/negocios/instructores/guardarCertificaciones.php',
			method : 'POST',
			params:{
				record:Ext.encode(records_detalles)
			},
			

			success : function(response) {

				var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
				console.log(response_aux.respuesta)



				Ext.getStore('Certificaciones').load()
				


				
			}

		}

		);

		}
		





	},
			onMostrarColumnas: function (combo, records) {

		Ext.each(records, function (rec) {
			node = combo.getPicker().getNode(rec);
			if (rec.data.id == 1) {
				Ext.ComponentQuery.query('#InstructorGrid')[0].columns[6]
					.setVisible(true)

			}
			if (rec.data.id == 2) {
				Ext.ComponentQuery.query('#InstructorGrid')[0].columns[7]
					.setVisible(true)

			}
			if (rec.data.id == 3) {
				Ext.ComponentQuery.query('#InstructorGrid')[0].columns[9]
					.setVisible(true)

			}
				




			Ext.get(node).down('input').dom.checked = true;

		});
	},

	onOcultarColumnas: function (combo, rec) {

		var node = combo.getPicker().getNode(rec);
		if (rec.data.id == 1) {
			Ext.ComponentQuery.query('#InstructorGrid')[0].columns[6]
				.setVisible(false)
		}
		if (rec.data.id == 2) {
			Ext.ComponentQuery.query('#InstructorGrid')[0].columns[7]
				.setVisible(false)
		}
		if (rec.data.id == 3) {
			Ext.ComponentQuery.query('#InstructorGrid')[0].columns[9]
				.setVisible(false)
		}
		
		Ext.get(node).down('input').dom.checked = false;
	},


	onbtnReporteInstructor : function() {


		Ext.Ajax.request({
			url : 'php/negocios/usuarios/recuperarUsuario.php',
			method : 'POST',
			

			success : function(response) {

				var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
				console.log(response_aux.rol)

				var sucursal = response_aux.sucursal


				window.open('php/negocios/reportes/reporteInstructores.php?id_sucursal='+sucursal, '_blank');
			}

		}

		);


		
		
	
	
	  },

	  onEliminarCertificaciones: function(view,rowIndex, colIndex, item, e,
		record, row){

			var rec = view.getStore().getAt(rowIndex);
			view.getStore().remove(rec);
		

	  },


	  onVerCertificados: function(view, rowIndex,
		colIndex, item, e, record, row){

			var id = record.data.id_instructor;



			store = Ext.getStore('CertificacionesEdit');

			store.getProxy().extraParams={
				id_instructor : id
			}
			store.load()
	
		



		Ext.create('Ext.window.Window', {
			title:  'Cursos del Instructor',
	
			layout: 'fit',
			itemId: 'cursos_instructor',
			modal: true,
			width:400,
			items: [
        
				{
		
				
					itemId: 'CertificacionesEditGrid',
					xtype: 'grid',
					
					autoScroll: true,
					selType: 'rowmodel',
					selModel: {
						mode: 'SINGLE'
					},
					viewConfig: {
						stripeRows: true
					},
					store: 'CertificacionesEdit',
					plugins: {
						ptype: 'cellediting',
						clicksToEdit: 1
					},
				   
					height: 300,
				  
					buttons:[{
						itemId:'gurdar_certificaciones_edit',
						text:'Cerrar',
						handler: function(){
							Ext.ComponentQuery.query('#cursos_instructor')[0]
						.close();
					 
		
		
		
						}
					
					},{
						xtype: 'button',
						iconCls: 'fa fa-plus-circle',
						tooltip: 'Add New Record',
						handler: function () {
		
						
						
					   Ext.create('Ext.window.Window', {
						title:  'Agregar Certificados',
				
						layout: 'fit',
						itemId: 'agregar_certificados',
						modal: true,
						width:350,
			
						items: [
			
							{
					
								xtype: 'form',
								itemId: 'certificadosform',
								alias: 'widget.certificadosform',
								margin: '0 10 0 10',
					
								name: 'certificadosform',
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
									layout: 'vbox',
									defaultType: 'textfield',
					
									fieldDefaults: {
					
										labelStyle: 'font-weight:bold'
									},
									items: [{
										fieldLabel: 'id',
										itemId:'id_fkinstructor_certificaciones_militar_edit',
										name:'id_fkinstructor_certificaciones_militar',
										hidden: true,
										flex: 1
					
									}, {
										fieldLabel: 'Nombre',
										itemId: 'nombre_certificaciones_militar',
										name: 'nombre_certificaciones_militar',
										margin: '10 0 0 5',
										flex: 1,
										allowBlank: false,
					
									},
									{
										xtype:'filefield',
										fieldLabel: 'Documento',
										itemId: 'certificado_pdf',
										name: 'certificado_pdf',
										margin: '10 0 0 5',
										flex: 1,
										allowBlank: false,
					
									},
									
					
								  ]
								},
					
							  
								],
								buttons: [{
									text: 'Guardar',
					
									iconCls: 'x-fa fa-save',
					
								style: {
									'background-color': 'green'
					
								},
									itemId: 'guardar_instructor_certificados',
									handler: function () {
					
										me = this;
					
										Ext.MessageBox.show({
											title: 'Mensaje',
											msg: 'Desea guardar el registro?',
											buttons: Ext.MessageBox.OKCANCEL,
											icon: Ext.MessageBox.QUESTION,
					
											fn : function(btn) {
												if (btn == 'ok') {
					
											
													var window = me.up('window');
													var form = Ext.ComponentQuery.query('#certificadosform')[0]
														.getForm();
													me.fireEvent('btnCreateCerticadosInstructor', form, window);
												
								
												}
											}
					
										});
					
									
										
					
									}
								}
							
								
								]
					
							}
					
							
						   ]
			
			
					}).show();




						   
				Ext.ComponentQuery.query('#id_fkinstructor_certificaciones_militar_edit')[0].setValue(id);
						}
		
					}],
					renderTo: Ext.getBody(),
		 
					
					columns: [
						 {
						text: "ID",
					   width:120,
						dataIndex: 'id_certificaciones_militar',
						hidden:false
					   
					   
		
					}, 
					{
						text: "Nombre del Curso",
						flex: 1,
						dataIndex: 'nombre_certificaciones_militar',
						editor: {
							xtype: 'textfield',
		
						},
						menuDisabled: true,
						renderer: function(value, meta, record) {
							if(value) meta.tdAttr='data-qtip="'+value+'"';
							return value;
						}
		
					},

				
					
					
						{
							xtype: 'actioncolumn',
							itemId: 'action_instructor_certificaciones_edit',
							menuDisabled: true,
							width: 75,
							items: [{
		
								tooltip: 'Eliminar Certificado',
								iconCls: 'x-fa fa-times',
								
								handler: function (view, rowIndex,
									colIndex, item, e, record, row) {
									this.fireEvent('btnEliminarCertificacionesEdit', view,
										rowIndex, colIndex, item, e,
										record, row);
		
								}
		
							},
							{
		
								tooltip: 'Editar Certificado',
								iconCls: 'x-fa fa-pen',
								
								handler: function (view, rowIndex,
									colIndex, item, e, record, row) {
									this.fireEvent('btnEditarCertificado', view,
										rowIndex, colIndex, item, e,
										record, row);
		
								}
		
							},
							{
		
								tooltip: 'Ver Documento',
								iconCls: 'x-fa fa-eye',
								
								handler: function (view, rowIndex,
									colIndex, item, e, record, row) {
									this.fireEvent('verCertificadoInstructor', view,
										rowIndex, colIndex, item, e,
										record, row,id);
		
								}
		
							}
		
							]
						}
				 
		
					
				
				],
			   
				
		
				}]
			
	
		}).show();

	},


	  onEliminarCertificadosEdit: function(view, rowIndex,
		colIndex, item, e, record, row){


			Ext.MessageBox.show({
			title : 'Advertencia',
			msg : 'Seguro que deseea Borrar?',
			buttons : Ext.MessageBox.OKCANCEL,
			icon : Ext.MessageBox.QUESTION,
			fn : function(btn) {
				if (btn == 'ok') {
			
					Ext.Ajax.request({
						url : 'php/negocios/certificados_instructor/eliminarCertificados.php',
						method : 'POST',
						params:{
							id_certificado:record.data.id_certificaciones_militar
						},
						
			
						success : function(response) {
			
						var response_aux = Ext.util.JSON
						.decode(response.responseText, true);
						
			
						if(response_aux.success==true){
			
							console.log("Eliminado")

							Ext.getStore('CertificacionesEdit').load()
			
			
			
						}
			
			
							
						}
			
					}
			
					);

				}
			}
		});
			




	  },


	  onGuardarNuevoCertificado: function(form, window){


		form.submit({
			url: 'php/negocios/certificados_instructor/ingresarCertificados.php',
			

			success: function (data, response) {
				var tipo = response.result.tipo;
			

				window.close()

				Ext.getStore('CertificacionesEdit').load();



			

			},
			failure: function () {
				console.log("Error");
			}
		});

	  },
	  onEditarCerticados:function(view,
		rowIndex, colIndex, item, e,
		record, row){

			id = record.data.id_certificaciones_militar;
			nombre =  record.data.nombre_certificaciones_militar;

			
	


	

		var window = Ext.create('Legion.view.instructor.EditarCertificados');
		
		window.show();


		Ext.ComponentQuery
		.query('#id_certi_edit')[0]
		.setValue(id);

		Ext.ComponentQuery
		.query('#nombre_certificaciones_militar_edit')[0]
		.setValue(nombre);



	  },


	  onGuardarEditarCertificaciones: function(form, window){


		form.submit({
			url: 'php/negocios/certificados_instructor/editarCertificados.php',
			

			success: function (data, response) {
				var tipo = response.result.tipo;
				console.log(tipo);

				window.close()

				Ext.getStore('CertificacionesEdit').load();
			},
			failure: function () {
				console.log("Error");
			}
		});




	  },


	  onVerCertificadosInstructor: function( view,rowIndex, colIndex, item, e,record, row,id){


		Ext.Ajax.request({
			url: 'php/negocios/instructores/recuperarCertificado.php',
			method: 'POST',
			params: {
				id_certificaciones_militar: record.data.id_certificaciones_militar
			},


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux)




				window.open('data:application/pdf;base64,' + response_aux.src, '_blank');




			}

		}

		);


	


	  }


	  


	 

});