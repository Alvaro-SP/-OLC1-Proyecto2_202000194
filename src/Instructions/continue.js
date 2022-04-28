"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodo = require("./ASTGlobal/nodo");
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.18.2. Continue▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
class Continue extends nodo.nodo{
    constructor(fila, column) {
        super(null)
        // this.kind=kind
        this.fila=fila
        this.column=column
    }
    ejecutar(arbolIns, table) {
        return this;
    }
}
exports.Continue = Continue;