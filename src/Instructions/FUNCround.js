"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const Tablita = require("./TS/TablaSimbolos");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
const INSRelacional = require('./INSRelacional');
const INSBreak = require('./Break');
class FUNCround extends nodo.nodo {
    constructor(exp, fila, column) {
        super(Tipo.INT);
        this.exp = exp;
        this.fila = fila;
        this.column = column;
    }
    ejecutar(arbolIns,table) {
        try {
            const res = this.exp.ejecutar(arbolIns, table);
            // arbolIns.console.push("FUNCround: "+res);
            try {
                // if (res) {
                    return res.toFixed();
                // }else{
                //     return res;
                // }
            } catch (error) {
                return res;
            }
        }
        catch (err) {
            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede obtener el redondeo buscado" ,this.fila,this.column));
            arbolIns.console.push("No se puede obtener el redondeo buscada"+" en la fila: "+this.fila+" y la columna: "+this.column);
            return new val.val(this.fila,this.column,Tipo.ERROR,"No se puede obtener el redondeo buscada");

        }
    }

}
exports.FUNCround = FUNCround;
