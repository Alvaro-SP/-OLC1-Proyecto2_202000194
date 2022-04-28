"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodo = require("./ASTGlobal/nodo");
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.18.1. Break▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
class Break extends nodo.nodo{
    constructor(kind,fila, column) {
        this.kind=kind
        this.fila=fila
        this.column=column
    }
    ejecutar(arbolIns, table) {
        return this;
    }
}
exports.Break = Break;