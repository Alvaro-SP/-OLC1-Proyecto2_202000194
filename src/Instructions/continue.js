"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.18.2. Continue▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
class Continue {
    constructor(kind,fila, column) {
        this.kind=kind
        this.fila=fila
        this.column=column
    }
    ejecutar(arbolIns, table) {
        return this;
    }
}
exports.Continue = Continue;