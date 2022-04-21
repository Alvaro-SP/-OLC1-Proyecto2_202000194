"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metodo = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const Tablita = require("./TS/TablaSimbolos");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
const INSRelacional = require('../Instructions/INSRelacional');
const INSBreak = require('../Instructions/break');
class metodo{
    constructor(tipo, variable, param, ins, line, column) {
        this.tipo = tipo;
        this.variable = variable;
        this.param = param;
        this.ins = ins;
        this.line = line;
        this.column = column;
    }
    ejecutar(arbolIns,table) {
        var value;
        value=this.variable.toString() 
        
    }
}
exports.metodo = metodo;