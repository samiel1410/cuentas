Ext.define('Legion.model.Instructor', {
			extend : 'Ext.data.Model',
			idProperty : 'id_instructor',
			fields : [{
						name : 'id_instructor ',
						type : 'int',
						defaultValue : 0
					}, {
						name : 'nombre_instructor',
						type : 'string'
					}, {
						name : 'apellido_instructor',
						type : 'string'
					}, {
						name : 'ciudad_instructor',
						type : 'string'
					}, {
						name : 'telefono_instructor',
						type : 'string'

					}, {
						name : 'celular_instructor',
						type : 'string'
					}, {
						name : 'direccion_instructor',
						type : 'string'
					}, {
						name : 'estado_instructor',
						type : 'int'
					}, {
						name : 'correo_instructor',
						type : 'string'

					}, {
						name : 'cedula_instructor',
						type : 'string'
					}, {
						name : 'id_fkusuario_instructor',
						type : 'int'

					}, {
						name : 'id_fksucursal_instructor',
						type : 'int'

					}, {
						name : 'created_at',
						type : 'string'

					},
					{
						name : 'categoria_instructor',
						type : 'int'

					}

			]

		});