"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aritmetico = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
class aritmetico{
    constructor(expDer, expIzq, tipo, fila, column){
        this.expDer = expDer;
        this.expIzq = expIzq;
        this.tipo = tipo;
        this.fila = fila;
        this.column = column;
    }
    ejecutar(arbolIns, table){

    }

}
exports.aritmetico = aritmetico;


