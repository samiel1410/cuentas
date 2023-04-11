Ext.define('Legion.controller.InscripcionController', {
	extend: 'Ext.app.Controller',
	models: ['Legion.model.Inscripcion'],
	views: ['Legion.view.inscripcion.AlumnoInscripcionWindow'],
	stores: ['Inscripcion'],
	refs: [{
		ref: 'inscripcionMasterForm'

	}],

	init: function () {
		this.control({

			'#mostrar_formulario_inscripcion': {
				btnWindow: this.onWindow

			},
			'#guardar_inscripcion': {
				btnCreate: this.onCreateClick
			},
			'#action_inscripcion': {
				btnDelete: this.onDeleteClick,
				btnUpdate: this.onUpdateClick,
				menu: this.menuBar,
				verHistorialCertificados: this.onVerHistorialCertificados

			},

			'#action_alumno_inscripcion': {
				btnCargarAlumno: this.onCargarAlumno
			},

			'#nombre_busqueda_inscripcion_alumno': {
				specialkey: this.onBusquedaNombre
			},
			'#sucursal_busqueda_inscripcion': {
				change: this.onBusquedaSucursal
			},

			'#curso_busqueda_inscripcion': {
				change: this.onBusquedaCurso
			},
			'#boton_refresh_inscripcion': {
				btnRefresh: this.onRefresh

			},
			'#boton_listado_alumnos': {
				btnAlumno: this.onMostrarAlumnos
			},
			'#boton_listado_cursos': {
				btnCurso: this.onMostrarCursos
			},
			'#sucursal_cargar_instructor': {
				change: this.onCargarCurso
			},
			'#curso_cargar_instructor': {
				change: this.onCargarInstructor
			},
			'#action_curso_inscripcion': {
				btnCargarCurso: this.onCargarCurso2
			},
			'#curso_variable_inscripcion': {
				change: this.onCheckCursoVariable
			},

			'#action_mensualidad_inscripcion': {
				GenerarOrden: this.onGenerarOrdenPedido
			},
			"#btnReporteInscripcion": {
				click: this.onbtnReporteInscripcion
			},
			'#boton_buscar_inscripcion': {
				btnBuscar: this.onBuscar
			},
			'#mostrar_columnas_ins': {

				ComboMostrarColumnas: this.onMostrarColumnas,
				OcultarColumnas: this.onOcultarColumnas
			},
			'#comboMes': {
				change: this.onRangoMesAnio
			},
			'#comboAnioFactura': {
				change: this.onRangoMesAnio
			},
			'#btnBuscarPorRangoFechaVenta': {
				click: this.onRangoFecha

			},
			'#gridPedidosRenovar': {
				selectionchange: this.onSelectionChange
			},
			'#estado_busqueda_inscripcion': {
				change: this.onEstadoBuscar
			},
			'#guardar_certi':{
				btnCrearCerti : this.onCreateCerti
			}


		});
	},








	onMostrarAlumnos: function () {

		store = Ext.getStore("Alumno");

		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux)


				if (response_aux.rol == 2 || response_aux.rol == 3) {




					store.getProxy().extraParams = {

						sucursal_busqueda: response_aux.sucursal,
						nombre_busqueda: "",
						estado: 1,
						cedula: "",
						provincia: "",
						ciudad: ""


					};



					var window = Ext
						.create('Legion.view.inscripcion.AlumnoInscripcionWindow');
					window.show();





				}
				else {
					store.getProxy().extraParams = {

						sucursal_busqueda: "",
						nombre_busqueda: "",
						estado: 1,
						cedula: "",
						provincia: "",
						ciudad: ""


					};
					store.load();
					var window = Ext
						.create('Legion.view.inscripcion.AlumnoInscripcionWindow');
					window.show();

				}



			}

		}

		);





	},
	onCargarAlumno: function (view, rowIndex, colIndex, item, e, record, row) {
		var id = record.data.id_alumno
		var alumno = record.data.nombre_alumno;
		var apellido = record.data.apellido_alumno;
		var direccion = record.data.direccion_alumno;
		var cedula = record.data.cedula_alumno;
		var correo = record.data.correo_alumno;
		var celular = record.data.celular_alumno;
		var imagen = record.data.imagen_src;

		Ext.ComponentQuery.query('Inscripciones #id_fkalumno_inscripcion')[0]
			.setValue(id);

		Ext.ComponentQuery.query('Inscripciones #nombre_alumno_inscripcion')[0]
			.setValue(alumno);
		Ext.ComponentQuery.query('Inscripciones #nombre_alumno_ins')[0]
			.setValue(alumno);
		Ext.ComponentQuery.query('Inscripciones #apellido_alumno_ins')[0]
			.setValue(apellido);
		Ext.ComponentQuery.query('Inscripciones #direccion_alumno_ins')[0]
			.setValue(direccion);
		Ext.ComponentQuery.query('Inscripciones #cedula_alumno_ins')[0]
			.setValue(cedula);
		Ext.ComponentQuery.query('Inscripciones #correo_alumno_ins')[0]
			.setValue(correo);
		Ext.ComponentQuery.query('Inscripciones #celular_alumno_ins')[0]
			.setValue(celular);

	},

	onCargarCurso2: function (view, rowIndex, colIndex, item, e, record, row) {
		var id_curso = record.data.id_curso;
		var nombre = record.data.nombre_curso;
		var precio = record.data.precio_curso;
		var matricula = record.data.cuota_entrada_curso;
		var mensualidad = record.data.mensualidad_curso;
		var duracion = record.data.duracion_mes_curso;
		var instructor = record.data.nombre_instructor;
		var id_instructor = record.data.id_fkinstructor_curso;
		var fecha_inicio = record.data.fecha_inicio_curso;
		var fecha_fin = record.data.fecha_fin_curso;
		var sucursal = record.data.nombre_sucursal;
		var id_sucursal = record.data.id_fksucursal_curso;

		Ext.ComponentQuery.query('Inscripciones #id_fkcurso_inscripcion')[0]
			.setValue(id_curso);
		Ext.ComponentQuery.query('Inscripciones #nombre_curso')[0]
			.setValue(nombre);

		Ext.ComponentQuery.query('Inscripciones #id_fkinstructor_inscripcion')[0]
			.setValue(id_instructor);

		Ext.ComponentQuery.query('Inscripciones #nombre_curso_inscripcion')[0]
			.setValue(nombre);
		Ext.ComponentQuery.query('Inscripciones #precio_curso')[0]
			.setValue(precio);
		Ext.ComponentQuery.query('Inscripciones #matricula_curso')[0]
			.setValue(matricula);
		Ext.ComponentQuery.query('Inscripciones #mensualidad_curso')[0]
			.setValue(mensualidad);
		Ext.ComponentQuery.query('Inscripciones #duracion_curso')[0]
			.setValue(duracion);
		Ext.ComponentQuery.query('Inscripciones #instructor_curso')[0]
			.setValue(instructor);

		Ext.ComponentQuery.query('Inscripciones #fecha_inicio_inscripcion')[0]
			.setValue(fecha_inicio);
		Ext.ComponentQuery.query('Inscripciones #fecha_fin_inscripcion')[0]
			.setValue(fecha_fin);

		Ext.ComponentQuery.query('Inscripciones #nombre_sucursal_inscripcion')[0]
			.setValue(sucursal);

		Ext.ComponentQuery.query('Inscripciones #precio_total_curso')[0]
			.setValue(precio);
		Ext.ComponentQuery.query('Inscripciones #id_fksucursal_inscripcion')[0]
			.setValue(id_sucursal);

	},

	onMostrarCursos: function () {


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
						estado: 1,
						nombre_busqueda: "",
						sucursal_busqueda: response_aux.sucursal,
						mes: "",
						anio: "",
						fecha_start: "",
						fecha_end: "",
						estado: ""


					};

					var window = Ext
						.create('Legion.view.inscripcion.CursoInscripcionWindow');
					window.show();




				}
				else {
					store.load();
					var window = Ext
						.create('Legion.view.inscripcion.CursoInscripcionWindow');
					window.show();

				}



			}

		}

		);




	},

	onRefresh: function () {
		var store = Ext.getStore('Inscripcion');
		Ext.ComponentQuery.query('#nombre_busqueda_inscripcion_alumno')[0].reset();
	
		
		Ext.ComponentQuery.query('#curso_busqueda_inscripcion')[0].reset();

		Ext.ComponentQuery.query('#buscarPorFechaDesde')[0].reset();
		Ext.ComponentQuery.query('#buscarPorFechaHasta')[0].reset();
		Ext.ComponentQuery.query('#comboMes')[0].reset();
		Ext.ComponentQuery.query('#comboAnioFactura')[0].reset();
		Ext.ComponentQuery.query('#estado_busqueda_inscripcion')[0].reset();



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
						id_alumno: "",
						fecha_start: "",
						fecha_end: "",
						mes: "",
						anio: "",
						curso: "",
						estado: ""

					};







				} else {
					console.log("SS");
					Ext.ComponentQuery.query('#sucursal_busqueda_inscripcion')[0].reset();
					Ext.ComponentQuery.query('#busqueda_insitucion_inscripcion')[0].reset();
					store.getProxy().extraParams = {
						nombre_busqueda: "",
						sucursal_busqueda: "",
						id_alumno: "",
						fecha_start: "",
						fecha_end: "",
						mes: "",
						anio: "",
						curso: "",
						estado: ""


					};


				}

				store.loadPage(1);

			}

		}

		);
		Ext.ComponentQuery.query('#fieldset2')[0].hide();

	},

	onBusquedaSucursal: function () {
		inicio = Ext.ComponentQuery
			.query('#buscarPorFechaDesde')[0]
			.getValue();

		fin = Ext.ComponentQuery
			.query('#buscarPorFechaHasta')[0]
			.getValue();
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_inscripcion_alumno')[0].getValue();
		var sucursal = Ext.ComponentQuery.query('#sucursal_busqueda_inscripcion')[0]
			.getValue();

		console.log(sucursal);
		var store = Ext.getStore('Inscripcion');

		if (nombre != "") {

			store.getProxy().extraParams = {

				sucursal_busqueda: sucursal,
				nombre_busqueda: nombre,
				id_alumno: "",
				mes: "",
				anio: "",
				fecha_start: inicio,
				fecha_end: fin,
				curso: "",
				estado: ""

			}
		}

		else {

			store.getProxy().extraParams = {
				sucursal_busqueda: sucursal,
				nombre_busqueda: nombre,
				id_alumno: "",
				mes: "",
				anio: "",
				fecha_start: inicio,
				fecha_end: fin,
				curso: "",
				estado: ""

			}

		}

		store.loadPage(1);

	},
	onBusquedaNombre: function (field, e) {


		curso = Ext.ComponentQuery
		.query('#curso_busqueda_inscripcion')[0]
		.getValue();

		inicio = Ext.ComponentQuery
			.query('#buscarPorFechaDesde')[0]
			.getValue();

		fin = Ext.ComponentQuery
			.query('#buscarPorFechaHasta')[0]
			.getValue();
		var sucursal = Ext.ComponentQuery.query('#sucursal_busqueda_inscripcion')[0]
			.getValue();
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_inscripcion_alumno')[0].getValue();
		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux)

				store = Ext.getStore("Inscripcion");
				if (response_aux.rol == 2 || response_aux.rol == 3) {





					if (e.getKey() == e.ENTER) {

						store.getProxy().extraParams = {

							sucursal_busqueda: response_aux.sucursal,
							nombre_busqueda: nombre,
							id_alumno: "",
							mes: "",
							anio: "",
							fecha_start: inicio,
							fecha_end: fin,
							curso: curso,
							estado: ""

						}
						store.loadPage(1);
					}

					if (e.getKey() == e.ENTER && nombre == '""') {
						nombre = ""

						store.getProxy().extraParams = {
							sucursal_busqueda: response_aux.sucursal,
							nombre_busqueda: nombre,
							id_alumno: "",
							mes: "",
							anio: "",
							fecha_start: inicio,
							fecha_end: fin,
							estado: "",
							curso: curso,


						}
						store.loadPage(1);

					}






				} else {


					if (e.getKey() == e.ENTER) {

						store.getProxy().extraParams = {

							sucursal_busqueda: sucursal,
							nombre_busqueda: nombre,
							id_alumno: "",
							mes: "",
							anio: "",
							fecha_start: inicio,
							fecha_end: fin,
							curso: curso,
							estado: ""

						}
						store.loadPage(1);
					}

					if (e.getKey() == e.ENTER && nombre == '""') {
						nombre = ""
						store.getProxy().extraParams = {
							sucursal_busqueda: sucursal,
							nombre_busqueda: nombre,
							id_alumno: "",
							mes: "",
							anio: "",
							fecha_start: inicio,
							fecha_end: fin,
							curso: curso,
							estado: ""

						}
						store.loadPage(1);

					}


				}



			}

		}

		);

	},

	onBuscar: function () {
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_inscripcion_alumno')[0]
			.getValue();

		var sucursal = Ext.ComponentQuery.query('#sucursal_busqueda_inscripcion')[0]
			.getValue();

		inicio = Ext.ComponentQuery
			.query('#buscarPorFechaDesde')[0]
			.getValue();

		fin = Ext.ComponentQuery
			.query('#buscarPorFechaHasta')[0]
			.getValue();

		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log("s", response_aux)

				var store = Ext.getStore('Inscripcion');
				if (response_aux.rol == 2 || response_aux.rol == 3) {




					store.getProxy().extraParams = {
						nombre_busqueda: nombre,
						sucursal_busqueda: response_aux.sucursal,
						id_alumno: "",
						mes: "",
						anio: "",
						fecha_start: inicio,
						fecha_end: fin,
						curso: "",
						estado: ""


					};

					store.loadPage(1);





				} else {


					store.getProxy().extraParams = {
						nombre_busqueda: nombre,
						sucursal_busqueda: sucursal,
						id_alumno: "",
						mes: "",
						anio: "",
						fecha_start: inicio,
						fecha_end: fin,
						curso: "",
						estado: ""


					};
					store.loadPage(1);
				}



			}

		}

		);


	},


	onWindow: function () {
		var window = Ext.create('Legion.view.inscripcion.InscripcionWindow');
		window.show();

	},
	onDeleteClick: function (grid, rowIndex, colIndex) {
		var rec = grid.getStore().getAt(rowIndex);


		Ext.Ajax.request({
			url: 'php/negocios/inscripciones/recuperarInscripcionOrden.php',
			method: 'POST',
			params: {
				id_inscripcion: rec.data.id_inscripcion

			},


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux)


				if (response_aux.total > 0) {

					Ext.MessageBox.show({
						title: 'Advertencia',
						msg: 'Esta inscripción no puede ser borrada por que tiene Ordenes de Pedido Adjuntas',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING,

					});
				}
				else {

					Ext.MessageBox.show({
						title: 'Advertencia',
						msg: 'Seguro que deseea Borrar?',
						buttons: Ext.MessageBox.OKCANCEL,
						icon: Ext.MessageBox.QUESTION,
						fn: function (btn) {
							if (btn == 'ok') {
								var rec = grid.getStore().getAt(rowIndex);

								Ext.Ajax.request({
									url: 'php/negocios/inscripciones/eliminarInscripcion.php',
									method: 'POST',
									params: {
										id_inscripcion: rec.data.id_inscripcion
									},

									success: function () {

										Ext.getStore('Inscripcion').load();
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


	

		var id = record.data.id_curso;
		var nombre = record.data.nombre_curso;
		var estado = record.data.estado_curso;
		var precio = record.data.precio_curso;
		var iva = record.data.iva_curso;
		var usuario = record.data.id_fkusuario_curso;
		var instructor = record.data.id_fkinstructor_curso;
		var sucursal = record.data.id_fksucursal_curso;
		var duracion = record.data.duracion_mes_curso;
		var cuota = record.data.cuota_entrada_curso;
		var cupo = record.data.cupos_curso;

		var window = Ext.create('Legion.view.inscripcion.InscripcionWindow');
		window.setTitle("Actualizar Curso:" + nombre + " ", true);
		window.show();

		Ext.ComponentQuery.query('#window_curso #cursoForm #id_curso')[0]
			.setValue(id);
		Ext.ComponentQuery.query('#window_curso #cursoForm #nombre_curso')[0]
			.setValue(nombre);

		Ext.ComponentQuery.query('#window_curso #cursoForm #estado_curso')[0]
			.setValue(estado);

		Ext.ComponentQuery.query('#window_curso #cursoForm #precio_curso')[0]
			.setValue(precio);

		Ext.ComponentQuery
			.query('#window_curso #cursoForm #id_fkusuario_curso')[0]
			.setValue(usuario);

		Ext.ComponentQuery.query('#window_curso #cursoForm #iva_curso')[0]
			.setValue(iva);

		Ext.ComponentQuery
			.query('#window_curso #cursoForm #id_fkinstructor_curso')[0]
			.setValue(instructor);

		Ext.getStore('Sucursal').load();
		Ext.ComponentQuery
			.query('#window_curso #cursoForm #id_fksucursal_curso')[0]
			.setValue(sucursal);

		Ext.ComponentQuery
			.query('#window_curso #cursoForm #duracion_mes_curso')[0]
			.setValue(duracion);

		Ext.ComponentQuery
			.query('#window_curso #cursoForm #cuota_entrada_curso')[0]
			.setValue(cuota);

		Ext.ComponentQuery.query('#window_curso #cursoForm #cupos_curso')[0]
			.setValue(cupo);

		Ext.ComponentQuery.query('#window_curso #cursoForm #guardar_curso')[0]
			.setText("Editar", true);

	},

	onCreateClick: function (form, window) {
		me = this;

		var values;
		console.log("form", form);

		if (!form || !form.isValid()) {
			alert('Verifica los datos Ingresados!!');
			return;
		}

		form.submit({
			url: 'php/negocios/inscripciones/ingresar_actualizarInscripcion.php',
			waitMsg: 'Creando Inscripcion ...',
			success: function (data, response) {

				var tipo = response.result.tipo;
				console.log(tipo);

				if (tipo == 0) {
					

					Ext.MessageBox.show({
						title: 'Mensaje',
						msg: 'Nueva Inscripcion Creado',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING

					});

					Ext.Ajax.request({
						url : 'php/negocios/correos/enviarAlumno.php',
						method : 'POST',
						
			
						success : function(response) {
			
							var response_aux = Ext.util.JSON
							.decode(response.responseText, true);
							console.log(response_aux);
			
			
						}
			
					}
			
					);

					Ext.getStore('Inscripcion').load();
					
					Ext.getStore('InscripcionesWeb').load();

					form.reset();
					console.log("s");

					if(window === undefined){
						console.log("s",window);
					
					}else{
						console.log("s",window);
						window.close()

					}
				

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
								Ext.ComponentQuery.query('Inscripciones #celular_alumno_ins')[0]
									.reset()
								Ext.ComponentQuery.query('Inscripciones #correo_alumno_ins')[0]
									.reset()
								Ext.ComponentQuery.query('Inscripciones #cedula_alumno_ins')[0]
									.reset();
								Ext.ComponentQuery.query('Inscripciones')[0].setActiveTab(0);
									
								


						//Desea Crear la orden de pedido
						/*
					Ext.MessageBox.show({
						title: 'Advertencia',
						msg: 'Desea Crear la orden de Pedido?',
						buttons: Ext.MessageBox.OKCANCEL,
						icon: Ext.MessageBox.WARNING,
						fn: function (btn) {
							console.log("ssss", btn);
							if (btn == 'ok') {


								Ext.Ajax.request({
									url: 'php/negocios/inscripciones/recuperarInscripcion.php',
									method: 'POST',


									success: function (response) {

										var response_aux = Ext.util.JSON
											.decode(response.responseText, true);
										console.log(response_aux.id);

										var locacion = "OrdenPedidos";

										me.redirectTo(locacion)

										setTimeout(console.log("Entro"), 1000);
										Ext.ComponentQuery.query('#OrdenPedidos #id_inscripcion')[0].setValue(response_aux.id)


										//cedula
										cedula = Ext.ComponentQuery.query('Inscripciones #cedula_alumno')[0]
											.getValue();
										Ext.ComponentQuery
											.query('OrdenPedidos #cedula_alumno')[0]
											.setValue(cedula);
										Ext.ComponentQuery
											.query('OrdenPedidos #cedula_alumno_orden')[0]
											.setValue(cedula);

										//id_alumno
										id_alumno = Ext.ComponentQuery
											.query('Inscripciones #id_fkalumno_inscripcion')[0]
											.getValue();

										Ext.ComponentQuery
											.query('OrdenPedidos #id_fkalumno_orden_pedido')[0]
											.setValue(id_alumno);


										//nombre_alumno

										nombre_alumno = Ext.ComponentQuery
											.query('Inscripciones #nombre_alumno')[0]
											.getValue();

										Ext.ComponentQuery
											.query('OrdenPedidos #nombre_alumno_orden')[0]
											.setValue(nombre_alumno);


										//apellido_alumno

										apellido_alumno = Ext.ComponentQuery
											.query('Inscripciones #apellido_alumno')[0]
											.getValue();

										Ext.ComponentQuery
											.query('OrdenPedidos #apellido_alumno_orden')[0]
											.setValue(apellido_alumno);


										//celular_alumn


										celular_alumno = Ext.ComponentQuery
											.query('Inscripciones #celular_alumno')[0]
											.getValue();

										Ext.ComponentQuery
											.query('OrdenPedidos #celular_alumno_orden')[0]
											.setValue(celular_alumno);


										//correo_alumno


										correo_alumno = Ext.ComponentQuery
											.query('Inscripciones #correo_alumno')[0]
											.getValue();

										Ext.ComponentQuery
											.query('OrdenPedidos #correo_alumno_orden')[0]
											.setValue(correo_alumno);


										//direccion_alumno

										dirreccion_alumno = Ext.ComponentQuery
											.query('Inscripciones #direccion_alumno')[0]
											.getValue();

										Ext.ComponentQuery
											.query('OrdenPedidos #direccion_alumno_orden')[0]
											.setValue(dirreccion_alumno);


										//cedula_alumno

										cedula_alumno = Ext.ComponentQuery
											.query('Inscripciones #cedula_alumno')[0]
											.getValue();

										Ext.ComponentQuery
											.query('OrdenPedidos #cedula_alumno_orden')[0]
											.setValue(cedula_alumno);

										//Instructor
										id_instructor = Ext.ComponentQuery
											.query('Inscripciones #id_fkinstructor_inscripcion')[0]
											.getValue();


										Ext.ComponentQuery
											.query('OrdenPedidos #id_fkinstructor_orden_pedido')[0]
											.setValue(id_instructor);


										//nombre_instructor

										nombre_instructor = Ext.ComponentQuery
											.query('Inscripciones #instructor_curso')[0]
											.getValue();


										Ext.ComponentQuery
											.query('OrdenPedidos #nombre_instructor')[0]
											.setValue(nombre_instructor);


										//Iva del curso 
										id_curso_ = Ext.ComponentQuery
											.query('Inscripciones #id_fkcurso_inscripcion')[0]
											.getValue();

										Ext.Ajax.request({
											url: 'php/negocios/cursos/recuperarIvaCurso.php',
											method: 'POST',
											params: {
												id_curso: id_curso_
											},


											success: function (response) {

												var response_aux = Ext.util.JSON
													.decode(response.responseText, true);
												console.log(response_aux.iva)


												Ext.ComponentQuery
													.query('OrdenPedidos #iva_orden_pedido')[0]
													.setValue(response_aux.iva);

												Ext.ComponentQuery
													.query('OrdenPedidos #iva_curso')[0]
													.setValue(response_aux.iva);






											}

										}

										);


										//Imagen Alumno
										id_alumno_ = Ext.ComponentQuery
											.query('Inscripciones #id_fkalumno_inscripcion')[0]
											.getValue();

										Ext.Ajax.request({
											url: 'php/negocios/alumnos/recuperarImagenAlumno.php',
											method: 'POST',
											params: {
												id_alumno: id_alumno_
											},



											success: function (response) {

												var response_aux = Ext.util.JSON
													.decode(response.responseText, true);
												console.log(response_aux.imagen)


												Ext.ComponentQuery
													.query('OrdenPedidos #imagen_alumno_orden')[0]
													.setSrc(response_aux.imagen);






											}

										}

										);










									}

								}

								);








							}
							else if (btn == 'cancel') {

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
								Ext.ComponentQuery.query('Inscripciones #celular_alumno_ins')[0]
									.reset()
								Ext.ComponentQuery.query('Inscripciones #correo_alumno_ins')[0]
									.reset()
								Ext.ComponentQuery.query('Inscripciones #cedula_alumno_ins')[0]
									.reset()
								setTimeout(Ext.ComponentQuery.query('Inscripciones')[0].setActiveTab(0)
									, 2000);


							}
						}



					});

*/










				}
				if (tipo == 1) {

					var window2 = Ext.ComponentQuery.query('#window_alumno')[0];

					Ext.MessageBox.show({
						title: 'Mensaje',
						msg: 'Alumno Actualizado',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING

					});
					window2.close();
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
					Ext.ComponentQuery.query('Inscripciones #nombre_alumno')[0]
						.reset()
					Ext.ComponentQuery.query('Inscripciones #apellido_alumno')[0]
						.reset()
					Ext.ComponentQuery.query('Inscripciones #direccion_alumno')[0]
						.reset()
					Ext.ComponentQuery.query('Inscripciones #cedula_alumno')[0]
						.reset()
					Ext.ComponentQuery.query('Inscripciones #correo_alumno')[0]
						.reset()
					Ext.ComponentQuery.query('Inscripciones #celular_alumno')[0]
						.reset()
				}
				Ext.getStore('Alumno').load();

			},
			failure: function () {
				console.log("dsa");

			}

		});



	},
	onCheckCursoVariable: function () {
		var check = Ext.ComponentQuery
			.query('Inscripciones #curso_variable_inscripcion')[0]
			.getValue();

		if (check == true) {
			Ext.ComponentQuery
				.query('Inscripciones #condicion_pago_inscripcion')[0]
				.disable();

		}
		if (check == false) {
			Ext.ComponentQuery
				.query('Inscripciones #condicion_pago_inscripcion')[0]
				.enable();

				
		}





	

	},

	menuBar: function (grid, rowIndex, colIndex, item, e, record) {


		if (record.data.estado_inscripcion == 3) {
			Ext.MessageBox.show({
				title: 'Mensaje',
				msg: 'No puede realizar acciones a inscripciones Anuladas',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING,
			})

		}

		else {
			var menu_grid = new Ext.menu.Menu({
				items: [{
					text: 'Ver Pagos',
					iconCls: 'x-fa  fa-dollar-sign',

					handler: function () {

						console.log("Variable", record.data);

						var store = Ext.getStore('InscripcionMensualidades');

						store.getProxy().extraParams = {
							inscripcion: record.data.id_inscripcion

						};
						store.load();
						
						
						var window = Ext
							.create('Legion.view.inscripcion.MensualidadInscripcionWindow');
							window.setTitle('Pagos-Alumno:'+record.data.nombre_alumno+" "+"Curso:"+record.data.nombre_curso);
						window.show();


						if(record.data.curso_variable_inscripcion==0){
							Ext.ComponentQuery
						.query('#aumentar_mensualidades')[0].hide();
						}

					}
				},

				{
					text: 'Uniforme',
					iconCls: 'x-fa  fa-dollar-sign',

					handler: function () {
						var window = Ext.create('Ext.window.Window', {
							title: 'Uniforme',
							height: 200,
							width: 300,
							layout: 'fit',
							itemId: 'window_uniforme',
							modal: true,
							items: {
								xtype: 'form',
								itemId: 'uniformeForm',
								defaultType: 'textfield',
								fieldDefaults: {

									labelStyle: 'font-weight:bold'
								},

								items: [

									{
										fieldLabel: 'Uniforme',
										itemId: 'estado_uniforme_inscripcion_fo',
										name: 'estado_uniforme_inscripcion_fo',
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
									},
									{

										fieldLabel: 'Fecha de Entrega',
										xtype: 'datefield',
										name: 'fecha_entrega_uniforme',
										itemId: 'fecha_entrega_uniforme',
										editable: false,
										format: 'Y-m-d',
										margin: '10 0 0 5',
										flex: 1

									}],
								buttons: [{
									text: 'Guardar',
									itemId: 'guardar_nota',
									handler: function () {

										Ext.MessageBox.show({
											title: 'Advertencia',
											msg: 'Desea agregar el Uniforme?',
											buttons: Ext.MessageBox.OKCANCEL,
											icon: Ext.MessageBox.WARNING,
											fn: function (btn) {
												if (btn == 'ok') {
													form = Ext.ComponentQuery
														.query('#uniformeForm')[0].getForm();

													form.submit({
														url: 'php/negocios/inscripciones/actualizarUniforme.php',
														params: {
															id_inscripcion: record.data.id_inscripcion,


														},


														success: function (data, response) {

															if (response.result.success == true) {
																Ext.MessageBox.show({
																	title: 'Mensaje',
																	msg: 'Uniforme Actualizado',
																	buttons: Ext.MessageBox.OK,
																	icon: Ext.MessageBox.INFO

																});

																Ext.getStore('Inscripcion').load();

																Ext.ComponentQuery
																	.query('#window_uniforme')[0].close();






															} else {

																Ext.MessageBox.show({
																	title: 'Mensaje',
																	msg: 'Error Al Agregar Uniforme',
																	buttons: Ext.MessageBox.OK,
																	icon: Ext.MessageBox.WARNING

																});
															}





														}


													});




												}
											}
										});

									}
								}]

							}
						});

						window.show();



					}
				}, {
					text: 'Agregar Calificacion',
					iconCls: 'fas fa-marker',

					handler: function () {

						Ext.Ajax.request({
							url: 'php/negocios/inscripciones/verificarDeudas.php',
							method: 'POST',
							params: {
								id_inscripcion: record.data.id_inscripcion,
							},


							success: function (response) {

								var response_aux = Ext.util.JSON
									.decode(response.responseText, true);
								console.log(response_aux)


								if (response_aux.success == true) {

									Ext.MessageBox.show({
										title: 'Mensaje',
										msg: 'Este Alumno Tiene Saldos Pendientes',
										buttons: Ext.MessageBox.OK,
										icon: Ext.MessageBox.INFO

									});


								} else {

									var window = Ext.create('Ext.window.Window', {
										title: 'Agregar Calificación',
										height: 150,
										width: 300,
										layout: 'fit',
										itemId: 'window_cal',
										modal: true,
										items: {
											xtype: 'form',
											itemId: 'calificacionForm',
											defaultType: 'textfield',
											fieldDefaults: {

												labelStyle: 'font-weight:bold'
											},

											items: [{

												fieldLabel: 'Calificacion',
												itemId: 'calificacion',
												maskRe: /[0-9.]/,
												margin: '10 0 0 5',
												flex: 1

											}],
											buttons: [{
												text: 'Guardar',
												itemId: 'guardar_nota',
												handler: function () {

													Ext.MessageBox.show({
														title: 'Advertencia',
														msg: 'Desea agregar la Calificación?',
														buttons: Ext.MessageBox.OKCANCEL,
														icon: Ext.MessageBox.WARNING,
														fn: function (btn) {
															if (btn == 'ok') {
																form = Ext.ComponentQuery
																	.query('#calificacionForm')[0].getForm();
																nota = Ext.ComponentQuery
																	.query('#calificacion')[0].getValue();
																form.submit({
																	url: 'php/negocios/inscripciones/ingresarCalificacion.php',
																	params: {
																		id_inscripcion: record.data.id_inscripcion,
																		nota: nota

																	},


																	success: function (data, response) {

																		if (response.result.success == true) {
																			Ext.MessageBox.show({
																				title: 'Mensaje',
																				msg: 'Calificación Agregada',
																				buttons: Ext.MessageBox.OK,
																				icon: Ext.MessageBox.INFO

																			});

																			Ext.getStore('Inscripcion').load();

																			Ext.ComponentQuery
																				.query('#window_cal')[0].close();






																		} else {

																			Ext.MessageBox.show({
																				title: 'Mensaje',
																				msg: 'Error Al Agregar Calificación',
																				buttons: Ext.MessageBox.OK,
																				icon: Ext.MessageBox.WARNING

																			});
																		}





																	}


																});




															}
														}
													});

												}
											}]

										}
									});

									window.show();


								}





							}




						}

						);







					}
				}, {
					text: 'Finalizar',
					iconCls: 'fas fa-flag-checkered',
					handler: function () {

						if (record.data.calificacion_inscripcion == 0) {

							Ext.MessageBox.show({
								title: 'Mnesaje',
								msg: 'No puede finalizar si antes agregar una nota aprobatoria',
								buttons: Ext.MessageBox.OK,
								icon: Ext.MessageBox.QUESTION

							});
						}
						else {

							if (record.data.condicion_pago == 'Indefinido') {
								var window = Ext.create('Ext.window.Window', {
									title: 'Agregar Fecha de Finalización',
									height: 150,
									width: 300,
									layout: 'fit',
									itemId: 'window_fin',
									modal: true,
									items: {
										xtype: 'form',
										itemId: 'fechafinForm',
										defaultType: 'textfield',
										fieldDefaults: {

											labelStyle: 'font-weight:bold'
										},

										items: [{

											fieldLabel: 'Fecha de Finalización',
											itemId: 'fecha_fin',
											name: 'fecha_fin',
											format: 'Y-m-d',
											editable: false,
											xtype: 'datefield',

											margin: '10 0 0 5',
											flex: 1

										}],
										buttons: [{
											text: 'Guardar',
											itemId: 'guardar_nota',
											handler: function () {

												Ext.MessageBox.show({
													title: 'Advertencia',
													msg: 'Desea agregar la fecha de finalización?',
													buttons: Ext.MessageBox.OKCANCEL,
													icon: Ext.MessageBox.WARNING,
													fn: function (btn) {
														if (btn == 'ok') {
															form = Ext.ComponentQuery
																.query('#fechafinForm')[0].getForm();



															form.submit({
																url: 'php/negocios/inscripciones/ingresarFechaFin.php',
																params: {
																	id_inscripcion: record.data.id_inscripcion,

																},


																success: function (data, response) {



																	if (response.result.success == true) {
																		Ext.MessageBox.show({
																			title: 'Mensaje',
																			msg: 'Fecha Agregada',
																			buttons: Ext.MessageBox.OK,
																			icon: Ext.MessageBox.INFO

																		});

																		Ext.ComponentQuery
																			.query('#window_fin')[0].close();
																		Ext.getStore('Inscripcion').load();



																	} else {

																		Ext.MessageBox.show({
																			title: 'Mensaje',
																			msg: 'Error Al Agregar fecha',
																			buttons: Ext.MessageBox.OK,
																			icon: Ext.MessageBox.WARNING

																		});
																	}





																}


															});




														}
													}
												});

											}
										}]

									}
								});

								window.show();


							} else {

								Ext.MessageBox.show({
									title: 'Advertencia',
									msg: 'Desear finalizar esta inscripcion',
									buttons: Ext.MessageBox.OKCANCEL,
									icon: Ext.MessageBox.QUESTION,
									fn: function (btn) {
										if (btn == 'ok') {
											var rec = grid.getStore().getAt(rowIndex);

											Ext.Ajax.request({
												url: 'php/negocios/inscripciones/actualizarInscripcion.php',
												method: 'POST',
												params: {
													id_inscripcion: rec.data.id_inscripcion
												},

												success: function (response) {

													var response_aux = Ext.util.JSON
														.decode(response.responseText, true);
													console.log(response_aux.success)

													if (response_aux.success) {

														Ext.MessageBox.show({
															title: 'Mensaje',
															msg: 'Inscripcion Finalizada',
															buttons: Ext.MessageBox.OK,
															icon: Ext.MessageBox.INFO

														});
														Ext.getStore('Inscripcion').load();

													}
													else {

														Ext.MessageBox.show({
															title: 'Mensaje',
															msg: 'Error al finalizar inscripcion',
															buttons: Ext.MessageBox.OK,
															icon: Ext.MessageBox.WARNING

														});

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



				}, {

					text: 'Ver Certificado',
					iconCls: 'fas fa-download',

					handler: function () {
					
						id_inscripcion= record.data.id_inscripcion;


						window.open('php/negocios/certificado/index.php?id_inscripcion='+id_inscripcion, '_blank');



						
					
					}

				}, {
					text: 'Subir Certificado Firmado ',
					iconCls: 'fas fa-upload',

					handler: function () {
						var window = Ext.create('Ext.window.Window', {
							title: 'Subir certicado',
							height: 150,
							width: 400,
							layout: 'fit',
							itemId: 'window_subir_certificado',
							modal: true,
							items: {
								xtype: 'form',
								itemId: 'certificadoForm',
								defaultType: 'textfield',
								fieldDefaults: {

									labelStyle: 'font-weight:bold'
								},

								items: [{

									fieldLabel: 'Archivo',
									xtype: 'filefield',
									name: 'certificado_inscripcion',
									itemId: 'certificado_inscripcion',
									margin: '10 10 0 5',
									flex: 1,
									allowBlank: false,

								}],
								buttons: [{
									text: 'Guardar',
									itemId: 'guardar_nota',
									handler: function () {

										Ext.MessageBox.show({
											title: 'Advertencia',
											msg: 'Seguro desea subir el certificado?',
											buttons: Ext.MessageBox.OKCANCEL,
											icon: Ext.MessageBox.WARNING,
											fn: function (btn) {
												if (btn == 'ok') {
													form = Ext.ComponentQuery
														.query('#certificadoForm')[0].getForm();





													form.submit({
														url: 'php/negocios/inscripciones/subirCertificado.php',
														params: {
															id_inscripcion: record.data.id_inscripcion,
														},


														success: function (data, response) {



															if (response.result.success == true) {
																Ext.MessageBox.show({
																	title: 'Mensaje',
																	msg: 'Certificado Caragdo Correctamente',
																	buttons: Ext.MessageBox.OK,
																	icon: Ext.MessageBox.INFO

																});

																Ext.ComponentQuery
																	.query('#window_subir_certificado')[0].close();



															} else {

																Ext.MessageBox.show({
																	title: 'Mensaje',
																	msg: 'Error al subir certificado',
																	buttons: Ext.MessageBox.OK,
																	icon: Ext.MessageBox.WARNING

																});
															}





														}


													});




												}
											}
										});

									}
								}]

							}
						});

						window.show();



					}
				}, {
					text: 'Visualizar Certificado ',
					iconCls: 'far fa-eye',
					handler: function () {

						if (record.data.calificacion_inscripcion > 16) {
							var window2 = Ext.create('Ext.window.Window', {
								title: 'Certificado',
								layout: {
									align: 'middle',
									pack: 'center',
									type: 'hbox'
								},
								height: 500,
								width: 600,
								modal: true,
								listeners: {
									show: function () {
										me = this;
										Ext.Ajax.request({
											url: 'php/negocios/inscripciones/recuperarCertificado.php',
											method: 'POST',
											params: {
												id_inscripcion: record.data.id_inscripcion
											},


											success: function (response) {

												var response_aux = Ext.util.JSON
													.decode(response.responseText, true);
												console.log(response_aux)




												var myFrame = Ext.create('Ext.Component', {
													height: 600,
													width: 600,
													itemId: 'certificado',
													autoEl: {
														tag: 'iframe',
														src: 'data:application/pdf;base64,' + response_aux.src,
													}
												});
												me.add(myFrame);




											}

										}

										);




									}
								}


							});
							window2.show();

						}
						else {

							Ext.MessageBox.show({
								title: 'Advertencia',
								msg: 'Debe tener una nota aprobatoria para visualizar el certificado',
								buttons: Ext.MessageBox.OK,
								icon: Ext.MessageBox.WARNING

							});

						}















					}
				}]
			});

			var position = e.getXY();
			e.stopEvent();
			menu_grid.showAt(position);
		}

	},




	onPagarMensualidad: function (view, rowIndex, colIndex, item, e, record,
		row) {

		console.log("s", record);

		var id = record.data.id_mensualidad;
		var total = record.data.monto_mensualidad;
		var abonado = record.data.abonado_mensualidad;
		var saldo = record.data.saldo_mensualidad;

		var window = Ext.create('Ext.window.Window', {
			title: 'Pagar Cuota #' + record.data.numero_cuota_mensualidad,
			height: 200,
			width: 400,
			layout: 'fit',
			modal: true,
			items: {
				xtype: 'form',
				itemId: 'pagoForm',
				defaultType: 'textfield',
				fieldDefaults: {

					labelStyle: 'font-weight:bold'
				},

				items: [{

					fieldLabel: 'Monto',
					itemId: 'monto_pago',
					margin: '10 0 0 5',
					flex: 1

				}, {
					fieldLabel: 'Forma Pago',
					itemId: 'forma_pago',
					name: 'forma_pago',
					margin: '10 10 0 5',
					xtype: 'combo',
					dock: 'top',
					enableKeyEvents: true,
					editable: false,
					displayField: 'nombre_forma',
					valueField: 'id_forma',
					mode: 'local',
					triggerAction: 'all',
					emptyText: 'Seleccionar',
					store: 'FormaPago',
					queryMode: 'local',
					flex: 1

				}],
				buttons: [{
					text: 'Guardar',
					itemId: 'guardar_inscripcion',
					handler: function (record) {
						var valor = Ext.ComponentQuery.query('#monto_pago')[0]
							.getValue();
						Ext.MessageBox.show({
							title: 'Advertencia',
							msg: 'Desea Realizar el Pago?',
							buttons: Ext.MessageBox.OKCANCEL,
							icon: Ext.MessageBox.WARNING,
							fn: function (btn) {
								if (btn == 'ok') {

									Ext.Ajax.request({
										url: 'php/negocios/mensualidades/actualizarMensualidad.php', // your
										method: 'POST',
										params: {
											id_mensualidad: id,
											abonado_mensualidad: abonado,
											saldo_mensualidad: saldo,
											valor: valor
										},
										success: function () {

											Ext
												.getStore('InscripcionMensualidades')
												.load();

											window.close();
										}

									}

									);

								}
							}
						});

					}
				}]

			}
		});

		window.show();

		console.log("ABONADO", abonado, "SALDO", saldo, 'VALOR', valor);

	},
	onbtnReporteInscripcion: function () {


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
						title: 'Reporte Inscripciones',
						layout: {
							align: 'middle',
							pack: 'center',

						},
						height: 300,
						width: 300,
						modal: true,
						items: [
							{
								xtype: 'combo',
								fieldLabel: 'Institucion',
								margin: '10',

								itemId: 'id_fkempresa_sucursal_reporte_inscrip',
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
											.query('#id_fkempresa_sucursal_reporte_inscrip')[0]
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
								margin: '10',
								name: 'id_fksucursal_usuario',
								itemId: 'id_fksucursal_usuario_reporte',
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
								listeners: {
									change: function () {
										store = Ext.getStore('Curso');
										sucursal = Ext.ComponentQuery
											.query('#id_fksucursal_usuario_reporte')[0]
											.getValue();
										store.getProxy().extraParams = {
											sucursal_busqueda: sucursal,
											nombre_busqueda: "",
											estado: "",
											mes: "",
											anio: "",
											fecha_start: "",
											fecha_end: "",
											estado: ""

										}

										store.load({
											callback: function (records, operation, success) {
												console.log(records.length);

												if (records.length == 0) {
													Ext.ComponentQuery.query('#id_fkcurso_usuario_reporte')[0].reset()
													Ext.ComponentQuery.query('#id_fkcurso_usuario_reporte')[0]
														.setEmptyText("No hay ningun Curso en esta Sucursal");

													Ext.ComponentQuery.query('#id_fkcurso_usuario_reporte')[0].reset()

												}
												if (records.length > 0) {
													Ext.ComponentQuery.query('#id_fkcurso_usuario_reporte')[0]
														.setEmptyText("Seleccionar");

												}
											}
										});
									}
								}
							},
							{
								xtype: 'combo',
								fieldLabel: 'Curso',
								margin: '10',
								name: 'id_fkcurso_usuario',
								itemId: 'id_fkcurso_usuario_reporte',
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


								fieldLabel: 'Desde:',
								margin: '10',
								xtype: 'datefield',
								name: 'buscarPorFechaDesdeReport',
								itemId: 'buscarPorFechaDesdeReport',
								format: 'Y-m-d',
								enableKeyEvents: true,
								emptyText: "Desde",
								fieldLabel: 'Desde',
								value: ""
							}, {
								margin: '10',
								xtype: 'datefield',
								fieldLabel: 'Hasta:',
								name: 'buscarPorFechaHastaReport',
								itemId: 'buscarPorFechaHastaReport',
								format: 'Y-m-d',
								enableKeyEvents: true,
								emptyText: 'Hasta',
								fieldLabel: 'Hasta',
								value: ""

							},

							{
								xtype: 'button',
								text: 'Generar Reporte',
								margin: '0 0 0 10',
								iconCls: 'x-fa  fa-download',
								itemId: 'boton_refresh',
								handler: function () {
									sucursal = Ext.ComponentQuery
										.query('#id_fksucursal_usuario_reporte')[0]
										.getValue();

									curso = Ext.ComponentQuery
										.query('#id_fkcurso_usuario_reporte')[0]
										.getValue();


									inicio = Ext.ComponentQuery
										.query('#buscarPorFechaDesdeReport')[0]
										.getValue();

									fin = Ext.ComponentQuery
										.query('#buscarPorFechaHastaReport')[0]
										.getValue();
									console.log(sucursal)
									window.open('php/negocios/reportes/reporteInscripciones.php?id_sucursal=' + sucursal + "&id_curso=" + curso + "&fecha_start=" + inicio + "&fecha_end=" + fin, '_blank');

								}

							}


						]

					});
					window2.show();

				}

				else {

					store = Ext.getStore('Curso');

					store.getProxy().extraParams = {
						sucursal_busqueda: response_aux.sucursal,
						nombre_busqueda: "",
						estado: "",
						mes:"",
             anio:"",
             fecha_start:"",
             fecha_end:"",
             estado:""
					};

					store.load();
					var window2 = Ext.create('Ext.window.Window', {
						title: 'Reporte Inscripciones',


						layout: {
							align: 'middle',
							pack: 'center',

						},

						height: 250,
						width: 300,
						modal: true,
						items: [

							
							{
								xtype: 'combo',
								fieldLabel: 'Curso',
								margin: '10',
								name: 'id_fkcurso_usuario',
								itemId: 'id_fkcurso_usuario_reporte',
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


								fieldLabel: 'Desde:',
								margin: '10',
								xtype: 'datefield',
								name: 'buscarPorFechaDesdeReport',
								itemId: 'buscarPorFechaDesdeReport',
								format: 'Y-m-d',
								enableKeyEvents: true,
								emptyText: "Desde",
								fieldLabel: 'Desde',
								value: ""
							}, {
								margin: '10',
								xtype: 'datefield',
								fieldLabel: 'Hasta:',
								name: 'buscarPorFechaHastaReport',
								itemId: 'buscarPorFechaHastaReport',
								format: 'Y-m-d',
								enableKeyEvents: true,
								emptyText: 'Hasta',
								fieldLabel: 'Hasta',
								value: ""

							},
							{
								xtype: 'button',
								text: 'Generar Reporte',
								margin: '0 0 0 10',
								iconCls: 'x-fa  fa-download',
								itemId: 'boton_refresh',
								handler: function () {

									curso = Ext.ComponentQuery
										.query('#id_fkcurso_usuario_reporte')[0]
										.getValue();

									inicio = Ext.ComponentQuery
										.query('#buscarPorFechaDesdeReport')[0]
										.getValue();

									fin = Ext.ComponentQuery
										.query('#buscarPorFechaHastaReport')[0]
										.getValue();


										
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
						
						window.open('php/negocios/reportes/reporteInscripciones.php?id_curso=' + curso + "&fecha_start=" + inicio + "&fecha_end=" + fin +'&instituto='+instituto, '_blank');

						}
						});
								


								

								}

							}


						]

					});
					window2.show();


				}
			}

		}

		);






	},

	onMostrarColumnas: function (combo, records) {

		Ext.each(records, function (rec) {
			node = combo.getPicker().getNode(rec);

			if (rec.data.id == 1) {

				Ext.ComponentQuery.query('#InscripcionGrid')[0].columns[6]
					.setVisible(true)

			}
			if (rec.data.id == 2) {
				Ext.ComponentQuery.query('#InscripcionGrid')[0].columns[7]
					.setVisible(true)

			}




			Ext.get(node).down('input').dom.checked = true;

		});
	},

	onOcultarColumnas: function (combo, rec) {

		var node = combo.getPicker().getNode(rec);
		if (rec.data.id == 1) {
			Ext.ComponentQuery.query('#InscripcionGrid')[0].columns[6]
				.setVisible(false)
		}
		if (rec.data.id == 2) {
			Ext.ComponentQuery.query('#InscripcionGrid')[0].columns[7]
				.setVisible(false)
		}



		Ext.get(node).down('input').dom.checked = false;
	},


	onRangoMesAnio: function () {



		sucursal = Ext.ComponentQuery
			.query('#sucursal_busqueda_inscripcion')[0]
			.getValue();

		
			
			curso = Ext.ComponentQuery
			.query('#curso_busqueda_inscripcion')[0]
			.getValue();
	



		mes = Ext.ComponentQuery
			.query('#comboMes')[0]
			.getValue();

		anio = Ext.ComponentQuery
			.query('#comboAnioFactura')[0]
			.getValue();

		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux)


				if (response_aux.rol == 2 || response_aux.rol == 3) {


					store = Ext.getStore("Inscripcion");

					store.getProxy().extraParams = {

						sucursal_busqueda: response_aux.sucursal,
						nombre_busqueda: "",
						id_alumno: "",
						mes: mes,
						anio: anio,
						fecha_start: "",
						fecha_end: "",
						curso: curso,
						estado: ""

					};

					store.load();

				} else {


					store = Ext.getStore("Inscripcion");

					store.getProxy().extraParams = {

						sucursal_busqueda: sucursal,
						nombre_busqueda: "",
						id_alumno: "",
						mes: mes,
						anio: anio,
						fecha_start: "",
						fecha_end: "",
						curso: curso,
						estado: ""

					};

					store.load();


				}


			}
		});



	},


	onRangoFecha: function () {



		sucursal = Ext.ComponentQuery
			.query('#sucursal_busqueda_inscripcion')[0]
			.getValue();



		inicio = Ext.ComponentQuery
			.query('#buscarPorFechaDesde')[0]
			.getValue();

		fin = Ext.ComponentQuery
			.query('#buscarPorFechaHasta')[0]
			.getValue();


		
			curso = Ext.ComponentQuery
			.query('#curso_busqueda_inscripcion')[0]
			.getValue();
	

		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux)


				if (response_aux.rol == 2 || response_aux.rol == 3) {


					store = Ext.getStore("Inscripcion");

					store.getProxy().extraParams = {

						sucursal_busqueda: response_aux.sucursal,
						nombre_busqueda: "",
						id_alumno: "",
						mes: "",
						anio: "",
						fecha_start: inicio,
						fecha_end: fin,
						curso: curso,
						estado: ""

					};

					store.load();

				} else {


					store = Ext.getStore("Inscripcion");

					store.getProxy().extraParams = {

						sucursal_busqueda: sucursal,
						nombre_busqueda: "",
						id_alumno: "",
						mes: "",
						anio: "",
						fecha_start: inicio,
						fecha_end: fin,
						curso: curso,
						estado: ""

					};

					store.load();


				}


			}
		});



	},


	onSelectionChange: function (grid, selection) {
		console.log(grid);
	},




	onBusquedaCurso: function () {

		store = Ext.getStore('Inscripcion');
		curso = Ext.ComponentQuery
			.query('#curso_busqueda_inscripcion')[0]
			.getValue();

		store.getProxy().extraParams = {
			id_alumno: "",
			nombre_busqueda: "",
			sucursal_busqueda: "",
			mes: "",
			anio: "",
			fecha_start: "",
			fecha_end: "",
			curso: curso,
			estado: ""
		}
		store.load();


	},


	onEstadoBuscar: function () {


		store = Ext.getStore('Inscripcion');


		curso = Ext.ComponentQuery
		.query('#curso_busqueda_inscripcion')[0]
		.getValue();

		estado = Ext.ComponentQuery
			.query('#estado_busqueda_inscripcion')[0]
			.getValue();

		sucursal = Ext.ComponentQuery
			.query('#estado_busqueda_inscripcion')[0]
			.getValue();

		Ext.Ajax.request({
			url: 'php/negocios/usuarios/recuperarUsuario.php',
			method: 'POST',


			success: function (response) {

				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				console.log(response_aux)


				if (response_aux.rol == 2 || response_aux.rol == 3) {


					store = Ext.getStore("Inscripcion");

					store.getProxy().extraParams = {

						sucursal_busqueda: response_aux.sucursal,
						nombre_busqueda: "",
						id_alumno: "",
						mes: "",
						anio: "",
						fecha_start: "",
						fecha_end: "",
						curso: curso,
						estado: estado

					};

					store.load();

				} else {


					store = Ext.getStore("Inscripcion");

					store.getProxy().extraParams = {

						sucursal_busqueda: sucursal,
						nombre_busqueda: "",
						id_alumno: "",
						mes: "",
						anio: "",
						fecha_start: "",
						fecha_end: "",
						curso: curso,
						estado: estado

					};

					store.load();


				}


			}
		});





	},


	onVerHistorialCertificados : function(grid, rowIndex, colIndex, item, e, record){


		 store = Ext.getStore('HistorialCertificados');
		 store.getProxy().extraParams={
			id_inscripcion :record.data.id_inscripcion
		 }
	
	var window = Ext
		.create('Legion.view.inscripcion.HistorialCertificados');

		window.setTitle('Historial de Certificados - Alumno:'+record.data.nombre_alumno, true);
	window.show();


	}
	

	


});