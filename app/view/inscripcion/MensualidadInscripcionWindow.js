Ext.define('Legion.view.inscripcion.MensualidadInscripcionWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.window_curso_inscripcion',
	itemId: 'window_curso_inscripcion',
	title: 'Pagos',
	xtype: 'myView',

	modal: true,


	items: [{

		alias: 'widget.MensualidadInsGrid',
		itemId: 'MensualidadInsGrid',
		reference: 'miGrid',
		xtype: 'grid',
		width: 600,
		height: 350,
		autoScroll: true,
		selType: 'rowmodel',
		selModel: {
			mode: 'SINGLE'
		},
		viewConfig: {
			stripeRows: true
		},
		store: 'InscripcionMensualidades',
		plugins: {
			ptype: 'cellediting',
			clicksToEdit: 1
		},
		autoLoad: true,


		buttons:[{
			itemId:'aumentar_mensualidades',
			text:'Agregar Mensualidades',
			handler: function(){
			
				grid = Ext.getStore('InscripcionMensualidades').getRange();
				
		

				id_inscripcion =grid[0].data.id_fkinscripcion_mensualidad

				Ext.Ajax.request({
					url: 'php/negocios/mensualidades/verificarCuroVariable.php',
					method: 'POST',
					params: {
						id_inscripcion: id_inscripcion
					},

					success: function (response) {
						console.log(response)
						var response_aux = Ext.util.JSON
							.decode(response.responseText, true);

						console.log("DENIDO", response_aux);
						
						if (response_aux.tipo == 1) {
							store = Ext.getStore('InscripcionMensualidades').getRange();
							console.log("STORE",store);
							var i= store.length -1;
							
							console.log(store[i].data.numero_cuota_mensualidad);

							

							var window = Ext
								.create('Legion.view.mensualidad.MensualidadWindow');

						

							Ext.ComponentQuery.query('#window_mensualidad #mensualidadForm #id_fkinscripcion_mensualidad')[0]
								.setValue(id_inscripcion);

							Ext.ComponentQuery.query('#window_mensualidad #mensualidadForm #id_fkorden_pedido_mensualidad')[0]
								.setValue(0);

							Ext.ComponentQuery.query('#window_mensualidad #mensualidadForm #numero_cuota_mensualidad')[0]
								.setValue(store[i].data.numero_cuota_mensualidad+1);
							Ext.ComponentQuery.query('#window_mensualidad #mensualidadForm #estado_mensualidad')[0]
								.setValue(0);

							Ext.ComponentQuery.query('#window_mensualidad #mensualidadForm #abonado_mensualidad')[0]
								.setValue(0);




							window.setTitle("Agregar Mensualidad", true);
							window.show();




							


						} else {
							Ext.MessageBox.show({
								title: 'Mensaje',
								msg: 'Inscripcion Definida no puede agregar mas Mensualidades!!',
								buttons: Ext.MessageBox.OK,
								icon: Ext.MessageBox.WARNING

							});

						}



					}

				}

				);

				
				

			}
		
		}],

		columns: [{
			text: "Id",

			dataIndex: 'id_mensualidad',
			menuDisabled: true,
			hidden: true

		}, {
			text: "Concepto",

			dataIndex: 'concepto_mensualidad',
		
			menuDisabled: true

		}, {
			text: "Cuota",

			dataIndex: 'numero_cuota_mensualidad',
			menuDisabled: true

		}, {
			text: "Fecha de Pago",

			dataIndex: 'fecha_pago_mensualidad',

			menuDisabled: true

		},
		{
			text: "Id Orden",
			dataIndex: 'id_fkorden_pedido_mensualidad',
			menuDisabled: true,
			hidden: true

		},

		{
			text: "Id Inscripcion",
			dataIndex: 'id_fkinscripcion_mensualidad',
			menuDisabled: true,
			hidden: true

		}, {
			text: "Estado ID",

			dataIndex: 'estado_mensualidad',
			menuDisabled: true,
			hidden: true

		},

		{
			text: "Estado",

			dataIndex: 'nombre_estado_mensualidad',
			menuDisabled: true

		}, {
			text: "Total",

			dataIndex: 'monto_mensualidad',
			menuDisabled: true,
			renderer: Ext.util.Format.usMoney

		}, {
			text: "Abonado",
			dataIndex: 'abonado_mensualidad',
			menuDisabled: true,
			hidden: true

		}, {
			text: "Saldo",

			dataIndex: 'saldo_mensualidad',
			menuDisabled: true,
			renderer: Ext.util.Format.usMoney

		}
		



		],
		bbar: [{
			xtype: 'pagingtoolbar',
			store: 'InscripcionMensualidades',
			displayInfo: true,
			displayMsg: 'Displaying {0} to {1} of {2} &nbsp;records ',
			emptyMsg: "No records to display&nbsp;",
			listeners: {
				beforechange: function (store) {
					this.fireEvent('pagination', store)

				}

			}
		}]

	}]



});