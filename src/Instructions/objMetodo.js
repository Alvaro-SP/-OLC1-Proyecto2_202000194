"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objMetodo = void 0;
const nodo = require("./ASTGlobal/nodo");
const Tipo = require("./ASTGlobal/tiponodo");
const tipo = require("./ASTGlobal/tiponodo");
const Tablita = require("./TS/TablaSimbolos");
const val = require("./val");
const instruccionesAPI = require("../Interpreter/interprete").instruccionesAPI; //las instrucciones de la API
const nodoAST = require("./ASTGlobal/nodoAST");
const INSRelacional = require('../Instructions/INSRelacional');
const INSBreak = require('./Break');

class objMetodo{
    constructor(parametros, ins) {
        this.parametros = parametros;
        this.ins = ins;
    }
}
exports.objMetodo = objMetodo;