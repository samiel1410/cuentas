Ext.define('Legion.view.main.Main', {
	extend: 'Ext.panel.Panel',
	xtype: 'app-main',
	plugins: 'viewport',
	itemId:'main_prin',
	title:"",
	


	

	requires: ['Ext.plugin.Viewport', 'Ext.window.MessageBox',
		'Legion.view.main.MainController', 'Legion.view.main.MainModel',
		'Legion.view.usuario.Usuarios', 'Legion.view.curso.Cursos',
		'Legion.view.instructor.Instructores',
		'Legion.view.sucursal.Sucursales', 'Legion.view.alumno.Alumnos',
		'Legion.view.forma_pago.FormaPagos',
		'Legion.view.inscripcion.Inscripciones',
		'Legion.view.ordenpedido.OrdenPedidos',
		'Legion.view.usuario.UsuarioWindowReporte',
		'Legion.view.curso.CursoWindowReporte',
		'Legion.view.instructor.InstructorWindowReporte',
		'Legion.view.sucursal.SucursalWindowReporte',
		'Legion.view.alumno.AlumnoWindowReporte',
		'Legion.view.inscripcion.InscripcionWindowReporte',
		'Legion.view.ordenpedido.OrdenWindowReporte',
		'Legion.view.forma_pago.FormaWindowReporte',
		'Legion.view.inicio.Inicio',
		'Legion.view.inscripcion_web.InscripcionesWeb','Legion.view.cuentas.Cuentas_Cobrar'
		



	],

	controller: 'main',

	
	layout: 'border',

	
			listeners: {
				render: function () {
					
			
					Ext.Ajax.request({
						url : 'php/negocios/usuarios/recuperarUsuario.php',
						method : 'POST',
						
			
						success : function(response) {
			
							var response_aux = Ext.util.JSON
							.decode(response.responseText, true);
							console.log(response_aux)


							if(response_aux.rol==2 ){					
								
							 Ext.ComponentQuery.query('#tree2')[0].setBind('{director}');
						
							 Ext.ComponentQuery.query('#main_prin')[0].setTitle(response_aux.alias_empresa);
							 Ext.ComponentQuery.query('#us')[0].update('Usuario:'+response_aux.nombre+" "+response_aux.apellido+" ")
							 Ext.ComponentQuery.query('#su')[0].update(' Sucursal:'+response_aux.codigo_sucursal)
							 Ext.ComponentQuery.query('#rol')[0].update('Rol:Director')
								
			
							}
							else if(response_aux.rol==3){
								Ext.ComponentQuery.query('#tree2')[0].setBind('{secretaria}');
								Ext.ComponentQuery.query('#main_prin')[0].setTitle(response_aux.alias_empresa);
								
								Ext.ComponentQuery.query('#us')[0].update('Usuario:'+response_aux.nombre+" "+response_aux.apellido+" ")
								Ext.ComponentQuery.query('#su')[0].update(' Sucursal:'+response_aux.codigo_sucursal)
								Ext.ComponentQuery.query('#rol')[0].update('Rol:Secretaria')
								

							}
							else{
								Ext.ComponentQuery.query('#tree2')[0].setBind('{comando}');
								Ext.ComponentQuery.query('#main_prin')[0].setTitle(response_aux.alias_empresa);
								
								Ext.ComponentQuery.query('#us')[0].update('Usuario:'+response_aux.nombre+" "+response_aux.apellido+" ")
								Ext.ComponentQuery.query('#su')[0].update('Sucursal:'+response_aux.codigo_sucursal)
								Ext.ComponentQuery.query('#rol')[0].update('Rol:Comando')

							}
			
						
						}
			
					}
			
					);
				}
			},
		


	
	viewModel: {
		type: 'main',
		data: {
			selectedViewType: 'inicio' // Carga la vista de inicio como vista por defecto
		}
	},


	header: {
		style: {
			backgroundColor: '#4A6F22',
			'font-size':'15px',
			'text-align':'left'
			
			// Cambiar el color del nav
		},

		items: [

			
		

			{
				xtype:'component',
				html:'Usuario:',
				itemId:'us',
				style : {
					'background-color':' transparent',
					'border':'none',
					'color':'white',
					
					'text-aling':'left'
					
	
				},

			},


			{
				xtype:'component',
				html:'',
				margin:'10',
				itemId:'',
				style : {
					'background-color':' transparent',
					'border':'none',
					'color':'white',
					
					'text-aling':'left'
					
	
				},

			},


			{
				xtype:'component',
				html:'Sucursal:',
				itemId:'su',
				style : {
					'background-color':' transparent',
					'border':'none',
					'color':'white',
					
					'text-aling':'left'
					
	
				},

			},

			
			{
				xtype:'component',
				html:'',
				margin:'10',
				itemId:'',
				style : {
					'background-color':' transparent',
					'border':'none',
					'color':'white',
					
					'text-aling':'left'
					
	
				},

			},

			{
				xtype:'component',
				html:'Rol:',
				itemId:'rol',
				style : {
					'background-color':' transparent',
					'border':'none',
					'color':'white',
					
					'text-aling':'left'
					
	
				},

			},




		
		 {
			xtype: 'button',
			text: 'Administracion',
			arrowVisible: false,
			iconCls: 'x-fa fa-user-cog',
			style : {
				'background-color':' transparent',
				'border':'none',
			
				

			},
			

			menu: [{
				item: 'salir',
				text: 'Salir',
				handler: 'onExit',
				
				iconCls: 'fas fa-power-off',

			}, {
				text: 'Configuracion',
				item: 'configuracion',
				iconCls: 'fas fa-cog',
				handler: 'onMostrarConfguracion'
			}]
		}]
	},

	items: [{
		xtype: 'toolbar',
		items:[{
			xtype: 'splitbutton',
            text : 'Split Button'
		}]



	},{
		
		region: 'west',
	
		width: 260,

		split: true,
		reference: 'treelistContainer',
		itemId: 'tree',
		ui: 'nav',
	

		layout: {
			type: 'vbox',
			align: 'stretch'
		},

		border: false,


		items: [{
			xtype: 'treelist',
			reference: 'treelist',
			bind: '{comando}',
			expanderFirst: false,
			expanderOnly: false,
			singleExpand: true,
			floated: false,
			itemId:'tree2',


			height: 1000,

			ui: 'nav',

			listeners: {
				selectionchange: 'onNavigationTreeSelectionChange'

			}

		}]
	}, {
		
		region: 'center',
		reference: 'mainCardPanel',
		flex: 1,
		cls: 'sencha-dash-right-main-container',
		itemId: 'contentPanel',
		layout: {
			type: 'card',
			anchor: '100%'
		}
	}

	]
});