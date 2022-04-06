const Value = require('../val')
const Tipo = require('../ASTGlobal/tiponodo')
class Simbolo{
    constructor (id, data, tipo,  fila, column){
        this.id = id
        this.data = data
        this.tipo = tipo
        this.fila = fila
        this.columna = column
    }


}
module.exports = Simbolo