Ext.define('Legion.view.ordenpedido.MensualidadOrdenPedido', {
			extend : 'Ext.window.Window',
			alias : 'widget.window_mensualidad_orden',
			itemId : 'window_mensualidad_orden',
			title : 'Mensualidades',
			width : 700,

			modal : true,
			items : [{

				alias : 'widget.MensualidadesOrdenGrid',
				itemId : 'MensualidadesOrdenGrid',
				xtype : 'grid',

				viewConfig : {
					stripeRows : true
				},
				store : 'MensualidadesAlumno',
				height : 400,
				autoLoad : true,
				renderTo : Ext.getBody(),

				selModel : {
					selType : 'checkboxmodel',
					model:'SIMPLE',
					
					listeners: {
						beforeselect: function (selModel, record, index) {
						storeGrid = Ext.getStore('DatosOrden');
						console.log(storeGrid.findRecord('id_mensualidad',record.get('id_mensualidad')));
						console.log("s",storeGrid.getRange());
						console.log(record.get('id_mensualidad'));



						if(storeGrid.findRecord('id_mensualidad',record.get('id_mensualidad'))){

							
					Ext.MessageBox.show({
						title: 'Advertencia',
						msg: 'Este Campo ya esta Agregado',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING,

					});
					
							
						}

							
							
							
						}
					}
				

					},
				
				buttons:[{
					itemId:'cargar_mensualidad_orden',
					text:'Seleccionar',
					handler: function(){
						var window = Ext.ComponentQuery.query('#window_mensualidad_orden')[0];
						var record = Ext.ComponentQuery.query('#MensualidadesOrdenGrid')[0].getSelectionModel().getSelection();
						grid = Ext.ComponentQuery.query('#MensualidadesOrdenGrid')[0];
						selected = grid.getStore().query('selected', true).getRange();
						this.fireEvent('btnCargarMensualidadesOrden',record,window);
						
						

					}
				
				}],

				columns : [{
							text : "Id",
							dataIndex : 'id_mensualidad',
							width : 50,
							hidden:true
						}, {
							text : "Concepto",
							flex : 1,
							dataIndex : 'concepto_mensualidad'

						}, {
							text : "Cuota",
							flex : 1,
							dataIndex : 'numero_cuota_mensualidad'

						}, {
							text : "Fecha de Pago",
							flex : 1,
							dataIndex : 'fecha_pago_mensualidad'

						}, {
							text : "Estado",
							flex : 1,
							dataIndex : 'nombre_estado_mensualidad'
						}, 
						{
							text : "Estado ID",
							flex : 1,
							dataIndex : 'estado_mensualidad',
							
							hidden:true
						},{
							text : "Precio",
							flex : 1,
							dataIndex : 'monto_mensualidad',
							renderer: function(value) {
								return Ext.util.Format.number(value, '0,0');
							},
							renderer: Ext.util.Format.usMoney

						}, 
						
						{
							text : "Abonado",
							flex : 1,
							dataIndex : 'abonado_mensualidad',
							hidden:true

						},

						{
							text : "Total",
							flex : 1,
							dataIndex : 'saldo_mensualidad',
							renderer: Ext.util.Format.usMoney

						},

						
					],
					listeners: {
                        itemclick: function (view, record) {
                            if (record.get('selected')) {
                                view.getSelectionModel().deselect(record);
                                record.set('selected', false);
                            } else {
                                record.set('selected', true);
                            }
                        }
                    },

				bbar : [{
							xtype : 'pagingtoolbar',
							store : 'MensualidadesAlumno',
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