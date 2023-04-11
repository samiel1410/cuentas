Ext.define('Legion.controller.SucursalController', {
	extend : 'Ext.app.Controller',
	models : ['Legion.model.Sucursal'],

	stores : ['Sucursal'],
	refs : [{
				ref : 'sucursalMasterForm'

			}],

	init : function() {
		this.control({

					'#mostrar_formulario_sucursal' : {
						btnWindow : this.onWindow

					},
					'#guardar_sucursal' : {
						btnCreate : this.onCreateClick
					},
					'#action_sucursal' : {
						btnDelete : this.onDeleteClick,
						btnUpdate : this.onUpdateClick,
						btnShowSucursal : this.onShowSucursal
					},
					'#nombre_busqueda_sucursal' : {
						specialkey : this.onBusquedaNombre
					},

					'#boton_refresh_sucursal' : {
						btnRefresh : this.onRefresh

					},
					'#imagen_sucursal' : {
						change : this.onSelectImage
					},

					'#imagen_sucursal_editar' : {
						change : this.onSelectImageEdit
					},
					'#boton_buscar_sucursal' : {
						btnBuscar : this.onBuscar
					},
					'#mostrar_columnas_sucursales' : {

						ComboMostrarColumnas : this.onMostrarColumnas,
						OcultarColumnas : this.onOcultarColumnas

					},
					"#btnReporteSucursal" : {
						click : this.onbtnReporteSucursal
					  },

				});
	},

	onShowSucursal : function(view, rowIndex, colIndex, item, e, record, row) {
		var id = record.data.id_sucursal;
		var imagen = record.data.imagen_sucursal;
		var src2 = record.data.src_sucursal;
		console.log(src2);
		Ext.create('Ext.window.Window', {
					title : 'Sucursal' + " " + record.data.nombre_sucursal,
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

	onRefresh : function() {
		var store = Ext.getStore('Sucursal');
		Ext.ComponentQuery.query('#nombre_busqueda_sucursal')[0].reset();
		Ext.ComponentQuery.query('#id_fkempresa_sucursal_sucursal')[0].reset();

		store.getProxy().extraParams = {
			nombre_busqueda : "",
			id_empresa:""

		};
		store.load();

	},

	onBusquedaNombre : function(field, e) {
		console.log("dsad");

		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_sucursal')[0]
				.getValue();

		var empresa = Ext.ComponentQuery.query('#id_fkempresa_sucursal_sucursal')[0]
				.getValue();
		
		if (e.getKey() == e.ENTER) {

			var store = Ext.getStore('Sucursal');

			store.getProxy().extraParams = {
				nombre_busqueda : nombre,
				id_empresa:empresa

			};
			store.loadPage(1);

		}

		if (e.getKey() == e.ENTER && nombre == '""') {
			nombre = ""

			store.getProxy().extraParams = {
				nombre_busqueda : nombre,
				id_empresa:empresa

			};
			store.load();

		}

	},
	onBuscar : function() {
		var store = Ext.getStore('Sucursal');

		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_sucursal')[0]
				.getValue();
				var empresa = Ext.ComponentQuery.query('#id_fkempresa_sucursal_sucursal')[0]
				.getValue();		

		store.getProxy().extraParams = {
			nombre_busqueda : nombre,
			id_empresa:empresa

		};

		store.loadPage(1);

	},

	onWindow : function() {
		Ext.create('Ext.window.Window', {
					title : 'Hello',
					height : 200,
					width : 400,
					layout : 'fit',
					items : { // Let's put an empty grid in just to illustrate
						// fit layout
						xtype : 'grid',
						border : false,
						columns : [{
									header : 'World'
								}], // One header just for show. There's no
						// data,
						store : Ext.create('Ext.data.ArrayStore', {})
						// A dummy empty data store
					}
				}).show();

	},
	onDeleteClick : function(view, rowIndex, colIndex, item, e, record, row) {



		Ext.Ajax.request({
			url : 'php/negocios/sucursales/verificarSucursalCurso.php',
			method : 'POST',
			params : {
				id_sucursal : record.data.id_sucursal
			},

			success : function(response) {

				var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
				console.log(response_aux)

				if(response_aux.total==1){

					Ext.MessageBox.show({
						title: 'Advertencia',
						msg: 'Esta Sucursal  no puede ser borrada por que tiene uno o mas Cursos Adjuntos',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING,

					});

				}else{
					Ext.MessageBox.show({
						title : 'Advertencia',
						msg : 'Seguro que deseea Borrar?',
						buttons : Ext.MessageBox.OKCANCEL,
						icon : Ext.MessageBox.WARNING,
						fn : function(btn) {
							if (btn == 'ok') {
							
			
								Ext.Ajax.request({
									url : 'php/negocios/sucursales/eliminarSucursal.php',
									method : 'POST',
									params : {
										id_sucursal : record.data.id_sucursal
									},
			
									success : function() {
			
										Ext.getStore('Sucursal').load();
									}
			
								}
			
								);
			
							}
						}
					});

					Ext.getStore('Sucursal').load();
				}
			
			}

		}

		);



		

	},

	onSelectImage : function(newVal) {
		var file = newVal.fileInputEl.el.dom.files[0];
		var reader = new FileReader();
		
		reader.readAsDataURL(file);
		reader.onload = function (evt) {

			Ext.ComponentQuery.query('#imagen_sucursal_vista')[0]
			.setSrc(evt.target.result);

		}

	},

	onSelectImageEdit : function(newVal) {
		var file = newVal.fileInputEl.el.dom.files[0];
		var reader = new FileReader();
		Ext.ComponentQuery.query('#imagen_validar_sucursal')[0]
		.setValue(1);
		reader.readAsDataURL(file);
		reader.onload = function(evt) {
			Ext.ComponentQuery.query('#imagen_vista_sucursal_editar')[0]
					.setSrc(evt.target.result);
		}
	},

	onUpdateClick : function(view, rowIndex, colIndex, item, e, record, row) {

		var id = record.data.id_sucursal;
		var codigo = record.data.codigo_sucursal;
		var nombre = record.data.nombre_sucursal;
		var nombre_comercial = record.data.nombre_comercial_sucursal;
		var direccion = record.data.direccion_sucursal;
		var ciudad = record.data.ciudad_sucursal;
		var correo = record.data.email_sucursal;
		var telefono = record.data.telefono_sucursal;
		var imagen = record.data.imagen_sucursal;
		var estado = record.data.estado_sucursal;
		var src = record.data.src_sucursal;

		var empresa = record.data.id_fkempresa_sucursal;
		console.log(src);

		var window = Ext.create('Legion.view.sucursal.WindowSucursal');
		window.setTitle("Actualizar Sucursal:" + nombre + " ", true);
		window.show();

		Ext.ComponentQuery
				.query('#window_sucursal #form_sucursal_editar #id_sucursal')[0]
				.setValue(id);
		Ext.ComponentQuery
				.query('#window_sucursal #form_sucursal_editar #codigo_sucursal')[0]
				.setValue(codigo);

		Ext.ComponentQuery
				.query('#window_sucursal #form_sucursal_editar #nombre_sucursal')[0]
				.setValue(nombre);

		Ext.ComponentQuery
				.query('#window_sucursal #form_sucursal_editar #nombre_comercial_sucursal')[0]
				.setValue(nombre_comercial);

		Ext.ComponentQuery
				.query('#window_sucursal #form_sucursal_editar #direccion_sucursal')[0]
				.setValue(direccion);

		Ext.ComponentQuery
				.query('#window_sucursal #form_sucursal_editar #ciudad_sucursal')[0]
				.setValue(ciudad);

		Ext.ComponentQuery
				.query('#window_sucursal #form_sucursal_editar #telefono_sucursal')[0]
				.setValue(telefono);

		Ext.ComponentQuery
				.query('#window_sucursal #form_sucursal_editar #email_sucursal')[0]
				.setValue(correo);

		Ext.ComponentQuery
				.query('#window_sucursal #form_sucursal_editar #imagen_sucursal_editar')[0]
				.setValue(src);
		Ext.ComponentQuery
				.query('#window_sucursal #form_sucursal_editar #imagen_vista_sucursal_editar')[0]
				.setSrc(src);
		Ext.ComponentQuery
				.query('#window_sucursal #form_sucursal_editar #estado_sucursal')[0]
				.setValue(estado);

		Ext.ComponentQuery
				.query('#window_sucursal #form_sucursal_editar #id_fkempresa_sucursal_sucursal_edit')[0]
				.setValue(empresa);		

		Ext.ComponentQuery
				.query('#window_sucursal #form_sucursal_editar #guardar_sucursal')[0]
				.setText("Editar", true);

	},

	onCreateClick : function(form, window) {

	

		if (!form || !form.isValid()) {
			alert('Verifica los datos Ingresados!!');
			return;
		}
		

		form.submit({
			url : 'php/negocios/sucursales/ingresar_actualizarSucursal.php',
			waitMsg : 'Cargando...',

			success : function(data, response) {
				var tipo = response.result.tipo;
				console.log(tipo);

				if (tipo == 0) {

					Ext.MessageBox.show({
								title : 'Mensaje',
								msg : 'Nuevo Sucursal Creado',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.WARNING

							});
					form.reset();
					Ext.ComponentQuery.query('Sucursales')[0].setActiveTab(0);;

				}
				if (tipo == 1) {

					var window2 = Ext.ComponentQuery.query('#window_sucursal')[0];

					Ext.MessageBox.show({
								title : 'Mensaje',
								msg : 'Sucursal Actualizado',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.WARNING

							});
					window2.close();
				}
				Ext.getStore('Sucursal').load();

			},
			failure : function() {
				console.log("dsa");
			}
		});

	},
	onMostrarColumnas : function(combo, records) {

		Ext.each(records, function(rec) {
					node = combo.getPicker().getNode(rec);
					if (rec.data.id == 1) {
						Ext.ComponentQuery.query('#SucursalGrid')[0].columns[10]
								.setVisible(true)

					}

					Ext.get(node).down('input').dom.checked = true;

				});
	},

	onOcultarColumnas : function(combo, rec) {

		var node = combo.getPicker().getNode(rec);
		if (rec.data.id == 1) {
			Ext.ComponentQuery.query('#SucursalGrid')[0].columns[10]
					.setVisible(false)
		}
		Ext.get(node).down('input').dom.checked = false;
	},

onbtnReporteSucursal : function() {

	var window2= Ext.create('Ext.window.Window', {
		title : 'Reporte de Sucursales',
		layout: 'vbox',
		
		height:150,
	width:300,	
		modal : true,
		items:[
			
			{
				xtype : 'combo',
				fieldLabel : 'Institucion',
				margin: '10',
				name : 'id_fkempresa_sucursal',
				itemId : 'id_fkempresa_sucursal_re_su',
				enableKeyEvents : true,
				editable : false,
				
				typeAhead : true,
				mode : 'local',
				triggerAction : 'all',
				emptyText : 'Seleccionar',
				autoLoad : true,
				store : 'Empresa',
				displayField : 'alias_empresa',
				valueField : 'id_empresa',
				
			





			},{
					xtype : 'button',
					
					text:'Generar Reporte de Sucursales',
										margin : '0 0 0 10',
										iconCls : 'fas fa-clipboard',
										itemId : 'boton_refresh',
										handler : function() {
									
			combo=Ext.ComponentQuery
			.query('#id_fkempresa_sucursal_re_su')[0];
			
			var value = combo.getValue();
var valueField = combo.valueField;
var record;
combo.getStore().each(function(r){
if(r.data[valueField] == value){
record = r;
return false;
}
});

id_empresa=combo.getValue()

instituto=record.get(combo.displayField);

		
		
window.open('php/negocios/reportes/reporteSucursal.php?id_instituto='+id_empresa+'&nombre_instituto='+instituto, '_blank');
			
										}

				}

			
		]

});
window2.show();


	
	

	  },





});