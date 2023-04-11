Ext.define('Legion.model.Inscripcion', {
			extend : 'Ext.data.Model',
			idProperty : 'id_inscripcion ',
			fields : [{
						name : 'id_inscripcion',
						type : 'int',
						defaultValue : 0
					}, {
						name : 'fecha_inscripcion',
						type : 'string'
					}, {
						name : 'fecha_inicio_inscripcion',
						type : 'string'

					}, {
						name : 'fecha_fin_inscripcion',
						type : 'string'
					}
					, {
						name : 'estado_inscripcion',
						type : 'int'
					}
					, {
						name : 'calificacion_inscripcion',
						type : 'float'
					}, {
						name : 'id_fkorden_pedido',
						type : 'int'
					}, {
						name : 'origen_inscripcion',
						type : 'int'
					}, {
						name : 'foto_inscripcion',
						type : 'string'
					}, {
						name : 'id_fkalumno_inscripcion',
						type : 'int'
					}, {
						name : 'id_fkcurso_inscripcion',
						type : 'int'
					}, {
						name : 'id_fkusuario_inscripcion',
						type : 'int'
					}, {
						name : 'id_fksucursal_inscripcion',
						type : 'int'
					}, {
						name : 'precio_total_curso',
						type : 'float'
					}, {
						name : 'estado_uniforme_inscripcion',
						type : 'int'
					}, {
						name : 'condicion_pago_inscripcion',
						type : 'int'
					}, {
						name : 'created_at',
						type : 'string'
					}, {
						name : 'curso_variable_inscripcion',
						type : 'int'
					}

			]

		});