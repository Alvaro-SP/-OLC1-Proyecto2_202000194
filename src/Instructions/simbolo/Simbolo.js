const Value = require('../val')
const Tipo = require('../ASTGlobal/tiponodo')
class Simbolo{
    constructor (id, data, tipovar,tipo,ambito,  fila, column){
        this.id = id
        this.data = data
        this.tipovar = tipovar
        this.tipo = tipo
        this.ambito = ambito
        this.fila = fila
        this.columna = column
    }


}
module.exports = Simbolo