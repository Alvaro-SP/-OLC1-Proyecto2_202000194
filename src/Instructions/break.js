"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬5.18.1. Break▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
class Break {
    constructor(kind,line, column) {
        this.kind=kind
        this.line=line
        this.column=column
    }
    ejecutar(arbolIns, table) {
        return this;
    }
}
exports.Break = Break;