Ext.define('Legion.controller.CursoController', {
	extend: 'Ext.app.Controller',
	models: ['Legion.model.Curso'],
	stores: ['Curso'],
	refs: [{
		ref: 'cursoMasterForm'

	}],

	init: function () {
		this.control({

			'#mostar_formulario_curso': {
				btnWindow: this.onWindow

			},
			'#guardar_curso': {
				btnCreate: this.onCreateClick
			},
			'#action_curso': {
				btnDelete: this.onDeleteClick,
				btnUpdate: this.onUpdateClick,
				btnShowCurso:this.onShowCurso,
				menu_cursos: this.menuBar
			},
			'#nombre_busqueda_curso': {
				specialkey: this.onBusquedaNombre
			},
			'#sucursal_busqueda_curso': {
				change: this.onBusquedaSucursal
			},
			'#boton_refresh_curso': {
				btnRefresh: this.onRefresh

			},
			'#btnReportePagos':{
				click: this.onReportePagos
			},
			'#boton_buscar_curso': {
				btnBuscar: this.onBuscar
			},
			'#imagen_curso': {
				change: this.onSelectImage
			},
			'#imagen_curso_editar': {
				change: this.onSelectImageEditar
			},
			'#fecha_fin_curso': {
				change: this.ObtenerDuracion
			},

			/*'#fecha_fin_curso_edit': {
				select: this.ObtenerDuracionEdit
			},*/

			"#btnReporteCurso": {
				click: this.onbtnReporteCurso
			},

				/*'#duracion_mes_curso':{
				CalcularFecha: this.onCalcularFechaFin

			},

		
			'#duracion_mes_curso_edit':{
				itemclick: this.onCalcularFechaFinEdit

			},*/



			'#window_curso_inscripcion #nombre_busqueda_curso_ins': {
				specialkey: this.onBusquedaInscripcionCurso
			},

			'#window_curso_inscripcion #boton_buscar_curso_ins': {
				btnBuscarIns: this.onBuscarIns
			},
			'#window_curso_inscripcion #boton_refresh_curso_ins': {
				btnRefreshIns: this.onRefreshIns
			},
			'#window_curso_inscripcion #sucursal_busqueda_curso_ins': {
				change: this.onBusquedaSucursalIns

			},
			'#comboMes_curso': {
				change: this.onRangoMesAnio
			},

			'#comboAnioFactura_curso': {
				change: this.onRangoMesAnio
			},
			'#btnBuscarPorRangoFechaVenta_curso': {
				click: this.onRangoFecha

			}

		});
	},

	onRefresh: function () {
		var store = Ext.getStore('Curso');
		Ext.ComponentQuery.query('#nombre_busqueda_curso')[0].reset();
		Ext.ComponentQuery.query('#sucursal_busqueda_curso')[0].reset();
		Ext.ComponentQuery.query('#comboMes_curso')[0].reset();
		Ext.ComponentQuery.query('#comboAnioFactura_curso')[0].reset();
		Ext.ComponentQuery.query('#buscarPorFechaDesde_curso')[0].reset();
		Ext.ComponentQuery.query('#buscarPorFechaHasta_curso')[0].reset();
		Ext.ComponentQuery.query('#id_fkempresa_sucursal_curso_bus')[0].reset();
		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux)


				if (response_aux.rol == 2 || response_aux.rol == 3) {



					store.getProxy().extraParams = {
						nombre_busqueda: "",
						sucursal_busqueda: response_aux.sucursal,
						estado: "",
						mes: "",
						anio: "",
						fecha_start: "",
						fecha_end: ""

					};
					store.load();





				} else {
					store.getProxy().extraParams = {
						nombre_busqueda: "",
						sucursal_busqueda: "",
						estado: "",
						mes: "",
						anio: "",
						fecha_start: "",
						fecha_end: ""

					};
					store.load();

				}



			}

		}

		);



	},

	onRefreshIns: function () {
		var store = Ext.getStore('Curso');
		Ext.ComponentQuery.query('#nombre_busqueda_curso_ins')[0].reset();
		Ext.ComponentQuery.query('#sucursal_busqueda_curso_ins')[0].reset();

		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux)


				if (response_aux.rol == 2 || response_aux.rol == 3) {



					store.getProxy().extraParams = {
						nombre_busqueda: "",
						sucursal_busqueda: response_aux.sucursal,
						estado: ""

					};
					store.load();





				} else {
					store.getProxy().extraParams = {
						nombre_busqueda: "",
						sucursal_busqueda: "",
						estado: ""

					};
					store.load();

				}



			}

		}

		);



	},

	onBusquedaSucursal: function () {
		var sucursal = Ext.ComponentQuery.query('#sucursal_busqueda_curso')[0]
			.getValue();
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_curso')[0]
			.getValue();

		var store = Ext.getStore('Curso');

		if (nombre != "") {

			store.getProxy().extraParams = {

			sucursal_busqueda: sucursal,
			nombre_busqueda: nombre,
			estado: "",
			mes:"",
            anio:"",
            fecha_start:"",
            fecha_end:"",
            estado:""

			}
		}

		else {
			nombre = "",
			store.getProxy().extraParams = {
			sucursal_busqueda: sucursal,
			nombre_busqueda: nombre,
			estado: "",
			mes:"",
            anio:"",
            fecha_start:"",
            fecha_end:"",
           

			}

		}

		store.loadPage(1);

	},


	onBusquedaSucursalIns: function () {
		var sucursal = Ext.ComponentQuery.query('#sucursal_busqueda_curso_ins')[0]
			.getValue();
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_curso_ins')[0]
			.getValue();

		var store = Ext.getStore('Curso');

		if (nombre != "") {

			store.getProxy().extraParams = {

				sucursal_busqueda: sucursal,
				nombre_busqueda: nombre,
				estado: 1

			}
		}

		else {
			nombre = "";
			store.getProxy().extraParams = {
				sucursal_busqueda: sucursal,
				nombre_busqueda: nombre,
				estado: 1

			}

		}

		store.loadPage(1);

	},
	onBusquedaNombre: function (field, e) {
		var sucursal = Ext.ComponentQuery
			.query('#sucursal_busqueda_curso')[0].getValue();
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_curso')[0]
			.getValue();



		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux)

				if (response_aux.rol == 2 || response_aux.rol==3) {

					if (e.getKey() == e.ENTER) {

						var store = Ext.getStore('Curso');

						store.getProxy().extraParams = {
							nombre_busqueda: nombre,
							sucursal_busqueda: response_aux.sucursal,
							estado: "",
							mes:"",
							anio:"",
							fecha_start :"",
							fecha_end:""

						};
						store.loadPage(1);
						

					}

					if (e.getKey() == e.ENTER && nombre == '""') {
						nombre = ""

						store.getProxy().extraParams = {
							nombre_busqueda: nombre,
							sucursal_busqueda: response_aux.sucursal,
							estado: "",
							mes:"",
							anio:"",
							fecha_start :"",
							fecha_end:""

						};
						store.load();

					}





				}

				else {



					if (e.getKey() == e.ENTER) {

						var store = Ext.getStore('Curso');

						store.getProxy().extraParams = {
							nombre_busqueda: nombre,
							sucursal_busqueda: sucursal,
							estado: "",
							mes:"",
							anio:"",
							fecha_start :"",
							fecha_end:""

						};
						store.loadPage(1);
						console.log(nombre);

					}

					if (e.getKey() == e.ENTER && nombre == '""') {
						nombre = ""

						store.getProxy().extraParams = {
							nombre_busqueda: nombre,
							sucursal_busqueda: sucursal,
							estado: "",
							mes:"",
							anio:"",
							fecha_start :"",
							fecha_end:""

						};
						store.loadPage(1);

					}

				}



			}

		}

		);

		console.log(nombre, sucursal);


	},

	onBusquedaInscripcionCurso: function (field, e) {
		var sucursal = Ext.ComponentQuery
			.query('#sucursal_busqueda_curso_ins')[0].getValue();
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_curso_ins')[0]
			.getValue();



		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux)

				if (response_aux.rol == 2 || response_aux.rol == 3) {

					if (e.getKey() == e.ENTER) {

						var store = Ext.getStore('Curso');

						store.getProxy().extraParams = {
							nombre_busqueda: nombre,
							sucursal_busqueda: response_aux.sucursal,
							estado: 1

						};
						store.loadPage(1);
						console.log(nombre);

					}

					if (e.getKey() == e.ENTER && nombre == "") {
						nombre = "";


						store.getProxy().extraParams = {
							nombre_busqueda: nombre,
							sucursal_busqueda: response_aux.sucursal,
							estado: 1

						};
						store.load();

					}





				}

				else {



					if (e.getKey() == e.ENTER) {

						var store = Ext.getStore('Curso');

						store.getProxy().extraParams = {
							nombre_busqueda: nombre,
							sucursal_busqueda: sucursal,
							estado: 1

						};
						store.loadPage(1);
						console.log(nombre);

					}

					if (e.getKey() == e.ENTER && nombre == '""') {


						store.getProxy().extraParams = {
							nombre_busqueda: nombre,
							sucursal_busqueda: sucursal,
							estado: 1

						};
						store.load();

					}

				}



			}

		}

		);





	},
	onBuscar: function () {
		var sucursal = Ext.ComponentQuery
			.query('#sucursal_busqueda_curso')[0].getValue();
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_curso')[0].getValue();
		var store = Ext.getStore('Curso');
		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux)


				if (response_aux.rol == 2 || response_aux.rol == 3) {


					store.getProxy().extraParams = {
						nombre_busqueda: nombre,
						sucursal_busqueda: response_aux.sucursal,
						estado: "",
						mes: "",
						anio: "",
						fecha_start: "",
						fecha_end: ""

					};

					store.loadPage(1);





				}
				else {

					store.getProxy().extraParams = {
						nombre_busqueda: nombre,
						sucursal_busqueda: sucursal,
						estado: "",
						mes: "",
						anio: "",
						fecha_start: "",
						fecha_end: ""

					};

					store.loadPage(1);

				}



			}

		}

		);


	},

	onBuscarIns: function () {
		var sucursal = Ext.ComponentQuery
			.query('#sucursal_busqueda_curso_ins')[0].getValue();
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_curso_ins')[0].getValue();
		var store = Ext.getStore('Curso');
		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux)


				if (response_aux.rol == 2 || response_aux.rol == 3) {


					store.getProxy().extraParams = {
						nombre_busqueda: nombre,
						sucursal_busqueda: response_aux.sucursal,
						estado: 1

					};

					store.loadPage(1);





				}
				else {

					store.getProxy().extraParams = {
						nombre_busqueda: nombre,
						sucursal_busqueda: sucursal,
						estado: 1

					};

					store.loadPage(1);

				}



			}

		}

		);


	},

	onWindow: function () {
		var window = Ext.create('Legion.view.curso.CursoWindow');
		window.show();

	},
	onDeleteClick: function (grid, rowIndex, colIndex) {

		var rec = grid.getStore().getAt(rowIndex);
		Ext.Ajax.request({
			url: 'php/negocios/cursos/verificarCursoAlumno.php',
			method: 'POST',
			params: {
				id_curso: rec.data.id_curso
			},

			success: function (response) {
				console.log(response)
				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				if (response_aux.total > 0) {

					Ext.MessageBox.show({
						title: 'Advertencia',
						msg: 'Este curso no puede ser borrado por que tiene alumnos',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING,

					});
				}
				else {

					Ext.MessageBox.show({
						title: 'Mensaje',
						msg: 'Seguro que deseea Borrar?',
						buttons: Ext.MessageBox.OKCANCEL,
						icon: Ext.MessageBox.QUESTION,
						fn: function (btn) {
							if (btn == 'ok') {


								Ext.Ajax.request({
									url: 'php/negocios/cursos/eliminarCurso.php',
									method: 'POST',
									params: {
										id_curso: rec.data.id_curso
									},

									success: function () {

										Ext.getStore('Curso').load();
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

	onUpdateClick: function (view, rowIndex, colIndex, item, e, record, row) {

		var rec = view.getStore().getAt(rowIndex);
		Ext.Ajax.request({
			url: 'php/negocios/cursos/verificarCursoAlumno.php',
			method: 'POST',
			params: {
				id_curso: rec.data.id_curso
			},

			success: function (response) {
				console.log(response)
				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				if (response_aux.total > 0) {

					Ext.MessageBox.show({
						title: 'Advertencia',
						msg: 'Este curso no puede ser editado ya que tiene alumnos inscritos',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING,

					});
				}
				else {


					console.log("ENTRO");
					var id = record.data.id_curso;
					var nombre = record.data.nombre_curso;
					var estado = record.data.estado_curso;
					var mensualidad = record.data.mensualidad_curso;
					var iva = record.data.iva_curso;
					var usuario = record.data.id_fkusuario_curso;
					var instructor = record.data.id_fkinstructor_curso;
					var sucursal = record.data.id_fksucursal_curso;
					var duracion = record.data.duracion_mes_curso;
					var cuota = record.data.cuota_entrada_curso;
					var cupo = record.data.cupos_curso;
					var precio = record.data.precio_curso;
					var fecha_inicio = record.data.fecha_inicio_curso;
					var fecha_fin = record.data.fecha_fin_curso;
					var src = record.data.imagen_src;
					var horas = record.data.horas_curso;

					Ext.Ajax.request({
						url: 'php/negocios/empresas/recuperarInstituto.php',
						method: 'POST',
						params: {
							id_sucursal: sucursal

						},


						success: function (response) {

							var response_aux = Ext.util.JSON
								.decode(response.responseText, true);
							console.log(response_aux)
							var id_empresa = response_aux.id

							Ext.ComponentQuery
								.query('#window_curso #cursoFormEditar #id_fkempresa_sucursal_curso')[0]
								.setValue(id_empresa);

							store = Ext.getStore('Sucursal');
							store.getProxy().extraParams = {
								id_empresa: id_empresa,
								nombre_busqueda: ""

							}
							store.load();










						}

					}

					);


					var window = Ext.create('Legion.view.curso.CursoWindow');
					window.setTitle("Actualizar Curso:" + nombre + " ", true);
					window.show();


					Ext.ComponentQuery.query('#window_curso #cursoFormEditar #imagen_vista_curso_editar')[0]
						.setSrc(src);
					Ext.ComponentQuery.query('#window_curso #cursoFormEditar #id_curso')[0]
						.setValue(id);
					Ext.ComponentQuery
						.query('#window_curso #cursoFormEditar #nombre_curso')[0]
						.setValue(nombre);

					Ext.ComponentQuery
						.query('#window_curso #cursoFormEditar #precio_curso')[0]
						.setValue(precio);

					Ext.ComponentQuery
						.query('#window_curso #cursoFormEditar #estado_curso')[0]
						.setValue(estado);

					//Ext.ComponentQuery
					//.query('#window_curso #cursoFormEditar #imagen_curso_editar')[0]
					//.setRawValue(src);

					Ext.ComponentQuery
						.query('#window_curso #cursoFormEditar #mensualidad_curso')[0]
						.setValue(mensualidad);


					Ext.ComponentQuery
						.query('#window_curso #cursoFormEditar #fecha_inicio_curso_edit')[0]
						.setValue(fecha_inicio);


					Ext.ComponentQuery
						.query('#window_curso #cursoFormEditar #fecha_fin_curso_edit')[0]
						.setValue(fecha_fin);

					Ext.ComponentQuery
						.query('#window_curso #cursoFormEditar #id_fkusuario_curso')[0]
						.setValue(usuario);

					Ext.ComponentQuery.query('#window_curso #cursoFormEditar #iva_curso')[0]
						.setValue(iva);

					Ext.ComponentQuery
						.query('#window_curso #cursoFormEditar #id_fkinstructor_curso')[0]
						.setValue(instructor);

					Ext.getStore('Sucursal').load();
					Ext.ComponentQuery
						.query('#window_curso #cursoFormEditar #id_fksucursal_curso')[0]
						.setValue(sucursal);

					Ext.ComponentQuery
						.query('#window_curso #cursoFormEditar #duracion_mes_curso_edit')[0]
						.setValue(duracion);

					Ext.ComponentQuery
						.query('#window_curso #cursoFormEditar #cuota_entrada_curso')[0]
						.setValue(cuota);

					Ext.ComponentQuery.query('#window_curso #cursoFormEditar #cupos_curso')[0]
						.setValue(cupo);

						Ext.ComponentQuery.query('#window_curso #cursoFormEditar #horas_curso')[0]
						.setValue(horas);

					Ext.ComponentQuery
						.query('#window_curso #cursoFormEditar #guardar_curso ')[0]
						.setText("Editar", true);


				}


			}

		}

		);



	},

	onCreateClick: function (form) {

		var values;

		if (!form || !form.isValid()) {
			alert('Verifica los datos Ingresados!!');
			return;
		}
		values = form.getValues();



		form.submit({
			url: 'php/negocios/cursos/ingresar_actualizarCurso.php',
			waitMsg: 'Creando Nuevo alumno...',

			success: function (data, response) {
				var tipo = response.result.tipo;
				console.log(tipo);

				if (tipo == 0) {

					Ext.MessageBox.show({
						title: 'Mensaje',
						msg: 'Nuevo Curso Creado',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING

					});
					form.reset();
					Ext.ComponentQuery.query('Cursos')[0].setActiveTab(0);

				}
				if (tipo == 1) {

					var window2 = Ext.ComponentQuery.query('#window_curso')[0];

					Ext.MessageBox.show({
						title: 'Mensaje',
						msg: 'Curso Actualizado',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING

					});
					window2.close();
					Ext.ComponentQuery.query('#imagen_curso')[0].reset();

				}
				Ext.getStore('Curso').load();

			},
			failure: function () {
				console.log("Error");
			}
		});

	},


	onSelectImage: function (newVal) {
		var file = newVal.fileInputEl.el.dom.files[0];
		var reader = new FileReader();


		
		reader.readAsDataURL(file);
		reader.onload = function (evt) {

			Ext.ComponentQuery.query('#imagen_vista_curso')[0]
				.setSrc(evt.target.result);




		}

	},

	onSelectImageEditar: function (newVal) {
		var file = newVal.fileInputEl.el.dom.files[0];
		var reader = new FileReader();

		console.log("Imagen");
		Ext.ComponentQuery.query('#window_curso #cursoFormEditar #imagen_validar_curso')[0]
			.setValue(1);

			console.log("salio");
		reader.readAsDataURL(file);
		reader.onload = function (evt) {

			Ext.ComponentQuery.query('#imagen_vista_curso_editar')[0]
				.setSrc(evt.target.result);




		}

	},
	onCargarInstructor: function () {
		var sucursal = Ext.ComponentQuery.query('Cursos #id_fksucursal_curso')[0]
			.getValue();

		console.log(sucursal)

		var store = Ext.getStore('Instructor');

		store.getProxy().extraParams = {
			nombre_busqueda: "",
			sucursal_busqueda: sucursal

		};
		store.load({
			callback: function (records, operation, success) {
				console.log(records.length);

				if (records.length == 0) {
					Ext.ComponentQuery.query('Cursos #id_fkinstructor_curso')[0].reset()
					Ext.ComponentQuery.query('Cursos #id_fkinstructor_curso')[0]
						.setEmptyText("No hay ningun Instructor en esta sucursal");

					Ext.ComponentQuery.query('Cursos #id_fkinstructor_curso')[0].reset()

				}
				if (records.length > 0) {
					Ext.ComponentQuery.query('Cursos #id_fkinstructor_curso')[0]
						.setEmptyText("Seleccionar");

				}
			}
		});

	},




	onbtnReporteCurso: function () {


		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux.rol)
				var sucursal_otro=  response_aux.sucursal;

				if (response_aux.rol == 1) {
					var window2 = Ext.create('Ext.window.Window', {
						title: 'Reporte Cursos',
						layout: {
							align: 'middle',

							type: 'vbox'
						},
						height: 200,
						width: 300,
						modal: true,
						items: [
							{
								xtype: 'combo',
								fieldLabel: 'Institucion',
								margin: '5',
								name: 'id_fkempresa_sucursal',
								itemId: 'id_fkempresa_sucursal_curso_reporte',
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

								listeners: {
									change: function () {
										store = Ext.getStore('Sucursal');
										value = Ext.ComponentQuery
											.query('#id_fkempresa_sucursal_curso_reporte')[0]
											.getValue();

										store.getProxy().extraParams = {
											id_empresa: value,
											nombre_busqueda: ""

										}
										store.load();


									}
								}

							},

							{
								xtype: 'combo',
								fieldLabel: 'Sucursal',
								margin: '5',
								name: 'id_fksucursal_usuario',
								itemId: 'id_fksucursal_usuario_curso_reporte',
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
							}, 

							
							
							
							
							
							{
								xtype: 'button',
								text: 'Generar Reporte de Cursos',
								margin: '5',
								iconCls: 'fas fa-clipboard',

								handler: function () {
									sucursal = Ext.ComponentQuery
										.query('#id_fksucursal_usuario_curso_reporte')[0]
										.getValue();

										combo=Ext.ComponentQuery
										.query('#id_fkempresa_sucursal_curso_reporte')[0]
										
										var value = combo.getValue();
				var valueField = combo.valueField;
				var record;
				combo.getStore().each(function(r){
					if(r.data[valueField] == value){
						record = r;
						return false;
					}
				});
			
				 instituto=record.get(combo.displayField);

									console.log(sucursal)
									window.open('php/negocios/reportes/reporteCursos.php?id_sucursal=' + sucursal+'&instituto='+instituto, '_blank');

								}

							}


						]

					});
					window2.show();

				}

				else {
				


					Ext.Ajax.request({
						url : 'php/negocios/empresas/recuperarInstituto.php',
						method : 'POST',
						params:{
							id_sucursal :sucursal_otro
			
						},
						
			
						success : function(response) {
			
							var response_aux = Ext.util.JSON
							.decode(response.responseText, true);
							console.log(response_aux)
						
						

						var instituto=response_aux.nombre_empresa;
			

						window.open('php/negocios/reportes/reporteCursos.php?instituto='+instituto, '_blank');
						
						}
			
					}
			
					);

					
				}
			}

		}

		);






	},


	onRangoMesAnio: function () {



		sucursal = Ext.ComponentQuery
			.query('#sucursal_busqueda_curso')[0]
			.getValue();



		mes = Ext.ComponentQuery
			.query('#comboMes_curso')[0]
			.getValue();

		anio = Ext.ComponentQuery
			.query('#comboAnioFactura_curso')[0]
			.getValue();

		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux)


				if (response_aux.rol == 2 || response_aux.rol == 3) {


					store = Ext.getStore("Curso");

					store.getProxy().extraParams = {

						sucursal_busqueda: response_aux.sucursal,
						nombre_busqueda: "",
						id_alumno: "",
						mes: mes,
						anio: anio,
						fecha_start: "",
						fecha_end: "",
						estado: ""

					};

					store.load();

				} else {


					store = Ext.getStore("Curso");

					store.getProxy().extraParams = {

						sucursal_busqueda: sucursal,
						nombre_busqueda: "",
						id_alumno: "",
						mes: mes,
						anio: anio,
						fecha_start: "",
						fecha_end: "",
						estado: ""

					};

					store.load();


				}


			}
		});



	},


	onRangoFecha: function () {



		sucursal = Ext.ComponentQuery
			.query('#sucursal_busqueda_curso')[0]
			.getValue();



		inicio = Ext.ComponentQuery
			.query('#buscarPorFechaDesde_curso')[0]
			.getValue();

		fin = Ext.ComponentQuery
			.query('#buscarPorFechaHasta_curso')[0]
			.getValue();

		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux)


				if (response_aux.rol == 2 || response_aux.rol == 3) {


					store = Ext.getStore("Curso");

					store.getProxy().extraParams = {

						sucursal_busqueda: response_aux.sucursal,
						nombre_busqueda: "",
						id_alumno: "",
						mes: "",
						anio: "",
						fecha_start: inicio,
						fecha_end: fin,
						estado: ""

					};

					store.load();

				} else {


					store = Ext.getStore("Curso");

					store.getProxy().extraParams = {

						sucursal_busqueda: sucursal,
						nombre_busqueda: "",
						id_alumno: "",
						mes: "",
						anio: "",
						fecha_start: inicio,
						fecha_end: fin,
						estado: ""

					};

					store.load();


				}


			}
		});



	},

	onShowCurso: function(view, rowIndex, colIndex, item, e, record, row) {
		
		var src2 = record.data.imagen_src;
		console.log(src2);
		Ext.create('Ext.window.Window', {
					title : 'Curso' + " " + record.data.nombre_curso ,
					height : 200,
					width : 400,
					modal : true,
					items : [{
								xtype : 'image',
								src : src2,
								height : 200,
								width : 400

							}]
				}).show();

	},
	

	menuBar: function (grid, rowIndex, colIndex, item, e, record) {


	
			id_curso = record.data.id_curso;
			nombre_curso = record.data.nombre_curso;
		
			var menu_grid = new Ext.menu.Menu({
				items: [
					
					{
					text: 'Lista de Alumnos',
					iconCls: 'x-fa  fa-dollar-sign',

					handler: function () {

						var window2= Ext.create('Ext.window.Window', {
							title : 'Listado de Alumnos',
							layout: {
								align: 'middle',
								pack: 'center',
								type: 'hbox'
							},
							height:600,
							width:600,
							modal : true,
							listeners: {
								show: function() {
								  var myFrame = Ext.create('Ext.Component', {
									height:600,
							width:600,
									autoEl: {
									  tag: 'iframe',
									  
									  src: 'php/negocios/reportes/ListadoCurso.php?id_curso='+id_curso+'&nombre_curso='+nombre_curso
									}
								  });
								  this.add(myFrame);
								}
							  }
							
				
					});
					window2.show();

					}
				},

			
				
				]
			});

			var position = e.getXY();
			e.stopEvent();
			menu_grid.showAt(position);
		},


	



		onReportePagos:function(){



			
		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux.rol)
				var sucursal_otro=  response_aux.sucursal;

				if (response_aux.rol == 1) {
					var window2 = Ext.create('Ext.window.Window', {
						title: 'Reporte de Pagos Por Curso',
						layout: {
							align: 'middle',

							type: 'vbox'
						},
						height: 300,
						width: 300,
						modal: true,
						items: [
							{
								xtype: 'combo',
								fieldLabel: 'Institucion',
								margin: '5',
								name: 'id_fkempresa_sucursal',
								itemId: 'id_fkempresa_sucursal_curso_reporte',
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

								listeners: {
									change: function () {
										store = Ext.getStore('Sucursal');
										value = Ext.ComponentQuery
											.query('#id_fkempresa_sucursal_curso_reporte')[0]
											.getValue();

										store.getProxy().extraParams = {
											id_empresa: value,
											nombre_busqueda: ""

										}
										store.load();


									}
								}

							},

							{
								xtype: 'combo',
								fieldLabel: 'Sucursal',
								margin: '5',
					
								itemId: 'id_fksucursal_usuario_curso_reporte',
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

								listeners:{
									change: function(){
										store = Ext.getStore('Curso');
										value=Ext.ComponentQuery
						.query('#id_fksucursal_usuario_curso_reporte')[0]
						.getValue();
		
										store.getProxy().extraParams={
											nombre_busqueda : "",
             sucursal_busqueda : value,
             mes:"",
             anio:"",
             fecha_start:"",
             fecha_end:"",
             estado:""
		
										}
										store.load();
										
		
									}
								}
							}, 
							
							{
								xtype: 'combo',
								fieldLabel: 'Curso',
								margin: '5',
						
								itemId: 'curso_reporte',
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
							},

							{
								columnWidth : 0.50,
								fieldLabel: 'Mes',
								xtype : 'combo',
								name : 'comboMes',
								itemId : 'comboMes_curso_reporte',
								enableKeyEvents : true,
								editable : false,
								valueField : 'id',
								displayField : 'nombre',
							
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
								fieldLabel: 'Año',
								xtype : 'combo',
								name : 'comboAnioFactura',
								itemId : 'comboAnioFactura_curso_reporte',
								enableKeyEvents : true,
								editable : false,
								valueField : 'id',
								displayField : 'nombre',
					
								typeAhead : true,
								mode : 'local',
								triggerAction : 'all',
								emptyText : 'Año',
								store : new Ext.data.SimpleStore({
									  fields : ['id', 'nombre'],
									  data : [['0', 'Todos'], ['2019', '2019'], ['2020', '2020'], ['2021', '2021'], ['2022', '2022'], ['2023', '2023'], ['2024', '2024'], ['2025', '2025'], ['2026', '2026']]
									}),
								value : 0
							  },
							
							{
								xtype: 'button',
								text: 'Generar Reporte de Cursos',
								margin: '5',
								iconCls: 'fas fa-clipboard',

								handler: function () {
									sucursal = Ext.ComponentQuery
										.query('#id_fksucursal_usuario_curso_reporte')[0]
										.getValue();

										id_curso = Ext.ComponentQuery
										.query('#curso_reporte')[0]
										.getValue();

										anio = Ext.ComponentQuery
										.query('#comboAnioFactura_curso_reporte')[0]
										.getValue();

										mes = Ext.ComponentQuery
										.query('#comboMes_curso_reporte')[0]
										.getValue();


										combo=Ext.ComponentQuery
										.query('#id_fkempresa_sucursal_curso_reporte')[0]
										
										var value = combo.getValue();
				var valueField = combo.valueField;
				var record;
				combo.getStore().each(function(r){
					if(r.data[valueField] == value){
						record = r;
						return false;
					}
				});

				instituto=record.get(combo.displayField);



				combo_curso =Ext.ComponentQuery
				.query('#curso_reporte')[0];


				var value_curso = combo_curso.getValue();
				var valueField_curso = combo_curso.valueField;
				var record_curso;
				combo_curso.getStore().each(function(r){
					if(r.data[valueField_curso] == value_curso){
						record_curso = r;
						return false;
					}
				});

				nombre_curso=record_curso.get(combo_curso.displayField);


				combo_mes =Ext.ComponentQuery
				.query('#comboMes_curso_reporte')[0];


				var value_mes = combo_mes.getValue();
				var valueField_mes = combo_mes.valueField;
				var record_mes;
				combo_mes.getStore().each(function(r){
					if(r.data[valueField_mes] == value_mes){
						record_mes = r;
						return false;
					}
				});

				nombre_mes=record_mes.get(combo_mes.displayField);
			
			
				

									
									window.open('php/negocios/reportes/reporteMesCurso.php?id_sucursal=' + sucursal+'&instituto='+instituto+'&id_curso='+id_curso+'&anio='+anio+'&mes='+mes+'&nombre_curso='+nombre_curso+'&nombre_mes='+nombre_mes, '_blank');

								}

							}


						]

					});
					window2.show();

				}

				else {
				


					Ext.Ajax.request({
						url : 'php/negocios/empresas/recuperarInstituto.php',
						method : 'POST',
						params:{
							id_sucursal :sucursal_otro
			
						},
						
			
						success : function(response) {
			
							var response_aux = Ext.util.JSON
							.decode(response.responseText, true);
							console.log(response_aux)

							store = Ext.getStore('Curso');
												
					
													store.getProxy().extraParams={
														nombre_busqueda : "",
						 sucursal_busqueda : sucursal_otro,
						 mes:"",
						 anio:"",
						 fecha_start:"",
						 fecha_end:"",
						 estado:""
					
													}
													store.load();
													
					

							{
								var window2 = Ext.create('Ext.window.Window', {
									title: 'Reporte de Pagos Por Curso',
									layout: {
										align: 'middle',
			
										type: 'vbox'
									},
									height: 225,
									width: 300,
									modal: true,
									items: [
										
			
									
										
										{
											xtype: 'combo',
											fieldLabel: 'Curso',
											margin: '5',
									
											itemId: 'curso_reporte',
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
										},
			
										{
											columnWidth : 0.50,
											fieldLabel: 'Mes',
											xtype : 'combo',
											name : 'comboMes',
											itemId : 'comboMes_curso_reporte',
											enableKeyEvents : true,
											editable : false,
											valueField : 'id',
											displayField : 'nombre',
										
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
											fieldLabel: 'Año',
											xtype : 'combo',
											name : 'comboAnioFactura',
											itemId : 'comboAnioFactura_curso_reporte',
											enableKeyEvents : true,
											editable : false,
											valueField : 'id',
											displayField : 'nombre',
								
											typeAhead : true,
											mode : 'local',
											triggerAction : 'all',
											emptyText : 'Año',
											store : new Ext.data.SimpleStore({
												  fields : ['id', 'nombre'],
												  data : [['0', 'Todos'], ['2019', '2019'], ['2020', '2020'], ['2021', '2021'], ['2022', '2022'], ['2023', '2023'], ['2024', '2024'], ['2025', '2025'], ['2026', '2026']]
												}),
											value : 0
										  },
										
										{
											xtype: 'button',
											text: 'Generar Reporte de Cursos',
											margin: '5',
											iconCls: 'fas fa-clipboard',
			
											handler: function () {
												
													id_curso = Ext.ComponentQuery
													.query('#curso_reporte')[0]
													.getValue();
			
													anio = Ext.ComponentQuery
													.query('#comboAnioFactura_curso_reporte')[0]
													.getValue();
			
													mes = Ext.ComponentQuery
													.query('#comboMes_curso_reporte')[0]
													.getValue();
			
			
													Ext.Ajax.request({
														url: 'php/negocios/empresas/recuperarInstituto.php',
														method: 'POST',
														params: {
															id_sucursal: sucursal_otro
								
														},
								
								
														success: function (response) {
								
															var response_aux = Ext.util.JSON
																.decode(response.responseText, true);
															console.log(response_aux)
															instituto = response_aux.nombre_instituto;



															combo_curso =Ext.ComponentQuery
							.query('#curso_reporte')[0];
			
			
							var value_curso = combo_curso.getValue();
							var valueField_curso = combo_curso.valueField;
							var record_curso;
							combo_curso.getStore().each(function(r){
								if(r.data[valueField_curso] == value_curso){
									record_curso = r;
									return false;
								}
							});
			
							nombre_curso=record_curso.get(combo_curso.displayField);
			
			
							combo_mes =Ext.ComponentQuery
							.query('#comboMes_curso_reporte')[0];
			
			
							var value_mes = combo_mes.getValue();
							var valueField_mes = combo_mes.valueField;
							var record_mes;
							combo_mes.getStore().each(function(r){
								if(r.data[valueField_mes] == value_mes){
									record_mes = r;
									return false;
								}
							});
			
							nombre_mes=record_mes.get(combo_mes.displayField);
						
						
							
			
												
												window.open('php/negocios/reportes/reporteMesCurso.php?id_sucursal=' + sucursal_otro+'&instituto='+instituto+'&id_curso='+id_curso+'&anio='+anio+'&mes='+mes+'&nombre_curso='+nombre_curso+'&nombre_mes='+nombre_mes, '_blank');


								
															

								
								
								
								
								
								
								
								
								
														}
								
													}
								
													);
								
			
			
			
							
			
											}
			
										}
			
			
									]
			
								});
								window2.show();
			
							}
						
						}
			
					}
			
					);

					
				}
			}

		}

		);


		}


});