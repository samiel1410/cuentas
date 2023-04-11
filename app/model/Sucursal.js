Ext.define('Legion.model.Sucursal', {
			extend : 'Ext.data.Model',
			idProperty : 'id_sucursal',
			fields : [{
						name : 'id_sucursal ',
						type : 'int',
						defaultValue : 0
					}, {
						name : 'codigo_sucursal',
						type : 'string'
					}, {
						name : 'nombre_sucursal',
						type : 'string'
					}, {
						name : 'nombre_comercial_sucursal',
						type : 'string'
					}, {
						name : 'nombre_comercial_sucursal',
						type : 'string'

					}, {
						name : 'ciudad_sucursal',
						type : 'string'
					}, {
						name : 'telefono_sucursal',
						type : 'string'
					}, {
						name : 'telefono_sucursal',
						type : 'string'
					}, {
						name : 'email_sucursal',
						type : 'string'

					}, {
						name : 'imagen_sucursal',
						type : 'string'
					}, {
						name : 'estado_sucursal',
						type : 'int'

					}, {
						name : 'id_fkusuario_sucursal',
						type : 'int'
						

					}, {
						name : 'created_at',
						type : 'string'
					},
					{
						name : 'id_fkempresa_sucursal',
						type : 'int'
					}


			]

		});