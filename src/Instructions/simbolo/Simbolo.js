const Value = require('../val')
const Tipo = require('../ASTGlobal/tiponodo')
class Simbolo{
    constructor (id, data, tipo, fila, column,t2){
        this.id = id
        this.data = data
        // this.tipovar = tipovar
        this.tipo = tipo
        // this.ambito = ambito
        this.fila = fila
        this.columna = column
        this.t2 = t2
    }


}
module.exports = Simbolo