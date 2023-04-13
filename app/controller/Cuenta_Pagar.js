Ext.define('Legion.controller.Cuenta_Pagar', {
	extend: 'Ext.app.Controller',
	
	views: ['Legion.view.cuentas.Cuentas_Pagar'],

	

	init: function () {
		this.control({

		
			
			'#buscarPorObservacionCuentaPagar': {
				specialkey: this.onBusquedaObservacion
			},
			'#buscarPorNumeroCuentaPagar': {
				specialkey: this.onBusquedaNumero
			},

			'#btnRefrescarCuentaPagar': {
				click: this.onRefresh

			},

			'#sucursal_cuenta_pagar':{
				change: this.onBusquedaSucursal
			},

			'#departamento_cuenta_pagar':{
				change: this.onBusquedaDepartamento
			},




			'#btnAbrirCuentaPagar': {
				click: this.onNuevoPagarView
			},
            '#btnRegresarVistaPagar':{
                click: this.onRegresarVista
            },
            '#btnListadoClientes':{
                listadoProvedores :  this.onListadoProvedores
            },
            '#action_cuenta_provedor':{
                btnCargarProvedor: this.onCargarProvedores

            },
			'#btnGuardarCuentaPagar':{
			click : this.onGuardarCuentapPagar
			},
			'#action_cuenta_pagar':{
				btnDelete : this.onEliminarCuentaPagar,
				btnUpdate: this.onEditarCuentaPagar,
				btnPDF: this.onCargarPDF
			},
			'#comboMesCuentaPagar':{
				change : this.onBusquedaPeriodo
			},
			'#btnBuscarPorRangoCuentaPagar':{
				click : this.onBusquedaRango
			},
			'#estado_cuenta_pagar':{
				change: this.onBusquedaEstado
			},
			'#btnTotalCuentasPorPagar':{
				click: this.onCargarTotales
			}

		});
	},

	

	
	
    onNuevoPagarView: function(){
		Ext.ComponentQuery.query('#agregarCuentaPagarForm')[0].getForm().reset();
        Ext.ComponentQuery.query('cuenta_pagar')[0].setActiveItem(1);
    },


    onRegresarVista:function(){
        Ext.ComponentQuery.query('cuenta_pagar')[0].setActiveItem(0);

    },


    onListadoProvedores:function(){
        var window = Ext.create('Legion.view.cuentas.ListadoProvedor');
		window.show();
    },
    onCargarProvedores: function(view,
        rowIndex, colIndex, item, e,
        record, row){

		
            id_proveedor = record.data.id_proveedor;
            nombre_proveedor =  record.data.nombre_proveedor;

		
            Ext.ComponentQuery.query('#agregarCuentaPagarForm #id_fkproveedor_otra_cuenta_pagar')[0].setValue(id_proveedor);
            Ext.ComponentQuery.query('#agregarCuentaPagarForm #nombre_proveedor')[0].setValue(nombre_proveedor);

            Ext.ComponentQuery.query('#window_provedores')[0].close();
    },

	onGuardarCuentapPagar: function(){


		form = Ext.ComponentQuery.query('#agregarCuentaPagarForm')[0].getForm();
		Ext.ComponentQuery.query('cuenta_pagar  #btnGuardarCuentaPagar ')[0]
		.setText("Guardar", true);
		
		if (!form || !form.isValid()) {
			alert('Verifica los datos Ingresados');
			return;
		}
		console.log(Ext.ComponentQuery.query('#id_fksucursal_otra_cuenta_pagar')[0].getValue());
		form.submit({
			url : 'php/negocios/cuentas_pagar/ingresar_actualizarCuentaPagar.php',
			waitMsg : 'Guardando. Por favor espere...',

			success : function(data, response) {
		
				Ext.MessageBox.show({
					title: 'Mensaje',
					msg: 'Nueva Cuenta Creada',
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.QUESTION,

				});	
				Ext.getStore('Cuentas_Pagar').load();
				Ext.ComponentQuery.query('cuenta_pagar')[0].setActiveItem(0);

				

			},
			failure : function() {
				console.log("dsa");
			}
		});

	},
	onEliminarCuentaPagar: function(view, rowIndex, colIndex,
		item, e, record, row){


			
		Ext.MessageBox.show({
			title: 'Advertencia',
			msg: 'Seguro que deseea Borrar?',
			buttons: Ext.MessageBox.OKCANCEL,
			icon: Ext.MessageBox.WARNING,
			fn: function (btn) {
				if (btn == 'ok') {
					
					Ext.Ajax.request({
						url: 'php/negocios/cuentas_pagar/eliminarCuentaPagar.php',
						method: 'POST',
						params: {
							id_otra_cuenta_pagar : record.data.id_otra_cuenta_pagar 
						},

						success: function () {
							Ext.MessageBox.show({
								title: 'Mensaje',
								msg: 'Cuenta Eliminada',
								buttons: Ext.MessageBox.OK,
								icon: Ext.MessageBox.QUESTION,
			
							});	
							Ext.getStore('Cuentas_Pagar').load();
						}

					}

					);

				}
			}
		});




	},
	onEditarCuentaPagar: function(view, rowIndex, colIndex,
		item, e, record, row){


		var id = record.data.id_otra_cuenta_pagar;
		var nombre_provedor = record.data.nombre_proveedor;
		var provedor = record.data.id_fkproveedor_otra_cuenta_pagar;
		var fecha_emision = record.data.fecha_emision_otra_cuenta_pagar;
		var tipo_documento = record.data.id_fktipo_documento_otra_cuenta_pagar;
		var numero_documento = record.data.numero_documento_otra_cuenta_pagar;
		var monto = record.data.monto_otra_cuenta_pagar;
		var sucursal = record.data.id_fksucursal_otra_cuenta_pagar;
		var departamento = record.data.id_fkempleado_emisor_otra_cuenta_pagar;
		var fecha_vencimiento= record.data.fecha_vcto_otra_cuenta_pagar;
		var observacion = record.data.obs_otra_cuenta_pagar;
		
		


		

		Ext.ComponentQuery.query('cuenta_pagar  #agregarCuentaPagarForm #id_otra_cuenta_pagar' )[0]
			.setValue(id);

		Ext.ComponentQuery.query('cuenta_pagar  #agregarCuentaPagarForm #id_fkproveedor_otra_cuenta_pagar' )[0]
			.setValue(provedor);	

			Ext.ComponentQuery.query('cuenta_pagar  #agregarCuentaPagarForm #nombre_proveedor' )[0]
			.setValue(nombre_provedor);	
	
		Ext.ComponentQuery.query('cuenta_pagar  #agregarCuentaPagarForm #fecha_emision_otra_cuenta_pagar' )[0]
			.setValue(fecha_emision);
		Ext.ComponentQuery.query('cuenta_pagar  #agregarCuentaPagarForm #id_fktipo_documento_otra_cuenta_pagar' )[0]
			.setValue(tipo_documento);

		Ext.ComponentQuery.query('cuenta_pagar  #agregarCuentaPagarForm #numero_documento_otra_cuenta_pagar' )[0]
			.setValue(numero_documento);
		Ext.ComponentQuery.query('cuenta_pagar  #agregarCuentaPagarForm #monto_otra_cuenta_pagar' )[0]
			.setValue(monto);
		Ext.ComponentQuery.query('cuenta_pagar  #agregarCuentaPagarForm #id_fksucursal_otra_cuenta_pagar' )[0]
			.setValue(sucursal);

		
		Ext.ComponentQuery.query('cuenta_pagar  #agregarCuentaPagarForm #id_fkcentro_costo_otra_cuenta_pagar' )[0]
			.setValue(departamento);

		Ext.ComponentQuery.query('cuenta_pagar  #agregarCuentaPagarForm #fecha_vcto_otra_cuenta_pagar' )[0]
			.setValue(fecha_vencimiento);

		Ext.ComponentQuery.query('cuenta_pagar  #agregarCuentaPagarForm #obs_otra_cuenta_pagar' )[0]
			.setValue(observacion);



	




		Ext.ComponentQuery.query('cuenta_pagar  #btnGuardarCuentaPagar')[0]
			.setText("Editar", true);


		Ext.ComponentQuery.query('cuenta_pagar')[0].setActiveItem(1);
	},

	onBusquedaPeriodo : function(){

		periodo = Ext.ComponentQuery.query('cuenta_pagar  #cuentapagarfitrobusquedaform #comboMesCuentaPagar' )[0]
			.getValue();

			store = Ext.getStore('Cuentas_Pagar');
			store.getProxy().extraParams={
				periodo:periodo,
				desde:"",
				hasta:"",
				observacion:"",
				estado: "",
				numero:"",
				sucursal:"",
				departamento:""
			}

			store.load();

	},
	onBusquedaRango : function(){
		inicio = Ext.ComponentQuery.query('cuenta_pagar  #cuentapagarfitrobusquedaform #buscarPorFechaDesdeCuentaPagar' )[0]
			.getValue();

			fin = Ext.ComponentQuery.query('cuenta_pagar  #cuentapagarfitrobusquedaform #buscarPorFechaHastaCuentaPagar' )[0]
			.getValue();

			store = Ext.getStore('Cuentas_Pagar');
			store.getProxy().extraParams={
				periodo:"",
				desde:inicio,
				hasta:fin,
				observacion:"",
				estado: "",
				numero:"",
				sucursal:"",
				departamento:""
			}

			store.load();
	}

	,
	onBusquedaObservacion: function (field, e) {

		obser = Ext.ComponentQuery.query('cuenta_pagar  #cuentapagarfitrobusquedaform #buscarPorObservacionCuentaPagar' )[0]
			.getValue();
			store = Ext.getStore('Cuentas_Pagar');
			
		if (e.getKey() == e.ENTER) {



			store.getProxy().extraParams = {
				periodo:"",
				desde:"",
				hasta:"",
				observacion:obser,
				estado: "",
				numero:"",
				sucursal:"",
				departamento:""


			};
			store.loadPage(1);
			

		}

		if (e.getKey() == e.ENTER && obser == '""') {
			obser = ""

			store.getProxy().extraParams = {
				periodo:"",
				desde:"",
				hasta:"",
				observacion:obser,
				estado: "",
				numero:"",
				sucursal:"",
				departamento:""

			};
			store.loadPage(1);
			

		}

	},


	onBusquedaNumero: function (field, e) {

		numero = Ext.ComponentQuery.query('cuenta_pagar  #cuentapagarfitrobusquedaform #buscarPorNumeroCuentaPagar' )[0]
			.getValue();
			store = Ext.getStore('Cuentas_Pagar');
			
		if (e.getKey() == e.ENTER) {



			store.getProxy().extraParams = {
				periodo:"",
				desde:"",
				hasta:"",
				observacion:"",
				numero:numero,
				estado: "",
				sucursal:"",
				departamento:""

			};
			store.loadPage(1);
			

		}

		if (e.getKey() == e.ENTER && numero == '""') {
			numero = ""

			store.getProxy().extraParams = {
				periodo:"",
				desde:"",
				hasta:"",
				observacion:"",
				numero : numero,
				estado: "",
				sucursal:"",
				departamento:""

			};
			store.loadPage(1);
			

		}

	},

	onBusquedaEstado: function(){

		
		estado = Ext.ComponentQuery.query('cuenta_pagar  #cuentapagarfitrobusquedaform #estado_cuenta_pagar' )[0]
			.getValue();

			store = Ext.getStore('Cuentas_Pagar');


			store.getProxy().extraParams = {
				periodo:"",
				desde:"",
				hasta:"",
				observacion:"",
				numero:"",
				estado: estado,
				sucursal:"",
				departamento:""

			};
			store.loadPage(1);
			

	},
	onRefresh: function(){

		Ext.ComponentQuery.query('cuenta_pagar  #cuentapagarfitrobusquedaform #estado_cuenta_pagar' )[0]
			.reset();

			Ext.ComponentQuery.query('cuenta_pagar  #cuentapagarfitrobusquedaform #buscarPorNumeroCuentaPagar' )[0]
			.reset();

			  Ext.ComponentQuery.query('cuenta_pagar  #cuentapagarfitrobusquedaform #buscarPorFechaDesdeCuentaPagar' )[0]
			  .reset();

			 Ext.ComponentQuery.query('cuenta_pagar  #cuentapagarfitrobusquedaform #buscarPorFechaHastaCuentaPagar' )[0]
			 .reset();

		

			 Ext.ComponentQuery.query('cuenta_pagar  #cuentapagarfitrobusquedaform #comboMesCuentaPagar' )[0]
			 .reset();

			 Ext.ComponentQuery.query('cuenta_pagar  #cuentapagarfitrobusquedaform #comboMesCuentaPagar' )[0]
			 .reset();


			 Ext.ComponentQuery.query('cuenta_pagar  #cuentapagarfitrobusquedaform #sucursal_cuenta_pagar' )[0]
			 .reset();

			 Ext.ComponentQuery.query('cuenta_pagar  #cuentapagarfitrobusquedaform #departamento_cuenta_pagar' )[0]
			 .reset();


			 
			 Ext.ComponentQuery.query('cuenta_pagar  #cuentapagarfitrobusquedaform #buscarPorObservacionCuentaPagar' )[0]
			 .reset();

			 	 
			 Ext.ComponentQuery.query('cuenta_pagar  #cuentapagarfitrobusquedaform #sucursal_cuenta_pagar' )[0]
			 .reset();

			 Ext.ComponentQuery.query('cuenta_pagar  #cuentapagarfitrobusquedaform #departamento_cuenta_pagar' )[0]
			 .reset();





	store = Ext.getStore('Cuentas_Pagar');

	store.getProxy().extraParams = {
		periodo:"",
		desde:"",
		hasta:"",
		observacion:"",
		numero:"",
		estado: "",
		sucursal:"",
		departamento:""

	};

	store.load();




			

	},

	onCargarTotales: function(){

		
		Ext.Ajax.request({
			url : 'php/negocios/cuentas_pagar/recuperraTotales.php',
			method : 'POST',
			

			success : function(response) {

				var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
				console.log(response_aux)

			
			
			
				Ext.ComponentQuery.query("cuenta_pagar   #id_total_vencido_cuenta_pagar")[0].setHtml('<div align="center" style="font-size:18px;color: Red;font-weight: bold;" ><h2>$' + response_aux.total_vencido+ '</h2></div>', true);
				Ext.ComponentQuery.query("cuenta_pagar   #id_total_no_vencido_cuenta_pagar")[0].setHtml('<div align="center" style="font-size:18px;color: Black;font-weight: bold;" ><h2>$' + response_aux.total_no_vencido + '</h2></div>', true);
				Ext.ComponentQuery.query("cuenta_pagar   #id_total_cuenta_pagar")[0].setHtml('<div align="center" style="font-size:18px;color: Blue;font-weight: bold;" ><h2>$' + response_aux.total + '</h2></div>', true);

			
			}

		}

		);

		 
		

	},

	onBusquedaSucursal: function(){

		sucursal = Ext.ComponentQuery.query('#cuentapagarfitrobusquedaform   #sucursal_cuenta_pagar' )[0]
			 .getValue();

			 store = Ext.getStore('Cuentas_Pagar');

			 store.getProxy().extraParams = {
				 periodo:"",
				 desde:"",
				 hasta:"",
				 observacion:"",
				 numero:"",
				 estado: "",
				 sucursal:sucursal,
				 departamento:""
		 
			 };
		 
			 store.load();

	}


	,
	onBusquedaDepartamento: function(){
		departamento = Ext.ComponentQuery.query('#cuentapagarfitrobusquedaform   #departamento_cuenta_pagar' )[0]
			 .getValue();

			 store = Ext.getStore('Cuentas_Pagar');

			 store.getProxy().extraParams = {
				 periodo:"",
				 desde:"",
				 hasta:"",
				 observacion:"",
				 numero:"",
				 estado: "",
				 sucursal:"",
				 departamento:departamento
		 
			 };
		 
			 store.load();

	},
	onCargarPDF: function(view, rowIndex, colIndex,
		item, e, record, row){

		

							numero = record.data.numero_otra_cuenta_pagar;
							cliente= record.data.nombre_proveedor;
							tipo_documento = record.data.nombre_documento_asiento_detalle;
							numero_documento =record.data.numero_documento_otra_cuenta_pagar;
							fecha_emision =record.data.fecha_emision_otra_cuenta_pagar;
							fecha_venc =record.data.fecha_vcto_otra_cuenta_pagar;
							monto = record.data.monto_otra_cuenta_pagar;
							observacion = record.data.obs_otra_cuenta_pagar;
							estado = record.data.estado_otra_cuenta_pagar;
							sucursal = record.data.nombre_sucursal;
							departamento = record.data.nombre_centro_costo;
							id_sucursal = record.data.id_fksucursal_otra_cuenta_pagar;
		
						var window2= Ext.create('Ext.window.Window', {
							title : 'Comprobante Pago'+" #"+numero,
							layout: {
								align: 'middle',
								pack: 'center',
								type: 'hbox'
							},
							height:600,
							width:800,
							modal : true,
							listeners: {
								show: function() {
								  var myFrame = Ext.create('Ext.Component', {
									height:800,
							width:800,
									autoEl: {
									  tag: 'iframe',
									  src: 'php/negocios/reportes/comprobante_cuenta_pagar.php?numero='+numero+'&cliente='+cliente+'&tipo_documento='+tipo_documento+'&numero_documento='+numero_documento+'&fecha_emision='+fecha_emision+'&fecha_venc='+fecha_venc+'&monto='+monto+'&observacion='+observacion+'&departamento='+departamento+'&sucursal='+sucursal+'&estado='+estado+'&id_sucursal='+id_sucursal
									}
								  });
								  this.add(myFrame);
								}
							  }
							
				
					});
					window2.show();
	

						


						
						

						


				}





});