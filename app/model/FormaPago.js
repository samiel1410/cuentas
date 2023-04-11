Ext.define('Legion.model.FormaPago', {
			extend : 'Ext.data.Model',
			idProperty : 'id_forma',
			fields : [{
						name : 'id_forma',
						type : 'int',
						defaultValue : 0
					}, {
						name : 'nombre_forma',
						type : 'string'
					}, {
						name : 'id_fkusuario_forma',
						type : 'string'

					}, {
						name : 'created_at',
						type : 'string'
					}

			]

		});