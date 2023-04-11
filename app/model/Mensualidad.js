Ext.define('Legion.model.Mensualidad', {
			extend : 'Ext.data.Model',
			idProperty : 'id_mensualidad',
			fields : [{
						name : 'id_mensualidad',
						type : 'int',
						defaultValue : 0
					}, {
						name : 'id_fkinscripcion_mensualidad',
						type : 'int'
					}, {
						name : 'id_fkorden_pedido_mensualidad',
						type : 'int'
					}, {
						name : 'numero_cuota_mensualidad',
						type : 'int'
					}, {
						name : 'fecha_pago_mensualidad',
						type : 'string'

					}, {
						name : 'estado_mensualidad',
						type : 'int'
					}, {
						name : 'monto_mensualidad',
						type : 'float'
					}, {
						name : 'abonado_mensualidad',
						type : 'float'
					}, {
						name : 'saldo_mensualidad',
						type : 'float'

					}, {
						name : 'concepto_mensualidad',
						type : 'string'

					}, {
						name : 'created_at',
						type : 'string'
					},{
						name:'valor',
						type:'float',
						defaultValue : 0
						
					},{
						name:'variable',
						type:'int'
					}

			]

		});