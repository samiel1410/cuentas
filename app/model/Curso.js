Ext.define('Legion.model.Curso', {
			extend : 'Ext.data.Model',
			idProperty : 'id_curso',
			fields : [{
						name : 'id_curso ',
						type : 'int',
						defaultValue : 0
					}, {
						name : 'nombre_curso',
						type : 'string'
					}, {
						name : 'estado_curso',
						type : 'int'
					}, {
						name : 'mensualidad_curso',
						type : 'float'
					}, {
						name : 'iva_curso',
						type : 'int'

					}, {
						name : 'id_fkinstructor_curso',
						type : 'int'
					}, {
						name : 'id_fkusuario_curso',
						type : 'int'
					}, {
						name : 'id_fksucursal_curso',
						type : 'int'
					}, {
						name : 'created_at',
						type : 'string'

					}, {
						name : 'fecha_inicio_curso',
						type : 'string'

					}, {
						name : 'fecha_fin_curso',
						type : 'string'

					}, {
						name : 'imagen_curso',
						type : 'string'

					}, {
						name : 'duracion_mes_curso',
						type : 'int'
					}, {
						name : 'cuota_entrada_curso',
						type : 'float'

					}, {
						name : 'cupos_curso',
						type : 'int'
						

					}
					, {
						name : 'precio_curso',
						type : 'float'
						

					}

			]

		});