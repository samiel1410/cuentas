Ext.define('Legion.model.Provincia', {
    extend : 'Ext.data.Model',
    idProperty : 'id',
    fields : [{
                name : 'id',
                type : 'int',
                defaultValue : 0
            }, {
                name : 'provincia',
                type : 'string'
            }, 

    ]

});