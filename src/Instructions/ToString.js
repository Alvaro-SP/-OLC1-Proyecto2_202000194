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
const INSPrimitivos = require('./INSPrimitivos');
class ToString extends nodo.nodo {
    constructor(exp, fila, column) {
        super(Tipo.STRING);
        this.exp = exp;
        this.fila = fila;
        this.column = column;
    }
    ejecutar(arbolIns,table)  {
        try {
            const res = this.exp.ejecutar(arbolIns,table) ;
            try {
                if (res) {
                    if (this.exp.tipo == Tipo.INT || this.exp.tipo == Tipo.BOOLEAN|| this.exp.tipo == Tipo.DOUBLE ) {
                        return res.toString();
                    }
                    else {
                        arbolIns.setError(instruccionesAPI.errorSemantico("No se puede convertir a caracter/texto" ,this.fila,this.column));
                        arbolIns.console.push("No se puede convertir a caracter/texto"+" en la fila: "+this.fila+" y la columna: "+this.column);
                        return new val.val(this.fila,this.column,Tipo.ERROR,"No se puede convertir a caracter/texto");
                    }
                }else{
                    return res;
                }
            } catch (error) {
                return res;
            }
        }
        catch (err) {
            arbolIns.setError(instruccionesAPI.errorSemantico("No se puede convertir a caracter/texto" ,this.fila,this.column));
            arbolIns.console.push("No se puede convertir a caracter/texto"+" en la fila: "+this.fila+" y la columna: "+this.column);
            return new val.val(this.fila,this.column,Tipo.ERROR,"No se puede convertir a caracter/texto");

        }
    }
}
exports.ToString = ToString;
