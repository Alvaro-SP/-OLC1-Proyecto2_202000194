"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Esta clase crea un nodo del tipo primitivo, ya sea int, double, string, char, boolean
class Primitivo {
    constructor(tipo, valor, line, column) {
        this.valor = valor;
        this.tipo = tipo;
        this.line = line;
        this.column = column;
    }
    ejecutar(arbolIns, table) {
        return this.valor;
    }
}
exports.Primitivo = Primitivo;
