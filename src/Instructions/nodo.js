Object.defineProperty(exports, "__esModule", { value: true });
exports.nodo = void 0;

class nodo{
    constructor(tipo, line, column) {
        this.tipo = tipo;
        this.line = line;
        this.column = column;
    }
}
exports.nodo = nodo;