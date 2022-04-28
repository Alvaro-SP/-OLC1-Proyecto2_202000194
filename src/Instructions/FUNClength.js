"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
class FUNClength extends nodo.nodo {
    constructor(exp, fila, column) {
        super(Tipo.INT);
        this.exp = exp;
        this.fila=fila;
        this.column=column;
    }
    ejecutar(arbolIns, table) {
        try {
            const res = this.exp.ejecutar(arbolIns, table);
            try {
                if (res) {
                    return res.length;
                }else{
                    return res;
                }
            } catch (error) {
                return res;
            }
        }
        catch (err) {
            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede obtener la longitud buscada" ,this.fila,this.column));
            arbolIns.console.push("No se puede obtener la longitud buscada"+" en la fila: "+this.fila+" y la columna: "+this.column);
            return new val.val(this.fila,this.column,Tipo.ERROR,"No se puede obtener la longitud buscada");

        }
    }

}
exports.FUNClength = FUNClength;