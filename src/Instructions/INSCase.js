"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const Tablita = require("./TS/TablaSimbolos");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");

class INSCase {
    constructor(condicion, ins, fila, column) {
        this.condicion = condicion;
        this.ins = ins;
        this.fila = fila;
        this.column = column;
    }
    execute(arbolIns, table) {
        return this;//simplemente retorno este objeto Case
    }
}
exports.INSCase = INSCase;