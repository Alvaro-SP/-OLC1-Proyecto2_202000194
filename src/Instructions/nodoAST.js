
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodoAST = void 0;

class nodoAST{
    constructor(tipo, line, column) {
        this.tipo = tipo;
        this.line = line;
        this.column = column;
    }
}
exports.nodoAST = nodoAST;