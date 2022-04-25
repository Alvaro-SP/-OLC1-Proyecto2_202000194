"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//! ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  5.3 Tipos de Datos  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// Esta clase crea un nodo del tipo primitivo, ya sea int, double, string, char, boolean
class INSPrimitivos {
    constructor(tipo, valor, fila, column) {
        this.valor = valor;
        this.tipo = tipo;
        this.fila = fila;
        this.column = column;
    }
    ejecutar(arbolIns, table) {
        console.log("Este es el valor PRIMITIVO: ")
        console.log(this.valor)
        return this.valor;
    }
}
exports.INSPrimitivos = INSPrimitivos;
