Ext.define('Legion.model.Empresa', {
    extend : 'Ext.data.Model',
    idProperty : 'id_empresa',
    fields : [{
                name : 'id_empresa',
                type : 'int',
                defaultValue : 0
            }, {
                name : 'nombre_empresa',
                type : 'string'
            },
            {
                name : 'alias_empresa',
                type : 'string'
            },

    ]

});