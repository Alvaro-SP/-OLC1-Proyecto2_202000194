"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const val = require("./val");
const Tablita = require("./TS/TablaSimbolos");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");

class Case {
    constructor(condicion, ins, line, column) {
        this.condicion = condicion;
        this.ins = ins;
        this.line = line;
        this.column = column;
    }
    execute(arbolIns, table) {
        return this;//simplemente retorno este objeto Case
    }
}
exports.Case = Case;