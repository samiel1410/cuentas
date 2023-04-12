Ext.define('Legion.controller.Cuenta_Cobrar', {
	extend: 'Ext.app.Controller',
	
	views: ['Legion.view.cuentas.Cuentas_Cobrar','Legion.view.cuentas.ListadoProvedor'],

	

	init: function () {
		this.control({

		
			
			'#buscarPorObservacionCuentaCobrar': {
				specialkey: this.onBusquedaObservacion
			},
			'#buscarPorNumeroCuentaCobrar': {
				specialkey: this.onBusquedaNumero
			},

			'#boton_refresh_forma': {
				btnRefresh: this.onRefresh

			},


			'#btnAbrirCuentaCobrar': {
				click: this.onNuevoCobroView
			},
            '#btnRegresarVista':{
                click: this.onRegresarVista
            },
            '#btnListadoClientes':{
                listadoClientes :  this.onListadoClientes
            },
            '#action_cuenta_cliente':{
                btnCargarCliente: this.onCargarClientes

            },
			'#btnGuardarCuentaCobrar':{
			click : this.onGuardarCuentaCobrar
			},
			'#action_cuenta_cobrar':{
				btnDelete : this.onEliminarCuentaCobrar,
				btnUpdate: this.onEditarCuentaCobrar
			},
			'#comboMesCuentaCobrar':{
				change : this.onBusquedaPeriodo
			},
			'#btnBuscarPorRangoCuentaCobrar':{
				click : this.onBusquedaRango
			}

		});
	},

	

	
	
    onNuevoCobroView: function(){
		Ext.ComponentQuery.query('#agregarCuentaCobrarForm')[0].getForm().reset();
        Ext.ComponentQuery.query('cuenta_cobrar')[0].setActiveItem(1);
    },


    onRegresarVista:function(){
        Ext.ComponentQuery.query('cuenta_cobrar')[0].setActiveItem(0);

    },


    onListadoClientes:function(){


        var window = Ext.create('Legion.view.cuentas.ListadoCliente');
		window.show();
    },
    onCargarClientes: function(view,
        rowIndex, colIndex, item, e,
        record, row){

            id_cliente = record.data.id_cliente;
            nombre_cliente =  record.data.nombre_cliente;

            Ext.ComponentQuery.query('#id_fkcliente_otra_cuenta_cobrar')[0].setValue(id_cliente);
            Ext.ComponentQuery.query('#nombre_cliente')[0].setValue(nombre_cliente);

            Ext.ComponentQuery.query('#window_cliente')[0].close();
    },

	onGuardarCuentaCobrar: function(){


		form = Ext.ComponentQuery.query('#agregarCuentaCobrarForm')[0].getForm();
		Ext.ComponentQuery.query('cuenta_cobrar  #btnGuardarCuentaCobrar ')[0]
		.setText("Guardar", true);
		
		if (!form || !form.isValid()) {
			alert('Verifica los datos Ingresados');
			return;
		}
		console.log(Ext.ComponentQuery.query('#id_fksucursal_otra_cuenta_cobrar')[0].getValue());
		form.submit({
			url : 'php/negocios/cuentas_cobrar/ingresar_actualizarCuentaCobrar.php',
			waitMsg : 'Guardando. Por favor espere...',

			success : function(data, response) {
		
				Ext.MessageBox.show({
					title: 'Mensaje',
					msg: 'Nueva Cuenta Creada',
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.QUESTION,

				});	
				Ext.getStore('Cuentas_Cobrar').load();
				Ext.ComponentQuery.query('cuenta_cobrar')[0].setActiveItem(0);

				

			},
			failure : function() {
				console.log("dsa");
			}
		});

	},
	onEliminarCuentaCobrar: function(view, rowIndex, colIndex,
		item, e, record, row){


			
		Ext.MessageBox.show({
			title: 'Advertencia',
			msg: 'Seguro que deseea Borrar?',
			buttons: Ext.MessageBox.OKCANCEL,
			icon: Ext.MessageBox.WARNING,
			fn: function (btn) {
				if (btn == 'ok') {
					
					Ext.Ajax.request({
						url: 'php/negocios/cuentas_cobrar/eliminarCuentaCobrar.php',
						method: 'POST',
						params: {
							id_otra_cuenta_cobrar : record.data.id_otra_cuenta_cobrar 
						},

						success: function () {
							Ext.MessageBox.show({
								title: 'Mensaje',
								msg: 'Cuenta Eliminada',
								buttons: Ext.MessageBox.OK,
								icon: Ext.MessageBox.QUESTION,
			
							});	
							Ext.getStore('Cuentas_Cobrar').load();
						}

					}

					);

				}
			}
		});




	},
	onEditarCuentaCobrar: function(view, rowIndex, colIndex,
		item, e, record, row){


		var id = record.data.id_otra_cuenta_cobrar;
		var nombre_cliente = record.data.nombre_cliente;
		var cliente = record.data.id_fkcliente_otra_cuenta_cobrar;
		var fecha_emision = record.data.fecha_emision_otra_cuenta_cobrar;
		var tipo_documento = record.data.id_fktipo_documento_otra_cuenta_cobrar;
		var numero_documento = record.data.numero_documento_otra_cuenta_cobrar;
		var monto = record.data.monto_otra_cuenta_cobrar;
		var sucursal = record.data.id_fksucursal_otra_cuenta_cobrar;
		var departamento = record.data.id_fkcentro_costo_otra_cuenta_cobrar;
		var fecha_vencimiento= record.data.fecha_vcto_otra_cuenta_cobrar;
		var observacion = record.data.obs_otra_cuenta_cobrar;
		
		


		

		Ext.ComponentQuery.query('cuenta_cobrar  #agregarCuentaCobrarForm #id_otra_cuenta_cobrar' )[0]
			.setValue(id);

		Ext.ComponentQuery.query('cuenta_cobrar  #agregarCuentaCobrarForm #id_fkcliente_otra_cuenta_cobrar' )[0]
			.setValue(cliente);	

			Ext.ComponentQuery.query('cuenta_cobrar  #agregarCuentaCobrarForm #nombre_cliente' )[0]
			.setValue(nombre_cliente);	
	
		Ext.ComponentQuery.query('cuenta_cobrar  #agregarCuentaCobrarForm #fecha_emision_otra_cuenta_cobrar' )[0]
			.setValue(fecha_emision);
		Ext.ComponentQuery.query('cuenta_cobrar  #agregarCuentaCobrarForm #id_fktipo_documento_otra_cuenta_cobrar' )[0]
			.setValue(tipo_documento);

		Ext.ComponentQuery.query('cuenta_cobrar  #agregarCuentaCobrarForm #numero_documento_otra_cuenta_cobrar' )[0]
			.setValue(numero_documento);
		Ext.ComponentQuery.query('cuenta_cobrar  #agregarCuentaCobrarForm #monto_otra_cuenta_cobrar' )[0]
			.setValue(monto);
		Ext.ComponentQuery.query('cuenta_cobrar  #agregarCuentaCobrarForm #id_fksucursal_otra_cuenta_cobrar' )[0]
			.setValue(sucursal);

		
		Ext.ComponentQuery.query('cuenta_cobrar  #agregarCuentaCobrarForm #id_fkcentro_costo_otra_cuenta_cobrar' )[0]
			.setValue(departamento);

		Ext.ComponentQuery.query('cuenta_cobrar  #agregarCuentaCobrarForm #fecha_vcto_otra_cuenta_cobrar' )[0]
			.setValue(fecha_vencimiento);

		Ext.ComponentQuery.query('cuenta_cobrar  #agregarCuentaCobrarForm #obs_otra_cuenta_cobrar' )[0]
			.setValue(observacion);



	




		Ext.ComponentQuery.query('cuenta_cobrar  #btnGuardarCuentaCobrar ')[0]
			.setText("Editar", true);


		Ext.ComponentQuery.query('cuenta_cobrar')[0].setActiveItem(1);
	},

	onBusquedaPeriodo : function(){

		periodo = Ext.ComponentQuery.query('cuenta_cobrar  #gastomenorfitrobusquedaform #comboMesCuentaCobrar' )[0]
			.getValue();

			store = Ext.getStore('Cuentas_Cobrar');
			store.getProxy().extraParams={
				periodo:periodo,
				desde:"",
				hasta:"",
			}

			store.load();

	},
	onBusquedaRango : function(){
		inicio = Ext.ComponentQuery.query('cuenta_cobrar  #gastomenorfitrobusquedaform #buscarPorFechaDesdeCuentaCobrar' )[0]
			.getValue();

			fin = Ext.ComponentQuery.query('cuenta_cobrar  #gastomenorfitrobusquedaform #buscarPorFechaHastaCuentaCobrar' )[0]
			.getValue();

			store = Ext.getStore('Cuentas_Cobrar');
			store.getProxy().extraParams={
				periodo:"",
				desde:inicio,
				hasta:fin
			}

			store.load();
	}

	,
	onBusquedaObservacion: function (field, e) {

		obser = Ext.ComponentQuery.query('cuenta_cobrar  #gastomenorfitrobusquedaform #buscarPorObservacionCuentaCobrar' )[0]
			.getValue();
			store = Ext.getStore('Cuentas_Cobrar');
			
		if (e.getKey() == e.ENTER) {



			store.getProxy().extraParams = {
				periodo:"",
				desde:"",
				hasta:"",
				observacion:obser

			};
			store.loadPage(1);
			

		}

		if (e.getKey() == e.ENTER && obser == '""') {
			obser = ""

			store.getProxy().extraParams = {
				periodo:"",
				desde:"",
				hasta:"",
				observacion:obser

			};
			store.loadPage(1);
			

		}

	},


	onBusquedaNumero: function (field, e) {

		numero = Ext.ComponentQuery.query('cuenta_cobrar  #gastomenorfitrobusquedaform #buscarPorNumeroCuentaCobrar' )[0]
			.getValue();
			store = Ext.getStore('Cuentas_Cobrar');
			
		if (e.getKey() == e.ENTER) {



			store.getProxy().extraParams = {
				periodo:"",
				desde:"",
				hasta:"",
				observacion:"",
				numero:numero

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
				numero : numero

			};
			store.loadPage(1);
			

		}

	},





});