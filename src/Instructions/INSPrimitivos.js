"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodo = require("./ASTGlobal/nodo");
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  5.3 Tipos de Datos  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// Esta clase crea un nodo del tipo primitivo, ya sea int, double, string, char, boolean
class INSPrimitivos extends nodo.nodo{
    constructor(tipo, valor, fila, column) {
        super(tipo);
        this.valor = valor;
        // this.tipo = tipo;
        this.fila = fila;
        this.column = column;
    }
    ejecutar(arbolIns, table) {
        // console.log("Este es el valor PRIMITIVO: ")
        // console.log(this.valor)
        return this.valor;
    }
}
exports.INSPrimitivos = INSPrimitivos;
