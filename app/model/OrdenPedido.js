Ext.define('Legion.model.OrdenPedido', {
			extend : 'Ext.data.Model',
			idProperty : 'id_orden_pedido',
			fields : [{
						name : 'id_orden_pedido',
						type : 'int',
						defaultValue : 0
					}, {
						name : 'fecha_emision_orden_pedido',
						type : 'string'
					}, {
						name : 'fecha_vencimiento_orden_pedido',
						type : 'int'
					}, {
						name : 'id_fkalumno_orden_pedido',
						type : 'int'
					}, {
						name : 'id_fkusuario_orden_pedido',
						type : 'int'

					}, {
						name : 'id_fkinstructor_orden_pedido',
						type : 'int'
					}, {
						name : 'subtotal_12_orden_pedido',
						type : 'float'
					}, {
						name : 'subtotal_0_orden_pedido',
						type : 'float'
					}, {
						name : 'subtotal_orden_pedido',
						type : 'float'

					}, {
						name : 'iva_orden_pedido',
						type : 'float'

					}, {
						name : 'descuento_orden_pedido',
						type : 'float'

					}, {
						name : 'total_orden_pedido',
						type : 'float'

					}, {
						name : 'estado_orden_pedido',
						type : 'string'
					}, {
						name : 'observacion_orden_pedido',
						type : 'string'

					}, {
						name : 'tipo_origen_pedido',
						type : 'string'
					}
					, {
						name : 'motivo_anulacion_orden_pedido',
						type : 'string'
					},
					 {
						name : 'id_fkusuario_orden',
						type : 'int'

					},
							 {
						name : 'created_at',
						type : 'string'
					
					}

			]

		});